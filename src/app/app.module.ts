import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoryListComponent } from './components/character-detail/story-list/story-list.component';
import { ComicListComponent } from './components/character-detail/comic-list/comic-list.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { HomeComponent } from './components/home/home.component';
import { EventListComponent } from './components/character-detail/event-list/event-list.component'; 

@NgModule({
  declarations: [
    AppComponent,
    StoryListComponent,
    ComicListComponent,
    CharacterListComponent,
    CharacterDetailComponent,
    HomeComponent,
    EventListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
