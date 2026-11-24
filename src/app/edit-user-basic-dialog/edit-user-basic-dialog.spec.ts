import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { ContactService } from '../services/contact';
import { EditUserBasicDialog } from './edit-user-basic-dialog';

describe('EditUserBasicDialog', () => {
  let component: EditUserBasicDialog;
  let fixture: ComponentFixture<EditUserBasicDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserBasicDialog],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: new User({ id: 'contact-1' }) },
        { provide: MatDialogRef, useValue: { close: () => undefined } },
        { provide: ContactService, useValue: { updateContact: () => Promise.resolve() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserBasicDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
