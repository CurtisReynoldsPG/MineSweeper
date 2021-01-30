// Copyright (c) 2021 Curtis Reynolds
'use strict';

export default class Game {

    constructor() {
        this.board = {
            //Eventually change size depending on difficulty
            size:16,
        };
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
        for (let row = 0; row < this.board.size; row++) {

            markup += "<tr>";
            for(let col =0; col < this.board.size; col++){

                markup += "<td>1</td>";
            }
            markup += "</tr>";
        }
        markup += "</table>";
        //find the game area, attach this table
        document.querySelector("#game-grid").innerHTML = markup;
    }
}

