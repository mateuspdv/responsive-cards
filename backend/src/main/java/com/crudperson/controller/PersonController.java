package com.crudperson.controller;

import com.crudperson.service.PersonService;
import com.crudperson.service.dto.PersonDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/person")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class PersonController {

    private final PersonService personService;

    @GetMapping
    public ResponseEntity<List<PersonDto>> findAll() {
        return ResponseEntity.ok(personService.findAll());
    }

    @GetMapping("/{idPerson}")
    public ResponseEntity<PersonDto> findById(@PathVariable Long idPerson) {
        return ResponseEntity.ok(personService.findById(idPerson));
    }

    @PostMapping
    public ResponseEntity<PersonDto> create(@Valid @RequestBody PersonDto personDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(personService.create(personDto));
    }

    @PutMapping
    public ResponseEntity<PersonDto> update(@Valid @RequestBody PersonDto personDto) {
        return ResponseEntity.ok(personService.update(personDto));
    }

    @DeleteMapping("/{idPerson}")
    public ResponseEntity<Void> deleteById(@PathVariable Long idPerson) {
        personService.deleteById(idPerson);
        return ResponseEntity.noContent().build();
    }

}
