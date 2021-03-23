package br.alessio.dbf.web.rest;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/public/test")
public class TestResource {

    @GetMapping(path = "/echo")
    public String getEcho() {
        return "Echo 1.. 2.. 3..";
    }

    @GetMapping(path = "/hello/{name}")
    public String helloApp(@PathVariable String name) {
        return "Hello " + name;
    }

    @GetMapping(path = "/isAdmin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String getIsAdmin() {
        return "yes";
    }

    @GetMapping(path = "/isUsuario")
    @PreAuthorize("hasRole('ROLE_USER')")
    public String getIsUser() {
        return "yes";
    }
}