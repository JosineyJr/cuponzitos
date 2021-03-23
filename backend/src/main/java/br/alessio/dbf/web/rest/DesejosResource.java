package br.alessio.dbf.web.rest;

import br.alessio.dbf.model.Desejos;
import br.alessio.dbf.service.DesejosService;
import io.swagger.annotations.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
@Api(value = "desejos", tags = "Entidade Desejos")
public class DesejosResource {

  private final Logger log = LoggerFactory.getLogger(DesejosResource.class);

  @Autowired
  private DesejosService desejosService;

  @PostMapping("/desejos")
  public Desejos registerDesejos(Desejos desejos) {
    return desejosService.registerDesejos(desejos);
  }
}
