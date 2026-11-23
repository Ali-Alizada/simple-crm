import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable, of, switchMap } from 'rxjs';
import { User } from '../../models/user.class';
import { ContactService } from '../services/contact';

@Component({
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterLink],
  selector: 'app-user-detail',
  styleUrl: './user-detail.scss',
  templateUrl: './user-detail.html',
})
export class UserDetailComponent {
  contact$: Observable<User | null>;

  constructor(
    route: ActivatedRoute,
    contactService: ContactService
  ) {
    this.contact$ = route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        return id ? contactService.getContactById(id) : of(null);
      })
    );
  }
}
