import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable, of, switchMap } from 'rxjs';
import { User } from '../../models/user.class';
import { ContactService } from '../services/contact';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { EditUserBasicDialog } from '../edit-user-basic-dialog/edit-user-basic-dialog';
import { EditUserPersonalDialog } from '../edit-user-personal-dialog/edit-user-personal-dialog';
import { EditUserProfitionalDialog } from '../edit-user-profitional-dialog/edit-user-profitional-dialog';

@Component({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
    MatIconModule,
    MatMenuModule,
  ],
  selector: 'app-user-detail',
  styleUrl: './user-detail.scss',
  templateUrl: './user-detail.html',
})
export class UserDetailComponent {
  contact$: Observable<User | null>;

  constructor(
    route: ActivatedRoute,
    contactService: ContactService,
    private dialog: MatDialog
  ) {
    this.contact$ = route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        return id ? contactService.getContactById(id) : of(null);
      })
    );
  }

  editBasic(contact: User): void {
    this.dialog.open(EditUserBasicDialog, {
      data: contact,
      width: 'auto',
      maxWidth: '90vw',
    });
  }

  editPersonal(contact: User): void {
    this.dialog.open(EditUserPersonalDialog, {
      data: contact,
      width: 'auto',
      maxWidth: '90vw',
    });
  }

  editProfessional(contact: User): void {
    this.dialog.open(EditUserProfitionalDialog, {
      data: contact,
      width: 'auto',
      maxWidth: '90vw',
    });
  }
}
