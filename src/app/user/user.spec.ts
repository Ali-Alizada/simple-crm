import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { ContactService } from '../services/contact';
import { UserComponent } from './user';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [
        { provide: MatDialog, useValue: { open: vi.fn() } },
        {
          provide: ContactService,
          useValue: {
            getContacts: () =>
              of([
                {
                  firstName: 'Ada',
                  lastName: 'Lovelace',
                  street: 'Main Street',
                  houseNo: '1',
                  zipCode: '12345',
                  city: 'London',
                  birthDate: 0,
                },
              ]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render saved contacts in the table', () => {
    expect(fixture.nativeElement.textContent).toContain('Ada Lovelace');
    expect(fixture.nativeElement.textContent).toContain('Main Street 1');
    expect(fixture.nativeElement.textContent).toContain('12345 London');
  });
});
