import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'character-detail/:id',
    component: CharacterDetailComponent,
    title: 'Hero',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
