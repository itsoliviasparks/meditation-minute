//on page load
    // API call to MET
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

    //Inspiration Quotes
    fetch(`https://api.goprogram.ai/inspiration`)
    .then((data) => {
        return data.json();
    })
    .then((jsonData) => {
        console.log(jsonData)
    })

    //MET Museum
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/47333')
    .then((response) => {
      return response.json();
    }).then((jsonResponse) => {
       console.log(jsonResponse);
       console.log(jsonResponse.objectURL)
    })