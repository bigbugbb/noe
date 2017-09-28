import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolComponent } from './school.component';


const routes: Routes = [  
  {    
    path: '',    
    component: SchoolComponent,  
    data: {
      title: ''
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule {}
