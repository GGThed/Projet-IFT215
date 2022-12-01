
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
            '<button id="moins" onclick="panier_remove_item(' + item.id + ')"> - </button>' +
            '<span id="panier_produit_qty'+item.id+'"> ' + item.quantite + ' </span>' +
            '<button id="plus" onclick="panier_add_item(' + item.id + ')"> + </button></div>')
        .append('<div class="col" id="panier_produit_prix'+item.id+'">' +
            (item.prix * item.quantite).toFixed(2) +'</div>');
    return item_panier.append('<hr>');
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
            $.each(result.items, function (key, value) {
                $('#panier_produit_qty'+value.id).text(' ' + value.quantite + ' ');
                $('#panier_produit_prix'+value.id).text(' ' +(value.prix * value.quantite).toFixed(2) + ' ');
            });
            let total = 'Total: '+ result.valeur.toFixed(2)
            $('#total').text(total)
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
            $.each(result.items, function (key, value) {
                if(value.quantite < 0 && value.id == id_item){
                    panier_add_item(id_item);
                    window.alert("Vous ne pouvez pas mettre une quantité inférieure à 0.");
                }
                $('#panier_produit_qty'+value.id).text(' ' + value.quantite + ' ');
                $('#panier_produit_prix'+value.id).text(' ' +(value.prix * value.quantite).toFixed(2) + ' ');
            });
            let total = 'Total: '+ result.valeur.toFixed(2)
            $('#total').text(total)
        }
    });
}