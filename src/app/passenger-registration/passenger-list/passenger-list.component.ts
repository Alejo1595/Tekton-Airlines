import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Passenger } from '../shared/models/passenger-registration.model';
import { PassengerService } from '../shared/service/passenger.service';
import { Subject, takeUntil, tap } from 'rxjs';

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

  constructor(private passengerService: PassengerService) { }

  public get toogleDeleteButton() {
    return this.selection.selected.length === 0;
  }

  ngOnInit(): void {
    this.passengerService.getPassenger()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((list: Passenger[]) => {
          this.dataSource.data = list;
        })
      ).subscribe();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
}
