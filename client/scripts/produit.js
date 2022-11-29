let ID_CLIENT = 1;
let TOKEN_CLIENT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k";

$(function () {
    console.log("ift215")
});

function chargerproduit(){
    $.ajax({
        url: "/produits",
        success: function( result ) {
            console.log(result);
            $.each(result, function (key, value) {
                qty = 0;
                item = item_to_html(value, qty);
                $('#list_items').append(item);
            });
        }
    });
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        method: "GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ) {
            console.log(result);
            let sum = 0;
            result.items.forEach(sommeQuantite)
            function sommeQuantite(item) {
                qty = item.quantite;
                sum += qty;
                $('#produit_item_qty'+item.id).text(qty+' ');
            }
            $('#item_counter').text(sum)
        }
    });
}

function item_to_html(item){
    item_card = $('<div></div>')
        .addClass('card mb-4 rounded-3 shadow-sm');
    item_head = $('<div></div>')
        .addClass('card-header py-3')
        .append('<h4 class="my-0 fw-normal">' + item.nom + '</h4>');
    item_detail = $('<ul></ul>')
        .addClass('list-unstyled mt-3 mb-4')
        .append('<li id="quantite">Quantite : ' + item.qte_inventaire +'</li>')
        .append('<li id="categorie">Categorie : ' + item.categorie.nom +'</li>')
        .append('<li id="description">Description : ' + item.description +'</li>');
    item_body = $('<div></div>')
        .addClass('card-body')
        .append(' <h1 class="card-title text-center"> $' + item.prix +'</h1>');
    item_footer = $('<p></p>')
        .addClass('w-100 display-6 text-center')
        .append('<button type="button" class="btn btn-primary position-relative" onclick="produit_remove_item(' + item.id + ')">' +
            '<i class="bi bi-dash-lg"></i></button> ' +
            '<span id="produit_item_qty'+item.id +'"></span>' +
            '<button type="button" class="btn btn-primary position-relative" onclick="produit_add_item(' + item.id + ')" >' +
            '<i class="bi bi-plus-lg"></i></button>');
    item_card.append(item_head).append(item_body).append(item_detail).append(item_footer);
    return $('<div></div>').addClass('col-md-3').append(item_card);
}

function produit_add_item(id_item){
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier",
        method:"POST",
        data: {"idProduit": id_item, "quantite": 1},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ) {
            console.log(result);
            let sum = 0;
            result.items.forEach(sommeQuantite)
            function sommeQuantite(item) {
                qty = item.quantite;
                sum += qty;
                $('#produit_item_qty'+item.id).text(qty+' ');
            }
            $('#item_counter').text(sum)
        }
    });
}

function produit_remove_item(id_item){
    $.ajax({
        url: "/clients/"+ID_CLIENT+"/panier/" + id_item,
        method:"PUT",
        data: {"quantite": -1},
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_CLIENT);
        },
        success: function( result ) {
            console.log(result);
            let sum = 0;
            result.items.forEach(sommeQuantite)
            function sommeQuantite(item) {
                qty = item.quantite;
                sum += qty;
                $('#produit_item_qty'+item.id).text(qty+' ');
            }
            $('#item_counter').text(sum)
        }
    });
}