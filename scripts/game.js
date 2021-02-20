// Copyright (c) 2021 Curtis Reynolds
'use strict';

import Minefield from "./minefield/Minefield.js";
import EventListeners from "./event_listeners/EventListeners.js";

const SIZE = 20;
const MINE_COUNT  = 40;
//Easy 10,10
//Medium 20,40
//Hard 25, 100
//Impossible 30,200

export default class Game {

    constructor() {
        this.board = {
            //Eventually change size depending on difficulty
            size:SIZE,

        };
        this.size = SIZE;
        this.mineCount = MINE_COUNT;

        this.minefield;
        this.EventListeners = new EventListeners();
        this.gameOver = false;

        document.querySelector("#restart-button")
        .addEventListener('click', event => this.restartButtonListener(event));

        document.querySelector("#pause-button")
        .addEventListener('click', event => this.pauseButtonListener(event));

        document.querySelector("#play-button")
        .addEventListener('click', event => this.StartGameListener(event));
        document.querySelector("#easy-button")
        .addEventListener('click', event => this.optionEasyButtonListener(event));
        document.querySelector("#medium-button")
        .addEventListener('click', event => this.optionMediumButtonListener(event));
        document.querySelector("#hard-button")
        .addEventListener('click', event => this.optionHardButtonListener(event));

    }

    update(){
        //get user input and update the game simulation
        this.gameOver=true;
    }

    pauseButtonListener(event){
        if(!this.paused){
            document.querySelector("#pause-screen")
            .classList.remove("hidden");
            document.querySelector("#pause-button")
            .innerHTML = "Unpause";
            document.querySelector("#pause-button")
            .classList.add("button-select");
            document.querySelector("#game-grid")
            .classList.add("hidden");
            this.minefield.paused = true;
            this.paused = true;
            return;
        }
        document.querySelector("#pause-screen")
        .classList.add("hidden");
        document.querySelector("#pause-button")
        .innerHTML = "Pause";
        document.querySelector("#pause-button")
        .classList.remove("button-select");
        document.querySelector("#game-grid")
        .classList.remove("hidden");
        this.minefield.Timer();
        this.minefield.paused = false;
        this.paused = false;
    }
    restartButtonListener(event){
        this.time = 0;
        document.querySelector("#timer")
                .innerHTML = this.time;
        this.ReloadGrid();
        document.querySelector("#end-game")
        .innerHTML = "";  
        document.querySelector("#quit-button")
        .classList.add("hidden");  
    }
    
    ReloadGrid(){
        this.minefield.ResetField();
    }

    SetWinScore(){
        document.querySelector("#end-stats")
        .innerHTML = this.time;                                                 
    }

    StartGameListener(event){
        //Start new game
        document.querySelector("#start-screen")
        .classList.add("hidden");
        document.querySelector("#game-screen")
        .classList.remove("hidden");
        this.minefield = new Minefield(this.size, this.mineCount)
        this.minefield.Timer();
    }

    optionEasyButtonListener(event){
        console.log("Easy");
        this.size = 10;
        this.mineCount = 10;
        document.querySelector("#easy-button")
            .classList.add("button-select");
        document.querySelector("#medium-button")
            .classList.remove("button-select");
        document.querySelector("#hard-button")
            .classList.remove("button-select");
    }
    optionMediumButtonListener(event){
        this.size = 20;
        this.mineCount = 40;

        document.querySelector("#easy-button")
            .classList.remove("button-select");
        document.querySelector("#medium-button")
            .classList.add("button-select");
        document.querySelector("#hard-button")
            .classList.remove("button-select");
    }
    optionHardButtonListener(event){
        this.size = 25;
        this.mineCount = 100;

        document.querySelector("#easy-button")
            .classList.remove("button-select");
        document.querySelector("#medium-button")
            .classList.remove("button-select");
        document.querySelector("#hard-button")
            .classList.add("button-select");
    }
    optionImpossibleButtonListener(event){
        
    }
}

