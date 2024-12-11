const updateInterval = 10000; // 10s
const cards = document.querySelectorAll('.crypto-card');

function simulateUpdate(priceText) {
    const currentPrice = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    const variationPercent = (Math.random() * 4 - 2).toFixed(2);
    const newPrice = (currentPrice * (1 + variationPercent/100)).toFixed(2);
    return { newPrice, variationPercent };
}

function applyUpdate(card) {
    const priceEl = card.querySelector('.price');
    const changeEl = card.querySelector('.change');

    if (priceEl && changeEl) {
        const oldPrice = priceEl.textContent;
        const { newPrice, variationPercent } = simulateUpdate(oldPrice);

        priceEl.textContent = `$${newPrice}`;
        changeEl.textContent = (variationPercent > 0 ? `+${variationPercent}%` : `${variationPercent}%`);

        if (variationPercent > 0) {
            changeEl.classList.remove('variation-negative');
            changeEl.classList.add('variation-positive');
        } else {
            changeEl.classList.remove('variation-positive');
            changeEl.classList.add('variation-negative');
        }
    }
}

function updateAllPrices() {
    cards.forEach(card => applyUpdate(card));
}

setInterval(updateAllPrices, updateInterval);

