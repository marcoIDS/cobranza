import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ListComponent, ModalAddUserDialog } from './list/list.component';
import { DetailsComponent, ModalAddAbonoDialog, ModalAddPrestamoDialog } from './details/details.component';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from 'src/app/pipes/date.pipe';


@NgModule({

  declarations: [
    UsersComponent,
    ListComponent,
    DetailsComponent,
    ModalAddUserDialog,
    ModalAddPrestamoDialog,
    ModalAddAbonoDialog,
    DatePipe
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents:[
    ModalAddUserDialog,
    ModalAddPrestamoDialog,
    ModalAddAbonoDialog
  ]

})
export class UsersModule { }
