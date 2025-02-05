import { RejectDialogComponent } from '../reject-dialog/reject-dialog.component';
import { CreateRequestFormComponent } from '../create-request-form/create-request-form.component';
 import { DataServicesService } from '../../../Core/data-services.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  latestRequest: any;
  totalRequest:any;

  firstName: any = localStorage.getItem('AdminfirstName');

  constructor(private matdialog: MatDialog,private userdata: DataServicesService) {}

  ngOnInit(): void {
    this.userdata.getuserData().subscribe((response: any) => {
      this.latestRequest =response;
      this.totalRequest=Object.values(response.filter((item:any)=>item.approved==true && item.reject==true)).length;
      console.log(this.totalRequest);
    });


  }

  opneAddRequestDialog() {
    this.matdialog.open(CreateRequestFormComponent, {
      width: '450px',
    });
  }
  rejectDialog(){
    this.matdialog.open(RejectDialogComponent, {
      width: '450px',
    });
  }
}
