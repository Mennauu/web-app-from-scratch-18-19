# Web App From Scratch @cmda-minor-web 18-19

A Pokédex that shows all the Pokemons. It currently displays these properties: image, id, name and type(s). The data is retrieved using the [PokéAPI](https://pokeapi.co/).

**Week 1:**
<!-- Add a link to your live demo in Github Pages 🌐-->
[Live link](https://mennauu.github.io/web-app-from-scratch-18-19/week1)
<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->
![week1](week1/public/images/preview.png)

**Week 2:**

**Week 3:**
<!-- ☝️ replace this description with a description of your own work -->
# Introduction
This Pokédex is made as part of a course from @cmda-minor-web 18-19. In this course I had to make a Web App without any framework or unnecessary libraries (except a router). The idea was to write as much as Vanilla HTML, CSS and JavaScript as possible. The end product is a modular prototype for a single page Web App where data is retrieved from an external API.

<!-- Maybe a table of contents here? 📚 -->
# Table of Contents

- [Installation](#installation)
- [Features](#interaction)
- [Data](#data)
  - [Retrieve](#retrieve)
- [To-do list](#to-do-list)
- [Credits](#credits)
- [Sources](#sources)
- [License](#license)

<!-- How about a section that describes how to install this project? 🤓 -->
# Installation

<!-- ...but how does one use this project? What are its features 🤔 -->
# Features

<!-- What external data source is featured in your project and what are its properties 🌠 -->
# Data

## Retrieve
In the code beneath the **async / await** method is used to retrieve data from the PokeAPI. The data gets fetched from the API and is converted to JSON.

```Javascript
async function getName() {

  // Get data in JSON
  let response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20')
  let data = await response.json()

  data.results.forEach(results => {

    async function getData() {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${results.name}/`)
      let data = await response.json()
    }

    getData()
  })
}
```

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->
# To-do list

<!-- Maybe someone helped me 🤔-->
# Credits

<!-- Maybe I used some awesome sources that I can mention 🤔-->
# Sources

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
# License 

See the LICENSE file for license rights and limitations (MIT).
