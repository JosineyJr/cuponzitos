package br.alessio.dbf.web.rest;

import br.alessio.dbf.model.CaracteristicaProduto;
import br.alessio.dbf.service.CaracteristicaProdutoService;
import io.swagger.annotations.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/public")
@Api(value = "caracteristica produto", tags = "Entidade Caracteristica Produto")
public class CaracteristicaProdutoResource {

  private final Logger log = LoggerFactory.getLogger(CaracteristicaProdutoResource.class);

  @Autowired
  private CaracteristicaProdutoService caracteristicaProdutoService;

  @GetMapping("/caracteristicaProduto")
  public List<CaracteristicaProduto> listaCaracteristicaProduto() {
    return caracteristicaProdutoService.findAll();
  }

  @GetMapping("/caracteristicaProduto/{nomeCaracteristicaProduto}")
  public CaracteristicaProduto getCaracteristicaProduto(@Valid @PathVariable String nomeCaracteristicaProduto) {
    return caracteristicaProdutoService.findByNomeCaracteristicaProduto(nomeCaracteristicaProduto);
  }


  @PostMapping("/caracteristicaProduto")
  public ResponseEntity<CaracteristicaProduto> registerCaracteristicaProduto(@Valid @RequestBody CaracteristicaProduto cProduto) throws Exception {
    CaracteristicaProduto caracteristicaProduto = caracteristicaProdutoService.registerCaracteristicaProduto(cProduto);
    HttpHeaders httpHeaders = new HttpHeaders();
    return new ResponseEntity<>(caracteristicaProduto, httpHeaders, HttpStatus.OK);
  }
}
