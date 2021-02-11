// Copyright (c) 2021 Curtis Reynolds
'use strict';

export default class Square{

    constructor(){
        console.log("Square");
        this.hasMine = false;
        this.adjacentMines = 0;
        //this.location
        this.col = 0;
        this.row = 0;
        this.mine = null; // new mine();
    }

    setMine(){
        this.hasMine = true;

    }
    
    returnMine(){
        return this.hasMine;
    }

    returnAdjacent(){
        return this.adjacentMines;
    }

    setLocation(col, row){
        this.col = col;
        this.row = row;
    }

    IncreaseMines(){
        this.adjacentMines++;
    }
}