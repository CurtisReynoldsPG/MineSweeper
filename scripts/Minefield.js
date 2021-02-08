// Copyright (c) 2021 Curtis Reynolds
'use strict';

import Square from "./square.js";

export default class Minefield{

    constructor(size = 10, mineCount = 10){

        this.size = size;
        this.field = []; // turn this into a 2d array of squares

        //initialize the minefield with empty squares
        this._init();
        //init minefield with n mines
        this._randomizeMines(mineCount);
        //tell all the squares to compute adjacent mines
        this._countAdjacent();
    }

    _init()
    {
        for (let i = 0; i < this.size; i++){
            this.field[i] = [];
            for(let j = 0; j < this.size; j++){
                this.field[i][j] = new Square();
            }
        }
    }

    _randomizeMines(){
        //TODO: each mine, randomize row, col

        //TODO: place mine at row, colum, unless mine already there
    }

    _countAdjacent(){
        //TODO: walk through field, for each square adjacent
    }

}