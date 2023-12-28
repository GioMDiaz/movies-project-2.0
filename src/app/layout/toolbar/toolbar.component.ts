import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  imports:[MaterialModule, RouterLink, RouterLinkActive]
  
})
export class ToolBarComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }


}
