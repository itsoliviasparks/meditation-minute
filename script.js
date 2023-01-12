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

const meditationMinute = {}; 

meditationMinute.updateQuoteContent = () => {
    const quoteElement = document.querySelector(".quote");
    const authorElement = document.querySelector(".author");
    quoteElement.innerHTML = `"${meditationMinute.quoteContent}"`;
    authorElement.innerHTML = `- ${meditationMinute.quoteAuthor}`;
};

//API call to Zen Quotes
meditationMinute.getQuote = () => {
    const url = `https://proxy-ugwolsldnq-uc.a.run.app/https://zenquotes.io/api/random/`
    fetch(url)
    .then((response) => {
        return response.json();
    }).then((jsonData) => {
        //save random quote in variable
        meditationMinute.quoteContent = jsonData[0].q;
        //save quote author in variable   
        meditationMinute.quoteAuthor = jsonData[0].a;
        //update the quote content
        // meditationMinute.updateQuoteContent();
    })
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


//API call to Rjiks Art Images
meditationMinute.getArt = () => {
    const url = new URL('https://www.rijksmuseum.nl/api/en/collection');
    const apiKey = 'aw5uplA6';
    url.search = new URLSearchParams({
    key: apiKey,
    p: 1000,
    imgonly: true,
    q: "painting",
    })
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(jsonData) {
        const artArr = jsonData.artObjects;
        const randomArt = meditationMinute.getRandomItemInArr(artArr);
        //save random art image in variable
        meditationMinute.artImage = randomArt.webImage.url;
        //save that image's title & artist in separate variable
        // Title
       meditationMinute.artTitle = randomArt.title;
        // Artist
        meditationMinute.artMaker = randomArt.principalOrFirstMaker;
        // meditationMinute.updateArtContent();
    })
};

meditationMinute.restart = () => {
    const restartButton = document.querySelector('.restart');
    restartButton.addEventListener("click", () => {
        window.location.reload(); 
    });

};

meditationMinute.getRandomItemInArr = (arr) => {
    const randomNumber = Math.floor(Math.random() * arr.length)
    return arr[randomNumber];
};


// Timer 
// meditationMinute.timer = () => {

// }
// Have event listener on the home page button 
meditationMinute.homeButtonListener = () => {
    const homeButton = document.querySelector('.home');
    // When the button gets clicked 
    homeButton.addEventListener('click', () => {
            // update the content of the page 
            meditationMinute.updateDisplayedContent();
            meditationMinute.updateArtContent();
            meditationMinute.updateQuoteContent();
            meditationMinute.restart();

            // The update will trigger the timer 
    })
}

meditationMinute.updateDisplayedContent = () => {
    const mainElement = document.querySelector('main');
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


// On content page load - the timer starts
// timer starts at 1:00 minute 
// Every second - the timer count goes down 
//The current time gets displayed on screen 
//After the display - the timer count goes down again 
// When count hits 0 - the timer stops 
// The reset button can refresh the timer back to its original state - 1:00 minute 


meditationMinute.timer = () => {
    let currentTime = 3;
    const intervalCountdown = setInterval( function(){
        if (currentTime <= 3){
            currentTime--;
            if (currentTime > 0) {
                console.log(currentTime);
            } else {
                console.log('time is up');
                clearInterval(intervalCountdown);
            }
        }
    },1000)
}

meditationMinute.timerDisplay = () => {
    // const h2Element = document.querySelector('h2');
    console.log('it works')
}



meditationMinute.init = () => {
    meditationMinute.homeButtonListener();
    meditationMinute.getQuote();
    meditationMinute.getArt();    
    //we need a timer function
    // stretch goal of colors
    //throwing and catching errors
};

meditationMinute.init();

