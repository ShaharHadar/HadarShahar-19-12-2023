import { Favorite } from "./models/favorite.model";


export interface AppState{
    readonly favorite: Favorite[];
}
