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
        this.UpdateGrid();
    }

    generateBoard(){
        /*
        <table>
            <tr><td></td><td>...</td>.
        </table>
        */
        
        
        let markup = "<table>";
        for (let row =0; row < this.size; row++) {

            markup += "<tr>";
            for(let col =0; col < this.size; col++){
                
                 const id = `square-${row}-${col}`; // "square-5-4"
                const rows = `data-row= ${row}`;
                const collums = `data-row= ${col}`;
                markup += `<td id="${id}" data-rows="${row}" data-collums="${col}" class="square"><div > </div></td>`;
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
                            if(this.field[element.dataset.rows][element.dataset.collums].returnMine()){
                                element.classList.add("grid-with-mine"); 
                                return;
                            }
                            this.CheckAdjacent(element.dataset.rows, element.dataset.collums, element);
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

    CheckAdjacent(col, row, element){
        element.classList.add("grid-with-number"); 
        switch(this.field[col][row].returnAdjacent()){
            case 1:
                element.classList.add("one"); 
                break;
            case 2:
                element.classList.add("two"); 
                break;
            case 3:
                element.classList.add("three"); 
                break;
            case 4:
                element.classList.add("four"); 
                break;
            case 5:
                element.classList.add("five"); 
                break;
            case 6:
                element.classList.add("six"); 
                break;
            case 7:
                element.classList.add("seven"); 
                break;
            case 8:
                element.classList.add("eight"); 
                break;
        }
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
            //check if mine is present if not place mine
            if(!this.field[this.rndX][this.rndY].returnMine()){
                this.field[this.rndX][this.rndY].setMine();
                i++
            }
        }
    }


    UpdateGrid(){
        for (let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                this.countAdjacent(i, j);
            }
        }
    }

    countAdjacent(row, col){
        //TODO: walk through field, for each square adjacent
        //Check cell on left
        if(row != 0)
        {
            
            if(this.field[row-1][ col].returnMine()){
                
                this.field[row][col].IncreaseMines();
            }
        }
        //Check cell on top-left 
        if(row != 0 && col != 0)
        {
            if(this.field[row-1][col-1].returnMine()){
                this.field[row][col].IncreaseMines();
            }
        }
        //Check cell on top
        if(col != 0)
        {
            if(this.field[row][col-1].returnMine()){
                this.field[row][col].IncreaseMines();
            }
        }
        //Check cell on top-right
        if(row != this.size -1 && col != 0)
        {
            if(this.field[row+1][col-1].returnMine()){
                this.field[row][col].IncreaseMines();
            }
        }
        //Check cell on right
        if(row != this.size -1)
        {
            if(this.field[row+1][col].returnMine()){
                this.field[row][col].IncreaseMines();
            }
        }
        //Check cell on bottom-right
        if(row != this.size -1 && col != this.size -1)
        {
            if(this.field[row+1][col+1].returnMine()){
                this.field[row][col].IncreaseMines();
            }
        }
        //Check cell on bottom
        if(col != this.size -1)
        {
            if(this.field[row][col+1].returnMine()){
                this.field[row][col].IncreaseMines();
            }
        }
        //Check cell on bottom-left
        if(row != 0 && col != this.size -1)
        {
            if(this.field[row-1][col+1].returnMine()){
                this.field[row][col].IncreaseMines();
            }
        }
    }
}