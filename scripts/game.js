// Copyright (c) 2021 Curtis Reynolds
'use strict';

import Minefield from "./Minefield.js";
import EventListeners from "./event_listeners/EventListeners.js";

const SIZE = 12;
const MINE_COUNT  = 10;

export default class Game {

    constructor() {
        this.board = {
            //Eventually change size depending on difficulty
            size:SIZE,
        };
        this.minefield = new Minefield(SIZE, MINE_COUNT);
        this.EventListeners = new EventListeners();
        this.gameOver = false;
        
        this.message = "Hello world";
    }


    run(){

        while(!this.gameOver){

            this.update();
            this.render();
        }
    }

    update(){
        //get user input and update the game simulation
        this.gameOver=true;
    }

    render(){
        //change the dom and the screen to show the player what's going on

        //generate the playfield

        //this.resize();
    }


}

