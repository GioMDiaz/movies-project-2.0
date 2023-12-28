import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FavoritesService } from '../../../services/favorites.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { TruncateTextPipe } from '../../../pipes/max-lines';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.css'],
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule, TruncateTextPipe],
})
export class FavoriteCardComponent implements OnInit {
  @Output() toggleFavorite = new EventEmitter<any>();
  @Output() applied = new EventEmitter<any>();
  @Output() favoriteToggled = new EventEmitter<any>();
  @Output() detailsRequested = new EventEmitter<string>();

  favoriteMovies = this.favoritesService.favoriteMoviesSubject;
  selectedFilter: string = '';
  selectedType: string = '';

  constructor(
    private favoritesService: FavoritesService,
  ) {}

  ngOnInit() {}

  onToggleFavorite(movie: any): void {
    movie.isFavorite = !movie.isFavorite;
    this.toggleFavorite.emit(movie);
  }

  applyFilters(): void {
    const filters = {
      selectedFilter: this.selectedFilter,
      selectedType: this.selectedType,
    };
    this.applied.emit(filters);
  }

  openDetails(movie: any): void {
    this.favoritesService.openDetails(movie.imdbID);
    this.favoriteToggled.emit(); // Puedes emitir un evento si es necesario
  }
}
