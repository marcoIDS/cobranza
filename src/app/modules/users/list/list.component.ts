import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

export interface PeriodicElement {
  name: string;
  phone: string;
  address: string;
  _id: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'phone', 'address', 'actions'];
  valueSearch:string = ""
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator) paginator: any;

  constructor(
    private userService: UsersService,
    private router: Router,
    private dialog: MatDialog
  ){

  }

  ngOnInit(){
    
  } 

  ngAfterViewInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((res:any) =>{
      console.log(res)
      this.dataSource = new MatTableDataSource<PeriodicElement>(res);
      this.dataSource.paginator = this.paginator;
    })
  }

  keyUp(event:any){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  gotoDetails(user:any){
    sessionStorage.setItem('userActualId', user._id);
    this.router.navigateByUrl('users/details')
  }
  
  deleteUser(user:any){
    this.userService.deleteUser(user._id).subscribe(res => {
      this.userService.getUsers().subscribe((res:any) =>{
        console.log(res)
        this.dataSource = new MatTableDataSource<PeriodicElement>(res);
        this.dataSource.paginator = this.paginator;
      })
    })
  }

  addUser(){
    const dialogRef = this.dialog.open(ModalAddUserDialog, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        alert('Cliente agregago con éxito');
        this.getUsers();
      }
    });
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal-alta-usuario.component.html',
  styleUrls: ['./list.component.scss']
})
export class ModalAddUserDialog {
  formUser:FormGroup
  constructor(
    public dialogRef: MatDialogRef<ModalAddUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fbuilder: FormBuilder,
    private userService: UsersService
  ) {
    this.formUser = fbuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    })
  }

  saveModal(): void {
    this.userService.addUser(this.formUser.value).subscribe(resp=>{
      console.log(resp);
      this.dialogRef.close(true);
    })
  }
}