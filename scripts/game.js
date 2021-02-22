// Copyright (c) 2021 Curtis Reynolds
'use strict';

import Minefield from "./minefield/Minefield.js";


const EASY_SIZE = 10;
const EASY_MINE_COUNT  = 10;

const MEDIUM_SIZE = 20;
const MEDIUM_MINE_COUNT  = 40;

const HARD_SIZE = 25;
const HARD_MINE_COUNT  = 100;

//Easy 10,10
//Medium 20,40
//Hard 25, 100

export default class Game {

    constructor() {
        //Standard board size
        this.size = MEDIUM_SIZE;
        this.mineCount = MEDIUM_MINE_COUNT;

        //Bool variables
        this.gameOver = false;
        this.muted = false;

        //Objects
        this.minefield;
        this.clickSound = new buzz.sound("./Audio/zapsplat_multimedia_click_001_19367.mp3");

        //Play button
        document.querySelector("#play-button")
        .addEventListener('click', event => this.StartButtonListener(event));

        //Instruction buttons
        document.querySelector("#instructions-button")
            .addEventListener('click', event => this.InstructionbuttonListener(event));
        document.querySelector("#instruction-back-button")
            .addEventListener('click', event => this.InstructionBackButtonListener(event));

        //Option buttions
        document.querySelector("#option-button")
            .addEventListener('click', event => this.OptionbuttonListener(event));
        document.querySelector("#easy-button")
            .addEventListener('click', event => this.OptionEasyButtonListener(event));
        document.querySelector("#medium-button")
            .addEventListener('click', event => this.OptionMediumButtonListener(event));
        document.querySelector("#hard-button")
            .addEventListener('click', event => this.OptionHardButtonListener(event));
        document.querySelector("#mute-button")
            .addEventListener('click', event => this.OptionMuteButtonListener(event));
        document.querySelector("#option-back-button")
            .addEventListener('click', event => this.OptionBackButtonListener(event));

        //Credits buttons
        document.querySelector("#credits-button")
            .addEventListener('click', event => this.CreditButtonListener(event));
        document.querySelector("#credits-back-button")
            .addEventListener('click', event => this.CreditBackButtonListner(event));
        
        //In game buttons
        document.querySelector("#pause-button")
            .addEventListener('click', event => this.PauseButtonListener(event));           
        document.querySelector("#restart-button")
        .addEventListener('click', event => this.RestartButtonListener(event));
        document.querySelector("#quit-button")
            .addEventListener('click', event => this.QuitButtonListener(event));

        //Sets all buttons to have the mouse enter and mouse exit listener
        let temp = document.querySelectorAll(".button");
            temp.forEach(element => {
                element.addEventListener('mouseover', event =>{
                    element.classList.add("button-hover");
                });
                element.addEventListener('mouseout', event =>{
                    element.classList.remove("button-hover");
                });
            })
    }

    //gets screen resolution and resizes depending on it.
    getResolution() {
        if(window.screen.width * window.devicePixelRatio < 1600 || window.screen.height * window.devicePixelRatio < 900 ){
            document.querySelector("#main-container")
            .classList.add("scale60");
            return;
        }
        if(window.screen.width * window.devicePixelRatio < 1900 || window.screen.height * window.devicePixelRatio < 1000){
            document.querySelector("#main-container")
            .classList.add("scale80");
            return;
        }
    }

    StartButtonListener(event){
        //plays sound
        this.playClickSound();
        //Switches screens
        document.querySelector("#start-screen")
        .classList.add("hidden");
        document.querySelector("#game-screen")
        .classList.remove("hidden");
        //Starts the game and timer
        this.minefield = new Minefield(this.size, this.mineCount, this.muted)
        this.minefield.Timer();
    }

    InstructionbuttonListener(event){
        //play sound
        this.playClickSound();
        //Switches screens
        document.querySelector("#start-screen")
        .classList.add("hidden");
        document.querySelector("#instruction-screen")
        .classList.remove("hidden");
    }
    
    InstructionBackButtonListener(event){
        //play sound
        this.playClickSound();
        //Switches screens
        document.querySelector("#instruction-screen")
        .classList.add("hidden");
        document.querySelector("#start-screen")
        .classList.remove("hidden");
    }

