import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = { login: this.username, password: this.password };

    this.http.post('https://blood-bank-fbfe212a842b.herokuapp.com/auth', loginData).subscribe(
      (response: any) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/dashboard']);
        } else {
          alert('Login falhou');
        }
      },
      (error) => {
        alert('Erro ao fazer login');
      }
    );
  }
}
