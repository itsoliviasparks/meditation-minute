# Meditation Minute ⚫️
<a href="https://itsoliviasparks-meditation-minute.netlify.app">Live Site</a>

## About
Sometimes you just need to take a minute & have a breather. Never meditated before? Don't worry! All the heavy meditation lifting is done for you with this app.

Meditation Minute utilizes two APIs to fetch and display data in response to user interaction.

## Use
- On page load multiple API calls are triggered to save a random quote, a random impressionist panting, and their respective details into variables
- Once this API calls are complete the loading state is turned off and the "Click Here" button appears, allowing the user to start their meditation
- On click of the start button, the UI is updated to display the quote, the painting, and a 60s countdown begins
- Upon completion of the timer, the app resets itself. Thus additional API calls are triggered to prepare for the next meditation

## Paired Programming
- This is a paired programming project between myself & <a href="https://github.com/rselvasoyak">Rana Soyak</a>.
- This repo contains updates I have implemented individually, to see our original paired programming work, <a href="https://github.com/olivia-rana/meditation-minute">click here</a>.

## Features
- This project was created as an exercise in collecting user input, fetching data from APIs & manipulating the DOM with vanilla JavaScript
- We utilized 2 APIs, JavaScript, Sass, and HTML in the creation of this project
- The site features data pulled from the <a href="https://api.artic.edu/docs/#iiif-image-api">Art Institute of Chicago API</a> & <a href="https://zenquotes.io">Zen Quotes API</a>
