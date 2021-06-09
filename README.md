# BkCuponzitos

## Descrição geral do aplicativo

Será desenvolvido um app de cupons de lanches utilizando a api do Burger King. Ele irá mostrar cupons com as promoções dos 
lanches que estarão em oferta durante a semana, o dia ou mês. Além disso, ele contará com um cadastro simples de usuário, 
contendo a localização para que seja exibida a franquia mais próxima dele e um perfil de desejos do cliente, ele será uma 
espécie de filtro no qual o usuário poderá escolher quais promoções lhe interessam para serem mostradas na tela, como ofertas
por preço, tamanho e produto.

O app incluirá promoções especiais, que só serão desbloqueadas se o usuário fizer sua autenticação.

## Diagrama de caso de uso

![alt text](https://git.a2portais.com.br/LiviaFerreira/app-de-cupons/-/raw/master/diagramaDeCasoDeUso.jpeg)


## Requisitos Funcionais


**ID: RF-001**
_Requisito: Cadastrar usuário_
Recebe as informações do usuário e realiza o cadastro na plataforma.
**Dados necessários para cadastrar um usuário:** Nome, Sobrenome, e-mail, CPF, data de nascimento, localização e senha.

**ID: RF-002**
_Requisito: Autenticar usuário_
Recebe as informações do usuário cadastrado e realiza o login na plataforma.
**Dados necessários para autenticar um usuário:** E-mail e senha.

**ID: RF-003**
_Requisito: Perfil de desejos_
Formulário de opções de escolha para o que aparecerá na tela inicial de promoções do usuário.
**Dados:** Oferta por tamanho (individual ou combo), preço e produto.

**ID: RF-004**
_Requisito: Consultar cupons_
Exibe os dados das ofertas e os números dos cupons para o usuário autenticado (ou não) no sistema.

**ID: RF-005**
_Requisito: Notificar periodicamente _
Periodicamente (quando surgirem novas ofertas no app), o sistema irá notificar o usuário sobre as novas ofertas, exibindo uma mensagem em sua barra de notificações.

**ID: RF-006**
_Requisito: Personalizar cupons_
O sistema pegará os dados do perfil de desejos do usuário e irá exibir na tela inicial no aplicativo cupons personalizados de acordo com os dados do perfil de desejos.

**ID: RF-007**
_Requisito: Consultar cupons personalizados_
O usuário do app poderá consultar os seus cupons personalizados na tela inicial ou na aba “cupons personalizados” do app. 

**ID: RF-008**
_Requisito: Consultar promoções especiais_
O usuário, se autenticado, terá acesso a cupons com promoções especiais de lanches.



