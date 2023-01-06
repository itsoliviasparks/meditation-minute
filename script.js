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
// console.log(meditationMinute);

//API call to quotes
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
        console.log(meditationMinute.quoteContent);
        console.log(meditationMinute.quoteAuthor);
    })
}

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
        console.log(jsonData);
        const artArr = jsonData.artObjects;
        const randomArt = meditationMinute.getRandomItemInArr(artArr);
        console.log(randomArt);
        //save random art image in variable
        meditationMinute.artImage = randomArt.webImage.url;
        console.log(meditationMinute.artImage);
        //save that image's title & artist in separate variable

        // Title
       meditationMinute.artTitle = randomArt.title;
       console.log(meditationMinute.artTitle);

        // Artist
        meditationMinute.artMaker = randomArt.principalOrFirstMaker;
        console.log(meditationMinute.artMaker);
    })
}

meditationMinute.getRandomItemInArr = (arr) => {
    const randomNumber = Math.floor(Math.random() * arr.length)
    return arr[randomNumber];
}

// console.log(meditationMinute);
meditationMinute.init = () => {
    // console.log('it worked');
    // meditationMinute.getQuote();
    meditationMinute.getArt();
};

meditationMinute.init();

