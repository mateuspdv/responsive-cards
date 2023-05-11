package com.crudperson.service.filter;

import com.crudperson.model.Person;

public class PersonSpecification extends EntitySpecification<Person> {

    public PersonSpecification(SearchCriteria searchCriteria) {
        super(searchCriteria);
    }

}
