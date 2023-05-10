import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

    constructor(private httpClient: HttpClient) { }

    private url: string = 'http://localhost:8080/api/person';

    findAll(): Observable<Person[]> {
        return this.httpClient.get<Person[]>(this.url);
    }

    findById(idPerson: number): Observable<Person> {
        return this.httpClient.get<Person>(`${this.url}/${idPerson}`);
    }

    create(person: Person) : Observable<Person> {
        return this.httpClient.post<Person>(this.url, person);
    }

    update(person: Person) : Observable<Person> {
        return this.httpClient.put<Person>(this.url, person);
    }

    deleteById(idPerson: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.url}/${idPerson}`);
    }

}
