import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Moto } from '../../models/moto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-moto-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './moto-card.component.html',
  styleUrls: ['./moto-card.component.scss']
})
export class MotoCardComponent {
  @Input() moto!: Moto;

  total(): number {
    return (this.moto.servicos || []).reduce((sum, s) => sum + (s.preco || 0), 0);
  }
}