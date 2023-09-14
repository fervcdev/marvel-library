// character-list.component.ts
import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from 'src/models/character';
import { MarvelService } from 'src/services/marvel.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent {
  @Input() public searchTerm: string = '';

  characters: Result[] = []; // Lista de personajes
  public limit: number = 12; // Número de elementos por página (ahora público)
  public offset: number = 0; // Offset actual
  public total: number = 0;
  public totalPages: number = 0; // Variable para el cálculo del número total de páginas
  public noResults: boolean = false; // Variable para controlar si no se encontraron resultados
  public showSpinner: boolean = true; // Variable para controlar si se muestra el spinner

  constructor(
    private marvelService: MarvelService,
    private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.offset = 0; // Reiniciar el offset a 0 al cambiar el término de búsqueda
      this.getCharacters();
    }
  }

  getCharacters() {
    this.showSpinner = true; // Mostrar el spinner al comenzar la búsqueda
    this.noResults = false; // Reiniciar la variable de noResults

    this.marvelService
      .searchCharacters(this.searchTerm, this.limit, this.offset)
      .subscribe({
        next: (response) => {
          this.characters = response.data.results;
          this.total = response.data.total;
          this.totalPages = Math.ceil(this.total / this.limit); // Calcular el número total de páginas
          if (this.characters.length === 0) {
            this.showNoResultsMessageAfterDelay();
          } else {
            this.showSpinner = false; // Detener el spinner si hay resultados
          }
        },
      });
  }

  navigateToCharacterDetail(characterId: number) {
    this.router.navigate(['/character-detail', characterId]);
  }

  showNoResultsMessageAfterDelay() {
    setTimeout(() => {
      if (this.characters.length === 0) {
        this.noResults = true;
        this.showSpinner = false; // Detener el spinner después de mostrar el mensaje de noResults
      }
    }, 5000); // Espera 5 segundos antes de mostrar el mensaje de noResults
  }

  // Método para cambiar de página hacia adelante
  nextPage() {
    if (this.offset + this.limit < this.total) {
      this.offset += this.limit;
      this.getCharacters(); // Vuelve a obtener los personajes para la página seleccionada
    }
  }

  // Método para cambiar de página hacia atrás
  previousPage() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.getCharacters(); // Vuelve a obtener los personajes para la página seleccionada
    }
  }
}
