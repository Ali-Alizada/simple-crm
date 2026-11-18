import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
  ],
  selector: 'app-add-user-dialog',
  styleUrl: './add-user-dialog.scss',
  templateUrl: './add-user-dialog.html',
})
export class AddUserDialog {
  user = new User();
  birthDate!: Date;


  saveUser(){
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user);
  }
}
