# Meditation Minute ⚫️
<a href="https://itsoliviasparks-meditation-minute.netlify.app">Live Site</a>

## About
Sometimes you just need to take a minute & have a breather. Never meditated before? Don't worry! All the heavy meditation lifting is done for you with this app.

## Project Purpose & Goal
Meditation Minute was created to expand my vanilla JavaScript skills, gain further experience making API calls, & to collaborate with other devs via paired programming.

## Tech Stack
Vanilla JavaScript, CSS & Sass HTML, <a href="https://api.artic.edu/docs/#iiif-image-api">Art Institute of Chicago API</a>, & <a href="https://zenquotes.io">Zen Quotes API</a>

## Use
- On page load multiple API calls are triggered
    - Once all the API calls are complete, via `Promise.all`, a random quote, a random impressionist painting, and their corresponding details are saved into variables
    - The loading state is then turned off and the "Click Here" button appears, allowing the user to start their meditation
- `On click` of the start button, the UI is updated to display the quote, the painting, & a 60 second countdown begins
    - The user's Meditation Minute has begun
- Upon completion of the meditation, the app refreshes & additional API calls are triggered to prepare for the next meditation

## Paired Programming & Lessons Learned
- This is a paired programming project between myself & <a href="https://github.com/rselvasoyak">Rana Soyak</a>.

Working with a collaborator on this project was an excellent experience. Learning to speak about my code with greater confidence & clarity while also solidifying my understanding of proper coding terminology were my biggest takeaways from this experience. This is a great example: Prior to working with my partner, I knew that functions were declared with variables & then other variables were passed to the function when it's called. I knew that one was a `parameter` and the other was an `argument` but I was not confident which was which. It was only by talking out loud while pair programming that I was able to cement my knowledge that `parameters` are placed in a function when it's `declared` & `arguments` are passed when the function is `called`.

## Problems Solved
### Promise.all
This logic is located in `script.js`
```
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
```
When developing this app, we noticed a little bug: occasionally, without receiving an API error message, we would see `undefined` on the page instead of the API data. At first we found this odd, because the correct data would appear in the `console.log`. But, after letting the problem percolate in my brain for a few beats, I realized that this was an issue with `promises`! The API calls were successful, but their data was received after the function that updated the page's content was triggered. To solve, I worked through my discomfort with `Promise.all` and separated each API call into it's own function. From there, I implemented `Promise.all` to wait for the API calls to complete & then pull out the data into variables to put on the page. And just like that-- no more `undefined`!

### Multi-step API Calls
I also want to shout out the below API call that I implemented individually, after my partner and I completed the project:
This logic is also located in `script.js`
```
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
```
This API was tricky to work with but implementing it was worth it. The Art Institute of Chicago has gorgeous images! This was the first time I had to do multiple API calls in order to get data & images:
    - First, I request a list of 100 impressionist paintings from the API
        - This list contains minimal information about each painting, mostly just painting IDs
    - After the first call completes, I pick a random painting & save it's specific ID into `randomArtId`
    - Then, I use `randomArtId` to trigger a second API call
        - This call returns specific information about the painting
        - I save the `artist` & painting `title` into variables
    - After the second call completes, I trigger a third API call from the specific endpoint that returns image URLs
        - I save the `imgLink` into a variable
    - Finally, after the third call completes, I `return` the random painting's title, artist, and image URL into an array


