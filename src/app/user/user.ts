import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddUserDialog } from '../add-user-dialog/add-user-dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { ContactService } from '../services/contact';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  selector: 'app-user',
  styleUrl: './user.scss',
  templateUrl: './user.html',
})
export class UserComponent {
  contacts$: Observable<User[]>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly contactService: ContactService,
    private readonly router: Router
  ) {
    this.contacts$ = this.contactService.getContacts();
  }

  openContact(id: string): Promise<boolean> {
    return this.router.navigate(['/user', id]);
  }

  openDialog(): void {
    this.dialog.open(AddUserDialog, {
      panelClass: 'add-user-dialog-panel',
      width: 'auto',
      maxWidth: '90vw',
    });
  }
}
