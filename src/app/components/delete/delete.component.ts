import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MeetingService } from 'src/app/service/meeting.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  public idDelete:string;

  constructor(
    private Service: MeetingService,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string,
    private router: Router
  ) {
    this.idDelete = data;
  }

  ngOnInit(): void {
  }

  cancel(){
    this.dialogRef.close();
  }

  delete(){
    this.Service.delete(this.idDelete).subscribe( result => {
      console.log('Meeting Delete', result);
     },
     err => {
       console.log('Err', err);
     });
     console.log(this.idDelete);
     this.dialogRef.close(true);
     window.location.reload();
  }

}
