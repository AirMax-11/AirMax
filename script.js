const updateInterval = 1000;
const historyLength = 40;
const newsTicker = document.getElementById('news-ticker');

const newsPool = [
    "Les futures US progressent après des résultats solides dans la tech.",
    "Le CAC 40 franchit un seuil technique clé porté par le luxe.",
    "Les rendements obligataires se stabilisent, apaisant la volatilité.",
    "Les valeurs énergie reculent, le Brent se replie légèrement.",
    "La BCE maintient son cap, les banques gagnent du terrain.",
    "Les investisseurs reviennent sur les valeurs de croissance européenne."
];

const marketCards = Array.from(document.querySelectorAll('.market-card')).map((card) => {
    const canvas = card.querySelector('.market-chart');
    const ctx = canvas.getContext('2d');
    const priceEl = card.querySelector('.price');
    const changeEl = card.querySelector('.market-change');
    const initialPrice = Number(card.dataset.price);
    const data = Array.from({ length: historyLength }, (_, index) => initialPrice + index * 0.5);

    return {
        card,
        ctx,
        canvas,
        priceEl,
        changeEl,
        data,
        currentPrice: initialPrice
    };
});

function formatNumber(value) {
    return value.toLocaleString('fr-FR', { maximumFractionDigits: 0 });
}

function updateTicker() {
    const nextNews = newsPool[Math.floor(Math.random() * newsPool.length)];
    newsTicker.textContent = nextNews;
}

function resizeCanvas(canvas, ctx) {
    const { width, height } = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    ctx.scale(ratio, ratio);
}

function drawChart(ctx, canvas, data, positive) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    ctx.clearRect(0, 0, width, height);

    const min = Math.min(...data);
    const max = Math.max(...data);
    const padding = 8;
    const range = max - min || 1;

    ctx.beginPath();
    data.forEach((point, index) => {
        const x = (index / (data.length - 1)) * (width - padding * 2) + padding;
        const y = height - ((point - min) / range) * (height - padding * 2) - padding;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.strokeStyle = positive ? '#1eaf1e' : '#d0021b';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = positive ? 'rgba(30, 175, 30, 0.12)' : 'rgba(208, 2, 27, 0.12)';
    ctx.fill();
}

function updateMarket(cardData) {
    const { priceEl, changeEl, data } = cardData;
    const drift = (Math.random() - 0.45) * 2;
    const latest = data[data.length - 1];
    const newValue = Math.max(latest + drift, 0);

    data.push(newValue);
    if (data.length > historyLength) {
        data.shift();
    }

    const change = ((newValue - data[0]) / data[0]) * 100;
    const isPositive = change >= 0;

    priceEl.textContent = formatNumber(newValue);
    changeEl.textContent = `${isPositive ? '+' : ''}${change.toFixed(2)}%`;
    changeEl.classList.toggle('variation-positive', isPositive);
    changeEl.classList.toggle('variation-negative', !isPositive);

    drawChart(cardData.ctx, cardData.canvas, data, isPositive);
}

function initCharts() {
    marketCards.forEach((cardData) => {
        resizeCanvas(cardData.canvas, cardData.ctx);
        drawChart(cardData.ctx, cardData.canvas, cardData.data, true);
    });
}

function updateAllMarkets() {
    marketCards.forEach(updateMarket);
}

window.addEventListener('resize', () => {
    marketCards.forEach((cardData) => {
        resizeCanvas(cardData.canvas, cardData.ctx);
    });
});

initCharts();
setInterval(updateAllMarkets, updateInterval);
setInterval(updateTicker, 8000);
