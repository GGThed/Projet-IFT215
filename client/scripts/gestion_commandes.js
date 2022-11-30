// Pour afficher seulement si admin : Validation est selon le courriel (voir gestionConnexion.js)
// https://stackoverflow.com/questions/38118442/show-and-hide-tabs-with-if-else

let TOKEN_EMPLOYE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2NzUyMzAxLCJleHAiOjE4MzY3NTk1MDF9.QYtVOl6o87doRiT2EsezLqtSpz27K-nEZ4KqcmZV5Ac";
let ID_VENTE = 6;

function chargergestion_commandes(){
    $.ajax({
        url: "/ventes",
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_EMPLOYE);
        },
        success: function( result ) {
            $.each(result, function (key, value) {
                vente = vente_to_html(value);
                $('#list_ventes').append(vente);
            });
        }
    });
}

function vente_to_html(vente){
    tableau_ventes=$('<div></div>')
        .addClass('row')
        .append('<div class="col"><a href="#/commande_employe" onclick="load_vente('+vente.id+')">'+vente.id+'</a></div>')
        //.append('<div class="col"><a href="#/commande_employe">'+vente.id+'</a></div>')
        .append('<div class="col">' + vente.date +'</div>')
        .append('<div class="col">' + vente.status +'</div>');
    return tableau_ventes.append('<hr>');
}

function load_vente(id_vente){
    ID_VENTE = id_vente;
}
