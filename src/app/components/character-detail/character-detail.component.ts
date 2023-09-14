import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from 'src/models/character';
import { MarvelService } from 'src/services/marvel.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent {

  public character: Result = {} as Result;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private marvelService: MarvelService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.getCharacterDetails(parseInt(params['id']));
    });
  }
  get imageUrl() {
    return `${this.character.thumbnail?.path}.${this.character.thumbnail?.extension}`;
  }

  get stories() {
    return this.character.stories?.items?.map((item) => item.name);
  }

  get comics() {
    return this.character.comics?.items?.map((item) => item.name);
  }
  get events() {
    return this.character.events?.items?.map((item) => item.name);
  }

  getCharacterDetails(id: number) {
    this.marvelService.getCharacterById(id).subscribe({
      next: (response) => {
        this.character = response.data.results[0];
      },
      error: (error) => {
        console.error("Error fetching character details:", error);
      },
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

}
