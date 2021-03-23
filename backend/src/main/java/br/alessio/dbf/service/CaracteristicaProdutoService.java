package br.alessio.dbf.service;

import br.alessio.dbf.model.CaracteristicaProduto;
import br.alessio.dbf.repository.CaracteristicaProdutoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaracteristicaProdutoService {

  private final Logger log = LoggerFactory.getLogger(CaracteristicaProdutoService.class);

  private final CaracteristicaProdutoRepository caracteristicaProdutoRepository;

  @Autowired
  public CaracteristicaProdutoService(CaracteristicaProdutoRepository caracteristicaProdutoRepository) {
    this.caracteristicaProdutoRepository = caracteristicaProdutoRepository;
  }

  public CaracteristicaProduto registerCaracteristicaProduto(CaracteristicaProduto caracteristicaProduto) {
    this.caracteristicaProdutoRepository.save(caracteristicaProduto);

    log.debug("Created Information for Caracteristica Produto: {}", caracteristicaProduto);
    return caracteristicaProduto;
  }

  public List<CaracteristicaProduto> findAll() {
    return this.caracteristicaProdutoRepository.findAll();
  }

  public CaracteristicaProduto findByNomeCaracteristicaProduto(String nomeCaracteristicaProduto) {
    Optional<CaracteristicaProduto> caracteristicaProduto = this.caracteristicaProdutoRepository.findByNomeCaracteristicaProduto(nomeCaracteristicaProduto);
    return caracteristicaProduto.orElse(null);
  }

}
