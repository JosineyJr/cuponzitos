package br.alessio.dbf.service;

import br.alessio.dbf.repository.DesejosRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DesejosService {

  private final Logger log = LoggerFactory.getLogger(DesejosService.class);

  private final DesejosRepository desejosRepository;

  @Autowired
  public DesejosService(DesejosRepository desejosRepository) {
    this.desejosRepository = desejosRepository;
  }
}
