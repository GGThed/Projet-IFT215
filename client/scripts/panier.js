
function chargerpanier(){
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        method: "GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ) {
            $.each(result.items, function (key, value) {
                item = panier_to_html(value);
                $('#list_panier').append(item);
            });
            let total = 'Total: '+ result.valeur.toFixed(2)
            $('#total').text(total)
        }
    });
}

function panier_to_html(item){
    item_panier=$('<div></div>')
        .addClass('row')
        .append('<div class="col">' + item.nomProduit +'</div>')
        .append('<div class="col">' + item.prix +'</div>')
        .append('<div class="col">' +
            '<button id="moins" onclick="enlever_du_panier(' + item.id + ')"> - </button>' +
            '<span> ' + item.quantite + ' </span>' +
            '<button id="plus" onclick="ajout_au_panier(' + item.id + ')"> + </button></div>')
        .append('<div class="col">' + (item.prix * item.quantite).toFixed(2) +'</div>');
    return item_panier.append('<hr>');
}

function ajout_au_panier(id_item){
    panier_add_item(id_item);
    location.reload();
}

function enlever_du_panier(id_item){
    panier_remove_item(id_item);
    location.reload();
}

function panier_add_item(id_item){
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        method:"POST",
        data: {"idProduit": id_item, "quantite": 1},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ) {
        }
    });
}

function panier_remove_item(id_item){
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier/"+id_item,
        method:"PUT",
        data: {"quantite": -1},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ) {
            $('#item_counter').text(sum)
        }
    });
}