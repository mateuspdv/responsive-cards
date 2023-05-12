import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../models/person.model';
import { PersonService } from '../../services/person.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  providers: [MessageService]
})
export class PersonFormComponent implements OnInit{

    formGroup!: FormGroup;

    @Input() displayForm: boolean = false;

    @Input() formAction!: string;

    @Input() selectedPerson!: Person;

    @Input() allCpf: string[] = [];

    @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();

    @Output() refreshData: EventEmitter<void> = new EventEmitter<void>();

    constructor(private formBuilder: FormBuilder,
                private personService: PersonService,
                private messageService: MessageService) {}

    ngOnInit(): void {
        this.buildFormGroup();
    }

    buildFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            email: [null, [Validators.required, Validators.email]],
            cpf: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
        })
    }

    closeForm(): void {
        this.displayForm = false;
        this.formGroup.reset();
        this.closeDialog.emit();
    }

    create(person: Person): void {
        this.personService.create(person).subscribe({
            next: () => {
                this.messageService.add({ severity:'success', detail: 'Person successfully registered' });
                this.closeForm();
                this.refreshData.emit();
            },
            error: (error) => {
                this.messageService.add({ severity:'error', detail: error.error.errors[0].defaultMessage });
            }
        })
    }

    update(person: Person): void {
        this.personService.update(person).subscribe({
            next: () => {
                this.messageService.add({ severity:'success', detail: 'Person updated successfully' });
                this.closeForm();
                this.refreshData.emit();
            },
            error: (error) => {
                this.messageService.add({ severity:'error', detail: error.error.errors[0].defaultMessage });
            }
        })
    }

    disableSubmitButton(): boolean {
        return !this.formGroup.valid;
    }

    verifyCpfExists(): boolean {
        if(this.allCpf.includes(this.formGroup.get('cpf')?.value)) {
            this.messageService.add({ severity:'error', detail: 'CPF already registered in the system' });
            return true;
        }
        return false;
    }

    createPerson(): void {
        if(!this.verifyCpfExists()) {
            this.create(this.formGroup.value);
        }
    }

    updatePerson(): void {
        if(this.selectedPerson.cpf != this.formGroup.get('cpf')?.value) {
            if(this.verifyCpfExists()) {
                return;
            }
        }
        this.update(this.formGroup.value);
    }

    submitButton(): void {
        if(this.formGroup.valid) {
            if(this.formAction == 'create') {
                this.createPerson();
                return;
            }
            this.updatePerson();
        }
    }

    verifyAction(): void {
        if(this.formAction == 'create') {
            this.formGroup.reset();
            return;
        }

        this.formGroup.patchValue(this.selectedPerson);
    }

    getTitleForm(): string {
        if(this.formAction == 'create') {
            return 'Add Person';
        }

        return 'Update Person';
    }

    getActionButtonName() : string {
        if(this.formAction == 'create') {
            return 'Submit';
        }

        return 'Update';
    }

}
