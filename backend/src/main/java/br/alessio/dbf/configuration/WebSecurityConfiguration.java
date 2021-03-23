package br.alessio.dbf.configuration;

import br.alessio.dbf.security.jwt.JWTConfigurer;
import br.alessio.dbf.security.jwt.TokenProvider;
import br.alessio.dbf.service.MyUserDetailsService;
import com.google.common.collect.ImmutableList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {

  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  @Autowired
  private MyUserDetailsService userDetailsService;

  @Autowired
  private TokenProvider tokenProvider;

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth
      .userDetailsService(userDetailsService)
      .passwordEncoder(bCryptPasswordEncoder);
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**").allowedMethods("*");
  }

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {

    String loginPage = "/login";
    String logoutPage = "/logout";

    // http.authorizeRequests().antMatchers("/**").permitAll().anyRequest().authenticated().and().csrf().disable();

    http
      .authorizeRequests()
      .antMatchers("/").permitAll()
      .antMatchers("/public/**").permitAll()
      .antMatchers(loginPage).permitAll()
      .antMatchers("/authenticate").permitAll()
      .antMatchers("/register").permitAll()
      .antMatchers("/registration").permitAll()
      .antMatchers("/admin/**").hasAuthority("ROLE_ADMIN")
      .anyRequest()
      .authenticated()
      .and()
      .csrf().disable()
      .formLogin()
      .loginPage(loginPage)
      .loginPage("/")
      .failureUrl("/login?error=true")
      .defaultSuccessUrl("/admin/home")
      .usernameParameter("user_name")
      .passwordParameter("password")
      .and()
      .logout()
      .logoutRequestMatcher(new AntPathRequestMatcher(logoutPage))
      .logoutSuccessUrl(loginPage).and().exceptionHandling()
      .and()
      .apply(securityConfigurerAdapter());

  }

  @Override
  public void configure(WebSecurity web) throws Exception {
    web
      .ignoring()
      .antMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/images/**")
      .antMatchers("/swagger-ui.html", "/webjars/**", "/swagger-resources/**", "/v2/**")
      .antMatchers("/assets/**");

  }

  private JWTConfigurer securityConfigurerAdapter() {
    return new JWTConfigurer(tokenProvider);
  }

}
