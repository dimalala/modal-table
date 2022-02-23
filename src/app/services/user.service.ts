import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  checkIfUsernameExists(value: string, existingUsernames: string[] = []) {
    return of(existingUsernames.some((a) => a === value)).pipe(
      delay(1000)
    );
  }
}
