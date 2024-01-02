import { Component, Input, OnInit } from '@angular/core';
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
  @Input() onOpenDetails: ((movie: Movie) => void) | undefined;
  @Input() onAddComment: ((movie: Movie) => void) | undefined;
  @Input() onDeleteComment:
    | ((movie: Movie, comment: string) => void)
    | undefined;
  @Input() onToggleFavorite: ((movie: Movie) => void) | undefined;
  @Input() onEnableCommenting: ((movie: Movie) => void) | undefined;
  @Input() onToggleComments: ((movie: Movie) => void) | undefined;

  favoriteMovies = this.favoritesService.favoriteMoviesSubject;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.favoritesService.loadCommentsFromLocalStorage();
  }
}
