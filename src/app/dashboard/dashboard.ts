import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Observable, map } from 'rxjs';
import { User } from '../../models/user.class';
import { AddUserDialog } from '../add-user-dialog/add-user-dialog';
import { ContactService } from '../services/contact';

interface DashboardData {
  totalContacts: number;
  companies: number;
  contactsWithEmail: number;
  contactsWithRole: number;
  contacts: User[];
}

@Component({
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  dashboardData$: Observable<DashboardData>;

  constructor(
    contactService: ContactService,
    private readonly dialog: MatDialog
  ) {
    this.dashboardData$ = contactService.getContacts().pipe(
      map((contacts) => {
        const companies = new Set(
          contacts
            .map((contact) => contact.company.trim().toLowerCase())
            .filter((company) => company.length > 0)
        );

        return {
          totalContacts: contacts.length,
          companies: companies.size,
          contactsWithEmail: contacts.filter((contact) => contact.email.trim()).length,
          contactsWithRole: contacts.filter((contact) => contact.jobTitle.trim()).length,
          contacts: [...contacts]
            .sort((a, b) => a.lastName.localeCompare(b.lastName))
            .slice(0, 6),
        };
      })
    );
  }

  openAddContactDialog(): void {
    this.dialog.open(AddUserDialog, {
      panelClass: 'add-user-dialog-panel',
      width: 'min(760px, 94vw)',
      maxWidth: '94vw',
    });
  }
}
