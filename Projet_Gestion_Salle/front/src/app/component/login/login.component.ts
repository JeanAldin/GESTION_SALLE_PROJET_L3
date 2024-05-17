import { Component , Output, EventEmitter ,Input} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule,MatCardModule,MatFormField,FormsModule,],
  template: `
    <mat-card>
            <mat-card-title>Login</mat-card-title>
      <mat-card-content>
        <form  (ngSubmit)="submit()">
          <p>
            <mat-form-field>
              <input type="text" matInput placeholder="Username" formControlName="username">
            </mat-form-field>
          </p>

          <p>
            <mat-form-field>
              <input type="password" matInput placeholder="Password" formControlName="password">
            </mat-form-field>
          </p>

          <p *ngIf="error" class="error">
            {{ error }}
          </p>

          <div class="button">
            <button type="submit" mat-button>Login</button>
          </div>

        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`  :host {
    display: flex;
    justify-content: center;
    margin: 100px 0px;
  }

  .mat-form-field {
    width: 100%;
    min-width: 300px;
  }

  mat-card-title,
  mat-card-content {
    display: flex;
    justify-content: center;
  }

  .error {
    padding: 16px;
    width: 300px;
    color: white;
    background-color: red;
  }

  .button {
    display: flex;
    justify-content: flex-end;
  }`]
})
export default class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  @Input() error !: string | null;

  @Output() submitEM = new EventEmitter();
}
