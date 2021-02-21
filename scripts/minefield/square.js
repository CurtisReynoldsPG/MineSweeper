// Copyright (c) 2021 Curtis Reynolds
'use strict';

export default class Square{

    constructor(){
        //set defualt bool values
        this.hasMine = false;
        this.uncovered = false;
        this.flagged = false;
        //set default adjacent mines
        this.adjacentMines = 0;
        //this.location
        this.col = 0;
        this.row = 0;
    }

    //Ask Scott about getters and setters again then fix this.
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