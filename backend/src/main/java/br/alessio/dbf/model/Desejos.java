package br.alessio.dbf.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "desejos")
public class Desejos {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_desejo")
  private Long idDesejo;

  @Column(name = "valor_maximo")
  private double valorMaximo;

  @Column(name = "tamanho_combo")
  private double tamanhoCombo;

  @ManyToMany(cascade = CascadeType.MERGE)
  @JoinTable(name = "caracteristica_produto_desejo", joinColumns = @JoinColumn(name = "id_desejo"), inverseJoinColumns = @JoinColumn(name = "id_caracteristica_produto"))
  private Set<CaracteristicaProduto> caracteristicaProdutos;

}
