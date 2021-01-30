// Copyright (c) 2021 Curtis Reynolds
'use strict';

import Minefield from "./Minefield";

const SIZE = 12;
const MINE_COUNT  = 10;

export default class Game {

    constructor() {
        this.board = {
            //Eventually change size depending on difficulty
            size:SIZE,
        };
        this.minefield = new Minefield(SIZE, MINECOUNT);
        this.gameOver = false;
        
    }
    //Create a game
   

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

                markup += "<td>1</td>";
            }
            markup += "</tr>";
        }
        markup += "</table>";
        //find the game area, attach this table
        document.querySelector("#game-grid").innerHTML = markup;
    }
}

