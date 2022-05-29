import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Passenger } from '../shared/models/passenger-registration.model';
import { PassengerService } from '../shared/service/passenger.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { MessageService } from '../../shared/services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passeger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent implements OnInit {
  public displayedColumns: string[] = ['nombres', 'apellidos', 'nacionalidad', 'tipoDocumento', 'numeroDocumento', 'select'];
  public dataSource = new MatTableDataSource<Passenger>([]);
  public selection = new SelectionModel<Passenger>(true, []);
  
  private unsubscribe$ = new Subject<boolean>();
  private listaPasajeros: Passenger[] = [];

  constructor(
    private router: Router,
    private passengerService: PassengerService,
    private messageService: MessageService
  ) { }

  public get toogleDeleteButton() {
    return this.selection.selected.length === 0;
  }

  public get toogleCreateButton() {
    return this.listaPasajeros.length >= 4;
  }

  public get numeroPasajeros() {
    return this.listaPasajeros.length;
  }

  ngOnInit(): void {
    this.loadData();
  }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  public deletePasajeros(): void {
    const pasajerosSeleccionado = this.selection.selected;
    let nuevaLista = this.listaPasajeros.filter(({ id }) =>
      pasajerosSeleccionado.every(({ id: idSeleccionado }) => idSeleccionado !== id));


    this.passengerService.savePassenger(nuevaLista)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.selection.clear()),
        tap(() => this.messageService.openSnackBar('Eliminación exitosa', 'Cerrar')),
        tap(() => this.loadData())
      )
      .subscribe();

  }

  public navigateToForm (): void {
    this.router.navigateByUrl('passenger/form');
  }

  private loadData = (): void => {
    this.passengerService.getPassenger()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((listaPasajeros: Passenger[]) => {
          this.listaPasajeros = listaPasajeros;
          this.dataSource.data = listaPasajeros;
        })
      ).subscribe();
  }
}
