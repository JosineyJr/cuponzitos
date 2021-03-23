package br.alessio.dbf.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "caracteristicaProduto")
public class CaracteristicaProduto {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_caracteristica_produto")
  private int idCaracteristicaProduto;

  @Column(name = "nome_caracteristica_produto")
  private String nomeCaracteristicaProduto;
}
