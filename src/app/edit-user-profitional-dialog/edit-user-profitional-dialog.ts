import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../models/user.class';
import { ContactService } from '../services/contact';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatProgressBarModule],
  selector: 'app-edit-user-profitional-dialog',
  styleUrl: './edit-user-profitional-dialog.scss',
  templateUrl: './edit-user-profitional-dialog.html',
})
export class EditUserProfitionalDialog {
  user: User;
  saving = false;
  loading = false;
  errorMessage = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) contact: User,
    private readonly dialogRef: MatDialogRef<EditUserProfitionalDialog>,
    private readonly contactService: ContactService
  ) {
    this.user = new User(contact);
  }

  async save(): Promise<void> {
    if (this.saving) return;

    this.saving = true;
    this.loading = true;
    this.errorMessage = '';
    try {
      await this.contactService.updateContact(this.user.id, {
        jobTitle: this.user.jobTitle,
        company: this.user.company,
        department: this.user.department,
        workEmail: this.user.workEmail,
        workPhone: this.user.workPhone,
      });
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Could not update professional contact details:', error);
      this.errorMessage = 'The professional details could not be saved.';
    } finally {
      this.saving = false;
      this.loading = false;
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
