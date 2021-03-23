package br.alessio.dbf.dto;

import br.alessio.dbf.model.Endereco;
import br.alessio.dbf.model.Role;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.time.Instant;
import java.util.Set;

@Data
@NoArgsConstructor
public class ManagedUserVM {

  public static final int PASSWORD_MIN_LENGTH = 4;

  public static final int PASSWORD_MAX_LENGTH = 100;

  @Column(name = "user_name")
  @Length(min = 5, message = "*Seu Nome de Usuário deve ter pelo menos 5 characteres")
  @NotEmpty(message = "*Por favor digite um Nome de Usuário")
  private String userName;

  @Column(name = "email")
  @Email(message = "*Por favor digite um email válido")
  @NotEmpty(message = "*Por favor digite um email")
  private String email;

  @Column(name = "password")
  @Length(min = 5, message = "*Sua password deve ter mais de 5 characteres")
  @NotEmpty(message = "*Por favor digite sua password")
  private String password;

  @Column(name = "name")
  @NotEmpty(message = "*Por favor digite seu nome")
  private String name;

  @Column(name = "cpf")
  @NotEmpty(message = "*Por favor digite seu nome")
  private String cpf;

  @Column(name = "data_nascimento")
  private Instant dataNascimento;

  @Column(name = "last_name")
  @NotEmpty(message = "*Por favor digite seu sobrenome")
  private String lastName;

  @Column(name = "active")
  private Boolean active;

  @OneToOne
  private Endereco endereco;

}