    OptionbuttonListener(event){
        //play sound
        this.playClickSound();
        //Switch screen
        document.querySelector("#start-screen")
        .classList.add("hidden");
        document.querySelector("#option-screen")
        .classList.remove("hidden");
    }

    OptionEasyButtonListener(event){
        //play sound
        this.playClickSound();
        //set difficulty to easy by changing grid and mine count
        this.size = EASY_SIZE;
        this.mineCount = EASY_MINE_COUNT;
        document.querySelector("#easy-button")
            .classList.add("button-select");
        document.querySelector("#medium-button")
            .classList.remove("button-select");
        document.querySelector("#hard-button")
            .classList.remove("button-select");
    }

    OptionMediumButtonListener(event){
        //play sound
        this.playClickSound();
        //set difficulty to medium by changing grid and mine count
        this.size = MEDIUM_SIZE;
        this.mineCount = MEDIUM_MINE_COUNT;
        document.querySelector("#easy-button")
            .classList.remove("button-select");
        document.querySelector("#medium-button")
            .classList.add("button-select");
        document.querySelector("#hard-button")
            .classList.remove("button-select");
    }

    OptionHardButtonListener(event){
        //play sound
        this.playClickSound();
        //set difficulty to hard by changing grid and mine count
        this.size = HARD_SIZE;
        this.mineCount = HARD_MINE_COUNT;
        document.querySelector("#easy-button")
            .classList.remove("button-select");
        document.querySelector("#medium-button")
            .classList.remove("button-select");
        document.querySelector("#hard-button")
            .classList.add("button-select");
    }

    OptionMuteButtonListener(event){
        //Mutes audio if not muted, unmutes if muted
        let button = document.querySelector("#mute-button");
        if(this.muted){
            button.classList.remove("button-select");
            this.clickSound.play();
            this.muted = false;
            return;
        }
        this.muted = true;
        this.clickSound.play();
        button.classList.add("button-select");
    }

    OptionBackButtonListener(event){
        //plays sound
        this.playClickSound();
        //switch screen
        document.querySelector("#option-screen")
        .classList.add("hidden");
        document.querySelector("#start-screen")
        .classList.remove("hidden");
    }

    CreditButtonListener(event){
        //play sound
        this.playClickSound();
        //switch screen
        document.querySelector("#start-screen")
        .classList.add("hidden");
        document.querySelector("#credits-screen")
        .classList.remove("hidden");
    }

    CreditBackButtonListner(event){
        //play sound
        this.playClickSound();
        //switch screen
        document.querySelector("#credits-screen")
        .classList.add("hidden");
        document.querySelector("#start-screen")
        .classList.remove("hidden");
    }

    //Pauses game by stopping timer and displaying pause screen
    PauseButtonListener(event){
        //play sound
        this.playClickSound();
        if(!this.paused){
            //show pause screen
            document.querySelector("#pause-screen")
            .classList.remove("hidden");
            //set pause button to say unpause and add selected colour
            document.querySelector("#pause-button")
            .innerHTML = "Unpause";
            document.querySelector("#pause-button")
            .classList.add("button-select");
            document.querySelector("#game-grid")
            .classList.add("hidden");
            //Stop timer
            this.minefield.paused = true;
            this.paused = true;
            return;
        }
        //Remove pause screen
        document.querySelector("#pause-screen")
        .classList.add("hidden");
        //Change pause button back to pause
        document.querySelector("#pause-button")
        .innerHTML = "Pause";
        document.querySelector("#pause-button")
        .classList.remove("button-select");
        document.querySelector("#game-grid")
        .classList.remove("hidden");
        //Start timer
        this.minefield.paused = false;
        this.paused = false;
    }

    //Quits back to main menu
    QuitButtonListener(event){
        //playsound
        this.playClickSound();
        //Change screen and hides end game elements
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


    RestartButtonListener(event){
        //play sound
        this.playClickSound();
        //restart timer
        this.time = 0;
        document.querySelector("#timer")
                .innerHTML = this.time;
        //reloads grid and remove end game elements
        this.ReloadGrid();
        document.querySelector("#end-game")
        .innerHTML = "";  
        document.querySelector("#quit-button")
        .classList.add("hidden");  
    }
    
    //Triggers a full reset of the minefield
    ReloadGrid(){
        this.minefield.ResetField();
    }

    //Plays sound if not muted
    playClickSound(){
        if(!this.muted){
            this.clickSound.play();
        }
    }

}

