import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clean(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.clear();
    }
  }

  getUserRoles(): string[] {
    if (typeof window !== 'undefined' && window.sessionStorage){
      const roles = sessionStorage.getItem('roles');
      return roles ? JSON.parse(roles) : [];
    }
    else {
      return [];
    }
  }

  hasRole(role: string): boolean {
    if (typeof window !== 'undefined' && window.sessionStorage){
      return this.getUser().roles.includes(role);
    }
    return false;
  }

  public saveUser(user: any): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  public getUser(): any {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const user = window.sessionStorage.getItem(USER_KEY);
      if (user) {
        return JSON.parse(user);
      }
    }
    return null;
  }

  public getToken(): string | null {
    const user = this.getUser();
    if (user && user.token) {
      return user.token;
    }
    return null;
  }

  isLogged(): boolean {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const userString = sessionStorage.getItem(USER_KEY);
      if (!userString) return false;

      const user = JSON.parse(userString);
      if (user.token) {
        return true;
      }
    }
    return false;
  }



  public isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const user = window.sessionStorage.getItem(USER_KEY);
      return user !== null;
    }
    return false;
  }
}
