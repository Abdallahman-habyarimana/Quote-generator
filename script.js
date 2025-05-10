const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");
console.log(loader)

let apiQuotes = [];

// Show loading 
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true
}

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false
}

function newQuotes() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random()  * apiQuotes.length)]
    quoteText.innerText = quote.text

    //Check if Author fiels is blank and replace it with
    if(!quote.author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.author
    }

    // Check Quote length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete()
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuotes();
    } catch (err) {
        
    }
}



// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteButton.addEventListener("click", newQuotes)
twitterBtn.addEventListener("click", tweetQuote)

getQuotes()