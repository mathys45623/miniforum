console.log("app.js chargé");

const LONGUEUR_MIN = 5;
const LONGUEUR_MAX = 80;

const titres = [
    "🎓 Les blocus des lycées en France ?",
    "⚽ Match France VS Allemagne - La Remontada ?",
    "🎮 La sortie Du jeu GTA IV",
];

function titresTries(titres) {
    return [...titres].sort((a, b) => a.localeCompare(b, "fr"));
}

function chercheDansTitres(titres, texte) {
    return titres.filter(titre =>
        titre.toLowerCase().includes(texte.toLowerCase())
    );
}

function titreExiste(titres, saisie) {
    const recherche = saisie.trim().toLowerCase();

    return titres.some(titre =>
        titre.toLowerCase() === recherche
    );
}

function validerTitre(titres, saisie) {
    const titre = saisie.trim();

    if (titre === "") {
        return "Le titre est obligatoire.";
    }

    if (titre.length < LONGUEUR_MIN) {
        return "Le titre doit faire au moins " + LONGUEUR_MIN + " caractères.";
    }

    if (titre.length > LONGUEUR_MAX) {
        return "Le titre ne doit pas dépasser " + LONGUEUR_MAX + " caractères.";
    }

    if (titreExiste(titres, titre)) {
        return "Ce sujet existe déjà.";
    }
    return "";
}

function carteSujet(titre) {
    const carte = document.createElement("article");
    carte.classList.add("carte-sujet");

    const h3 = document.createElement("h3");
    h3.textContent = titre;

    carte.append(h3);
    return carte;
}

function afficherSujets(liste) {
    const section = document.querySelector("#sujets");

    section.querySelectorAll(".carte-sujet").forEach(carte => carte.remove());

    for (const titre of liste) {
        section.append(carteSujet(titre));
    }
}

if (document.querySelector("#sujets") !== null) {
    afficherSujets(titres);
}
