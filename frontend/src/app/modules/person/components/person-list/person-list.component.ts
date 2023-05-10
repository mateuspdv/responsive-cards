import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person.model';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

    persons: Person[] = [];

    displayForm: boolean = false;

    personToUpdate!: Person;

    formAction: string = 'create';

    constructor(private personService: PersonService) {}

    ngOnInit(): void {
        this.findAll();
    }

    findAll(): void {
        this.personService.findAll().subscribe({
            next: (persons: Person[]) => {
                this.persons = persons;
            }
        });
    }

    openForm(): void {
        this.displayForm = true;
    }

    closeForm() : void {
        this.displayForm = false;
    }

    updatePerson(event: any) {
        this.formAction = 'update';
        this.personToUpdate = event;
        this.openForm();
    }

    addPersonButton(): void {
        this.formAction = 'create';
        this.openForm();
    }

}
