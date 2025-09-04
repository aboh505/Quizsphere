"use client";

import { useState } from "react";

// Exemple de questions par thème
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
    {
      question: "Si f(x) = 2x² - 3x + 5, quelle est f'(x) ?",
      options: ["2x - 3", "4x - 3", "4x - 3x²", "2x² - 3"],
      answer: 1
    },
    {
      question: "Résolvez l'équation : 3x - 7 = 2x + 5",
      options: ["x = 12", "x = -12", "x = -2", "x = 2"],
      answer: 3
    },
    {
      question: "Quelle est la somme des angles d’un pentagone ?",
      options: ["540°", "360°", "720°", "450°"],
      answer: 0
    },
    {
      question: "Si log₂(x) = 5, alors x = ?",
      options: ["25", "32", "10", "64"],
      answer: 1
    },
    {
      question: "Quel est le développement de (x + 3)(x - 4) ?",
      options: ["x² - x - 12", "x² - x + 12", "x² + x - 12", "x² + x + 12"],
      answer: 0
    },
    {
      question: "Résolvez : x² - 9 = 0",
      options: ["x = 3 ou -3", "x = 9", "x = -9", "x = 0"],
      answer: 0
    },
    {
      question: "Combien de nombres premiers y a-t-il entre 50 et 70 ?",
      options: ["4", "5", "6", "3"],
      answer: 1
    },
    {
      question: "Quelle est la dérivée de sin(x) ?",
      options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
      answer: 0
    },
    {
      question: "Résolvez : 2(x - 3) = 4x + 1",
      options: ["x = -7", "x = 7", "x = -1", "x = 1"],
      answer: 0
    },
    {
      question: "Si un triangle a des côtés de 7, 24 et 25, est-il rectangle ?",
      options: ["Oui", "Non", "Impossible à déterminer", "Seulement si les angles sont aigus"],
      answer: 0
    }
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
  "Technologie": [
    { question: "Qui a fondé Microsoft ?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg"], answer: 1 },
    { question: "Quel langage est utilisé pour le web ?", options: ["HTML", "Python", "C++"], answer: 0 },
    { question: "Quel réseau social a été créé en 2004 ?", options: ["Facebook", "Twitter", "Instagram"], answer: 0 },
    { question: "Quel est le moteur de recherche le plus utilisé ?", options: ["Bing", "Google", "Yahoo"], answer: 1 },
    { question: "Qui a inventé l’ordinateur ?", options: ["Charles Babbage", "Alan Turing", "Tesla"], answer: 0 },
    { question: "Quel protocole permet d’envoyer des emails ?", options: ["SMTP", "HTTP", "FTP"], answer: 0 },
    { question: "Quel langage est utilisé pour styliser les pages web ?", options: ["CSS", "JS", "Python"], answer: 0 },
    { question: "Quel est le stockage de données le plus rapide ?", options: ["SSD", "HDD", "CD"], answer: 0 },
    { question: "Quel est le format d’image standard du web ?", options: ["JPEG", "AVI", "MP3"], answer: 0 },
    { question: "Quel est le symbole de la marque Apple ?", options: ["Pomme", "Cerise", "Banane"], answer: 0 },
  ],
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
  "actualite": [
    { question: "Quel pays a organisé la Coupe du Monde 2022 ?", options: ["Brésil", "Qatar", "Russie", "Allemagne"], answer: "Qatar" },
    { question: "Qui est l’actuel président des États-Unis (2025) ?", options: ["Trump", "Biden", "Obama", "Clinton"], answer: "Biden" },
    { question: "Quel pays est sorti de l’Union Européenne en 2020 ?", options: ["France", "Italie", "Royaume-Uni", "Espagne"], answer: "Royaume-Uni" },
    { question: "Quelle pandémie mondiale a marqué 2020 ?", options: ["SRAS", "Covid-19", "Grippe Espagnole", "Ebola"], answer: "Covid-19" },
    { question: "Où se trouvent les Nations Unies ?", options: ["Genève", "New York", "Paris", "Londres"], answer: "New York" },
    { question: "Quelle entreprise fabrique l’iPhone ?", options: ["Samsung", "Huawei", "Apple", "Xiaomi"], answer: "Apple" },
    { question: "Quel pays est le plus peuplé au monde ?", options: ["Chine", "Inde", "États-Unis", "Indonésie"], answer: "Inde" },
    { question: "Qui est le président actuel de la France (2025) ?", options: ["Macron", "Hollande", "Sarkozy", "Mélenchon"], answer: "Macron" },
    { question: "Quelle monnaie est utilisée en Europe ?", options: ["Euro", "Dollar", "Livre", "Franc"], answer: "Euro" },
    { question: "Quel pays a lancé le premier satellite ?", options: ["USA", "URSS", "Chine", "Inde"], answer: "URSS" },
  ],
  "technologie": [
    { question: "Qui a fondé Microsoft ?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"], answer: "Bill Gates" },
    { question: "Quel langage est utilisé pour le web ?", options: ["Python", "HTML", "Java", "C++"], answer: "HTML" },
    { question: "Quel est le logo d’Android ?", options: ["Pomme", "Robot", "Oiseau", "Éclair"], answer: "Robot" },
    { question: "Qui a créé Facebook ?", options: ["Musk", "Gates", "Zuckerberg", "Bezos"], answer: "Zuckerberg" },
    { question: "Quel navigateur appartient à Google ?", options: ["Firefox", "Edge", "Chrome", "Safari"], answer: "Chrome" },
    { question: "Quelle entreprise fabrique la PlayStation ?", options: ["Sony", "Microsoft", "Nintendo", "Sega"], answer: "Sony" },
    { question: "Quel langage est utilisé pour React ?", options: ["PHP", "Python", "JavaScript", "C#"], answer: "JavaScript" },
    { question: "Quel est le système d’exploitation d’Apple ?", options: ["iOS", "Windows", "Linux", "Android"], answer: "iOS" },
    { question: "Qui a inventé la souris d’ordinateur ?", options: ["Jobs", "Douglas Engelbart", "Turing", "Von Neumann"], answer: "Douglas Engelbart" },
    { question: "En quelle année Google a-t-il été fondé ?", options: ["1995", "1998", "2001", "2005"], answer: "1998" },
  ],
  "litterature": [
    { question: "Qui a écrit 'Les Misérables' ?", options: ["Victor Hugo", "Molière", "Zola", "Voltaire"], answer: "Victor Hugo" },
    { question: "Qui est l’auteur de 'Don Quichotte' ?", options: ["Cervantès", "Shakespeare", "Dante", "Hugo"], answer: "Cervantès" },
    { question: "Quel écrivain a créé 'Harry Potter' ?", options: ["Tolkien", "Rowling", "Lewis", "Martin"], answer: "Rowling" },
    { question: "Qui a écrit 'L’Odyssée' ?", options: ["Homère", "Virgile", "Platon", "Sophocle"], answer: "Homère" },
    { question: "Quel écrivain est connu pour 'Germinal' ?", options: ["Balzac", "Zola", "Hugo", "Maupassant"], answer: "Zola" },
    { question: "Quel auteur a écrit 'Le Petit Prince' ?", options: ["Saint-Exupéry", "Camus", "Hugo", "Voltaire"], answer: "Saint-Exupéry" },
    { question: "Qui est l’auteur de 'Hamlet' ?", options: ["Molière", "Shakespeare", "Hugo", "Racine"], answer: "Shakespeare" },
    { question: "Quel roman commence par 'Aujourd’hui, maman est morte' ?", options: ["L’Étranger", "La Peste", "Les Misérables", "Madame Bovary"], answer: "L’Étranger" },
    { question: "Quel auteur a créé 'Le Seigneur des Anneaux' ?", options: ["Tolkien", "Lewis", "Rowling", "Martin"], answer: "Tolkien" },
    { question: "Qui a écrit 'Candide' ?", options: ["Voltaire", "Rousseau", "Hugo", "Balzac"], answer: "Voltaire" },
  ],
  "cuisine": [
    { question: "Quel est l’ingrédient principal du guacamole ?", options: ["Avocat", "Tomate", "Pomme de terre", "Concombre"], answer: "Avocat" },
    { question: "Quel pays est célèbre pour les sushis ?", options: ["Chine", "Thaïlande", "Japon", "Corée"], answer: "Japon" },
    { question: "Quel fromage est utilisé sur une pizza Margherita ?", options: ["Cheddar", "Mozzarella", "Gruyère", "Feta"], answer: "Mozzarella" },
    { question: "Quelle boisson accompagne souvent les repas en Italie ?", options: ["Thé", "Café", "Vin", "Jus"], answer: "Vin" },
    { question: "Quel plat national est typique du Sénégal ?", options: ["Thieboudienne", "Couscous", "Riz cantonais", "Tajine"], answer: "Thieboudienne" },
    { question: "De quel pays vient la paella ?", options: ["Italie", "Portugal", "Espagne", "Grèce"], answer: "Espagne" },
    { question: "Quel fruit est séché pour donner des raisins secs ?", options: ["Pomme", "Prune", "Raisin", "Poire"], answer: "Raisin" },
    { question: "Quel est le principal ingrédient du houmous ?", options: ["Pois chiches", "Riz", "Lentilles", "Soja"], answer: "Pois chiches" },
    { question: "Quelle épice donne sa couleur au curry ?", options: ["Curcuma", "Paprika", "Safran", "Poivre"], answer: "Curcuma" },
    { question: "Quel dessert français est fait de pâte à choux et de crème ?", options: ["Éclair", "Tarte", "Madeleine", "Macaron"], answer: "Éclair" },
  ],
  "voyages": [
    { question: "Quelle est la capitale de l’Australie ?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: "Canberra" },
    { question: "Dans quel pays se trouve la Tour Eiffel ?", options: ["Italie", "France", "Espagne", "Belgique"], answer: "France" },
    { question: "Quel continent est surnommé le Continent Noir ?", options: ["Asie", "Afrique", "Amérique", "Europe"], answer: "Afrique" },
    { question: "Dans quel pays est situé le Machu Picchu ?", options: ["Mexique", "Pérou", "Chili", "Bolivie"], answer: "Pérou" },
    { question: "Quel pays possède le plus de pyramides au monde ?", options: ["Égypte", "Mexique", "Soudan", "Grèce"], answer: "Soudan" },
    { question: "Quel est le plus grand désert du monde ?", options: ["Sahara", "Gobi", "Kalahari", "Arctique"], answer: "Sahara" },
    { question: "Quelle ville est surnommée la 'Big Apple' ?", options: ["Los Angeles", "New York", "Chicago", "Miami"], answer: "New York" },
    { question: "Dans quel pays peut-on visiter la Cappadoce ?", options: ["Grèce", "Turquie", "Italie", "Iran"], answer: "Turquie" },
    { question: "Quel est le pays du tango ?", options: ["Brésil", "Argentine", "Espagne", "Portugal"], answer: "Argentine" },
    { question: "Dans quel pays se trouve le Mont Kilimandjaro ?", options: ["Kenya", "Tanzanie", "Ouganda", "Éthiopie"], answer: "Tanzanie" },
  ],

  "animaux": [
    { question: "Quel est l’animal terrestre le plus rapide ?", options: ["Guépard", "Lion", "Antilope", "Tigre"], answer: "Guépard" },
    { question: "Quel mammifère marin est le plus grand ?", options: ["Orque", "Baleine bleue", "Dauphin", "Requin-baleine"], answer: "Baleine bleue" },
    { question: "Combien de pattes a une araignée ?", options: ["6", "8", "10", "12"], answer: "8" },
    { question: "Quel animal est surnommé 'roi de la jungle' ?", options: ["Tigre", "Lion", "Éléphant", "Guépard"], answer: "Lion" },
    { question: "Quel est l’animal symbole de l’Australie ?", options: ["Koala", "Kangourou", "Émeu", "Dingo"], answer: "Kangourou" },
    { question: "Quel insecte produit le miel ?", options: ["Guêpe", "Abeille", "Fourmi", "Mouche"], answer: "Abeille" },
    { question: "Quel est l’oiseau qui ne vole pas et vit en Antarctique ?", options: ["Autruche", "Manchot", "Émeu", "Pélican"], answer: "Manchot" },
    { question: "Quel est le plus grand félin du monde ?", options: ["Tigre", "Lion", "Jaguar", "Léopard"], answer: "Tigre" },
    { question: "Combien de cœurs possède une pieuvre ?", options: ["1", "2", "3", "4"], answer: "3" },
    { question: "Quel arbre produit des glands ?", options: ["Chêne", "Érable", "Pin", "Saule"], answer: "Chêne" },
  ],
  "sante": [
    { question: "Combien de dents a un adulte en moyenne ?", options: ["28", "30", "32", "36"], answer: "32" },
    { question: "Quelle vitamine est produite par la peau grâce au soleil ?", options: ["Vitamine A", "Vitamine B12", "Vitamine C", "Vitamine D"], answer: "Vitamine D" },
    { question: "Quel organe pompe le sang ?", options: ["Foie", "Cœur", "Poumon", "Rein"], answer: "Cœur" },
    { question: "Combien de litres d’eau est-il conseillé de boire par jour ?", options: ["0,5 L", "1 L", "2 L", "4 L"], answer: "2 L" },
    { question: "Quel aliment est riche en calcium ?", options: ["Pain", "Yaourt", "Pomme", "Riz"], answer: "Yaourt" },
    { question: "Quel est le groupe sanguin universel donneur ?", options: ["A+", "B-", "AB+", "O-"], answer: "O-" },
    { question: "Combien d’os possède le corps humain ?", options: ["106", "206", "306", "406"], answer: "206" },
    { question: "Quel sport est le plus complet pour la santé ?", options: ["Natation", "Tennis", "Boxe", "Football"], answer: "Natation" },
    { question: "Quel est le principal organe de la respiration ?", options: ["Cœur", "Foie", "Poumons", "Estomac"], answer: "Poumons" },
    { question: "Quelle habitude est mauvaise pour la santé ?", options: ["Dormir", "Lire", "Fumer", "Marcher"], answer: "Fumer" },
  ],
  "mythologie": [
    { question: "Qui est le dieu grec du ciel et de la foudre ?", options: ["Hadès", "Apollon", "Zeus", "Hermès"], answer: "Zeus" },
    { question: "Dans la mythologie égyptienne, qui est le dieu des morts ?", options: ["Osiris", "Rê", "Anubis", "Horus"], answer: "Anubis" },
    { question: "Quel héros grec a tué le Minotaure ?", options: ["Achille", "Thésée", "Ulysse", "Héraclès"], answer: "Thésée" },
    { question: "Qui est la déesse grecque de la sagesse ?", options: ["Athéna", "Aphrodite", "Artémis", "Héra"], answer: "Athéna" },
    { question: "Quel est l’équivalent romain de Zeus ?", options: ["Mars", "Pluton", "Jupiter", "Saturne"], answer: "Jupiter" },
    { question: "Quel héros a eu 12 travaux à accomplir ?", options: ["Persée", "Jason", "Héraclès", "Achille"], answer: "Héraclès" },
    { question: "Quel animal est associé à Poséidon ?", options: ["Serpent", "Cheval", "Taureau", "Aigle"], answer: "Cheval" },
    { question: "Dans la mythologie nordique, qui brandit le marteau Mjöllnir ?", options: ["Odin", "Thor", "Loki", "Balder"], answer: "Thor" },
    { question: "Quelle créature a une tête humaine et un corps de lion ?", options: ["Sphinx", "Centaur", "Griffon", "Harpie"], answer: "Sphinx" },
    { question: "Quel titan portait le ciel sur ses épaules ?", options: ["Cronos", "Atlas", "Prométhée", "Gaïa"], answer: "Atlas" },
  ],
  "jeuxVideo": [
    { question: "Quel est le plombier célèbre de Nintendo ?", options: ["Luigi", "Mario", "Sonic", "Donkey Kong"], answer: "Mario" },
    { question: "Quel jeu est surnommé 'Battle Royale' ?", options: ["Minecraft", "Fortnite", "FIFA", "Overwatch"], answer: "Fortnite" },
    { question: "Dans quel jeu trouve-t-on Pikachu ?", options: ["Digimon", "Pokémon", "Yu-Gi-Oh!", "Zelda"], answer: "Pokémon" },
    { question: "Quel héros utilise une épée nommée Master Sword ?", options: ["Link", "Zelda", "Ganondorf", "Sora"], answer: "Link" },
    { question: "Dans quel jeu conduit-on des voitures rapides ?", options: ["Call of Duty", "Need for Speed", "Fortnite", "Halo"], answer: "Need for Speed" },
    { question: "Quel jeu se déroule dans le monde cubique ?", options: ["Minecraft", "Roblox", "Terraria", "Among Us"], answer: "Minecraft" },
    { question: "Qui est l’ennemi principal de Sonic ?", options: ["Bowser", "Dr. Robotnik", "Ganondorf", "Wario"], answer: "Dr. Robotnik" },
    { question: "Dans quel jeu incarne-t-on un assassin à capuche ?", options: ["Far Cry", "Assassin’s Creed", "Skyrim", "The Witcher"], answer: "Assassin’s Creed" },
    { question: "Quel jeu est basé sur la construction de villes ?", options: ["FIFA", "SimCity", "Mario Kart", "Tekken"], answer: "SimCity" },
    { question: "Quel jeu en ligne populaire contient un mode 'ARAM' ?", options: ["Dota 2", "League of Legends", "Overwatch", "Valorant"], answer: "League of Legends" },
  ],
  "mode": [
    { question: "Quelle ville est la capitale mondiale de la mode ?", options: ["Londres", "Milan", "Paris", "New York"], answer: "Paris" },
    { question: "Quel styliste est connu pour la petite robe noire ?", options: ["Chanel", "Dior", "Gucci", "Versace"], answer: "Chanel" },
    { question: "Quel accessoire indique l’heure ?", options: ["Ceinture", "Montre", "Collier", "Sac"], answer: "Montre" },
    { question: "Quel tissu est fait à partir de cocons de vers ?", options: ["Laine", "Soie", "Coton", "Lin"], answer: "Soie" },
    { question: "Quelle marque a pour logo une virgule ?", options: ["Nike", "Adidas", "Puma", "Reebok"], answer: "Nike" },
    { question: "Quelle chaussure est appelée 'sneaker' ?", options: ["Sandale", "Botte", "Basket", "Escarpin"], answer: "Basket" },
    { question: "Quelle couleur est associée au luxe ?", options: ["Rouge", "Noir", "Or", "Vert"], answer: "Or" },
    { question: "Quel vêtement est porté en Inde ?", options: ["Kimono", "Sari", "Toge", "Poncho"], answer: "Sari" },
    { question: "Quelle pièce de mode est liée au hip-hop ?", options: ["Casquette", "Cravate", "Chemise", "Écharpe"], answer: "Casquette" },
    { question: "Qui a créé la marque Yeezy ?", options: ["Jay-Z", "Drake", "Kanye West", "Pharrell"], answer: "Kanye West" },
  ],
  "espace": [
    { question: "Quelle est la planète la plus proche du soleil ?", options: ["Vénus", "Mercure", "Mars", "Jupiter"], answer: "Mercure" },
    { question: "Quelle planète est surnommée la planète rouge ?", options: ["Mars", "Jupiter", "Saturne", "Vénus"], answer: "Mars" },
    { question: "Quel est le satellite naturel de la Terre ?", options: ["Soleil", "Lune", "Mars", "Étoile"], answer: "Lune" },
    { question: "Quelle planète possède des anneaux visibles ?", options: ["Saturne", "Uranus", "Jupiter", "Neptune"], answer: "Saturne" },
    { question: "Quel est le nom de notre galaxie ?", options: ["Andromède", "Voie lactée", "Orion", "Centaurus"], answer: "Voie lactée" },
    { question: "Quel astronaute a marché le premier sur la Lune ?", options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"], answer: "Neil Armstrong" },
    { question: "Combien de planètes compte le système solaire ?", options: ["7", "8", "9", "10"], answer: "8" },
    { question: "Quelle planète est la plus grande ?", options: ["Terre", "Jupiter", "Saturne", "Uranus"], answer: "Jupiter" },
    { question: "Quel télescope spatial célèbre observe l’univers ?", options: ["Galileo", "Kepler", "Hubble", "James Webb"], answer: "Hubble" },
    { question: "Quelle planète est connue pour sa grande tache rouge ?", options: ["Mars", "Jupiter", "Vénus", "Neptune"], answer: "Jupiter" },
  ],
  "inventions": [
    { question: "Qui a inventé l’ampoule électrique ?", options: ["Tesla", "Edison", "Newton", "Einstein"], answer: "Edison" },
    { question: "Qui a inventé le téléphone ?", options: ["Bell", "Marconi", "Tesla", "Morse"], answer: "Bell" },
    { question: "Quelle invention a permis l’aviation moderne ?", options: ["Voiture", "Avion", "Bateau", "Train"], answer: "Avion" },
    { question: "Qui a découvert la pénicilline ?", options: ["Pasteur", "Fleming", "Darwin", "Curie"], answer: "Fleming" },
    { question: "Quel savant a découvert la gravité ?", options: ["Einstein", "Galilée", "Newton", "Copernic"], answer: "Newton" },
    { question: "Quelle invention a révolutionné la communication ?", options: ["Télégraphe", "Machine à vapeur", "Téléphone", "Internet"], answer: "Internet" },
    { question: "Qui a inventé la radio ?", options: ["Tesla", "Marconi", "Edison", "Bell"], answer: "Marconi" },
    { question: "Quel est l’inventeur de la théorie de la relativité ?", options: ["Einstein", "Planck", "Bohr", "Pascal"], answer: "Einstein" },
    { question: "Quel pays a inventé la poudre à canon ?", options: ["Chine", "France", "Angleterre", "Grèce"], answer: "Chine" },
    { question: "Quelle invention a permis la diffusion des livres ?", options: ["Télévision", "Imprimerie", "Radio", "Ordinateur"], answer: "Imprimerie" },
  ],
  "langues": [
    { question: "Quelle est la langue la plus parlée au monde ?", options: ["Anglais", "Chinois", "Espagnol", "Français"], answer: "Chinois" },
    { question: "Quelle langue parle-t-on au Brésil ?", options: ["Espagnol", "Portugais", "Français", "Italien"], answer: "Portugais" },
    { question: "Quel pays a pour langue officielle l’allemand ?", options: ["Belgique", "Autriche", "Suède", "Norvège"], answer: "Autriche" },
    { question: "Quelle est la langue officielle du Cameroun ?", options: ["Anglais et Français", "Espagnol", "Portugais", "Allemand"], answer: "Anglais et Français" },
    { question: "Quel pays parle le plus l’espagnol ?", options: ["Mexique", "Espagne", "Argentine", "Colombie"], answer: "Mexique" },
    { question: "Quel alphabet est utilisé en Russie ?", options: ["Latin", "Cyrillique", "Grec", "Arabe"], answer: "Cyrillique" },
    { question: "Quelle est la langue officielle de l’ONU ?", options: ["Latin", "Esperanto", "6 langues officielles", "Arabe"], answer: "6 langues officielles" },
    { question: "Quel est le dialecte parlé en Égypte ancienne ?", options: ["Copte", "Hébreu", "Grec", "Latin"], answer: "Copte" },
    { question: "Quelle langue utilise les caractères Kanji ?", options: ["Coréen", "Japonais", "Chinois", "Thaï"], answer: "Japonais" },
    { question: "Quel est le pays francophone le plus peuplé ?", options: ["France", "Congo RDC", "Canada", "Cameroun"], answer: "Congo RDC" },
  ],
};

export default function MultiplayerQuiz() {
  // Étapes : 1=inscription, 2=choix thème, 3=quiz, 4=résultat
  const [step, setStep] = useState(1);

  const [players, setPlayers] = useState([{ name: "", password: "" }, { name: "", password: "" }]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState([0, 0]);
  const [finished, setFinished] = useState(false);

  // --------- Gestion inscription ---------
  const handlePlayerChange = (index, field, value) => {
    const copy = [...players];
    copy[index][field] = value;
    setPlayers(copy);
  };

  const startThemeSelection = () => {
    if (players.every(p => p.name && p.password)) setStep(2);
    else alert("Les deux joueurs doivent remplir leur nom et mot de passe !");
  };

  // --------- Gestion thème ---------
  const chooseTheme = (theme) => {
    setSelectedTheme(theme);
    setQuestions([...allQuestions[theme]]); // pas de mélange
    setStep(3);
  };

  // --------- Gestion réponses ---------
  const handleAnswer = (index) => {
    const newScores = [...scores];
    if (index === questions[currentQuestion].answer) {
      newScores[currentPlayerIndex] += 1;
      setScores(newScores);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentPlayerIndex === 0) {
      setCurrentPlayerIndex(1);
      setCurrentQuestion(0);
    } else {
      setFinished(true);
      setStep(4);
    }
  };

  // --------- UI ---------
  if (step === 1) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 p-6">
        <h1 className="text-3xl font-bold mb-6">Enregistrement des joueurs</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {players.map((p, idx) => (
            <div key={idx} className="w-full md:w-80 bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">Joueur {idx + 1}</h2>
              <input
                type="text"
                placeholder="Nom"
                value={p.name}
                onChange={(e) => handlePlayerChange(idx, "name", e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 mb-3"
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={p.password}
                onChange={(e) => handlePlayerChange(idx, "password", e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              />
            </div>
          ))}
        </div>

        <button
          onClick={startThemeSelection}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Suivant
        </button>
      </div>

    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 p-6">
        <h1 className="text-3xl font-bold mb-6">{players[0].name} choisit le thème</h1>
        <div className="flex gap-4 flex-wrap justify-center">
          {Object.keys(allQuestions).map(theme => (
            <button
              key={theme}
              onClick={() => chooseTheme(theme)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              {theme}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 3) {
    const question = questions[currentQuestion];
    const currentPlayer = players[currentPlayerIndex];

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 p-6">
        <h2 className="text-2xl font-semibold mb-4">{currentPlayer.name} joue</h2>
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
          <h3 className="text-xl font-bold mb-4">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                {opt}
              </button>
            ))}
          </div>
          <p className="mt-4 text-gray-600">Question {currentQuestion + 1} sur {questions.length}</p>
        </div>
      </div>
    );
  }

  if (step === 4) {
    let winner = "Égalité !";
    if (scores[0] > scores[1]) winner = `${players[0].name} gagne !`;
    if (scores[1] > scores[0]) winner = `${players[1].name} gagne !`;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 p-6">
        <h1 className="text-4xl font-bold mb-6">Résultat du Quiz</h1>
        <p className="text-3xl font-bold mb-4">{winner}</p>
        <p className="mb-2">{players[0].name} : {scores[0]} / {questions.length}</p>
        <p className="mb-4">{players[1].name} : {scores[1]} / {questions.length}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Rejouer
        </button>
      </div>
    );
  }

  return null;
}
