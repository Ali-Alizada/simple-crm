
import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

import { User } from '../../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private firestore = inject(Firestore);
  private injector = inject(Injector);

  addContact(user: User) {
    return runInInjectionContext(this.injector, () => {
      const contactsCollection = collection(
        this.firestore,
        'contacts'
      );

      return addDoc(contactsCollection, {
        ...user,
        createdAt: serverTimestamp()
      });
    });
  }

  getContacts(): Observable<User[]> {
    return runInInjectionContext(this.injector, () => {
      const contactsCollection = collection(this.firestore, 'contacts');

      return collectionData(contactsCollection).pipe(
        map((contacts) => contacts.map((contact) => new User(contact)))
      );
    });
  }
}
