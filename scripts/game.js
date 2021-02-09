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
        this.generateBoard();
        //this.resize();
    }

    generateBoard(){
        /*
        <table>
            <tr><td></td><td>...</td>.
        </table>
        */
        
        
        let markup = "<table>";
        for (let row = 0; row < SIZE; row++) {

            markup += "<tr>";
            for(let col =0; col < SIZE; col++){
                
                const id = `square-${row}-${col}`; // "square-5-4"
                markup += `<td id="${id} class="unknown""><div > </div></td>`;
            }
            markup += "</tr>";
        }
        markup += "</table>";
        //find the game area, attach this table
        document.querySelector("#game-grid").innerHTML = markup;
    }


}

