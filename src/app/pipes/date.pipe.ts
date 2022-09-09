import { Pipe, PipeTransform } from '@angular/core';
import  * as moment  from 'moment';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  constructor(){
    moment.locale('es', {
      months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
      monthsShort: 'ENE_FEB_MAR_ABR_MAY_JUN_JUL_AGO_SEPT_OCT_NOV_DEC'.split('_'),
      weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
      weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
      weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
    });
  }

  transform(value: string): unknown {
    return moment(value).format('DD/MMM/YYYY');
  }

}
