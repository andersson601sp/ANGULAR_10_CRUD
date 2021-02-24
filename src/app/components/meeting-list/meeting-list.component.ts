import { DeleteComponent } from './../delete/delete.component';
import { MeetingFormComponent } from './../meeting-form/meeting-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MeetingService } from 'src/app/service/meeting.service';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {

  displayedColumns: string[] = ['meetingName', 'meetingSubject', 'meetingResponsible','meetingDate', 'meetingTime', 'action'];
  meetings = [];
  length: number;
  meetingNameFind: string;
  totalRecordsPerPage: number = 5;
  meetingDateFind: string;

  constructor(private service: MeetingService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.findAll(0, 'meetingDate', null);
  }

  findAll(pageNumber: number, sortField: string, filters: string){
    this.service.getByAll(pageNumber, this.totalRecordsPerPage, sortField, filters).subscribe(meetingsReturn => {
        this.meetings = meetingsReturn['meeting'];
        this.length = meetingsReturn['page'].size;

    }, err => {
        console.log('erro', err);
        console.log('erro status', err.status);
        console.log('erro error', err.error);
        console.log('erro headers', err.headers);
    });
  }

  getServerData(event?:PageEvent){
    this.findAll(event.pageIndex, 'data', null);

  }

edit(idEdit:string){
  const dialogRef = this.dialog.open(MeetingFormComponent, {
    width: '500px',
    data: idEdit
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

ConfirmDelete(idDelete:string){
  console.log(idDelete);
  const dialogRef = this.dialog.open(DeleteComponent, {
    width: '500px',
    data: idDelete
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

findByParameter(){
  let filters = '';

  if(this.meetingNameFind != null && this.meetingNameFind != ''){
    filters += 'meetingName=' + this.meetingNameFind;
  }


  if(this.meetingDateFind != null){
    if(filters != ''){
      filters += ';';
    }

    let newDate: moment.Moment = moment.utc(this.meetingDateFind).local();

    filters += 'meetingDate=' + newDate.format("YYYY-MM-DDTHH:mm:ss")+'.000Z';
    console.log(filters);
  }
  this.findAll(0, 'meetingDate', filters);

}

}
