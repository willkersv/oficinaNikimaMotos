import { Routes } from '@angular/router';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { MotoFormComponent } from './components/moto-form/moto-form.component';

export const routes: Routes = [
  { path: '', component: KanbanBoardComponent },
  { path: 'motos/nova', component: MotoFormComponent },
  { path: 'motos/:id/editar', component: MotoFormComponent },
  { path: '**', redirectTo: '' }
];
