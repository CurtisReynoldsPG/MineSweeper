// Copyright (c) 2021 Curtis Reynolds
'use strict';

export default class HighScore{


    constructor(){
        this.newScore =0;
        this.listOfScores = [];
        this.SetScoreArray();
    }

    SetScoreArray(){
        document.querySelectorAll(".high-score-list")
        .forEach(element =>{
            this.listOfScores[element.dataset.position] = 0;
            element.innerHTML = 0;
        })
    }

    SetHighScore(newScore){
        this.newScore = newScore; 

        document.querySelectorAll(".high-score-list")
        .forEach(element =>{

            if(newScore > this.listOfScores[element.dataset.position]){
                this.listOfScores[element.dataset.position] = this.currentScore;
                const id = `position-${element.dataset.position}`;
                console.log(id);
                document.querySelector(`#${id}`)
                    .innerHTML = this.newScore;
            }
            console.log("Breaked");
        })
    }
}
