import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AbonosService } from 'src/app/services/abonos/abonos.service';
import { PrestamosService } from 'src/app/services/prestamos/prestamos.service';
import { UsersService } from 'src/app/services/users/users.service';

export interface PeriodicElement {
  pago_semanal: string;
  monto_total: string;
  monto_abonado: string;
  fecha_desembolso: string;
  abonos: any;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  displayedColumns: string[] = ['pago_semanal', 'monto_total', 'monto_abonado', 'fecha_desembolso', 'actions'];
  infoClient:any;
  userId = ""  ;
  formUser:FormGroup;
  dataSource = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatPaginator) paginator: any;
  actualPrestamo:any;
  constructor(
    private userService: UsersService,
    private router: Router,
    private formBuilder: FormBuilder,
    private prestamosService: PrestamosService,
    private dialog: MatDialog,
  ) { 
    this.formUser = formBuilder.group({
      _id: [''],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    })
  }

  get form(){
    return this.formUser.controls;
  }

  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userActualId')+'';
    this.userService.getUserById(this.userId).subscribe(res =>{
      this.infoClient = res;
      this.form['_id'].setValue(this.infoClient._id);
      this.form['name'].setValue(this.infoClient.name);
      this.form['phone'].setValue(this.infoClient.phone);
      this.form['address'].setValue(this.infoClient.address);
    });
    this.getPrestamos();
  }

  getPrestamos(){
    this.prestamosService.getPrestamosByClient(this.userId).subscribe((res:any) =>{
      console.log(res)
      if (res){
        this.dataSource = new MatTableDataSource<PeriodicElement>(res);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  return(){
    window.history.back();
  }

  saveUser(){
    this.userService.update(this.formUser.value).subscribe(res=>{
      if(res){
        alert('Cambios guardados');
        console.log(res);
        this.infoClient = res;
        this.form['_id'].setValue(this.infoClient._id);
        this.form['name'].setValue(this.infoClient.name);
        this.form['phone'].setValue(this.infoClient.phone);
        this.form['address'].setValue(this.infoClient.address);
      }
    })
  }


  addAbono(prestamo:any){
    const dialogRef = this.dialog.open(ModalAddAbonoDialog, {
      width: '450px',
      data:{
        prestamo: prestamo._id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        alert('Abono agregago con éxito');
        this.actualPrestamo = null; 
        this.getPrestamos();
      }
    });
  }

  addPrestamo(){
    const dialogRef = this.dialog.open(ModalAddPrestamoDialog, {
      width: '450px',
      data:{
        usuario: this.userId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        alert('Prestamo agregago con éxito');
        this.getPrestamos();
      }
    });
  }

}

@Component({
  selector: 'modal-alta-prestamo',
  templateUrl: './modal-alta-prestamos.component.html',
  styleUrls: ['./details.component.scss']
})
export class ModalAddPrestamoDialog {
  formPrestamo:FormGroup
  constructor(
    public dialogRef: MatDialogRef<ModalAddPrestamoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fbuilder: FormBuilder,
    private prestamosService: PrestamosService
  ) {
    this.formPrestamo = fbuilder.group({
      usuario:[data.usuario],
      pago_semanal: ['', Validators.required],
      monto_total: ['', Validators.required],
      fecha_desembolso: ['']
    })
  }

  saveModal(): void {
    this.prestamosService.addPrestamo(this.formPrestamo.value).subscribe(resp=>{
      console.log(resp);
      this.dialogRef.close(true);
    })
  }
}


@Component({
  selector: 'modal-alta-prestamo',
  templateUrl: './modal-alta-abonos.component.html',
  styleUrls: ['./details.component.scss']
})
export class ModalAddAbonoDialog {
  formPrestamo:FormGroup
  constructor(
    public dialogRef: MatDialogRef<ModalAddAbonoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fbuilder: FormBuilder,
    private abonosService: AbonosService
  ) {
    this.formPrestamo = fbuilder.group({
      prestamo:[data.prestamo],
      cantidad_abonada: ['', Validators.required],
      fecha_abono: ['', Validators.required]
    })
  }

  saveModal(): void {
    this.abonosService.addAbono(this.formPrestamo.value).subscribe(resp=>{
      console.log(resp);
      this.dialogRef.close(true);
    })
  }
}