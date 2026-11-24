import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { ContactService } from '../services/contact';
import { EditUserPersonalDialog } from './edit-user-personal-dialog';

describe('EditUserPersonalDialog', () => {
  let component: EditUserPersonalDialog;
  let fixture: ComponentFixture<EditUserPersonalDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserPersonalDialog],
      providers: [
        provideNativeDateAdapter(),
        { provide: MAT_DIALOG_DATA, useValue: new User({ id: 'contact-1' }) },
        { provide: MatDialogRef, useValue: { close: () => undefined } },
        { provide: ContactService, useValue: { updateContact: () => Promise.resolve() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserPersonalDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
