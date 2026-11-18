console.log("app.js chargé");

const LONGUEUR_MIN = 5;
const LONGUEUR_MAX = 80;
const MESSAGE_MAX = 500;

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

function validerPseudo(saisie) {
    if (saisie.trim() === "") {
        return "Le pseudo est obligatoire.";
    }
    return "";
}

function validerMessage(saisie) {
    const message = saisie.trim();

    if (message === "") {
        return "Le message est obligatoire.";
    }

    if (message.length > MESSAGE_MAX) {
        return "Le message ne doit pas dépasser " + MESSAGE_MAX + " caractères.";
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

    for (let i = liste.length - 1; i >= 0; i--) {
        section.append(carteSujet(liste[i]));
    }
    
    section.querySelector("h2").textContent = "Sujets récents (" + liste.length + ")";
}

function afficherErreur(idMessage, texte) {
    document.getElementById(idMessage).textContent = texte;
}

function afficherCompteur(texte) {
    document.getElementById("compteur-titre").textContent =
        texte.length + " / " + LONGUEUR_MAX + " caractères";
}

if (document.querySelector("#sujets") !== null) {
    const formulaire = document.querySelector("#form-nouveau-sujet");
    const champTitre = document.querySelector("#titre");
    const champRecherche = document.querySelector("#recherche");
    const boutonTri = document.querySelector("#bouton-tri");

    let triAlphabetique = false;

    function rafraichir() {
        let liste = chercheDansTitres(titres, champRecherche.value);

        if (triAlphabetique) {
            liste = titresTries(liste).reverse();
        }

        afficherSujets(liste);
    }

    rafraichir();
    afficherCompteur("");
    
    champRecherche.addEventListener("input", rafraichir);

    boutonTri.addEventListener("click", () => {
        triAlphabetique = !triAlphabetique;

        if (triAlphabetique) {
            boutonTri.textContent = "Plus récents d'abord";
        } else {
            boutonTri.textContent = "Trier de A à Z";
        }

        rafraichir();
    });
    
    champTitre.addEventListener("input", () => {
        afficherCompteur(champTitre.value);
    });

    formulaire.addEventListener("submit", (event) => {
        event.preventDefault();

        const pseudo = document.querySelector("#pseudo").value;
        const titre = champTitre.value;
        const message = document.querySelector("#message").value;

        const erreurPseudo = validerPseudo(pseudo);
        const erreurTitre = validerTitre(titres, titre);
        const erreurMessage = validerMessage(message);

        afficherErreur("erreur-pseudo", erreurPseudo);
        afficherErreur("erreur-titre", erreurTitre);
        afficherErreur("erreur-message", erreurMessage);

        document.querySelector("#pseudo").classList.toggle("champ-invalide", erreurPseudo !== "");
        champTitre.classList.toggle("champ-invalide", erreurTitre !== "");
        document.querySelector("#message").classList.toggle("champ-invalide", erreurMessage !== "");

        if (erreurPseudo !== "" || erreurTitre !== "" || erreurMessage !== "") {
            return;
        }

        titres.push(titre.trim());
        champRecherche.value = "";
        rafraichir();

        formulaire.reset();
        afficherCompteur("");
        document.querySelector("#pseudo").focus();
    });
}
