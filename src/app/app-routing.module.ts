import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { FavoriteComponent } from './favorite/favorite.component';


const routes: Routes = [
  {path:'', redirectTo : 'main' , pathMatch : 'full'},
  {path:'main', component:MainComponent},
  {path:'favorite', component:FavoriteComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
