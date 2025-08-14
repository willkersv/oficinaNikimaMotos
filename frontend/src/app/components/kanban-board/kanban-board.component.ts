import { Component, OnInit, Signal, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDropList, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MotoService } from '../../services/moto.service';
import { Moto } from '../../models/moto';
import { Status } from '../../models/status';
import { MotoCardComponent } from '../moto-card/moto-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag, MotoCardComponent, RouterLink],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  
  aguardo = signal<Moto[]>([]);
  andamento = signal<Moto[]>([]);
  concluido = signal<Moto[]>([]);

  carregando = signal(false);
  erro = signal<string | null>(null);

  connected = ['aguardoList', 'andamentoList', 'concluidoList'];

  constructor(private motoSvc: MotoService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.carregando.set(true);
    this.erro.set(null);
    this.motoSvc.listar().subscribe({
      next: (motos) => {
        this.aguardo.set(motos.filter(m => m.status === 'AGUARDO'));
        this.andamento.set(motos.filter(m => m.status === 'ANDAMENTO'));
        this.concluido.set(motos.filter(m => m.status === 'CONCLUIDO'));
        this.carregando.set(false);
      },
      error: (e) => {
        this.erro.set('Falha ao carregar motos.');
        this.carregando.set(false);
        console.error(e);
      }
    });
  }

  drop(event: CdkDragDrop<Moto[]>, destino: Status) {
    const prev = event.previousContainer.data;
    const curr = event.container.data;

    if (event.previousContainer === event.container) {
      moveItemInArray(curr, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(prev, curr, event.previousIndex, event.currentIndex);
      // atualiza status no backend
      const moved = curr[event.currentIndex];
      if (moved && moved.id) {
        this.motoSvc.atualizarStatus(moved.id, destino).subscribe({
          next: (mAtualizada) => {
            // reflete novo status no item
            moved.status = mAtualizada.status;
          },
          error: (e) => {
            console.error('Erro ao atualizar status', e);
            // rollback simples: recarrega
            this.load();
          }
        });
      }
    }
  }
}
