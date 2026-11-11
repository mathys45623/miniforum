console.log("app.js chargé");

const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    alert ('Bonjour depuis JavaScript !');
});

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
