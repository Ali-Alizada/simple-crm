import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { provideRouter, Router } from '@angular/router';
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
                  id: 'contact-123',
                  email: 'ada@example.com',
                  street: 'Main Street',
                  houseNo: '1',
                  zipCode: '12345',
                  city: 'London',
                  birthDate: 0,
                },
              ]),
          },
        },
        provideRouter([]),
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
    expect(fixture.nativeElement.textContent).toContain('ada@example.com');
    expect(fixture.nativeElement.textContent).toContain('London');
  });

  it('should navigate to the contact detail when its row is clicked', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const row = fixture.nativeElement.querySelector('tbody tr') as HTMLTableRowElement;

    row.click();

    expect(navigateSpy).toHaveBeenCalledWith(['/user', 'contact-123']);
  });
});
