package br.alessio.dbf.web.rest;

import br.alessio.dbf.model.User;
import br.alessio.dbf.repository.UserRepository;
import io.swagger.annotations.Api;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/public")
@Api(value = "pessoas", tags = "Entidade Usuários")
public class UserResource {

  private final Logger log = LoggerFactory.getLogger(UserResource.class);

  @Autowired
  private UserRepository userRepository;

  @GetMapping("/usuarios")
  public List<User> listaUser() {
    return userRepository.findAllByActive(true);
  }

  @GetMapping("/usuarios/{userName}")
  public ResponseEntity<User> getUsuario(@PathVariable String userName) {
    User u = userRepository.findByActiveTrueAndUserName(userName);

    if (u == null) {
      return ResponseEntity.notFound().build();
    } else {
      return ResponseEntity.ok().body(u);
    }
  }

  @DeleteMapping("/usuarios/{id}")
  @PreAuthorize("hasRole('ROLE_ADMIN') && isFullyAuthenticated()")
  public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
    log.debug("REST request to delete usuario : {}", id);

    userRepository.deleteById(id);
    return ResponseEntity.noContent().build();
  }

  /**
   * {@code PUT  /} : Atualiza um usuario existente Update.
   *
   * @param usuario o usuario a ser atulizado.
   * @return o {@link ResponseEntity} com status {@code 200 (OK)} e no corpo o usuario atualizado,
   * ou com status {@code 400 (Bad Request)} se o usuario não é válido,
   * ou com status {@code 500 (Internal Server Error)} se o usuario não pode ser atualizado.
   * @throws URISyntaxException if the Location URI syntax is incorrect.
   */
  @PutMapping("/usuarios")
  public ResponseEntity<User> updateUsuario(@Valid @RequestBody User usuario) throws URISyntaxException {
    log.debug("REST request to update Usuario : {}", usuario);
    if (usuario.getId() == null) {
      throw new ResponseStatusException(
        HttpStatus.BAD_REQUEST, "Invalid usuario id null");
    }
    User result = userRepository.save(usuario);
    return ResponseEntity.ok()
      .body(result);
  }
}
