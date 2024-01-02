import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { MaterialModule } from '../../material/material.module';
import { SearchComponent } from '../../shared/components/search/search.component';
import { ApiService } from '../../services/api.service';
import { Movie } from '../../interfaces/movie.interface';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [TableComponent, MaterialModule, SearchComponent, CommonModule],
})
export class HomeComponent implements OnInit {
  searchQuery: string = '';
  movies: Movie[] = [];
  totalResults: string = '';
  currentPage: number = 1;
  searchPerformed: boolean = false;
  displayedColumns: string[] = [];
  favoriteMovies: Movie[] = [];
  selectedFilter: string = '';
  selectedType: string = '';
  commentToAdd: string = '';
  favoriteStatus: any;
  pageSize: number = 5;

  constructor(
    private apiService: ApiService,
    private favoritesService: FavoritesService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {}

  searchMovies(search: string): void {
    this.searchQuery = search;
    this.apiService.searchMovies(this.searchQuery, this.currentPage).subscribe(
      (data) => {
        this.movies = data.Search || [];
        if (this.movies.length > 0) {
          this.displayedColumns = Object.keys(this.movies[0]).filter(
            (column) => column !== 'imdbID'
          );
          this.displayedColumns.push('Favorites');
        }
        this.totalResults = data.totalResults;
        this.searchPerformed = true;
        this.favoritesService.updateFavoriteStates(this.movies);
      },
      (error) => {
        console.error('Error al buscar películas:', error);
      }
    );
  }

  handlePage(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.searchMovies(this.searchQuery);
  }

  refreshMovies(): void {
    let filteredMovies = this.favoritesService.getFavorites();

    if (this.selectedFilter) {
      const filterYear = parseInt(this.selectedFilter, 10);
      filteredMovies = filteredMovies.filter((movie) => {
        const movieYear = parseInt(movie.Year, 10);
        return !isNaN(movieYear) && movieYear === filterYear;
      });
    }

    if (this.selectedType) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.Type === this.selectedType
      );
    }

    this.favoriteMovies = filteredMovies;
  }

  onFavoriteToggled(movie: Movie): void {
    this.toggleFavorites(movie);
  }

  toggleFavorites(movie: Movie): void {
    this.favoritesService.addOrRemoveFromFavorites(movie);
    this.favoritesService.updateFavoriteStates(this.favoriteMovies);
    this.refreshMovies();
  }

  removeFromFavorites(imdbID: string): void {
    this.favoriteMovies = this.favoriteMovies.filter(
      (movie) => movie.imdbID !== imdbID
    );
    this.localStorageService.set('favoriteMovies', this.favoriteMovies);
  }
}
