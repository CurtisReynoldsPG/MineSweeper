// Copyright (c) 2021 Curtis Reynolds
'use strict';

import Game from "../game.js";

export default class GameEventListener
{
    constructor()
    {
        this.paused = false;


        document.querySelector("#instruction-back-button")
             .addEventListener('click', event => this.resumeButtonListener(event));
             
        document.querySelector("#quit-button")
        .addEventListener('click', event => this.QuitButtonListener(event));
        // document.querySelector("#restart-button")
        //      .addEventListener('click', event => this.restartButtonListener(event));     
    }

    QuitButtonListener(event){
        document.querySelector("#game-screen")
            .classList.add("hidden");
        document.querySelector("#start-screen")
            .classList.remove("hidden");
        document.querySelector("#quit-button")
            .classList.add("hidden");
        document.querySelector("#timer")
            .innerHTML = 0;
        document.querySelector("#end-game")
            .innerHTML = "";    
    }
    
    resumeButtonListener(event){
        document.querySelector("#pause-screen")
        .classList.add("hidden");
    }
    
    optionbuttonListener(event){
        document.querySelector("#start-screen")
        .classList.add("hidden");
        document.querySelector("#option-screen")
        .classList.remove("hidden");
    }

    restartButtonListener(event){
        this.time = 0;
        document.querySelector("#timer")
                .innerHTML = this.time;
        this.ReloadGrid();

    }
}