import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [MaterialModule]
})
export class ModalComponent implements OnInit {

  movieDetails: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.movieDetails = data.movieDetails;
  }

  ngOnInit() {
  }

}
