// Copyright (c) 2021 Curtis Reynolds
'use strict';

export default class Square{

    constructor(){
        this.hasMine = false;
        this.adjacentMines = 0;
        this.uncovered = false;
        this.flagged = false;
        //this.location
        this.col = 0;
        this.row = 0;
        this.mine = null; // new mine();
    }

    setMine(){
        this.hasMine = true;
    }
    
    Uncover(){
        this.uncovered = true;
    }
    ReturnMine(){
        return this.hasMine;
    }
    ReturnFlag(){
        return this.flagged;
    }
    returnMineCount(){
        return this.adjacentMines;
    }

    returnAdjacent(){
        return this.adjacentMines;
    }

    ReturnUncovered(){
        return this.uncovered;
    }

    SetFlag(value){
        this.flagged = value;
    }
    setLocation(row, col){
        this.col = col;
        this.row = row;
    }

    IncreaseMines(){
        this.adjacentMines++;
    }
}