// Copyright (c) 2021 Curtis Reynolds
'use strict';

import MenuEventListener from "./MenuEventListener.js";
import GameEventListener from "./GameEventListener.js";
export default class EventListeners
{
    constructor()
    {
        this.MenuEventListener = new MenuEventListener();
        this.GameEventListener = new GameEventListener();
    }
}