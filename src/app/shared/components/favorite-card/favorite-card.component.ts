import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FavoritesService } from '../../../services/favorites.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TruncateTextPipe } from '../../../pipes/max-lines';
import { Movie } from '../../../interfaces/movie.interface';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.css'],
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule, TruncateTextPipe],
})
export class FavoriteCardComponent implements OnInit {
  @Output() addComment = new EventEmitter<Movie>();
  @Output() deleteComment = new EventEmitter<{
    movie: Movie;
    comment: string;
  }>();
  @Output() openDetails = new EventEmitter<Movie>();
  @Output() toggleFavorite = new EventEmitter<Movie>();
  @Output() enableCommenting = new EventEmitter<Movie>();
  @Output() toggleComments = new EventEmitter<Movie>();

  @Input() selectedFilter: number | undefined;
  @Input() selectedType: string | undefined;
  @Input() selectedTitle: string | undefined;

  favoriteMovies = this.favoritesService.favoriteMoviesSubject;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.favoritesService.loadCommentsFromLocalStorage();
  }

  onAddComment(movie: Movie) {
    this.addComment.emit(movie);
  }

  onDeleteComment(movie: Movie, comment: string) {
    this.deleteComment.emit({ movie, comment });
  }

  onOpenDetails(movie: Movie) {
    this.openDetails.emit(movie);
  }

  onToggleFavorite(movie: Movie) {
    this.toggleFavorite.emit(movie);
  }

  onEnableCommenting(movie: Movie) {
    this.enableCommenting.emit(movie);
  }

  onToggleComments(movie: Movie) {
    this.toggleComments.emit(movie);
  }
}
