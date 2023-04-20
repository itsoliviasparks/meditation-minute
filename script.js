const meditationMinute = {};

meditationMinute.getRandomItemInArr = (arr) => {
    const randomNumber = Math.floor(Math.random() * arr.length)
    return arr[randomNumber];
};


meditationMinute.timerDisplay = (currentTime) => {
    const h2Element = document.querySelector("h2");
    if (currentTime <= 9) {
        h2Element.innerHTML = `00:0${currentTime}`;
    } else {
        h2Element.innerHTML = `00:${currentTime}`;
    }
}

meditationMinute.timer = () => {
    let currentTime = 60;
    setInterval(function () {
        if (currentTime <= 60) {
            currentTime--;
            if (currentTime > 0) {
                meditationMinute.timerDisplay(currentTime);
            } else {
                window.location.reload();
            }
        }
    }, 1000)
}

meditationMinute.restart = () => {
    const restartButton = document.querySelector(".restart");
    restartButton.addEventListener("click", () => {
        window.location.reload();
    });
};

meditationMinute.updateDisplayedContent = (quote, author, title, artist, imgLink) => {
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = "";
    mainElement.insertAdjacentHTML("beforeend",`
        <section class="meditation">
            <header>
                <h2>1:00</h2>
                <button class="restart" aria-label="restart">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                </button>
            </header>
            <section class="quote-img">
                <div class="quote-text">
                    <p class="quote">"${quote}"</p>
                    <p class="author">- ${author}</p>
                </div>
                <div class="art-img">
                    <img src="${imgLink}" alt="${title} by ${artist}">
                </div>
                <div class="img-credit">
                <p><span>${title}</span>${artist}</p>
            </div> 
            </section>
        </section>
        `);
    meditationMinute.timer();
}

meditationMinute.displayApiError = () => {
    const startButton = document.querySelector(".start");
    const errorMessage1 = document.createElement("h3");
    const errorMessage2 = document.createElement("h3");
    errorMessage1.textContent = "Unfortunately, we are unable to manifest meditation content.";
    errorMessage2.textContent = "Please try again soon.";
    startButton.before(errorMessage1, errorMessage2);
}

meditationMinute.startButtonListener = (quote, author, title, artist, imgLink) => {
    const startButton = document.querySelector(".start");
    startButton.addEventListener("click", () => {
        meditationMinute.updateDisplayedContent(quote, author, title, artist, imgLink);
        meditationMinute.restart();
    })
}

meditationMinute.turnOffLoading = () => {
    const start = document.querySelector(".start");
    start.innerHTML = `<button class="start">Click<span>Here</span></button>`;
};

// API Call for Art Institute of Chicago
// https://api.artic.edu/docs/#iiif-image-api
meditationMinute.getArtPromise = async () => {
    //get 100 impressionist art objects from API
    const url = "https://api.artic.edu/api/v1/artworks/search?q=impressionism&page=1&limit=100";
    const res = await fetch(url);
    const data = await res.json();
    //get id of 1 random art object & save in randomArtId
    const randomArt = await meditationMinute.getRandomItemInArr(data.data);
    const randomArtId = await randomArt.id;
    //search by randomArtId & save title & artist
    const artUrl = `https://api.artic.edu/api/v1/artworks/${randomArtId}`;
    const artRes = await fetch(artUrl);
    const artData = await artRes.json();
    const title = await artData.data.title;
    const artist = await artData.data.artist_title;
    //search by randomArtId & save imgLink
    const imgUrl = `https://api.artic.edu/api/v1/artworks/${randomArtId}?fields=id,title,image_id`;
    const imgRes = await fetch(imgUrl);
    const imgData = await imgRes.json();
    const imgLink = `${imgData.config.iiif_url}/${imgData.data.image_id}/full/843,/0/default.jpg`;
    return [{ title: title }, { artist: artist }, { imgLink: imgLink }]
}

//API call to Zen Quotes
// https://zenquotes.io
meditationMinute.getQuotePromise = async () => {
    const url = "https://proxy.junocollege.com/https://zenquotes.io/api/random/"
    const res = await fetch(url);
    const data = await res.json();
    const quote = data[0].q;
    const author = data[0].a;
    return [{ quote: quote }, { author: author }]
}

//Initializes all API Calls & waits for promise before allowing user to click the start button & display the results
meditationMinute.apiCalls = () => {
    Promise.all([meditationMinute.getQuotePromise(), meditationMinute.getArtPromise()])
        .then((res) => {
            //saves results from each API call into variables to pass down to display updateDisplayedContent() via startButtonListener()
            const quote = res[0][0].quote;
            const author = res[0][1].author;
            const title = res[1][0].title;
            const artist = res[1][1].artist;
            const imgLink = res[1][2].imgLink;
            meditationMinute.turnOffLoading();
            meditationMinute.startButtonListener(quote, author, title, artist, imgLink);
        }).catch(() => {
            meditationMinute.displayApiError();
        })
}

meditationMinute.init = () => {
    meditationMinute.apiCalls();
};

meditationMinute.init();