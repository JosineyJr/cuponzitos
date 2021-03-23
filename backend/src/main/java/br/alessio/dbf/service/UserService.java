package br.alessio.dbf.service;

import br.alessio.dbf.dto.ManagedUserVM;
import br.alessio.dbf.model.Desejos;
import br.alessio.dbf.model.Endereco;
import br.alessio.dbf.model.Role;
import br.alessio.dbf.model.User;
import br.alessio.dbf.repository.EnderecoRepository;
import br.alessio.dbf.repository.RoleRepository;
import br.alessio.dbf.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

  private final Logger log = LoggerFactory.getLogger(UserService.class);

  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final EnderecoRepository enderecoRepository;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  @Autowired
  public UserService(UserRepository userRepository, RoleRepository roleRepository, EnderecoRepository enderecoRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.enderecoRepository = enderecoRepository;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
  }

  public Optional<User> findUserByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public Optional<User> findUserByUserName(String userName) {
    return userRepository.findByUserName(userName);
  }

  public User saveUser(User user) {
    user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
    user.setActive(true);
    Role userRole = roleRepository.findByRole("ADMIN");
    user.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
    return userRepository.save(user);
  }

  public User registerUser(ManagedUserVM managedUserVM, String password) throws Exception {
    userRepository.findByUserName(managedUserVM.getUserName().toLowerCase()).ifPresent(
      user1 -> {
        throw new RuntimeException("UserName " + user1.getUserName() + " Existente");
      }
    );

    userRepository.findByEmail(managedUserVM.getEmail().toLowerCase()).ifPresent(
      user1 -> {
        throw new RuntimeException("Email Existente");
      }
    );

    Endereco endereco = new Endereco(null, managedUserVM.getEndereco().getCidade(),
      managedUserVM.getEndereco().getEstado());
    User newUser = new User(null, managedUserVM.getUserName(), managedUserVM.getEmail(), bCryptPasswordEncoder.encode(password),
      managedUserVM.getName(), managedUserVM.getCpf(),managedUserVM.getDataNascimento(), managedUserVM.getLastName(), managedUserVM.getActive(),new Desejos(),
      Set.of(roleRepository.findByRole("ROLE_ADMIN")), endereco);

    enderecoRepository.save(endereco);
    userRepository.save(newUser);

    log.debug("Created Information for User: {}", newUser);
    return newUser;
//      return null;
  }
}
