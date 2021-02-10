// Copyright (c) 2021 Curtis Reynolds
'use strict';

import Square from "./square.js";

export default class Minefield{

    constructor(size = 10, mineCount = 100){

        this.size = size;
        this.field = []; // turn this into a 2d array of squares
        this.testarray = [];


        this.generateBoard();
        this.updateCellHandlers();
        //initialize the minefield with empty squares
        this._init();
        //init minefield with n mines
        this._randomizeMines(mineCount);
        //tell all the squares to compute adjacent mines
        this._countAdjacent();
    }

    generateBoard(){
        /*
        <table>
            <tr><td></td><td>...</td>.
        </table>
        */
        
        
        let markup = "<table>";
        for (let row = 0; row < this.size; row++) {

            markup += "<tr>";
            for(let col =0; col < this.size; col++){
                
                const id = `square-${row}-${col}`; // "square-5-4"
                markup += `<td id="${id}" class="square"><div > </div></td>`;
            }
            markup += "</tr>";
        }
        markup += "</table>";
        //find the game area, attach this table
        document.querySelector("#game-grid").innerHTML = markup;
        

        
    }

    updateCellHandlers(){
        //click the square

        document.querySelectorAll(".square")
            .forEach(element =>{
                element.addEventListener('click', event =>{
                        if(event.button === 0){
                            element.classList.add("gird-clicked"); 
                            if(){
                                console.log("Lost");
                            }
                        }
                })
                element.addEventListener('contextmenu', event =>{
                    if(event.button === 2){
                        element.classList.add("gird-right-clicked"); 
                    }
                    event.preventDefault();
                });
            })
                
        //flag the square



        //right click hold to show adjacent squares
    }

    _init()
    {

        for (let i = 0; i < this.size; i++){
            this.field[i] = [];
            for(let j = 0; j < this.size; j++){
                this.field[i][j] = new Square();
                this.field[i][j].setLocation(i,j);
            }
        }
    }

    _randomizeMines(minesToPlace){
        //TODO: each mine, randomize row, col
        let i = 0;
        while(i < minesToPlace){
            this.rndX = Math.floor(Math.random()* this.size);
            this.rndY = Math.floor(Math.random()* this.size);
            if(!this.field[this.rndX][this.rndY].returnMine()){
                this.field[this.rndX][this.rndY].setMine();
                i++
            }
        }

        //TODO: place mine at row, colum, unless mine already there
    }

    _countAdjacent(){
        //TODO: walk through field, for each square adjacent
    }

}