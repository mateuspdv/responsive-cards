package com.crudperson.service.mapper;

import com.crudperson.model.Person;
import com.crudperson.service.dto.PersonDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PersonMapper extends EntityMapper<PersonDto, Person> {
}
