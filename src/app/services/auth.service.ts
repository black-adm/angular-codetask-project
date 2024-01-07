import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient
  private _currentUser: BehaviorSubject<boolean | User | any> =
    new BehaviorSubject(null)

  constructor(private router: Router) { 
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    )

    const user = this.supabase.auth.getUser()
    console.log('user :', user)

    if (user) this._currentUser.next(user)
    this._currentUser.next(false)

    this.supabase.auth.onAuthStateChange((event, session) => {
          console.log('event : ', event)
          console.log('session : ', session)

          if (event === 'SIGNED_IN') this._currentUser.next(session?.user)
          this._currentUser.next(false)
          this.router.navigateByUrl('/', { replaceUrl: true })
        }
      )
  }

  login(email: string) {
    return this.supabase.auth.signInWithOtp({  email  })
  }

  logout() {
    this.supabase.auth.signOut();
  }

  get currentUser() {
    return this._currentUser.asObservable()
  }
}
