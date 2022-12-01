
let TOKEN_EMPLOYE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2NzUyMzAxLCJleHAiOjE4MzY3NTk1MDF9.QYtVOl6o87doRiT2EsezLqtSpz27K-nEZ4KqcmZV5Ac";

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
        .append('<div class="col">' + vente.id + '</div>')
        .append('<div class="col">' + vente.date +'</div>');

    switch (vente.status){
        case 'reçue':
            tableau_ventes.append('<div class="col">' +
                '<select id = "status">' +
                '<option value="reçue" selected> Reçue </option>' +
                '<option value="prepare"> Préparé </option>' +
                '<option value="en_route"> En route </option>' +
                '<option value="livree"> Livrée </option>' +
                '</select></div>');
            break;
        case 'prepare':
            tableau_ventes.append('<div class="col">' +
                '<select id = "status">' +
                '<option value="reçue"> Reçue </option>' +
                '<option value="prepare" selected> Préparé </option>' +
                '<option value="en_route"> En route </option>' +
                '<option value="livree"> Livrée </option>' +
                '</select></div>');
            break;
        case 'en_route':
            tableau_ventes.append('<div class="col">' +
                '<select id = "status">' +
                '<option value="reçue"> Reçue </option>' +
                '<option value="prepare"> Préparé </option>' +
                '<option value="en_route" selected> En route </option>' +
                '<option value="livree"> Livrée </option>' +
                '</select></div>');
            break;
        case 'livree':
            tableau_ventes.append('<div class="col">' +
                '<select id = "status">' +
                '<option value="reçue"> Reçue </option>' +
                '<option value="prepare"> Préparé </option>' +
                '<option value="en_route"> En route </option>' +
                '<option value="livree" selected> Livrée </option>' +
                '</select></div>');
            break;
    }

    // La fonction changeStatus() ne fonctionne pas car la fonction appelée dans Postman lève une erreur 500
    /*
    switch (vente.status){
        case 'reçue':
            tableau_ventes.append('<div class="col">' +
                '<select id = "status" onchange="changeStatus('+vente.id+', this)">' +
                '<option value="reçue" selected> Reçue </option>' +
                '<option value="prepare"> Préparé </option>' +
                '<option value="en_route"> En route </option>' +
                '<option value="livree"> Livrée </option>' +
                '</select></div>');
            break;
        case 'prepare':
            tableau_ventes.append('<div class="col">' +
                '<select id = "status" onchange="changeStatus('+vente.id+', this)">' +
                '<option value="reçue"> Reçue </option>' +
                '<option value="prepare" selected> Préparé </option>' +
                '<option value="en_route"> En route </option>' +
                '<option value="livree"> Livrée </option>' +
                '</select></div>');
            break;
        case 'en_route':
            tableau_ventes.append('<div class="col">' +
                '<select id = "status" onchange="changeStatus('+vente.id+', this)">' +
                '<option value="reçue"> Reçue </option>' +
                '<option value="prepare"> Préparé </option>' +
                '<option value="en_route" selected> En route </option>' +
                '<option value="livree"> Livrée </option>' +
                '</select></div>');
            break;
        case 'livree':
            tableau_ventes.append('<div class="col">' +
                '<select id = "status" onchange="changeStatus('+vente.id+', this)">' +
                '<option value="reçue"> Reçue </option>' +
                '<option value="prepare"> Préparé </option>' +
                '<option value="en_route"> En route </option>' +
                '<option value="livree" selected> Livrée </option>' +
                '</select></div>');
            break;
    }
    */

    return tableau_ventes.append('<hr>');
}

// La fonction ne fonctionne pas dans Postman, elle lève une erreur 500
/*
function changeStatus(id_vente, obj){
    $.ajax({
        url: "/ventes/"+id_vente,
        method:"PUT",
        data: {"status": obj.value},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_EMPLOYE);
        },
        success: function( result ) {
        }
    });
}
 */