import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Favorite } from "../models/favorite.model";


export const ADD_FAVORITE = '[FAVORITE] Add'
export const REMOVE_FAVORITE = '[FAVORITE] Remove'


export class AddFavorite implements Action{
    readonly type = ADD_FAVORITE;

    constructor(public payload: Favorite){}
}

export class RemoveFavorite implements Action{
    readonly type = REMOVE_FAVORITE;

    constructor(public payload: string){}
}


export type Actions = AddFavorite | RemoveFavorite
