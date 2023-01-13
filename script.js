//on page load 
    // API call to Rjiks
        //save random art image in variable
        //save that image's title & artist in separate variable
    //API call to quotes
        //save random quote in variable
        //save quote author in variable
    //set up event listener to button on homepage
        //remove homepage text from screen
        //display new page content
            //add timer of 1min to top of page
                //when timer runs out, go back to home page
            //add restart button to top of page
                // event listener to restart page when clicked
            //add image to page
                //add title & artist to page
            //add quote to page
                //add author to page

    // On content page load - the timer starts
    // timer starts at 1:00 minute 
    // Every second - the timer count goes down 
    //The current time gets displayed on screen 
    //After the display - the timer count goes down again 
    // When count hits 0 - the timer stops 
    // The reset button can refresh the timer back to its original state - 1:00 minute 

const meditationMinute = {}; 

meditationMinute.getRandomItemInArr = (arr) => {
    const randomNumber = Math.floor(Math.random() * arr.length)
    return arr[randomNumber];
};

meditationMinute.timerDisplay = (currentTime) => {
     const h2Element = document.querySelector("h2");
     h2Element.innerHTML = `00:${currentTime}`;
}

meditationMinute.timer = () => {
    let currentTime = 60;
    setInterval( function(){
        if (currentTime <= 60){
            currentTime--;
            if (currentTime > 0) {
                meditationMinute.timerDisplay(currentTime);
            } else {
                window.location.reload(); 
            }
        }
    },1000)
}

meditationMinute.restart = () => {
    const restartButton = document.querySelector(".restart");
    restartButton.addEventListener("click", () => {
        window.location.reload(); 
    });
};

meditationMinute.updateQuoteContent = () => {
    const quoteElement = document.querySelector(".quote");
    const authorElement = document.querySelector(".author");
    quoteElement.innerHTML = `"${meditationMinute.quoteContent}"`;
    authorElement.innerHTML = `- ${meditationMinute.quoteAuthor}`;
};

meditationMinute.updateArtContent = () => {
    const artImgElement = document.querySelector(".art-img");
    const imgCreditElement = document.querySelector(".img-credit");
    artImgElement.innerHTML = `
    <img src="${meditationMinute.artImage}" alt="${meditationMinute.artTitle}">
    `;
    imgCreditElement.innerHTML = `
    <p><span>${meditationMinute.artTitle}</span> by ${meditationMinute.artMaker}</p>
    `;
};

meditationMinute.updateDisplayedContent = () => {
    const mainElement = document.querySelector("main");
    mainElement.innerHTML = `
    <header>
			<h2>1:00</h2>
			<button class="restart">
				<i class="fa-solid fa-clock-rotate-left"></i>
			</button>
		</header>
		<section class="quote-img">
			<div class="quote-author">
				<p class="quote"></p>
				<p class="author"></p>
			</div>
			<div class="art-img"></div>
		</section>
		<div class="img-credit">
		</div> 
        `
        meditationMinute.timer();
}

//API call to Rjiks Art Images
meditationMinute.getArt = () => {
    const url = new URL("https://www.rijksmuseum.nl/api/en/collection");
    const apiKey = "aw5uplA6";
    url.search = new URLSearchParams({
    key: apiKey,
    p: 100,
    ps: 100,
    imgonly: true,
    q: "painting",
    toppieces: false,
    })
    
    async function getFromAPI() {
        try {
            const respo = await fetch(url);
            const artArr = await respo.json();
            const randomArt = meditationMinute.getRandomItemInArr(artArr.artObjects);
            meditationMinute.artImage = randomArt.webImage.url;
            meditationMinute.artTitle = randomArt.title;
            meditationMinute.artMaker = randomArt.principalOrFirstMaker;
        } catch {
            meditationMinute.artImage = "https://sep.yimg.com/ty/cdn/madisonartshop/most-famous-paintings-2.jpg?t=1660737943&";
            meditationMinute.artTitle = "Vincent Van Gogh";
            meditationMinute.artMaker = "The Starry Night";
        }
    }
    getFromAPI();
};

//API call to Zen Quotes
meditationMinute.getQuote = () => {
    const url = "https://proxy-ugwolsldnq-uc.a.run.app/https://zenquotes.io/api/random/"
    async function getFromAPI() {
        try {
            const respo = await fetch(url);
            const quote = await respo.json();
            meditationMinute.quoteContent = quote[0].q;
            meditationMinute.quoteAuthor = quote[0].a;
        } catch {
            meditationMinute.quoteContent = "Beat the drum inside the house to spare the neighbors.";
            meditationMinute.quoteAuthor = "Chinese Proverb";
        }
    }
    getFromAPI();
}

meditationMinute.homeButtonListener = () => {
    const homeButton = document.querySelector(".home");
    homeButton.addEventListener("click", () => {
        meditationMinute.updateDisplayedContent();
        meditationMinute.updateArtContent();
        meditationMinute.updateQuoteContent();
        meditationMinute.restart();
    })
}

meditationMinute.init = () => {
    meditationMinute.getQuote();
    meditationMinute.getArt();
    meditationMinute.homeButtonListener();
};

meditationMinute.init();