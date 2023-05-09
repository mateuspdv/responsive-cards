import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonCardComponent } from './components/person-card/person-card.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    PersonListComponent,
    PersonCardComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    CardModule,
    ButtonModule
  ]
})
export class PersonModule { }
