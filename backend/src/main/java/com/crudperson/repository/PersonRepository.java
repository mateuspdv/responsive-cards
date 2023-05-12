package com.crudperson.repository;

import com.crudperson.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PersonRepository extends JpaRepository<Person, Long>, JpaSpecificationExecutor<Person> {

    boolean existsByCpf(String cpf);

    @Query("SELECT p.cpf FROM Person p WHERE p.id = :idPerson")
    String findCpfById(@Param("idPerson") Long idPerson);

}
