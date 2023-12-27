import { Component, OnInit } from '@angular/core';
import { Favorite } from '../models/favorite.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})

export class FavoriteComponent implements OnInit {

  favorites: Observable<Favorite[]>;

  constructor(public router: Router, private store: Store<AppState>) {
    this.favorites = store.select('favorite');
   }

  ngOnInit(): void {
  }

  navigateFavoriteToMain(favorite: Favorite){
    this.router.navigate(['/main'], { 
      queryParams: { 
        key: favorite.key, cityName: favorite.cityName 
      } }
    );
  }

}
