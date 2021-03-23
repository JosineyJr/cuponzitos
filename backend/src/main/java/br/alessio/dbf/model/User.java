package br.alessio.dbf.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
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
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  private Long id;

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
  @NotEmpty(message = "*Por favor digite seu cpf")
  private String cpf;

  @Column(name = "data_nascimento")
  private Instant dataNascimento;

  @Column(name = "last_name")
  @NotEmpty(message = "*Por favor digite seu sobrenome")
  private String lastName;

  @Column(name = "active")
  private Boolean active;

  @OneToOne
  private Desejos desejos;

  @ManyToMany(cascade = CascadeType.MERGE)
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinTable(name = "user_role",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "role_id"))
  @BatchSize(size = 20)
  private Set<Role> roles;

  @OneToOne
  private Endereco endereco;
}
