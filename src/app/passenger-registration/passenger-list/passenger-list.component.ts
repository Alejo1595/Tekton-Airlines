import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Passenger } from '../shared/models/passenger-registration.model';
import { PassengerService } from '../shared/service/passenger.service';

@Component({
  selector: 'app-passeger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent implements OnInit {
  displayedColumns: string[] = ['nombres', 'apellidos', 'nacionalidad', 'tipoDocumento', 'numeroDocumento', 'select'];
  dataSource = new MatTableDataSource<Passenger>([]);
  selection = new SelectionModel<Passenger>(true, []);

  constructor(private passengerService: PassengerService) { }

  public get toogleDeleteButton () {
    return this.selection.selected.length === 0;
  }

  ngOnInit(): void {
    this.passengerService.getPassenger().subscribe((list: Passenger[]) => {
      this.dataSource.data = list;
    })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
}
