import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Device } from 'src/model/device';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})

export class DevicesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'color', 'partNumber', 'category','action'];
  //dataSource: Device[];
  isLoadingResults = true;
  dataSource = new MatTableDataSource();

  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    this._api.getDevices()
    .subscribe(res => {
      this.dataSource.data = res;
      console.log('ngOnInit getDevice = '+ JSON.stringify( this.dataSource.data));
      this.isLoadingResults = false;
    }, err => {
      //console.log('Carlos'+err);
      this.isLoadingResults = false;
    });
  }

  deleteDevice(rowid: number)
  {
    console.log("RowId:"+rowid);
    this._api.deleteDevice(rowid)
      .subscribe(() => console.log("device deleted"));;   

    const index = this.dataSource.data.indexOf(rowid);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
 
   }

}
