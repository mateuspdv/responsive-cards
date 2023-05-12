import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person.model';
import { PersonService } from '../../services/person.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterPerson } from '../../models/filter-person.model';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class PersonListComponent implements OnInit {

    filter!: FormGroup;

    persons: Person[] = [];

    allCpf: string[] = [];

    displayForm: boolean = false;

    personToUpdate!: Person;

    formAction: string = 'create';

    constructor(private personService: PersonService,
                private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.buildFilter();
        this.findAll();
    }

    buildFilter(): void {
        this.filter = this.formBuilder.group({
            name: [''],
            email: [''],
            cpf: ['']
        });
    }

    findAll(): void {
        this.personService.findAll().subscribe({
            next: (persons: Person[]) => {
                this.persons = persons;
                this.allCpf = this.persons.map(person => person.cpf!);
            }
        });
    }

    deleteById(idPerson: number): void {
        this.personService.deleteById(idPerson).subscribe({
            next: () => {
                this.messageService.add({ severity:'success', detail: 'Person deleted successfully' });
                this.findAll();
            }
        })
    }

    search(filter: FilterPerson): void {
        this.personService.search(filter).subscribe({
            next: (persons: Person[]) => {
                this.persons = persons;
            }
        })
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

    confirmExclusion(idPerson: number): void {
        this.confirmationService.confirm({
            message: 'Do you really want to exclude the selected person ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteById(idPerson);
            }
        })
    }

    searchButton(): void {
        this.search(this.filter.value);
    }

}
