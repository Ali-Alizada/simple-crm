import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../models/user.class';
import { ContactService } from '../services/contact';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  selector: 'app-edit-user-personal-dialog',
  styleUrl: './edit-user-personal-dialog.scss',
  templateUrl: './edit-user-personal-dialog.html',
})
export class EditUserPersonalDialog {
  user: User;
  birthDate: Date | null;
  saving = false;
  errorMessage = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) contact: User,
    private readonly dialogRef: MatDialogRef<EditUserPersonalDialog>,
    private readonly contactService: ContactService
  ) {
    this.user = new User(contact);
    this.birthDate = this.user.birthDate ? new Date(this.user.birthDate) : null;
  }

  async save(): Promise<void> {
    if (this.saving) return;

    this.saving = true;
    this.errorMessage = '';
    try {
      await this.contactService.updateContact(this.user.id, {
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        birthDate: this.birthDate?.getTime() ?? 0,
        street: this.user.street,
        houseNo: this.user.houseNo,
        zipCode: this.user.zipCode,
        city: this.user.city,
      });
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Could not update personal contact details:', error);
      this.errorMessage = 'The personal details could not be saved.';
    } finally {
      this.saving = false;
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
