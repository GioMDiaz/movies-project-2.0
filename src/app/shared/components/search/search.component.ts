import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Movie } from '../../../interfaces/movie.interface';
/* import { FavoritesService } from '../../../services/favorites.service'; */

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [MaterialModule, FormsModule]
})
export class SearchComponent implements OnInit {

  searchQuery: string = '';
  @Output() search = new EventEmitter<string>();

  constructor(
  ) { }

  ngOnInit() {
  }

onSearch(){
  if (this.searchQuery) {
    this.search.emit(this.searchQuery);
  }
}

}
