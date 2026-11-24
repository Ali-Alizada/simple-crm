import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ContactService } from '../services/contact';
import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        provideRouter([]),
        { provide: MatDialog, useValue: { open: () => undefined } },
        { provide: ContactService, useValue: { getContacts: () => of([]) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show empty dashboard metrics when there are no contacts', () => {
    expect(fixture.nativeElement.textContent).toContain('Total contacts');
    expect(fixture.nativeElement.textContent).toContain('No contacts yet.');
  });
});
