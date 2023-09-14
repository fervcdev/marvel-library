import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.css']
})
export class ComicListComponent {
  @Input() public title: string = '';
  @Input() public items: string[] = [];

}
