import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { JsonWebKey } from 'crypto';
import internal from 'stream';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apollo: Apollo) {}
  token : any  | null  = null;


  login(design_user: string, id_role: number, mdp: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.apollo.mutate({
        mutation: gql`
          mutation($design_user: String!, $id_role: Int!, $mdp: String!) {
            login(verifylogin: { design_user: $design_user, id_role: $id_role, mdp: $mdp }) {
              token
            }
          }
        `,
        variables: { design_user, id_role, mdp }
      }).subscribe({
        next: (result: any) => {
          this.token = result.data.login.token;
          localStorage.setItem('token', this.token);
          resolve();
        },
        error: (error: any) => {
          console.error('Erreur lors de la connexion :', error);
          reject(error);
        }
      });
    });
  }



  logout() {
    this.token = null;
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = (token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }



}
