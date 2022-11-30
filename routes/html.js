const express = require('express');
const path = require('path');

var router = express.Router();

/**
 * Cette classe sert à retourner les pages HTML. Vous devez modifier cette classe pour ajouter les liens vers vos pages.
 * Le premier paramètre devrait être / suivit du nom de votre page. Le second paramètre est une fonction anonyme. Le
 * paramètre req représente la requête courante et res représente la réponse. La réponse retourne le fichier html demandé.
 * Votre fichier devrait être dans le dossier client.
 */
router.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/accueil.html'));
});

router.get('/inscription', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/inscription.html'));
});

router.get('/points_de_vente', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/points_de_vente.html'));
});

// ajout
router.get('/produit', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/produit.html'));
});

router.get('/panier', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/panier.html'));
});

router.get('/gestion_commandes', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/gestion_commandes.html'));
});

router.get('/commande_employe', function(req, res){
    res.sendFile(path.join(__dirname + '/../client/commande_employe.html'));
});

module.exports = router