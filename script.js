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
        meditationMinute.updateQuoteContent();
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
    const url = new URL('https://www.rijksmuseum.nl/api/en/collection/');
    const apiKey = 'V8yTMUkv';
    url.search = new URLSearchParams({
    key: apiKey,
    culture: 'en', 
    imgonly: true,
    toppieces: true,
    p: 100,
    ps: 100,
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
        meditationMinute.updateArtContent();
    })
};

meditationMinute.getRandomItemInArr = (arr) => {
    const randomNumber = Math.floor(Math.random() * arr.length)
    return arr[randomNumber];
};

meditationMinute.init = () => {
    meditationMinute.getQuote();
    meditationMinute.getArt();
    //we need a timer function
    //we need to reset
    // stretch goal of colors
    //throwing and catching errors
};

meditationMinute.init();

