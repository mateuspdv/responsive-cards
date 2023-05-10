import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonCardComponent } from './components/person-card/person-card.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    PersonListComponent,
    PersonCardComponent,
    PersonFormComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    CardModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    ToastModule
  ]
})
export class PersonModule { }
