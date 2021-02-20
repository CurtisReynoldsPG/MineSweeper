// Copyright (c) 2021 Curtis Reynolds
'use strict';
import Square from "./square.js";
export default class FieldGenerator{

    constructor(size = 10, mines = 10){

        this.mineCount = mines
        this.size = size;
        this.field = []; // turn this into a 2d array of squares
    }

    GenerateBoard(){
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
                // const rows = `data-row= ${row}`;
                // const collums = `data-row= ${col}`;
                markup += `<td id="${id}" data-rows="${row}" data-collums="${col}" class="square"><div > </div></td>`;
            }
            markup += "</tr>";
        }
        markup += "</table>";
        //find the game area, attach this table
        document.querySelector("#game-grid").innerHTML = markup;

        //Initizalize field
        this._init();
        this._randomizeMines(this.mineCount);
        this.UpdateGrid();
        return this.field;
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
    
    //Places the mines
    _randomizeMines(minesToPlace){
        //TODO: each mine, randomize row, col
        let i = 0;
        while(i < minesToPlace){
            this.rndX = Math.floor(Math.random()* this.size);
            this.rndY = Math.floor(Math.random()* this.size);
            //check if mine is present if not place mine
            if(!this.field[this.rndY][this.rndX].ReturnMine()){
                this.field[this.rndY][this.rndX].setMine();
                i++
            }
        }
    }

    placeNewMine(){
        let i = 0;
        while(i < 1){
        this.rndX = Math.floor(Math.random()* this.size);
        this.rndY = Math.floor(Math.random()* this.size);
        //check if mine is present if not place mine
        if(!this.field[this.rndY][this.rndX].ReturnMine()){
            this.field[this.rndY][this.rndX].setMine();
            i++;
        }
        }
    }

     //Updates grid with ammount
     UpdateGrid(){
        for (let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                this.countAdjacent(i, j);
            }
        }
    }

    RecalculateGrid(){
        for (let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                this.field[i][j].adjacentMines = 0;
                this.countAdjacent(i, j);
            }
        }
    }

     //Check adjacent cells
     countAdjacent(row, col){
        //TODO: walk through field, for each square adjacent
        //Check cell on left
        if(row != 0)
        {
            if(this.field[row-1][ col].ReturnMine()){
                
                this.field[row][col].IncreaseMines();
            }
        }
        //Check cell on top-left 
        if(row != 0 && col != 0)
        {
            if(this.field[row-1][col-1].ReturnMine()){
                this.field[row][col].IncreaseMines();
            }
        }
        //Check cell on top
        if(col != 0)
        {
            if(this.field[row][col-1].ReturnMine()){
                this.field[row][col].IncreaseMines();
            }
        }
        //Check cell on top-right
        if(row != this.size -1 && col != 0)
        {
            if(this.field[row+1][col-1].ReturnMine()){
                this.field[row][col].IncreaseMines();
            }
        }
        //Check cell on right
        if(row != this.size -1)
        {
            if(this.field[row+1][col].ReturnMine()){
                this.field[row][col].IncreaseMines();
            }
        }
        //Check cell on bottom-right
        if(row != this.size -1 && col != this.size -1)
        {
            if(this.field[row+1][col+1].ReturnMine()){
                this.field[row][col].IncreaseMines();
            }
        }
        //Check cell on bottom
        if(col != this.size -1)
        {
            if(this.field[row][col+1].ReturnMine()){
                this.field[row][col].IncreaseMines();
            }
        }
        //Check cell on bottom-left
        if(row != 0 && col != this.size -1)
        {
            if(this.field[row-1][col+1].ReturnMine()){
                this.field[row][col].IncreaseMines();
            }
        }
    }

}