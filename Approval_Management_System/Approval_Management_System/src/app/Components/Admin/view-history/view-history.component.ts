import { DataServicesService } from 'src/app/Core/data-services.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { formatDate, formatNumber } from '@angular/common';
import { CheckboxSelectionCallbackParams, ValueFormatterParams } from 'ag-grid-community';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.css'],
})
export class ViewHistoryComponent implements OnInit {
  detailedRequest: any;

  dateFormatter:any="dd/m/yyyy";
  firstName: any = localStorage.getItem('AdminfirstName');
  lastName: any = localStorage.getItem('AdminlastName');
  name: any = this.firstName + this.lastName;
  constructor(private userdata: DataServicesService) {}
  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  // dataSource!: MatTableDataSource<any>;

  // displayedColumns: string[] =  [ 'id','name','purpose', 'description', 'estimateCost','status','comments','date'];

  columnDefs:any = [
    {
      headerName: 'id',
      field: 'id',
      filter: 'agNumberColumnFilter',
      columnGroupShow: 'open',
      resizable: true,
      sortable: true,
      animateRows: true,
      rowDrag: true


      // lockpinned:true,


      // pinned: 'left'
    },
    { headerName: 'name', field: 'name', sortable: true,filter:'agTextColumnFilter'},
    { headerName: 'purpose', field: 'purpose' },
    { headerName: 'description', field: 'description' ,valueFormatter:this.bracketsFormatter},
    {
      headerName: 'estimateCost',
      field: 'estimateCost',
      filter: 'agSetColumnFilter',
      filterParams: {
        applyMiniFilterWhileTyping: true,
      },
      valueFormatter: this.currencyFormatter
    },
    { headerName: 'status', field: 'status', filter: true },
    {
      headerName: 'comments',
      field: 'comments',
      filter: 'agDateColumnFilter',
      editable: true,
      // pass in additional parameters to the text filter
      filterParams: {
        buttons: ['reset', 'apply'],
        debounceMs: 200,
      },


    }
//     { headerName: 'date', field: 'date' ,cellRenderer: 'dd/m/yyyy'

// },
  ];

  public currencyFormatter(rowData: ValueFormatterParams) {
    return '£' + rowData.value;
  }

  public bracketsFormatter(rowData: ValueFormatterParams) {
    return '(' + rowData.value + ')';
  }


  rowData: any;
  ngOnInit(): void {
    // this.userdata.getuserData().subscribe({next:(response:any)=>{
    //   this.dataSource=new MatTableDataSource(response.filter((item:any)=>item.name==this.name));
    //   this.detailedRequest=response;
    //   this.dataSource.paginator = this.paginator;
    //   console.log(this.dataSource)
    // }});
    this.rowData = this.userdata.getuserData();
  }
}
