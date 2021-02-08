// Copyright (c) 2021 Curtis Reynolds
'use strict';

import Minefield from "./Minefield.js";

const SIZE = 12;
const MINE_COUNT  = 10;

export default class Game {

    constructor() {
        this.board = {
            //Eventually change size depending on difficulty
            size:SIZE,
        };
        this.minefield = new Minefield(SIZE, MINE_COUNT);
        this.gameOver = false;
        
        this.message = "Hello world";

        document.querySelector("#instructions-button")
            .addEventListener('click', event => this.instructionsbuttonListener(event));

        document.querySelector("#back-button")
            .addEventListener('click', event => this.instructionsBackButtonListener(event));

    }
    //Create a game
    instructionsbuttonListener(event){
        document.querySelector("#start-screen")
        .classList.add("hidden");
        document.querySelector("#instructions-screen")
        .classList.remove("hidden");
    }

    someEventHandler(event){
        document.querySelector("#start-screen")
        .classList.add("hidden");
        document.querySelector("#options-screen")
        .classList.remove("hidden");
    }

    instructionsBackButtonListener(event){
        document.querySelector("#instructions-screen")
        .classList.add("hidden");
        document.querySelector("#start-screen")
        .classList.remove("hidden");
    }

    optionsBackButtonListener(event){
        document.querySelector("#options-screen")
        .classList.add("hidden");
        document.querySelector("#start-screen")
        .classList.remove("hidden");
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

