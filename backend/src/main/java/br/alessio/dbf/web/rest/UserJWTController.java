package br.alessio.dbf.web.rest;

import br.alessio.dbf.dto.LoginVM;
import br.alessio.dbf.dto.ManagedUserVM;
import br.alessio.dbf.model.User;
import br.alessio.dbf.security.jwt.JWTFilter;
import br.alessio.dbf.security.jwt.TokenProvider;
import br.alessio.dbf.service.UserService;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

/**
 * Controller to authenticate users.
 */
@RestController
@RequestMapping("/public")
@Api(tags = "01-Autenticação", description = "JWT-Autenticate")
public class UserJWTController {

  private final Logger log = LoggerFactory.getLogger(UserJWTController.class);

  private final TokenProvider tokenProvider;

  private final AuthenticationManagerBuilder authenticationManagerBuilder;

  private final UserService userService;

  public UserJWTController(TokenProvider tokenProvider,
                           AuthenticationManagerBuilder authenticationManagerBuilder,
                           UserService userService) {
    this.tokenProvider = tokenProvider;
    this.authenticationManagerBuilder = authenticationManagerBuilder;
    this.userService = userService;
  }

  @PostMapping("/authenticate")
  @ApiOperation(value = "JWT autenticação - Bearer Token",
    notes = "ADMIN: admin - admin \n" +
      "USER: user - admin \n")
  public ResponseEntity<JWTToken> authorize(@Valid @RequestBody LoginVM loginVM) {

    UsernamePasswordAuthenticationToken authenticationToken = null;

    authenticationToken = new UsernamePasswordAuthenticationToken(loginVM.getUsername(), loginVM.getPassword());

    Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
    SecurityContextHolder.getContext().setAuthentication(authentication);
    boolean rememberMe = (loginVM.isRememberMe() == null) ? false : loginVM.isRememberMe();
    String jwt = tokenProvider.createToken(authentication, rememberMe);
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
    return new ResponseEntity<>(new JWTToken(jwt), httpHeaders, HttpStatus.OK);
  }

  /**
   * {@code GET  /account} : get the current user.
   *
   * @return the current user.
   * @throws RuntimeException {@code 500 (Internal Server Error)} if the user couldn't be returned.
   */
  @GetMapping("/account")
  public Optional<User> getAccount() {

    SecurityContext securityContext = SecurityContextHolder.getContext();

    Authentication authentication = securityContext.getAuthentication();

    String logado = null;
    if (authentication == null) {
      return null;
    } else if (authentication.getPrincipal() instanceof UserDetails) {
      UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
      logado = springSecurityUser.getUsername();
    } else if (authentication.getPrincipal() instanceof String) {
      logado = (String) authentication.getPrincipal();
    }

    Optional<User> user = userService.findUserByUserName(logado);

    return user;
  }

  /**
   * {@code POST  /register} : register the user.
   *
   * @param managedUserVM the managed user View Model.
   */
  @PostMapping("/register")
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseEntity<User> registerUser(@Valid @RequestBody ManagedUserVM managedUserVM) throws Exception {
    User user = userService.registerUser(managedUserVM, managedUserVM.getPassword());
    HttpHeaders httpHeaders = new HttpHeaders();
    return new ResponseEntity<>(user, httpHeaders, HttpStatus.OK);
  }

  /**
   * Object to return as body in JWT Authentication.
   */
  static class JWTToken {

    private String idToken;

    JWTToken(String idToken) {
      this.idToken = idToken;
    }

    @JsonProperty("id_token")
    String getIdToken() {
      return idToken;
    }

    void setIdToken(String idToken) {
      this.idToken = idToken;
    }

    @JsonProperty("id_token Bearer")
    String getIdTokenBearer() {
      return "Bearer " + idToken;
    }
  }
}
