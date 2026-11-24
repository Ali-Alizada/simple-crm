
import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  docData,
  serverTimestamp,
  updateDoc,
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
      const contactsCollection = collection(this.firestore, 'contacts');
      const contactData: Partial<User> = { ...user };
      delete contactData.id;

      return addDoc(contactsCollection, {
        ...contactData,
        createdAt: serverTimestamp()
      });
    });
  }

  getContacts(): Observable<User[]> {
    return runInInjectionContext(this.injector, () => {
      const contactsCollection = collection(this.firestore, 'contacts');

      return collectionData(contactsCollection, { idField: 'id' }).pipe(
        map((contacts) => contacts.map((contact) => new User(contact)))
      );
    });
  }

  getContactById(id: string): Observable<User | null> {
    return runInInjectionContext(this.injector, () => {
      const contactRef = doc(this.firestore, 'contacts', id);

      return docData(contactRef).pipe(
        map((contact) => contact ? new User({ ...contact, id }) : null)
      );
    });
  }

  updateContact(id: string, changes: Partial<User>) {
    return runInInjectionContext(this.injector, () => {
      const contactRef = doc(this.firestore, 'contacts', id);
      const contactChanges: Partial<User> = { ...changes };
      delete contactChanges.id;

      return updateDoc(contactRef, {
        ...contactChanges,
        updatedAt: serverTimestamp(),
      });
    });
  }
}
