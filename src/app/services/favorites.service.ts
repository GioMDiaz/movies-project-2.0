import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Movie } from '../interfaces/movie.interface';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../shared/components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoriteMovies: Movie[] = [];

  favoriteMoviesSubject = new BehaviorSubject<Movie[]>([]);

  favoriteMovies$ = this.favoriteMoviesSubject.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {
    this.loadFavoriteMoviesFromLocalStorage();
  }

  openDetails(imdbID: string): void {
    this.apiService.openDetails(imdbID).subscribe((details) => {
      this.openDetailsModal(details);
    });
  }

  openDetailsModal(movieDetails: any): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { movieDetails },
    });
  }

  loadFavoriteMoviesFromLocalStorage() {
    const storedMovies = this.localStorageService.get('favoriteMovies');
    if (storedMovies && Array.isArray(storedMovies)) {
      this.favoriteMovies = storedMovies;
      this.favoriteMoviesSubject.next(this.favoriteMovies);
    }
  }

  getFavorites(): Movie[] {
    return this.favoriteMovies;
  }

  addToFavorites(movie: Movie): void {
    const existingMovie = this.favoriteMovies.find(
      (favMovie) => favMovie.imdbID === movie.imdbID
    );

    if (!existingMovie) {
      const movieWithComments: Movie = { ...movie, comments: [] };
      this.favoriteMovies.push(movieWithComments);
      this.localStorageService.set('favoriteMovies', this.favoriteMovies);
    }
  }

  addOrRemoveFromFavorites(movie: Movie): void {
    const isFavorite = this.isFavorite(movie);
    if (!isFavorite) {
      this.addToFavorites(movie);
    } else {
      this.removeFromFavorites(movie.imdbID);
    }
  }

  updateFavoriteStates(movies: Movie[]): void {
    movies.forEach((movie) => {
      movie.isFavorite = this.isFavorite(movie);
    });
    this.favoriteMoviesSubject.next(this.favoriteMovies);
  }

  removeFromFavorites(imdbID: string): void {
    this.favoriteMovies = this.favoriteMovies.filter(
      (movie) => movie.imdbID !== imdbID
    );
    this.localStorageService.set('favoriteMovies', this.favoriteMovies);
  
  }

  filterByType(type: string): Movie[] {
    return this.favoriteMovies.filter((movie) => movie.Type === type);
  }

  filterByYear(year: number): Movie[] {
    return this.favoriteMovies.filter((movie) => +movie.Year === year);
  }

  isFavorite(movie: Movie): boolean {
    return this.favoriteMovies.some((m) => m.imdbID === movie.imdbID);
  }

  saveCommentsToLocalStorage(imdbID: string, comments: string[]): void {
    localStorage.setItem(imdbID, JSON.stringify(comments));
 }

 loadCommentsFromLocalStorage(): void {
  this.favoriteMovies.forEach((movie) => {
    const storedComments = localStorage.getItem(movie.imdbID);
    if (storedComments) {
      movie.comments = JSON.parse(storedComments);
    }
  });
}

}
