package br.alessio.dbf.repository;

import br.alessio.dbf.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findByUserName(String userName);
    List<User> findAllByActive(boolean active);
    void deleteById(Long id);

    User findByActiveTrueAndUserName(String userName);
}
