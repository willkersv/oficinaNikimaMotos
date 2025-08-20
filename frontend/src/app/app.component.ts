import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header class="app-header">
      <h1>Nikima Oficina</h1>
      <nav>
        <a routerLink="/">Kanban</a>
        <a routerLink="/motos/nova">Nova Moto</a>
      </nav>
    </header>

    <main class="container">
      <router-outlet />
    </main>
  `,
  styles: [`
    .app-header {
      display:flex; align-items:center; justify-content:space-between;
      padding: 12px 20px; border-bottom:1px solid #eee; background:#fafafa;
    }
    nav a { margin-right:12px; text-decoration:none; }
    .container { padding: 16px; }
  `]
})
export class AppComponent {}
