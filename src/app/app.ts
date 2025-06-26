import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../Components/header/header';
import { Dashboard } from '../Components/dashboard/dashboard';
import { Footer } from '../Components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Dashboard, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Angular-httpclient';
}
