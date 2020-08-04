import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

import {Exam} from './admin/exam';

@Injectable({
  providedIn: 'root',
})

export class ExamsMemoryDataService implements InMemoryDbService {
  createDb() {
    //KKM = 75
    const exams = [
      { id:'1', student:'Robi', score:'77', exam_date:'2020-02-22', status:'LULUS' },
      { id:'2', student:'Cahya', score:'60', exam_date:'2020-02-22', status:'TIDAK LULUS' },
      { id:'3', student:'Lundara', score:'90', exam_date:'2020-02-22', status:'LULUS' },
      { id:'4', student:'Budi', score:'50', exam_date:'2020-02-22', status:'TIDAK LULUS' },
      { id:'5', student:'Setiawan', score:'80', exam_date:'2020-02-22', status:'LULUS' },
      { id:'6', student:'Garox', score:'65', exam_date:'2020-02-22', status:'TIDAK LULUS' },
      { id:'7', student:'Sandy', score:'30', exam_date:'2020-02-22', status:'TIDAK LULUS' },
      { id:'8', student:'Spongebob', score:'80', exam_date:'2020-02-22', status:'LULUS' },
      { id:'9', student:'Patrick', score:'100', exam_date:'2020-02-22', status:'LULUS' },
      { id:'10', student:'Squidward', score:'70', exam_date:'2020-02-22', status:'TIDAK LULUS' },
      { id:'11', student:'Mr. Crab', score:'45', exam_date:'2020-02-22', status:'TIDAK LULUS' },
      { id:'12', student:'Plankton', score:'75', exam_date:'2020-02-22', status:'LULUS' },
      { id:'13', student:'Mrs. Puff', score:'90', exam_date:'2020-02-22', status:'LULUS' },
      { id:'14', student:'Larry Lobster', score:'60', exam_date:'2020-02-22', status:'TIDAK LULUS' },
      { id:'15', student:'Mr. Jenkins', score:'70', exam_date:'2020-02-22', status:'TIDAK LULUS' }
    ];
    return {exams};
  }

  genId(exams: Exam[]): number {
    return exams.length > 0 ? Math.max(...exams.map(exam => exam.id)) + 1 : 1;
  }
}
