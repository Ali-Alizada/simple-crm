import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { of } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { User } from '../../models/user.class';
import { ContactService } from '../services/contact';
import { EditUserBasicDialog } from '../edit-user-basic-dialog/edit-user-basic-dialog';
import { EditUserPersonalDialog } from '../edit-user-personal-dialog/edit-user-personal-dialog';
import { EditUserProfitionalDialog } from '../edit-user-profitional-dialog/edit-user-profitional-dialog';
import { UserDetailComponent } from './user-detail';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  const dialog = { open: vi.fn() };
  const contact = new User({ id: 'contact-1' });

  beforeEach(async () => {
    dialog.open.mockClear();

    await TestBed.configureTestingModule({
      imports: [UserDetailComponent],
      providers: [
        provideRouter([]),
        provideNativeDateAdapter(),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: contact.id })) },
        },
        { provide: MatDialog, useValue: dialog },
        {
          provide: ContactService,
          useValue: { getContactById: () => of(contact) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('opens the basic details dialog with the selected contact', () => {
    component.editBasic(contact);

    expect(dialog.open).toHaveBeenCalledWith(
      EditUserBasicDialog,
      expect.objectContaining({ data: contact })
    );
  });

  it('opens the personal details dialog with the selected contact', () => {
    component.editPersonal(contact);

    expect(dialog.open).toHaveBeenCalledWith(
      EditUserPersonalDialog,
      expect.objectContaining({ data: contact })
    );
  });

  it('opens the professional details dialog with the selected contact', () => {
    component.editProfessional(contact);

    expect(dialog.open).toHaveBeenCalledWith(
      EditUserProfitionalDialog,
      expect.objectContaining({ data: contact })
    );
  });
});
