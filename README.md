<h1 align="center">Web App From Scratch @cmda-minor-web 18-19</h1>

<p align="center"><b>A Pokédex that shows all the Pokemons. It displays these properties: image, id, name, type(s), weight, height and game-stats. You can filter the pokemon on type and sort the pokemon on id and name. The data is retrieved using the <a href="https://pokeapi.co/">PokéAPI</a>.</b>
</p>

<br>

<p align="center">
  <a href="https://mennauu.github.io/web-app-from-scratch-18-19/week1">
    <img src="https://img.shields.io/badge/week-1-brightgreen.svg?style=flat-square" alt="week1">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://mennauu.github.io/web-app-from-scratch-18-19/week2">
    <img src="https://img.shields.io/badge/week-2-brightgreen.svg?style=flat-square" alt="week2">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://mennauu.github.io/web-app-from-scratch-18-19/week3">
    <img src="https://img.shields.io/badge/week-3-brightgreen.svg?style=flat-square" alt="week3">
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/Mennauu/web-app-from-scratch-18-19/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square" alt="License">
  </a>
</p> 

<br>

![preview](assets/preview.png)

<br>

<!-- ☝️ replace this description with a description of your own work -->
## Introduction
This Pokédex is made as part of a course from [@cmda-minor-web 18-19](https://github.com/cmda-minor-web/web-app-from-scratch-1819). In this course I had to make a Web App without any framework or unnecessary libraries. The idea was to write as much Vanilla HTML, CSS and JavaScript as possible. The end product is a modular prototype for a single page Web App where data is retrieved from an external API.

Some resources possess an emoticon to help you understand which type of content you may find:

- 📖: Documentation or article
- 🛠: Tool or library
- 📹: Video

You can find a live demo right here: https://mennauu.github.io/web-app-from-scratch-18-19/week3

<!-- Maybe a table of contents here? 📚 -->
## Table of Contents

- [Installation](#installation)
- [Interactions](#interactions)
- [Data](#data)
  - [Authentication and limit](#authentication-and-limit)
  - [Featured data](#featured-data)
  - [Retrieve](#retrieve)
  - [Cache](#cache)
- [Code structure](#code-structure)
  - [Actor diagram](#authentication-and-limit)
  - [Interaction diagram](#authentication-and-limit)
- [Checklist](#checklist)
- [Credits](#credits)
- [Sources](#sources)
  - [API](#api)
  - [Router](#router)
  - [Async and await](#async-and-await)
  - [General JavaScript](#general-javascript)
  - [Diagrams](#diagrams)
- [License](#license)

<!-- How about a section that describes how to install this project? 🤓 -->
## Installation
1. Open your terminal
2. Change the directory to a folder in which you want to place the files
```bash
cd /~path
```
3. Clone the repository (you're going to need [Git](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/))
```bash
git clone https://github.com/Mennauu/web-app-from-scratch-18-19
```
4. Load any [live server](https://www.npmjs.com/package/live-server) and serve index.html

<!-- ...but how does one use this project? What are its features 🤔 -->
## Interactions
The pokédex features two interactions that can be made by the user:

* **Filter pokemon by type:** e.g. only show pokemon with the fire type
* **Sort pokemon on id or name:** from lowest to highest id, highest to lowest id, A to Z and Z to A

<!-- What external data source is featured in your project and what are its properties 🌠 -->
## Data
All the data used to create the Pokédex is taken from the [PokéAPI](pokeapi.co). It serves over 17,000,000 API calls each month. It features almost all of the Pokémon data in one place.

> * 🛠 [PokéAPI](https://pokeapi.co/)
> * 📖 [PokéAPI documentation](https://pokeapi.co/docs/v2.html)

### Authentication and limit
No authentication is required to access the PokéAPI, and all resources are fully open and available. There is a limit of 100 API requests per IP address per minute.

### Featured data
The Pokédex features these properties taken from the API:
- **url:** Used to obtain data from a single pokemon
- **image:** Sprite of pokemon
- **id:** Unique id of pokemon
- **name:** Name of pokemon
- **type(s):** Each pokemon has one or two types, for example: flying and fire
- **weight:** Weight of pokemon in kilograms
- **height:** Height of pokemon in meters
- **game-stats:** Pokemons have base stats in games; speed, attack, special-attack, defense, special-defense and hp

### Retrieve
In the code beneath the **async / await** method is used to retrieve data from the PokeAPI asynchronous. The data gets fetched from the API and is converted to JSON. If it fails to retrieve data from the API, a custom error message will be displayed.

```Javascript
const getPokemonURL = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=800')
  /* If we get no response from the API throw an error */
  if(res.status === 404){
    throw Error("Het ziet er naar uit dat we op het moment geen Pokemon op kunnen halen. Probeer het later nog eens.");
  }
  /* Convert response to JSON */
  const data = await res.json()

  return data.results;
}
```
> * 📖 [Why await beats Promise#then()](https://mathiasbynens.be/notes/async-stack-traces)
> * 📹 [The Async Await Episode I Promised](https://www.youtube.com/watch?v=vn3tm0quoqE)
> * 📖 [Alternative error handling for async and await](https://stackoverflow.com/a/49311904 )

### Cache
When data is retrieved by the API it's saved in a variable so that we can use the data while navigating throughout the website to different pages and don't have to do an API request each time.

```JavaScript
let allPokemon = []

export const setAllPokemon = (data) => {
  allPokemon = data;
}
```

## Code structure
I created two diagrams to show the actors of my code (actor diagram), whom handle functionality in my app, and what happens in my code (interaction diagram).

> * 🛠 [Draw](https://draw.io)

### Actor diagram
![Actor diagram](assets/actor-diagram.png)

### Interaction diagram
![Interaction diagram](assets/interaction-diagram.png)

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->
## Checklist
- [x] Find an API
- [x] Retrieve data from the API asynchronous
- [x] Render data to HTML without using innerHTML
- [X] Rewrite 'spaghetti' code to functions
- [X] Create a detailpage using a [router](http://projects.jga.me/routie/)
- [X] Style everything and make it responsive
- [X] Divide project to modules
- [X] LocalStorage
- [X] Sort results on id and name
- [X] RouteHandler
- [X] Remove LocalStorage
- [X] Cache (data in variable)
- [X] Progressive loading state
- [X] Filter results on type
- [X] Actor diagram
- [X] Interaction diagram
- [X] Write a README
- [ ] Unique progressive loading state for detailpage
- [ ] Sort pokemon that are filtered by type
- [X] Error feedback for users
- [ ] Change filter on type _select_ background color based on selectValue 

<!-- Maybe someone helped me 🤔-->
## Credits
**Arash**: For giving amazing feedback and advice on my code. He was like a tutor to me that helped me improve and understand code.

<!-- Maybe I used some awesome sources that I can mention 🤔-->
## Sources
Underneath you will find all the sources that were previously mentioned throughout the document and some others which were helpful.

### API
- 🛠: [PokéAPI](https://pokeapi.co/)
- 📖: [PokéAPI documentation](https://pokeapi.co/docs/v2.html)

### Router
- 🛠: [Routie](http://projects.jga.me/routie/)

### Async and await
- 📖: [Why await beats Promise#then()](https://mathiasbynens.be/notes/async-stack-traces)
- 📹: [The Async Await Episode I Promised](https://www.youtube.com/watch?v=vn3tm0quoqE)
- 📖: [Alternative error handling for async and await](https://stackoverflow.com/a/49311904 )

### General JavaScript
- 📹: [JavaScript Pro Tips - Code This, NOT That](https://www.youtube.com/watch?v=Mus_vwhTCq0)

### Diagrams
- 🛠: [Draw](https://draw.io)
- 🛠: [Balsamiq](https://balsamiq.com/wireframes/)

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
## License 
See the [LICENSE file](https://github.com/Mennauu/web-app-from-scratch-18-19/blob/master/LICENSE) for license rights and limitations (MIT).