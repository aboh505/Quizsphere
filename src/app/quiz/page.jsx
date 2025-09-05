"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ---------------------------
// 1. Définition des questions par thème
// ---------------------------
const allQuestions = {
  "Géographie": [
    { question: "Quelle est la capitale du Cameroun ?", options: ["Yaoundé", "Douala", "Garoua"], answer: 0 },
    { question: "Quelle est la capitale de la France ?", options: ["Paris", "Lyon", "Marseille"], answer: 0 },
    { question: "Quelle est la capitale du Japon ?", options: ["Tokyo", "Kyoto", "Osaka"], answer: 0 },
    { question: "Quelle est la capitale de l’Australie ?", options: ["Sydney", "Canberra", "Melbourne"], answer: 1 },
    { question: "Quel est le plus grand océan ?", options: ["Atlantique", "Pacifique", "Indien"], answer: 1 },
    { question: "Combien de continents y a-t-il ?", options: ["5", "6", "7"], answer: 2 },
    { question: "Quelle est la capitale de l'Égypte ?", options: ["Le Caire", "Alexandrie", "Gizeh"], answer: 0 },
    { question: "Quelle est la capitale de l’Italie ?", options: ["Rome", "Milan", "Naples"], answer: 0 },
    { question: "Quel pays a la plus grande superficie ?", options: ["USA", "Russie", "Chine"], answer: 1 },
    { question: "Quelle est la capitale de l’Espagne ?", options: ["Madrid", "Barcelone", "Séville"], answer: 0 },
  ],
  "Maths": [
    { question: "2 + 2 = ?", options: ["3", "4", "5"], answer: 1 },
    { question: "5 x 5 = ?", options: ["25", "20", "30"], answer: 0 },
    { question: "12 ÷ 4 = ?", options: ["2", "3", "4"], answer: 1 },
    { question: "7 + 6 = ?", options: ["12", "13", "14"], answer: 1 },
    { question: "15 - 9 = ?", options: ["5", "6", "7"], answer: 1 },
    { question: "9 x 3 = ?", options: ["27", "26", "29"], answer: 0 },
    { question: "8 ÷ 2 = ?", options: ["2", "4", "6"], answer: 1 },
    { question: "10 + 15 = ?", options: ["25", "20", "30"], answer: 0 },
    { question: "18 - 7 = ?", options: ["11", "12", "10"], answer: 0 },
    { question: "6 x 6 = ?", options: ["36", "30", "42"], answer: 0 },
  ],

  "Culture Générale": [
    { question: "Qui a écrit 'Roméo et Juliette' ?", options: ["Shakespeare", "Hugo", "Balzac"], answer: 0 },
    { question: "Qui a peint la Joconde ?", options: ["Van Gogh", "Picasso", "Léonard de Vinci"], answer: 2 },
    { question: "Qui est le père de la psychanalyse ?", options: ["Freud", "Jung", "Lacan"], answer: 0 },
    { question: "Quelle est la langue officielle du Brésil ?", options: ["Espagnol", "Portugais", "Français"], answer: 1 },
    { question: "Quelle couleur obtient-on en mélangeant rouge et bleu ?", options: ["Vert", "Violet", "Orange"], answer: 1 },
    { question: "Quelle est la vitesse de la lumière ?", options: ["300 000 km/s", "150 000 km/s", "1 000 km/s"], answer: 0 },
    { question: "Qui a découvert la gravité ?", options: ["Einstein", "Newton", "Galilée"], answer: 1 },
    { question: "Quel est l’animal le plus rapide ?", options: ["Guépard", "Lion", "Tigre"], answer: 0 },
    { question: "Combien de couleurs y a-t-il dans l'arc-en-ciel ?", options: ["6", "7", "8"], answer: 1 },
    { question: "Combien de planètes dans le système solaire ?", options: ["7", "8", "9"], answer: 1 },
  ],
  "Histoire": [
    { question: "Qui a été le premier président des USA ?", options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson"], answer: 0 },
    { question: "En quelle année a eu lieu la Révolution française ?", options: ["1789", "1776", "1804"], answer: 0 },
    { question: "Qui était Napoléon ?", options: ["Empereur", "Roi", "Président"], answer: 0 },
    { question: "Quelle civilisation a construit les pyramides ?", options: ["Égyptienne", "Romaine", "Grecque"], answer: 0 },
    { question: "Qui a découvert l'Amérique ?", options: ["Christophe Colomb", "Vasco de Gama", "Magellan"], answer: 0 },
    { question: "En quelle année a eu lieu la Première Guerre mondiale ?", options: ["1914", "1939", "1918"], answer: 0 },
    { question: "Qui était Cléopâtre ?", options: ["Reine d'Égypte", "Impératrice romaine", "Reine de France"], answer: 0 },
    { question: "Qui a inventé l'imprimerie ?", options: ["Gutenberg", "Tesla", "Edison"], answer: 0 },
    { question: "Quelle était la capitale de l'Empire romain ?", options: ["Rome", "Athènes", "Alexandrie"], answer: 0 },
    { question: "Qui a mené la révolution russe ?", options: ["Lénine", "Staline", "Trotski"], answer: 0 },
  ],
  "Sciences": [
    { question: "Quel est le symbole chimique de l'eau ?", options: ["H2O", "O2", "CO2"], answer: 0 },
    { question: "Quel est le plus grand mammifère ?", options: ["Éléphant", "Baleine bleue", "Girafe"], answer: 1 },
    { question: "Quelle planète est la plus proche du soleil ?", options: ["Mercure", "Vénus", "Terre"], answer: 0 },
    { question: "Quel gaz respirons-nous ?", options: ["Oxygène", "Hydrogène", "Azote"], answer: 0 },
    { question: "Quel est le centre de l'atome ?", options: ["Proton", "Noyau", "Électron"], answer: 1 },
    { question: "Combien de paires de chromosomes humains ?", options: ["23", "46", "22"], answer: 0 },
    { question: "Quelle est la vitesse de la lumière ?", options: ["300 000 km/s", "150 000 km/s", "1 000 km/s"], answer: 0 },
    { question: "Quel est l'organe principal de la respiration ?", options: ["Poumons", "Cœur", "Foie"], answer: 0 },
    { question: "Quel animal pond des œufs ?", options: ["Mammifère", "Oiseau", "Chien"], answer: 1 },
    { question: "Quel est l’élément chimique du fer ?", options: ["Fe", "F", "Ir"], answer: 0 },
  ],
  // "Technologie": [
  //   { question: "Qui a fondé Microsoft ?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg"], answer: 1 },
  //   { question: "Quel langage est utilisé pour le web ?", options: ["HTML", "Python", "C++"], answer: 0 },
  //   { question: "Quel réseau social a été créé en 2004 ?", options: ["Facebook", "Twitter", "Instagram"], answer: 0 },
  //   { question: "Quel est le moteur de recherche le plus utilisé ?", options: ["Bing", "Google", "Yahoo"], answer: 1 },
  //   { question: "Qui a inventé l’ordinateur ?", options: ["Charles Babbage", "Alan Turing", "Tesla"], answer: 0 },
  //   { question: "Quel protocole permet d’envoyer des emails ?", options: ["SMTP", "HTTP", "FTP"], answer: 0 },
  //   { question: "Quel langage est utilisé pour styliser les pages web ?", options: ["CSS", "JS", "Python"], answer: 0 },
  //   { question: "Quel est le stockage de données le plus rapide ?", options: ["SSD", "HDD", "CD"], answer: 0 },
  //   { question: "Quel est le format d’image standard du web ?", options: ["JPEG", "AVI", "MP3"], answer: 0 },
  //   { question: "Quel est le symbole de la marque Apple ?", options: ["Pomme", "Cerise", "Banane"], answer: 0 },
  // ],
  "Sport": [
    { question: "Combien de joueurs dans une équipe de football ?", options: ["9", "10", "11"], answer: 2 },
    { question: "Quel sport utilise un ballon ovale ?", options: ["Rugby", "Football", "Basket"], answer: 0 },
    { question: "Combien de sets dans un match de tennis ?", options: ["3 ou 5", "2 ou 4", "5 ou 7"], answer: 0 },
    { question: "Quel pays a remporté la Coupe du Monde 2018 ?", options: ["Brésil", "France", "Allemagne"], answer: 1 },
    { question: "Combien de joueurs sur un terrain de basket ?", options: ["5", "6", "7"], answer: 0 },
    { question: "Quelle distance pour un marathon ?", options: ["42 km", "21 km", "50 km"], answer: 0 },
    { question: "Quelle discipline sportive est appelée 'reine des sports' ?", options: ["Football", "Athlétisme", "Natation"], answer: 1 },
    { question: "Combien de joueurs sur un terrain de handball ?", options: ["6", "7", "8"], answer: 1 },
    { question: "Quelle équipe a remporté le plus de Coupes du Monde ?", options: ["Brésil", "Allemagne", "Italie"], answer: 0 },
    { question: "Combien de points pour un touchdown ?", options: ["3", "6", "7"], answer: 1 },
  ],
  "Musique": [
    { question: "Qui a chanté 'Thriller' ?", options: ["Michael Jackson", "Elvis", "Prince"], answer: 0 },
    { question: "Quel instrument a 6 cordes ?", options: ["Guitare", "Piano", "Violon"], answer: 0 },
    { question: "Qui a composé 'La Flûte enchantée' ?", options: ["Mozart", "Beethoven", "Bach"], answer: 0 },
    { question: "Quel groupe a chanté 'Bohemian Rhapsody' ?", options: ["Queen", "The Beatles", "Pink Floyd"], answer: 0 },
    { question: "Quel instrument est à vent ?", options: ["Flûte", "Guitare", "Batterie"], answer: 0 },
    { question: "Qui est surnommé 'The King of Pop' ?", options: ["Elvis", "Michael Jackson", "Prince"], answer: 1 },
    { question: "Quel instrument a des touches noires et blanches ?", options: ["Piano", "Guitare", "Flûte"], answer: 0 },
    { question: "Qui a chanté 'Shape of You' ?", options: ["Ed Sheeran", "Justin Bieber", "Bruno Mars"], answer: 0 },
    { question: "Quel genre musical est le jazz ?", options: ["Classique", "Improvisation", "Rock"], answer: 1 },
    { question: "Qui a chanté 'Imagine' ?", options: ["John Lennon", "Paul McCartney", "Elton John"], answer: 0 },
  ],
  "Cinéma": [
    { question: "Qui a réalisé 'Titanic' ?", options: ["James Cameron", "Spielberg", "Nolan"], answer: 0 },
    { question: "Quel film a remporté l’Oscar du meilleur film en 2020 ?", options: ["Parasite", "1917", "Joker"], answer: 0 },
    { question: "Qui joue Iron Man ?", options: ["Robert Downey Jr.", "Chris Evans", "Chris Hemsworth"], answer: 0 },
    { question: "Quel film est une trilogie de science-fiction ?", options: ["Star Wars", "Harry Potter", "Le Seigneur des Anneaux"], answer: 0 },
    { question: "Qui joue le rôle de Jack Sparrow ?", options: ["Johnny Depp", "Orlando Bloom", "Leonardo DiCaprio"], answer: 0 },
    { question: "Quel film a les Minions ?", options: ["Moi, Moche et Méchant", "Shrek", "Toy Story"], answer: 0 },
    { question: "Qui a réalisé 'Inception' ?", options: ["Christopher Nolan", "James Cameron", "Steven Spielberg"], answer: 0 },
    { question: "Quel film est basé sur un super-héros Marvel ?", options: ["Black Panther", "Joker", "Parasite"], answer: 0 },
    { question: "Qui joue Harry Potter ?", options: ["Daniel Radcliffe", "Elijah Wood", "Tom Holland"], answer: 0 },
    { question: "Quel film se passe dans la préhistoire ?", options: ["Les Croods", "Jurassic Park", "Ice Age"], answer: 0 },
  ],
  "Actualite": [
    { question: "Quel pays a organisé la Coupe du Monde 2022 ?", options: ["Brésil", "Qatar", "Russie", "Allemagne"], answer: 1 },
    { question: "Qui est l’actuel président des États-Unis (2025) ?", options: ["Trump", "Biden", "Obama", "Clinton"], answer: 1 },
    { question: "Quel pays est sorti de l’Union Européenne en 2020 ?", options: ["France", "Italie", "Royaume-Uni", "Espagne"], answer: 2 },
    { question: "Quelle pandémie mondiale a marqué 2020 ?", options: ["SRAS", "Covid-19", "Grippe Espagnole", "Ebola"], answer: 1 },
    { question: "Où se trouvent les Nations Unies ?", options: ["Genève", "New York", "Paris", "Londres"], answer: 1 },
    { question: "Quelle entreprise fabrique l’iPhone ?", options: ["Samsung", "Huawei", "Apple", "Xiaomi"], answer: 2 },
    { question: "Quel pays est le plus peuplé au monde ?", options: ["Chine", "Inde", "États-Unis", "Indonésie"], answer: 1 },
    { question: "Qui est le président actuel de la France (2025) ?", options: ["Macron", "Hollande", "Sarkozy", "Mélenchon"], answer: 0 },
    { question: "Quelle monnaie est utilisée en Europe ?", options: ["Euro", "Dollar", "Livre", "Franc"], answer: 0 },
    { question: "Quel pays a lancé le premier satellite ?", options: ["USA", "URSS", "Chine", "Inde"], answer: 1 },
  ],
  "Technologie": [
    { question: "Qui a fondé Microsoft ?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"], answer: 1 },
    { question: "Quel langage est utilisé pour le web ?", options: ["Python", "HTML", "Java", "C++"], answer: 1 },
    { question: "Quel est le logo d’Android ?", options: ["Pomme", "Robot", "Oiseau", "Éclair"], answer: 1 },
    { question: "Qui a créé Facebook ?", options: ["Musk", "Gates", "Zuckerberg", "Bezos"], answer: 2 },
    { question: "Quel navigateur appartient à Google ?", options: ["Firefox", "Edge", "Chrome", "Safari"], answer: 2 },
    { question: "Quelle entreprise fabrique la PlayStation ?", options: ["Sony", "Microsoft", "Nintendo", "Sega"], answer: 0 },
    { question: "Quel langage est utilisé pour React ?", options: ["PHP", "Python", "JavaScript", "C#"], answer: 2 },
    { question: "Quel est le système d’exploitation d’Apple ?", options: ["iOS", "Windows", "Linux", "Android"], answer: 0 },
    { question: "Qui a inventé la souris d’ordinateur ?", options: ["Jobs", "Douglas Engelbart", "Turing", "Von Neumann"], answer: 1 },
    { question: "En quelle année Google a-t-il été fondé ?", options: ["1995", "1998", "2001", "2005"], answer: 1 },
  ],
  "Litterature": [
    { question: "Qui a écrit 'Les Misérables' ?", options: ["Victor Hugo", "Molière", "Zola", "Voltaire"], answer: 0 },
    { question: "Qui est l’auteur de 'Don Quichotte' ?", options: ["Cervantès", "Shakespeare", "Dante", "Hugo"], answer: 0 },
    { question: "Quel écrivain a créé 'Harry Potter' ?", options: ["Tolkien", "Rowling", "Lewis", "Martin"], answer: 1 },
    { question: "Qui a écrit 'L’Odyssée' ?", options: ["Homère", "Virgile", "Platon", "Sophocle"], answer: 0 },
    { question: "Quel écrivain est connu pour 'Germinal' ?", options: ["Balzac", "Zola", "Hugo", "Maupassant"], answer: 1 },
    { question: "Quel auteur a écrit 'Le Petit Prince' ?", options: ["Saint-Exupéry", "Camus", "Hugo", "Voltaire"], answer: 0 },
    { question: "Qui est l’auteur de 'Hamlet' ?", options: ["Molière", "Shakespeare", "Hugo", "Racine"], answer: 1 },
    { question: "Quel roman commence par 'Aujourd’hui, maman est morte' ?", options: ["L’Étranger", "La Peste", "Les Misérables", "Madame Bovary"], answer: 0 },
    { question: "Quel auteur a créé 'Le Seigneur des Anneaux' ?", options: ["Tolkien", "Lewis", "Rowling", "Martin"], answer: 0 },
    { question: "Qui a écrit 'Candide' ?", options: ["Voltaire", "Rousseau", "Hugo", "Balzac"], answer: 0 },
  ],
  "cuisine": [
    { question: "Quel est l’ingrédient principal du guacamole ?", options: ["Avocat", "Tomate", "Pomme de terre", "Concombre"], answer: 0 },
    { question: "Quel pays est célèbre pour les sushis ?", options: ["Chine", "Thaïlande", "Japon", "Corée"], answer: 2 },
    { question: "Quel fromage est utilisé sur une pizza Margherita ?", options: ["Cheddar", "Mozzarella", "Gruyère", "Feta"], answer: 1 },
    { question: "Quelle boisson accompagne souvent les repas en Italie ?", options: ["Thé", "Café", "Vin", "Jus"], answer: 2 },
    { question: "Quel plat national est typique du Sénégal ?", options: ["Thieboudienne", "Couscous", "Riz cantonais", "Tajine"], answer: 0 },
    { question: "De quel pays vient la paella ?", options: ["Italie", "Portugal", "Espagne", "Grèce"], answer: 2 },
    { question: "Quel fruit est séché pour donner des raisins secs ?", options: ["Pomme", "Prune", "Raisin", "Poire"], answer: 2 },
    { question: "Quel est le principal ingrédient du houmous ?", options: ["Pois chiches", "Riz", "Lentilles", "Soja"], answer: 0 },
    { question: "Quelle épice donne sa couleur au curry ?", options: ["Curcuma", "Paprika", "Safran", "Poivre"], answer: 0 },
    { question: "Quel dessert français est fait de pâte à choux et de crème ?", options: ["Éclair", "Tarte", "Madeleine", "Macaron"], answer: 0 },
  ],
  "Voyages": [
    { question: "Quelle est la capitale de l’Australie ?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: 2 },
    { question: "Dans quel pays se trouve la Tour Eiffel ?", options: ["Italie", "France", "Espagne", "Belgique"], answer: 1 },
    { question: "Quel continent est surnommé le Continent Noir ?", options: ["Asie", "Afrique", "Amérique", "Europe"], answer: 1 },
    { question: "Dans quel pays est situé le Machu Picchu ?", options: ["Mexique", "Pérou", "Chili", "Bolivie"], answer: 1 },
    { question: "Quel pays possède le plus de pyramides au monde ?", options: ["Égypte", "Mexique", "Soudan", "Grèce"], answer: 2 },
    { question: "Quel est le plus grand désert du monde ?", options: ["Sahara", "Gobi", "Kalahari", "Arctique"], answer: 0 },
    { question: "Quelle ville est surnommée la 'Big Apple' ?", options: ["Los Angeles", "New York", "Chicago", "Miami"], answer: 1 },
    { question: "Dans quel pays peut-on visiter la Cappadoce ?", options: ["Grèce", "Turquie", "Italie", "Iran"], answer: 1 },
    { question: "Quel est le pays du tango ?", options: ["Brésil", "Argentine", "Espagne", "Portugal"], answer: 1 },
    { question: "Dans quel pays se trouve le Mont Kilimandjaro ?", options: ["Kenya", "Tanzanie", "Ouganda", "Éthiopie"], answer: 1 },
  ],
  "Animaux": [
    { question: "Quel est l’animal terrestre le plus rapide ?", options: ["Guépard", "Lion", "Antilope", "Tigre"], answer: 0 },
    { question: "Quel mammifère marin est le plus grand ?", options: ["Orque", "Baleine bleue", "Dauphin", "Requin-baleine"], answer: 1 },
    { question: "Combien de pattes a une araignée ?", options: ["6", "8", "10", "12"], answer: 1 },
    { question: "Quel animal est surnommé 'roi de la jungle' ?", options: ["Tigre", "Lion", "Éléphant", "Guépard"], answer: 1 },
    { question: "Quel est l’animal symbole de l’Australie ?", options: ["Koala", "Kangourou", "Émeu", "Dingo"], answer: 1 },
    { question: "Quel insecte produit le miel ?", options: ["Guêpe", "Abeille", "Fourmi", "Mouche"], answer: 1 },
    { question: "Quel est l’oiseau qui ne vole pas et vit en Antarctique ?", options: ["Autruche", "Manchot", "Émeu", "Pélican"], answer: 1 },
    { question: "Quel est le plus grand félin du monde ?", options: ["Tigre", "Lion", "Jaguar", "Léopard"], answer: 0 },
    { question: "Combien de cœurs possède une pieuvre ?", options: ["1", "2", "3", "4"], answer: 2 },
    { question: "Quel arbre produit des glands ?", options: ["Chêne", "Érable", "Pin", "Saule"], answer: 0 },
  ],
  "Sante": [
    { question: "Combien de dents a un adulte en moyenne ?", options: ["28", "30", "32", "36"], answer: 2 },
    { question: "Quelle vitamine est produite par la peau grâce au soleil ?", options: ["Vitamine A", "Vitamine B12", "Vitamine C", "Vitamine D"], answer: 3 },
    { question: "Quel organe pompe le sang ?", options: ["Foie", "Cœur", "Poumon", "Rein"], answer: 1 },
    { question: "Combien de litres d’eau est-il conseillé de boire par jour ?", options: ["0,5 L", "1 L", "2 L", "4 L"], answer: 2 },
    { question: "Quel aliment est riche en calcium ?", options: ["Pain", "Yaourt", "Pomme", "Riz"], answer: 1 },
    { question: "Quel est le groupe sanguin universel donneur ?", options: ["A+", "B-", "AB+", "O-"], answer: 3 },
    { question: "Combien d’os possède le corps humain ?", options: ["106", "206", "306", "406"], answer: 1 },
    { question: "Quel sport est le plus complet pour la santé ?", options: ["Natation", "Tennis", "Boxe", "Football"], answer: 0 },
    { question: "Quel est le principal organe de la respiration ?", options: ["Cœur", "Foie", "Poumons", "Estomac"], answer: 2 },
    { question: "Quelle habitude est mauvaise pour la santé ?", options: ["Dormir", "Lire", "Fumer", "Marcher"], answer: 2 },
  ],
  "Mythologie": [
    { question: "Qui est le dieu grec du ciel et de la foudre ?", options: ["Hadès", "Apollon", "Zeus", "Hermès"], answer: 2 },
    { question: "Dans la mythologie égyptienne, qui est le dieu des morts ?", options: ["Osiris", "Rê", "Anubis", "Horus"], answer: 2 },
    { question: "Quel héros grec a tué le Minotaure ?", options: ["Achille", "Thésée", "Ulysse", "Héraclès"], answer: 1 },
    { question: "Qui est la déesse grecque de la sagesse ?", options: ["Athéna", "Aphrodite", "Artémis", "Héra"], answer: 0 },
    { question: "Quel est l’équivalent romain de Zeus ?", options: ["Mars", "Pluton", "Jupiter", "Saturne"], answer: 2 },
    { question: "Quel héros a eu 12 travaux à accomplir ?", options: ["Persée", "Jason", "Héraclès", "Achille"], answer: 2 },
    { question: "Quel animal est associé à Poséidon ?", options: ["Serpent", "Cheval", "Taureau", "Aigle"], answer: 1 },
    { question: "Dans la mythologie nordique, qui brandit le marteau Mjöllnir ?", options: ["Odin", "Thor", "Loki", "Balder"], answer: 1 },
    { question: "Quelle créature a une tête humaine et un corps de lion ?", options: ["Sphinx", "Centaur", "Griffon", "Harpie"], answer: 0 },
    { question: "Quel titan portait le ciel sur ses épaules ?", options: ["Cronos", "Atlas", "Prométhée", "Gaïa"], answer: 1 },
  ],
  "JeuxVideo": [
    { question: "Quel est le plombier célèbre de Nintendo ?", options: ["Luigi", "Mario", "Sonic", "Donkey Kong"], answer: 1 },
    { question: "Quel jeu est surnommé 'Battle Royale' ?", options: ["Minecraft", "Fortnite", "FIFA", "Overwatch"], answer: 1 },
    { question: "Dans quel jeu trouve-t-on Pikachu ?", options: ["Digimon", "Pokémon", "Yu-Gi-Oh!", "Zelda"], answer: 1 },
    { question: "Quel héros utilise une épée nommée Master Sword ?", options: ["Link", "Zelda", "Ganondorf", "Sora"], answer: 0 },
    { question: "Dans quel jeu conduit-on des voitures rapides ?", options: ["Call of Duty", "Need for Speed", "Fortnite", "Halo"], answer: 1 },
    { question: "Quel jeu se déroule dans le monde cubique ?", options: ["Minecraft", "Roblox", "Terraria", "Among Us"], answer: 0 },
    { question: "Qui est l’ennemi principal de Sonic ?", options: ["Bowser", "Dr. Robotnik", "Ganondorf", "Wario"], answer: 1 },
    { question: "Dans quel jeu incarne-t-on un assassin à capuche ?", options: ["Far Cry", "Assassin’s Creed", "Skyrim", "The Witcher"], answer: 1 },
    { question: "Quel jeu est basé sur la construction de villes ?", options: ["FIFA", "SimCity", "Mario Kart", "Tekken"], answer: 1 },
    { question: "Quel jeu en ligne populaire contient un mode 'ARAM' ?", options: ["Dota 2", "League of Legends", "Overwatch", "Valorant"], answer: 1 },
  ],
  " Mode": [
    { question: "Quelle ville est la capitale mondiale de la mode ?", options: ["Londres", "Milan", "Paris", "New York"], answer: 2 },
    { question: "Quel styliste est connu pour la petite robe noire ?", options: ["Chanel", "Dior", "Gucci", "Versace"], answer: 0 },
    { question: "Quel accessoire indique l’heure ?", options: ["Ceinture", "Montre", "Collier", "Sac"], answer: 1 },
    { question: "Quel tissu est fait à partir de cocons de vers ?", options: ["Laine", "Soie", "Coton", "Lin"], answer: 1 },
    { question: "Quelle marque a pour logo une virgule ?", options: ["Nike", "Adidas", "Puma", "Reebok"], answer: 0 },
    { question: "Quelle chaussure est appelée 'sneaker' ?", options: ["Sandale", "Botte", "Basket", "Escarpin"], answer: 2 },
    { question: "Quelle couleur est associée au luxe ?", options: ["Rouge", "Noir", "Or", "Vert"], answer: 2 },
    { question: "Quel vêtement est porté en Inde ?", options: ["Kimono", "Sari", "Toge", "Poncho"], answer: 1 },
    { question: "Quelle pièce de mode est liée au hip-hop ?", options: ["Casquette", "Cravate", "Chemise", "Écharpe"], answer: 0 },
    { question: "Qui a créé la marque Yeezy ?", options: ["Jay-Z", "Drake", "Kanye West", "Pharrell"], answer: 2 },
  ],
  "Espace": [
    { question: "Quelle est la planète la plus proche du soleil ?", options: ["Vénus", "Mercure", "Mars", "Jupiter"], answer: 1 },
    { question: "Quelle planète est surnommée la planète rouge ?", options: ["Mars", "Jupiter", "Saturne", "Vénus"], answer: 0 },
    { question: "Quel est le satellite naturel de la Terre ?", options: ["Lune", "Soleil", "Mars", "Vénus"], answer: 0 },
    { question: "Quel est le plus grand satellite de Jupiter ?", options: ["Ganymède", "Io", "Europe", "Callisto"], answer: 0 },
    { question: "Quelle planète possède les anneaux les plus visibles ?", options: ["Jupiter", "Uranus", "Saturne", "Neptune"], answer: 2 },
    { question: "Qui a marché le premier sur la Lune ?", options: ["Armstrong", "Gagarine", "Collins", "Aldrin"], answer: 0 },
    { question: "Quelle galaxie contient notre système solaire ?", options: ["Andromède", "Voie lactée", "Magellan", "Triangulum"], answer: 1 },
    { question: "Quelle planète est la plus grande du système solaire ?", options: ["Saturne", "Jupiter", "Uranus", "Neptune"], answer: 1 },
    { question: "Quel télescope spatial a remplacé Hubble en 2021 ?", options: ["Kepler", "James Webb", "Spitzer", "Chandra"], answer: 1 },
    { question: "Quel est le 4e astre après le Soleil, la Lune et Vénus en luminosité ?", options: ["Mars", "Jupiter", "Sirius", "Saturne"], answer: 2 },
  ],
  "Inventions": [
    { question: "Qui a inventé l’ampoule électrique ?", options: ["Tesla", "Edison", "Franklin", "Newton"], answer: 1 },
    { question: "Qui a inventé l’avion ?", options: ["Wright", "Montgolfier", "Santos-Dumont", "Lindbergh"], answer: 0 },
    { question: "Qui a inventé le téléphone ?", options: ["Graham Bell", "Tesla", "Edison", "Marconi"], answer: 0 },
    { question: "Qui a inventé l’imprimerie ?", options: ["Gutenberg", "Newton", "Einstein", "Voltaire"], answer: 0 },
    { question: "Qui a inventé la relativité ?", options: ["Einstein", "Newton", "Galilée", "Planck"], answer: 0 },
    { question: "Qui a inventé la radio ?", options: ["Tesla", "Marconi", "Bell", "Edison"], answer: 1 },
    { question: "Qui a inventé la poudre à canon ?", options: ["Chinois", "Arabes", "Grecs", "Romains"], answer: 0 },
    { question: "Qui a inventé la machine à vapeur ?", options: ["Stephenson", "Watt", "Diesel", "Fulton"], answer: 1 },
    { question: "Qui a inventé la dynamite ?", options: ["Curie", "Einstein", "Nobel", "Pasteur"], answer: 2 },
    { question: "Qui a inventé Internet ?", options: ["Berners-Lee", "Jobs", "Gates", "Musk"], answer: 0 },
  ],
  "Langues": [
    { question: "Quelle est la langue la plus parlée au monde ?", options: ["Anglais", "Chinois", "Espagnol", "Hindi"], answer: 1 },
    { question: "Quelle langue est officielle au Brésil ?", options: ["Espagnol", "Portugais", "Français", "Italien"], answer: 1 },
    { question: "Quelle langue est parlée en Égypte ?", options: ["Arabe", "Français", "Turc", "Persan"], answer: 0 },
    { question: "Quel pays parle le plus français ?", options: ["France", "Congo", "Canada", "Belgique"], answer: 1 },
    { question: "Quelle langue est parlée au Japon ?", options: ["Chinois", "Coréen", "Japonais", "Thaï"], answer: 2 },
    { question: "Quelle est la langue officielle en Inde ?", options: ["Hindi", "Anglais", "Tamoul", "Bengali"], answer: 0 },
    { question: "Quelle langue est parlée en Argentine ?", options: ["Espagnol", "Portugais", "Italien", "Français"], answer: 0 },
    { question: "Quelle est la langue officielle de l’Allemagne ?", options: ["Allemand", "Anglais", "Néerlandais", "Danois"], answer: 0 },
    { question: "Quelle langue est parlée en Russie ?", options: ["Russe", "Ukrainien", "Polonais", "Bulgare"], answer: 0 },
    { question: "Quelle langue est parlée au Mexique ?", options: ["Espagnol", "Portugais", "Anglais", "Français"], answer: 0 },
  ],
  // ... ajoute les autres thèmes de la même manière
};

// ---------------------------
// 2. Composant Quiz
// ---------------------------
export default function Quiz() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState("");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const themes = Object.keys(allQuestions);
  const questions = selectedTheme ? allQuestions[selectedTheme] : [];

  const handleAnswer = (index) => {
    if (index === questions[current].answer) setScore(score + 1);
    if (current + 1 < questions.length) setCurrent(current + 1);
    else handleFinish();
  };

  const handleFinish = () => {
    const oldScores = JSON.parse(localStorage.getItem("scores")) || [];
    const newEntry = { score, theme: selectedTheme, date: new Date().toLocaleString() };
    localStorage.setItem("scores", JSON.stringify([...oldScores, newEntry]));
    router.push("/profile");
  };

  // ---------------------------
  // Menu de sélection de thème
  // ---------------------------
  if (!selectedTheme)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Choisissez un thème de quiz</h1>
        <div className="flex gap-6 flex-wrap justify-center">
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
            >
              {theme}
            </button>
          ))}
        </div>
      </div>
    );

  // ---------------------------
  // Quiz en cours
  // ---------------------------
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">{selectedTheme} Quiz</h1>

      {current < questions.length ? (
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">{questions[current].question}</h2>
          <div className="space-y-3">
            {questions[current].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {option}
              </button>
            ))}
          </div>
          <p className="mt-4 text-gray-600">
            Question {current + 1} sur {questions.length}
          </p>
        </div>
      ) : (
        <p className="text-lg">Calcul du score...</p>
      )}
    </div>
  );
}
