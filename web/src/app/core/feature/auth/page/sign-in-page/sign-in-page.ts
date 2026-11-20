import { Component } from '@angular/core';
import { AuthHeader } from '../../component/auth-header/auth-header';

@Component({
  imports: [AuthHeader],
  selector: 'app-sign-in-page',
  styleUrl: './sign-in-page.scss',
  templateUrl: './sign-in-page.html',
})
export class SignInPage {}
