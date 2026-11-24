import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-auth-router',
  styleUrl: './auth-router.scss',
  templateUrl: './auth-router.html',
})
export class AuthRouter {}
