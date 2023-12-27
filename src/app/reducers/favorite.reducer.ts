import { Favorite } from "../models/favorite.model";
import * as FavoriteActions from "../actions/favorite.actions"


export function reducer(state: Favorite[] = [], action: FavoriteActions.Actions){
    switch(action.type){

        case FavoriteActions.ADD_FAVORITE:
            return [...state, action.payload];

        case FavoriteActions.REMOVE_FAVORITE:
            const indexR  = state.findIndex(f => f.key === action.payload);
            let newState = [...state];
            newState.splice(indexR, 1);
            return newState;
            
        default:
            return state;
    }
}
