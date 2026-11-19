import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { FormsModule } from '@angular/forms';


import { User } from '../../models/user.class';
import { ContactService } from '../services/contact';
import { CommonModule } from '@angular/common';

@Component({
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    CommonModule,
  ],
  selector: 'app-add-user-dialog',
  styleUrl: './add-user-dialog.scss',
  templateUrl: './add-user-dialog.html',
})
export class AddUserDialog {
  user = new User();
  birthDate!: Date;

  saving = false;
  errorMessage = '';

  constructor(
    private ContactService: ContactService,
    private dialogRef: MatDialogRef<AddUserDialog>
  ){}



    async saveUser() {
      if (this.saving) return;

      this.saving = true;
      this.errorMessage = '';

      try {
        if (this.birthDate) {
          this.user.birthDate = this.birthDate.getTime();
        }

        console.log('Starting save...', this.user);

        const result = await Promise.race([
          this.ContactService.addContact(this.user),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Saving timed out after 15 seconds')), 15000)
          )
        ]);

        console.log('User successfully saved!', result);

        this.dialogRef.close(true);

      } catch (error) {
        console.error('Error saving user:', error);
        this.errorMessage = 'User could not be saved. Please check the console.';
      } finally {
        this.saving = false;
      }
    }


    // Test: voruübergehend: 


// async checkFirebase() {
//   try {
//     console.log('Testing Firebase connection...');

//     const result = await this.ContactService.testConnection();

//     console.log('Firebase connection successful!');
//     console.log('Documents found:', result.size);

//   } catch (error) {
//     console.error('Firebase connection failed:', error);
//   }
// }



}



  // saveUser(){
  //   this.user.birthDate = this.birthDate.getTime();
  //   console.log('Current user is', this.user);

     
  // }