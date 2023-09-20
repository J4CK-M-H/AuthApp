import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject( Router );

  public myForm: FormGroup = this.fb.group({
    username: ['prueba.pass@gmail.com', [Validators.required, Validators.minLength(10)]],
    password: ['pruebaSeleccion', [Validators.required, Validators.minLength(3)]],
  });

  login() {

    const { username, password } = this.myForm.value;

    this.authService.login(username, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (err) =>{
          console.log(err);
          
        }
      })
  }
}
