import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

import { Subject, takeUntil, tap } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';

import { MessageService } from '../../shared/services/message.service';

import { Passenger } from '../shared/models/passenger-registration.model';
import { PassengerService } from '../shared/service/passenger.service';


@Component({
  selector: 'app-passeger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent implements OnInit {
  public displayedColumns: string[] = ['names', 'lastnames', 'nacionality', 'documentType', 'documentNumber', 'select'];
  public dataSource = new MatTableDataSource<Passenger>([]);
  public selection = new SelectionModel<Passenger>(true, []);

  private unsubscribe$ = new Subject<boolean>();
  private listPassengers: Passenger[] = [];

  constructor(
    private router: Router,
    private passengerService: PassengerService,
    private messageService: MessageService
  ) { }

  public get toogleDeleteButton() {
    return this.selection.selected.length === 0;
  }

  public get toogleCreateButton() {
    return this.listPassengers.length >= 4;
  }

  public get numberPassengers() {
    return this.listPassengers.length;
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

  public deletePassengers(): void {
    const passengersSelected = this.selection.selected;
    let newList = this.listPassengers.filter(({ id }) =>
      passengersSelected.every(({ id: idSeleccionado }) => idSeleccionado !== id));


    this.passengerService.savePassenger(newList)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.selection.clear()),
        tap(() => this.messageService.openSnackBar('Successful elimination', 'Close')),
        tap(() => this.loadData())
      )
      .subscribe();

  }

  public navigateToForm(): void {
    this.router.navigateByUrl('passenger/form');
  }

  private loadData = (): void => {
    this.passengerService.getPassenger()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((listPassengers: Passenger[]) => {
          const list = Array.from(listPassengers);
          this.listPassengers = list;
          this.dataSource.data = list;
        })
      ).subscribe();
  }
}
