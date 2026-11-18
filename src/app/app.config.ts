import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp }
  from '@angular/fire/app';

import { provideFirestore, getFirestore }
  from '@angular/fire/firestore';

import { provideAuth, getAuth }
  from '@angular/fire/auth';

import { environment } from '../environments/environment';


export const appConfig: ApplicationConfig = {
  providers: [
      provideFirebaseApp(() =>
    initializeApp(environment.firebase)
  ),

    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),

    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNativeDateAdapter(),
  ],
};
