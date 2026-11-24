import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactService } from '../services/contact';
import { AddUserDialog } from './add-user-dialog';

describe('AddUserDialog', () => {
  let component: AddUserDialog;
  let fixture: ComponentFixture<AddUserDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserDialog],
      providers: [
        provideNativeDateAdapter(),
        { provide: MatDialogRef, useValue: { close: () => undefined } },
        { provide: ContactService, useValue: { addContact: () => Promise.resolve() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
