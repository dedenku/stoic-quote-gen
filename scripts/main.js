function loadQuotes() {
    return fetch('quotes.json')
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error loading quotes:', error);
        });
}

// THEME SWITCHER
const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');
const qcontainer = document.querySelector('#quote-container');

toggle.addEventListener('click', function(){
    this.classList.toggle('bi-moon-fill');
    if(this.classList.toggle('bi-brightness-high-fill')){
        body.style.background = 'white';
        body.style.color = 'black';
        body.style.transition = '2s';
        qcontainer.style.background = 'white';
        qcontainer.style.color = 'black';
        qcontainer.style.transition = '2s';
        
    }else{
        body.style.background = 'black';
        body.style.color = 'white';
        body.style.transition = '2s';
        qcontainer.style.background = 'black';
        qcontainer.style.color = 'white';
        qcontainer.style.transition = '2s';
    }
});

function displayRandomQuote(quotes) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    const quoteContainer = document.getElementById('frame');
    quoteContainer.innerHTML = `
        <p class="quote-text">${quote.text}</p>
        <p class="quote-author">${quote.author}</p>
    `;
}
let quotes = [];

document.addEventListener('DOMContentLoaded', function () {
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const downloadBtn = document.getElementById('download-btn');

    loadQuotes().then(loadedQuotes => {
        quotes = loadedQuotes;
        displayRandomQuote(quotes);

        newQuoteBtn.addEventListener('click', () => displayRandomQuote(quotes));
        downloadBtn.addEventListener('click', downloadQuoteAsImage);
    });
});

function downloadQuoteAsImage() {
    const quoteElement = document.getElementById('quote-container');

    if (!quoteElement) {
        console.error("Element with id 'quote-container' not found");
        return;
    }

    const dpi = 720;
    const scaleFactor = dpi / 96;

    html2canvas(quoteElement, {
        scale: scaleFactor,
        windowWidth: quoteElement.offsetWidth * scaleFactor,
        windowHeight: quoteElement.offsetHeight * scaleFactor
    }).then(function (canvas) {
        const link = document.createElement('a');
        link.download = 'my-quote.png';

        canvas.toBlob(function (blob) {
            if (blob) {
                link.href = URL.createObjectURL(blob);
                link.click();
                URL.revokeObjectURL(link.href);
            } else {
                console.error("Failed to create blob from canvas");
            }
        }, 'image/png');
    }).catch(function (error) {
        console.error("Error in html2canvas: ", error);
    });
}