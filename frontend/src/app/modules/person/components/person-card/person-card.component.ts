import { Component, Input } from '@angular/core';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent {

    @Input() person!: Person;

}
