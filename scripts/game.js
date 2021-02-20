// Copyright (c) 2021 Curtis Reynolds
'use strict';

import Minefield from "./minefield/Minefield.js";
import EventListeners from "./event_listeners/EventListeners.js";

const SIZE = 20;
const MINE_COUNT  = 1;


export default class Game {

    constructor() {
        this.board = {
            //Eventually change size depending on difficulty
            size:SIZE,

        };

        this.minefield = new Minefield(SIZE, MINE_COUNT);
        this.EventListeners = new EventListeners();
        this.gameOver = false;

        document.querySelector("#restart-button")
        .addEventListener('click', event => this.restartButtonListener(event));
        document.querySelector("#play-button")
        .addEventListener('click', event => this.minefield.StartTime(event));
    }
    run(){

    }

    update(){
        //get user input and update the game simulation
        this.gameOver=true;
    }

    restartButtonListener(event){
        this.time = 0;
        document.querySelector("#timer")
                .innerHTML = this.time;
        this.ReloadGrid();
    }
    
    ReloadGrid(){
        this.minefield.ResetField();
    }

    SetWinScore(){
        document.querySelector("#end-stats")
        .innerHTML = this.time;                                                 
    }

}

