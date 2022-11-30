
function chargercommande_employe(){
    console.log(ID_VENTE)
    $.ajax({
        url: "/ventes/"+ID_VENTE,
        method:"GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', "Basic "+ TOKEN_EMPLOYE);
        },
        success: function( result ) {
            $.each(result.produits, function (key, value) {
                produit = cmd_produit_to_html(value);
                $('#list_cmd').append(produit);
            });
            let total = 'Total: '+ result.montant;
            $('#total_cmd').text(total)
        }
    });
}

function cmd_produit_to_html(produit){
    tableau_produit=$('<div></div>')
        .addClass('row')
        .append('<div class="col">' + produit.nomProduit +'</div>')
        .append('<div class="col">' + produit.prix +'</div>')
        .append('<div class="col" id="panier_produit_qty'+produit.id+'">' + produit.quantite + '</div>')
        .append('<div class="col" id="panier_produit_prix'+produit.id+'">' +
            (produit.prix * produit.quantite).toFixed(2) +'</div>');
    return tableau_produit.append('<hr>');
}