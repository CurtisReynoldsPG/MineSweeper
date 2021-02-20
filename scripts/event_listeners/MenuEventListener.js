// Copyright (c) 2021 Curtis Reynolds
'use strict';

export default class MenuEventListener

{
    constructor()
    {
        document.querySelector("#instructions-button")
            .addEventListener('click', event => this.instructionbuttonListener(event));

        document.querySelector("#instruction-back-button")
             .addEventListener('click', event => this.instructionBackButtonListener(event));

        document.querySelector("#option-button")
             .addEventListener('click', event => this.optionbuttonListener(event));

        document.querySelector("#option-back-button")
            .addEventListener('click', event => this.optionBackButtonListener(event));

        document.querySelector("#play-button")
            .addEventListener('click', event => this.playButtonListener(event));
        
        let temp = document.querySelectorAll(".button");
        temp.forEach(element => {
            element.addEventListener('mouseover', event =>{
                element.classList.add("button-select");
            });
            element.addEventListener('mouseout', event =>{
                element.classList.remove("button-select");
            });
        })
        temp = document.querySelectorAll(".menu-button");
        temp.forEach(element => {
           
        })
    }

    instructionbuttonListener(event){
        document.querySelector("#start-screen")
        .classList.add("hidden");
        document.querySelector("#instruction-screen")
        .classList.remove("hidden");
    }
    
    instructionBackButtonListener(event){
        document.querySelector("#instruction-screen")
        .classList.add("hidden");
        document.querySelector("#start-screen")
        .classList.remove("hidden");
    }
    
    optionbuttonListener(event){
        document.querySelector("#start-screen")
        .classList.add("hidden");
        document.querySelector("#option-screen")
        .classList.remove("hidden");
    }
    
    optionBackButtonListener(event){
        document.querySelector("#option-screen")
        .classList.add("hidden");
        document.querySelector("#start-screen")
        .classList.remove("hidden");
    }
    
    playButtonListener(event){
        document.querySelector("#start-screen")
        .classList.add("hidden");
        document.querySelector("#game-screen")
        .classList.remove("hidden");
    }
}

