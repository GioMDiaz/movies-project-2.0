import { Component, OnInit } from '@angular/core';
import { FavoriteCardComponent } from '../../shared/components/favorite-card/favorite-card.component';
import { FavoritesService } from '../../services/favorites.service';
import { Movie } from '../../interfaces/movie.interface';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  standalone: true,
  imports: [FavoriteCardComponent, ModalComponent],
})
export class FavoritesComponent implements OnInit {
  favoriteMovies: Movie[] = [];
  selectedFilter: string = '';
  selectedType: string = '';
  constructor( 
    private favoritesService: FavoritesService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.favoritesService.favoriteMovies$
  }

  toggleFavorite(movie: Movie): void {
    this.favoritesService.addOrRemoveFromFavorites(movie);
    this.favoritesService.loadFavoriteMoviesFromLocalStorage();
  }

  applyFilters(filters: any): void {
    this.selectedFilter = filters.selectedFilter;
    this.selectedType = filters.selectedType;
    this.filterAndRefreshMovies();
  }

  handleDetailsRequest(imdbID: string): void {
    this.apiService.openDetails(imdbID).subscribe((details) => {
      this.openDetailsModal(details);
    });
  }
  
  openDetailsModal(movieDetails: any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { movieDetails }
    });
  }

  onElementClicked(element: any): void {
    if (element && element.imdbID) {
      this.handleDetailsRequest(element.imdbID);
    }
  }

  filterAndRefreshMovies(): void {
    const filteredMovies = this.favoritesService.getFavorites().filter(movie => {
      let includeMovie = true;
      if (this.selectedFilter) {
        const filterYear = parseInt(this.selectedFilter, 10);
        const movieYear = parseInt(movie.Year, 10);
        includeMovie = !isNaN(movieYear) && movieYear === filterYear;
      }
  
      if (this.selectedType) {
        includeMovie = includeMovie && movie.Type === this.selectedType;
      }
  
      return includeMovie;
    });
  
    this.favoritesService.favoriteMoviesSubject.next(filteredMovies);
  }
  
  
  
}
