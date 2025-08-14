import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoService } from '../../services/moto.service';
import { Moto } from '../../models/moto';
import { Servico } from '../../models/servico';
import { TipoServico } from '../../models/tipo-servico';

@Component({
  selector: 'app-moto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './moto-form.component.html',
  styleUrls: ['./moto-form.component.scss']
})
export class MotoFormComponent implements OnInit {
  form!: FormGroup;
  editId: number | null = null;
  salvando = signal(false);
  erro = signal<string | null>(null);

  tipos: TipoServico[] = ['PECA', 'SERVICO'];
  statusList = ['AGUARDO', 'ANDAMENTO', 'CONCLUIDO'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private motoSvc: MotoService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      modelo: ['', Validators.required],
      placa: ['', Validators.required],
      dataEntrada: [''],
      status: ['AGUARDO', Validators.required],
      mecanicoResponsavel: ['', Validators.required],
      funcionarioNota: ['', Validators.required],
      servicos: this.fb.array([])
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = +id;
      this.motoSvc.buscarPorId(this.editId).subscribe({
        next: (m) => this.patchForm(m),
        error: (e) => { this.erro.set('Falha ao carregar moto.'); console.error(e); }
      });
    } else {
      
      this.addServico();
    }
  }

  get servicos(): FormArray { return this.form.get('servicos') as FormArray; }

  novoServico(s?: Partial<Servico>): FormGroup {
    return this.fb.group({
      descricao: [s?.descricao || '', Validators.required],
      preco: [s?.preco ?? 0, [Validators.required, Validators.min(0)]],
      tipo: [s?.tipo || 'SERVICO', Validators.required],
      realizadoPor: [s?.realizadoPor || '', Validators.required],
    });
  }

  addServico() { this.servicos.push(this.novoServico()); }
  removerServico(i: number) { this.servicos.removeAt(i); }

  patchForm(m: Moto) {
    this.form.patchValue({
      modelo: m.modelo,
      placa: m.placa,
      dataEntrada: m.dataEntrada || '',
      status: m.status,
      mecanicoResponsavel: m.mecanicoResponsavel,
      funcionarioNota: m.funcionarioNota,
    });
    this.servicos.clear();
    (m.servicos || []).forEach(s => this.servicos.push(this.novoServico(s)));
    if (this.servicos.length === 0) this.addServico();
  }

  salvar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.salvando.set(true);
    this.erro.set(null);

    const payload: Moto = this.form.value;

    const op$ = this.editId
      ? this.motoSvc.atualizar(this.editId, payload)
      : this.motoSvc.criar(payload);

    op$.subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (e) => { this.erro.set('Falha ao salvar.'); console.error(e); this.salvando.set(false); }
    });
  }
}
