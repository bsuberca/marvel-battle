# API Technical Test @ Dataiku

## Game API

This repository contains the source code of a small game similar to [Top Trumps card games](https://en.wikipedia.org/wiki/Top_Trumps). As a player, you can register and get a starter deck of cards.
Each card represents a hero from the Marvel universe and has 4 characteristics: strength, skill, size, and popularity.

![Batman](https://github.com/dataiku/api-challenge/blob/master/resources/batman.png) | Batman
------------ | -------------
Strength | 22
Skills | 17
Size | 5.7
Popularity | 9.8

To get new cards, you can fight with your cards against the computer. Each deck of card is ordered and you fight with the first card of your deck. You can have a look at
it and decide which characteristic is the most promising and challenge the computer with this characteristic. If the card of the computer has a higher
value than yours on this characteristic, you loose your card... But, if your card is better, the card from the computer is yours (and you keep you card).
In case of draw, all players keep their cards.

If you are not satisfied with your current card(s)... or if you have lost all your cards, you can buy one or more cards from the store. The new cards are added to the top of your deck.

The code for this game and its API can be found in the following locations: 
  - [server/server.js](https://github.com/dataiku/api-challenge/tree/master/server/server.js)
  - [server/game.js](https://github.com/dataiku/api-challenge/tree/master/server/game.js)

## Challenge

Your goal is to write:
 1. the documentation for the REST API of a small card game
 1. a client library in the language of your choice to ease programming against this REST API.

Game on!

## Getting Started
Install a recent version of [nodeJS](https://nodejs.org/en/download/) and npm on your computer. Open a terminal and issue the following command to confirm they are properly installed (you don't need the exact same versions).
```sh
$ node -v
v11.8.0
$ npm -v
6.10.2
```

Now clone this repository and go to the corresponding directory
```sh
npm install
npm run start
```

Open your browser and go to [http://localhost:4000/ping](http://localhost:4000/ping). If everything is setup correctly your browser should display:
```
{"status":"OK"}
```

You can then launch a demonstration of the game with the following command.
```sh
npm run demo
```
The code for the demonstration is [client/client.js](https://github.com/dataiku/api-challenge/tree/master/client/client.js)

----
Batman icon, courtesy of [Vectoo](https://www.iconfinder.com/icons/2525034/batman_halloween_hero_super_hero_icon) under [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/)
