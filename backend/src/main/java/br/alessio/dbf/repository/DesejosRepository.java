package br.alessio.dbf.repository;

import br.alessio.dbf.model.Desejos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DesejosRepository extends JpaRepository<Desejos, Long> {
  Optional<Desejos> findByIdDesejo(Long idPerfil);

//  Optional<Desejos> findBy
}
