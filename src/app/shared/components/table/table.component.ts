import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';

import { FavoritesService } from '../../../services/favorites.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [MaterialModule],
})
export class TableComponent {
  @Input() favoriteStatus: { [key: string]: boolean } = {};
  @Input() data: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Output() favoriteToggled = new EventEmitter<any>();
  movie: any;

  dataSource = new MatTableDataSource(this.data);

  constructor(private favoritesService: FavoritesService) {}
  ngOnInit(): void {
    this.dataSource.data = this.data;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.dataSource.data = this.data;
    }
  }

  toggleFavorite(element: any): void {
    element.isFavorite = !element.isFavorite;
    this.favoriteToggled.emit(element);
  }

  openDetails(movie: any): void {
    this.favoritesService.openDetails(movie.imdbID);
  }
}
