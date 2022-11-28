// Pour afficher seulement si admin : Validation est selon le courriel (voir gestionConnexion.js)
// https://stackoverflow.com/questions/38118442/show-and-hide-tabs-with-if-else

function chargergestion_commandes(){
    $.ajax({
        url: "/ventes",
        success: function( result ) {
            console.log(result);
            $.each(result, function (key, value) {
                vente = vente_to_html(value);
                $('#list_ventes').append(vente);
            });
        }
    });
}

function vente_to_html(vente){
    let client = getClient(vente.idClient)

    tableau_ventes=$('<div></div>')
        .addClass('row')
        .append('<div class="col">' + vente.id +'</div>')
        .append('<div class="col">' + client.adresse +'</div>')
        .append('<div class="col">' + vente.date +'</div>')
        .append('<div class="col">' + vente.status +'</div>');
    return tableau_ventes.append('<hr>');
}

function getClient(idClient){
    $.ajax({
        url: "/clients/"+idClient,
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ) {
            console.log(result);
            return result;          // marche pas car asynchrone?
        }
    });
}