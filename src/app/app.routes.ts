import { Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Dashboard } from './dashboard/dashboard';
import { User } from './user/user';

export const routes: Routes = [
  {path: 'dashboard', component: Dashboard},
  {path: 'user', component: User},

];
