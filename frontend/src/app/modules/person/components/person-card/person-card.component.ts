import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent {

    @Input() person!: Person;

    @Output() updatePerson: EventEmitter<Person> = new EventEmitter<Person>();

    @Output() deletePerson: EventEmitter<number> = new EventEmitter<number>();

    updateRecord(): void {
        this.updatePerson.emit(this.person);
    }

    deleteRecord(): void {
        this.deletePerson.emit(this.person.id);
    }

}
