package com.crudperson.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PersonDto implements Serializable {

    private Long id;

    @NotNull(message = "Name field cannot be null")
    @NotEmpty(message = "Name field cannot be empty")
    @Size(min = 3, message = "The name field must have at least 3 characters")
    @Size(max = 50, message = "The name field must have a maximum of 50 characters")
    private String name;

    @NotNull(message = "Email field cannot be null")
    @NotEmpty(message = "Email field cannot be empty")
    @Email(message = "The email field must have a valid record")
    private String email;

    @NotNull(message = "CPF field cannot be null")
    @NotEmpty(message = "CPF field cannot be empty")
    @CPF(message = "The CPF field must have a valid record")
    private String cpf;

}
