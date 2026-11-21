import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddUserDialog } from '../add-user-dialog/add-user-dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { User } from '../../models/user.class';
import {MatCardModule} from '@angular/material/card';

@Component({
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatCardModule],
  selector: 'app-user',
  styleUrl: './user.scss',
  templateUrl: './user.html',
})

export class UserComponent implements OnInit{
  user = new User();


  constructor(private readonly dialog: MatDialog) {

  }

  ngOnInit(): void {}

  openDialog(): void {
    this.dialog.open(AddUserDialog, {
      panelClass: 'add-user-dialog-panel',
      width: 'auto',
      maxWidth: '90vw',
    });
  }
}
