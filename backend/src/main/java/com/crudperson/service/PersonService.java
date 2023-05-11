package com.crudperson.service;

import com.crudperson.repository.PersonRepository;
import com.crudperson.service.dto.FilterPersonDto;
import com.crudperson.service.dto.PersonDto;
import com.crudperson.service.exception.EntityNotFoundException;
import com.crudperson.service.filter.PersonSpecification;
import com.crudperson.service.filter.SearchCriteria;
import com.crudperson.service.mapper.PersonMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PersonService {

    private final PersonRepository personRepository;

    private final PersonMapper personMapper;

    public List<PersonDto> findAll() {
        return personMapper.toDto(personRepository.findAll());
    }

    private void exitsById(Long idPerson) {
        if (!personRepository.existsById(idPerson)) {
            throw new EntityNotFoundException("Person not found");
        }
    }

    public PersonDto findById(Long idPerson) {
        return personMapper.toDto(personRepository.findById(idPerson)
                .orElseThrow(() -> new EntityNotFoundException("Person not found")));
    }

    public PersonDto create(PersonDto personDto) {
        return personMapper.toDto(personRepository.save(personMapper.toEntity(personDto)));
    }

    public PersonDto update(PersonDto personDto) {
        if (Objects.isNull(personDto.getId())) {
            throw new NullPointerException("The id field cannot be null");
        }
        exitsById(personDto.getId());
        return personMapper.toDto(personRepository.save(personMapper.toEntity(personDto)));
    }

    public void deleteById(Long idPerson) {
        exitsById(idPerson);
        personRepository.deleteById(idPerson);
    }

    public List<PersonDto> search(FilterPersonDto filter) {
        PersonSpecification firstSpecification = new PersonSpecification(
                new SearchCriteria("name", ":", filter.getName()));
        PersonSpecification secondSpecification = new PersonSpecification(
                new SearchCriteria("email", ":", filter.getEmail()));
        PersonSpecification thirdSpecification = new PersonSpecification(
                new SearchCriteria("cpf", ":", filter.getCpf()));

        return personMapper.toDto(personRepository.findAll(Specification
                .where(firstSpecification)
                .and(secondSpecification)
                .and(thirdSpecification)));
    }

}
