import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddUserDialog } from '../add-user-dialog/add-user-dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule, MatInputModule, MatFormFieldModule],
  selector: 'app-user',
  styleUrl: './user.scss',
  templateUrl: './user.html',
})
export class User {
  constructor(private readonly dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(AddUserDialog, {
      panelClass: 'add-user-dialog-panel',
      width: 'auto',
      maxWidth: '90vw',
    });
  }
}
