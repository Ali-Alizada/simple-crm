
import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';

import {
  Firestore,
  collection,
  addDoc,
  serverTimestamp,
  getDocsFromServer
} from '@angular/fire/firestore';

import { User } from '../../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private firestore = inject(Firestore);
  private injector = inject(Injector);

  async addContact(user: User) {

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


  // Testweise

//   async testConnection() {
//   return runInInjectionContext(this.injector, () => {
//     const contactsCollection = collection(
//       this.firestore,
//       'contacts'
//     );

//     return getDocsFromServer(contactsCollection);
//   });
// }
}
