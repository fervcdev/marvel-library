import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public searchTerm: string = '';
  public searchTermChanged = new Subject<string>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.searchTermChanged
      .pipe(
        debounceTime(600), 
        distinctUntilChanged()
      )
      .subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
      });
  }

  searchCharacters(searchTerm: string) {
    this.searchTermChanged.next(searchTerm);
  }
  goHome(){
    window.location.reload();
  }
}
