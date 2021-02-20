// Copyright (c) 2021 Curtis Reynolds
'use strict';

import Game from "../game.js";

export default class GameEventListener
{
    constructor()
    {
        this.paused = false;

        document.querySelector("#pause-button")
            .addEventListener('click', event => this.pauseButtonListener(event));
        document.querySelector("#instruction-back-button")
             .addEventListener('click', event => this.resumeButtonListener(event));
        // document.querySelector("#restart-button")
        //      .addEventListener('click', event => this.restartButtonListener(event));     
    }

    pauseButtonListener(event){
        if(!this.paused){
            document.querySelector("#pause-screen")
            .classList.remove("hidden");
            document.querySelector("#pause-button")
            .innerHTML = "Unpause";
            document.querySelector("#pause-button")
            .classList.add("button-select");
            document.querySelector("#game-grid")
            .classList.add("hidden");
            this.paused = true;
            return;
        }
        document.querySelector("#pause-screen")
        .classList.add("hidden");
        document.querySelector("#pause-button")
        .innerHTML = "Pause";
        document.querySelector("#pause-button")
        .classList.remove("button-select");
        document.querySelector("#game-grid")
        .classList.remove("hidden");
        this.paused = false;
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