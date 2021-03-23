package br.alessio.dbf.repository;

import br.alessio.dbf.model.CaracteristicaProduto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CaracteristicaProdutoRepository extends JpaRepository<CaracteristicaProduto, Long> {

  Optional<CaracteristicaProdutoRepository> findByIdCaracteristicaProduto(Long idCaracteristicaProduto);

  Optional<CaracteristicaProduto> findByNomeCaracteristicaProduto(String nomeCarasteristicaProduto);

  List<CaracteristicaProduto> findAll();
}
