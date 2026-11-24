import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { ContactService } from '../services/contact';
import { EditUserProfitionalDialog } from './edit-user-profitional-dialog';

describe('EditUserProfitionalDialog', () => {
  let component: EditUserProfitionalDialog;
  let fixture: ComponentFixture<EditUserProfitionalDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserProfitionalDialog],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: new User({ id: 'contact-1' }) },
        { provide: MatDialogRef, useValue: { close: () => undefined } },
        { provide: ContactService, useValue: { updateContact: () => Promise.resolve() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserProfitionalDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
