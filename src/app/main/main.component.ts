import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../services/weather-api.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as FavoriteActions from "../actions/favorite.actions";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  searchCity: string = 'Tel Aviv';
  isValid: boolean = true;
  isSearch: boolean = false;
  isFavorite: boolean = false;
  isCelsius: boolean = true;
  isAutoSearch: boolean = false;
  cityKey: string = '215854';
  cityName: string = 'Tel Aviv';
  weatherText: string = '';
  weatherDegreeC: string = '';
  weatherDegreeF: string = '';
  daysOfForecasts: Array<any> = []
  autoCompleteCities: Array<any> = []


  constructor(private route: ActivatedRoute, 
              private weatherService: WeatherApiService,
              private store: Store<AppState>) {}
              

  ngOnInit(): void {
    if (this.route.queryParams['_value']['key']) {
      this.cityKey = this.route.queryParams['_value']['key'];
      this.cityName = this.route.queryParams['_value']['cityName'];
      this.searchCity = this.cityName;
      this.isFavorite = true;
    }
    this.getWeatherForecast();
  }

  checkIfFavorite(){
    this.store.select('favorite').subscribe( data=>{
      let favorites = data;
      if (favorites.findIndex(f => f.key === this.cityKey) != -1) 
        this.isFavorite = true;
      else this.isFavorite = false;
    });
  }
 
  getWeatherForecast(){
    this.cityName = this.searchCity;
    this.daysOfForecasts = [];
    this.checkIfFavorite();
    this.weatherService.getCurrentConditions(this.cityKey).subscribe(
      data=>{
        this.weatherText = data[0].WeatherText;
        this.weatherDegreeC = data[0].Temperature['Metric'].Value.toString();
        this.weatherDegreeF = data[0].Temperature['Imperial'].Value.toString();
      },
      error=>console.log(error)
    )
    this.weatherService.get5DaysOfForecasts(this.cityKey).subscribe(
      data=>{
        data['DailyForecasts'].forEach(element => {
          let obj = {
            date: element['Date'],
            weather: element['Day']['IconPhrase'],
            degreeC: (((element['Temperature']['Maximum'].Value) - 32) * 5/9).toFixed(2),
            degreeF: element['Temperature']['Maximum'].Value
          }
          this.daysOfForecasts.push(obj);
        });
      },
      error=>console.log(error)
    )
  }

  checkValidation(){
    let regex = /^[a-zA-Z ]+$/
      this.isValid = regex.test(this.searchCity)? true: false;
   }

  getAutoComplete(){
    this.isSearch = false;
    this.checkValidation();
    this.autoCompleteCities = [];
    if (this.isValid){
      this.isAutoSearch = this.searchCity? true: false;
    this.weatherService.getAutoComplete(this.searchCity).subscribe(
      data=>{
        data.forEach(element => {
          let obj = {
            key: element['Key'],
            name: element['LocalizedName'],
          }
          this.autoCompleteCities.push(obj);
        });
      },
      error=>console.log(error)
    )
    }
  }

  addOrRemoveFavorite(){
    if (!this.isFavorite) {
      let f = this.store.dispatch(new FavoriteActions.AddFavorite({
        key: this.cityKey, cityName: this.cityName, weatherName: this.weatherText, currentWeather: this.weatherDegreeC
      }));
      this.isFavorite = true;
    } else {
      this.store.dispatch(new FavoriteActions.RemoveFavorite(this.cityKey));
      this.isFavorite = false;
    }
  }

  chooseCity(city: any){
    this.isAutoSearch = false;
    this.cityKey = city.key;
    this.searchCity = city.name;
    this.isValid = true;
    this.isSearch = true;
  }

}
