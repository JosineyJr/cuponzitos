package br.alessio.dbf.repository;

import br.alessio.dbf.model.Endereco;
import br.alessio.dbf.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface EnderecoRepository extends JpaRepository<Endereco, Integer> {
  Optional<Endereco> findByCidade(String cidade);

  Optional<Endereco> findByEstado(String estado);
}
