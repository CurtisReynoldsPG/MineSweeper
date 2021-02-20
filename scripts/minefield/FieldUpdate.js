// Copyright (c) 2021 Curtis Reynolds
'use strict';

export default class FieldUpdate {


    constructor(size, mines){
        this.mineCount = mines;
        this.totalMines = mines;
        this.minesFlagged;
        this.tilesCovered;
        
        this.size = size;
        this.field;
        this.gameLost = false;
    }

    ResetHandlers(newField){
        this.mineCount = this.totalMines;
        this.field = newField;
        this.gameLost = false;
        this.updateCellHandlers();
        document.querySelector("#bomb-count").innerHTML = (this.mineCount);
    } 

    updateCellHandlers(){
        //click the square
        document.querySelectorAll(".square")
            .forEach(element =>{
                element.addEventListener('click', event =>{
                        if(event.button === 0 && !this.gameLost && !this.field[element.dataset.rows][element.dataset.collums].ReturnFlag()){
                            element.classList.add("grid-clicked"); 
                            if(this.field[element.dataset.rows][element.dataset.collums].ReturnMine()){
                                this.gameLost = true;
                                element.classList.add("grid-with-mine"); 
                                this.RevealMines(element.dataset.rows,element.dataset.collums)
                                return;
                            }
                            this.CheckAdjacent(element.dataset.rows, element.dataset.collums, element);
                        }
                })
                element.addEventListener('contextmenu', event =>{
                    if(event.button === 2 && !this.gameLost){
                        this.SetFlag(element.dataset.rows, element.dataset.collums);

                    }
                    event.preventDefault();
            });
        })
    }
    
    CheckAdjacent(row, col){
        const id = `square-${row}-${col}`;
        document.querySelector(`#${id}`).classList.add("grid-with-number");
        if(this.field[row][col].ReturnFlag()){
            return
        }
        switch(this.field[row][col].returnAdjacent()){
            case 0:
                if(!this.field[row][col].ReturnUncovered()){
                    this.UncoverAdjacentEmpty(row,col);
                }
                break;
            case 1:
                this.field[row][col].Uncover();
                document.querySelector(`#${id}`).classList.add("one"); 
                break;
            case 2:
                this.field[row][col].Uncover();
                document.querySelector(`#${id}`).classList.add("two"); 
                break;
            case 3:
                this.field[row][col].Uncover();
                document.querySelector(`#${id}`).classList.add("three"); 
                break;
            case 4:
                this.field[row][col].Uncover();
                document.querySelector(`#${id}`).classList.add("four"); 
                break;
            case 5:
                this.field[row][col].Uncover();
                document.querySelector(`#${id}`).classList.add("five"); 
                break;
            case 6:
                this.field[row][col].Uncover();
                document.querySelector(`#${id}`).classList.add("six"); 
                break;
            case 7:
                this.field[row][col].Uncover();
                document.querySelector(`#${id}`).classList.add("seven"); 
                break;
            case 8:
                this.field[row][col].Uncover();
                document.querySelector(`#${id}`).classList.add("eight"); 
                break;
        }
        this.CheckForWin();
    }

    //Remove no mine tiles
    UncoverAdjacentEmpty(row, col){
        //Uncover current square

        if(!this.field[row][col].ReturnUncovered() && !this.field[row][col].ReturnFlag()){
            //Sets field as uncovered
            this.field[row][col].Uncover();

            //Gets field and displays it.
            const id = `square-${row}-${col}`;
            document.querySelector(`#${id}`).classList.add("grid-with-number");
            document.querySelector(`#${id}`).classList.add("grid-clicked");
            document.querySelector(`#${id}`).classList.add("empty");
    
            // //Check cell on left
            if(col != 0)
            {
                this.CheckAdjacent(row,col-1);
            }

            //Check cell on right
            if(col != this.size -1)
            {
                this.CheckAdjacent(row,parseInt(col)+1);
            }
            //Check cell on top
            if(row != 0)
            {
                this.CheckAdjacent(row-1,col);    
            }
            //Check cell on bottom
            if(row != this.size -1)
            {
                this.CheckAdjacent(parseInt(row)+1,col);    
            }
        
        }
    }

    RevealMines(row, col){
        for (let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
               if(this.field[i][j].ReturnMine()){
                   const id = `square-${i}-${j}`;
                   document.querySelector(`#${id}`).classList.add("grid-clicked");
                   document.querySelector(`#${id}`).classList.add("grid-with-mine");
               }
            }
        }
    }

    
    SetFlag(row, col){
        const id = `square-${row}-${col}`;
        if(!this.field[row][col].ReturnUncovered()){
            if(!this.field[row][col].ReturnFlag()){
                    document.querySelector(`#${id}`).classList.add("grid-right-clicked");
                    this.mineCount -=1;
                    document.querySelector("#bomb-count").innerHTML = (this.mineCount);
                    this.field[row][col].SetFlag(true);
                    this.CheckForWin();
                return;
            }
            document.querySelector(`#${id}`).classList.remove("grid-right-clicked");
            this.mineCount +=1;
            document.querySelector("#bomb-count").innerHTML = (this.mineCount);
            this.field[row][col].SetFlag(false);
            this.CheckForWin();
        }
    }

    CheckForWin(){
        this.minesFlagged = 0;
        this.tilesCovered = 0;
        if(this.mineCount == 0){
            for (let i = 0; i < this.size; i++){
                for(let j = 0; j < this.size; j++){
                    if(this.field[i][j].ReturnMine() && this.field[i][j].ReturnFlag()){
                       this.minesFlagged += 1;
                    }
                    if(!this.field[i][j].ReturnUncovered()){
                        this.tilesCovered += 1;
                        console.log(this.tilesCovered);
                    }
                }
            }
        }
        if(this.minesFlagged == this.totalMines && this.tilesCovered == this.totalMines){
            console.log("Yay you win");
            document.querySelector("#end-screen").
            classList.remove("hidden");
            document.querySelector("#game-screen").
            classList.add("hidden");
        }
    }
}