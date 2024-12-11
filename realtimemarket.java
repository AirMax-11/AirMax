const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // data contient le prix actuel, la variation, etc.
    const currentPrice = data.c; // Dernier prix
    document.querySelector('#btc-price').textContent = `$${currentPrice}`;
    
    // Vous pouvez également récupérer la variation 24h :
    const priceChangePercent = data.P; // Variation en pourcentage
    const btcChangeElement = document.querySelector('#btc-change');
    btcChangeElement.textContent = `${priceChangePercent}%`;

    if (priceChangePercent >= 0) {
        btcChangeElement.classList.add('variation-positive');
        btcChangeElement.classList.remove('variation-negative');
    } else {
        btcChangeElement.classList.add('variation-negative');
        btcChangeElement.classList.remove('variation-positive');
    }
};
