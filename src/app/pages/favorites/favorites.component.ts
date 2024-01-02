import { Component, OnInit } from '@angular/core';
import { FavoriteCardComponent } from '../../shared/components/favorite-card/favorite-card.component';
import { FavoritesService } from '../../services/favorites.service';
import { Movie } from '../../interfaces/movie.interface';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  standalone: true,
  imports: [FavoriteCardComponent, ModalComponent, MaterialModule, FormsModule, CommonModule],
})
export class FavoritesComponent implements OnInit {
  favoriteMovies: Movie[] = [];
  selectedFilter: string = '';
  selectedType: string = '';
  selectedTitle: string = '';
  commentToAdd: string = '';
  constructor( 
    private favoritesService: FavoritesService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}
  
  ngOnInit() {
    
  }

  openDetails(movie: any): void {
    this.favoritesService.openDetails(movie.imdbID);
  }

  addComment(movie: any): void {
    if (movie.newComment && movie.newComment.trim() !== '') {
      if (!movie.comments) {
        movie.comments = [];
      }
      const newComment = movie.newComment.trim();
      movie.comments.push(newComment);
      this.favoritesService.saveCommentsToLocalStorage(
        movie.imdbID,
        movie.comments
      );
      movie.newComment = '';
      movie.isEditing = false;
    }
  }

  deleteComment(movie: any, comment: string): void {
    const index = movie.comments.indexOf(comment);
    if (index !== -1) {
      movie.comments.splice(index, 1);
      this.favoritesService.saveCommentsToLocalStorage(
        movie.imdbID,
        movie.comments
      );
    }
  }

  enableCommenting(movie: Movie): void {
    movie.isEditing = !movie.isEditing;
  }

  toggleComments(movie: Movie): void {
    movie.showComments = !movie.showComments;
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

      if (this.selectedTitle) {
        includeMovie = includeMovie && movie.Title.toLowerCase().includes(this.selectedTitle.toLowerCase());
      }
  
      return includeMovie;
    });
    
    this.favoritesService.favoriteMoviesSubject.next(filteredMovies);
  }

  handleCommentEvent(eventData: { imdbID: string; comment: string }): void {
    const { imdbID, comment } = eventData;
  
    const movieToUpdate = this.favoriteMovies.find(movie => movie.imdbID === imdbID);
  
    if (movieToUpdate) {
      movieToUpdate.comments = movieToUpdate.comments || []; // Inicializa si es undefined
      if (!movieToUpdate.comments.includes(comment)) {
        movieToUpdate.comments.push(comment);
      }
    }
  } 

  handleDeleteComment(eventData: { imdbID: string; comment: string }): void {
    const { imdbID, comment } = eventData;
  
    const movieToUpdate = this.favoriteMovies.find(movie => movie.imdbID === imdbID);
  
    if (movieToUpdate && movieToUpdate.comments) {
      movieToUpdate.comments = movieToUpdate.comments.filter(existingComment => existingComment !== comment);
    }
  }

  toggleFavorite(movie: Movie): void {
    movie.isFavorite = !movie.isFavorite;
    this.favoritesService.addOrRemoveFromFavorites(movie);
  }
}
