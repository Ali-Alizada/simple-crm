import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddUserDialog } from '../add-user-dialog/add-user-dialog';

@Component({
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule],
  selector: 'app-user',
  styleUrl: './user.scss',
  templateUrl: './user.html',
})
export class User {
  constructor(private readonly dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(AddUserDialog, {
      panelClass: 'add-user-dialog-panel',
      width: '300px',
      maxWidth: '90vw',
    });
  }
}
