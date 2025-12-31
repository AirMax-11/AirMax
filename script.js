const newsTicker = document.getElementById('news-ticker');

const newsPool = [
    {
        title: "Les marchés européens tirés par les valeurs technologiques",
        url: "https://www.reuters.com/markets/"
    },
    {
        title: "Wall Street suit les résultats des géants de la tech",
        url: "https://www.cnbc.com/markets/"
    },
    {
        title: "Le CAC 40 évolue au gré des annonces macroéconomiques",
        url: "https://www.boursorama.com/bourse/actualites/"
    },
    {
        title: "Les obligations se stabilisent avant les prochaines décisions des banques centrales",
        url: "https://www.ft.com/markets"
    }
];

function updateTicker() {
    if (!newsTicker) {
        return;
    }

    const nextNews = newsPool[Math.floor(Math.random() * newsPool.length)];
    newsTicker.innerHTML = `<a href="${nextNews.url}" target="_blank" rel="noreferrer">${nextNews.title}</a>`;
}

updateTicker();
setInterval(updateTicker, 8000);
