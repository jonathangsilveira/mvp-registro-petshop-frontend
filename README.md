# Registro de agendamento de serviços para Petshop

Esta aplicação é um MVP para registro de agendamento de serviços para um petshop.
Tem como objetivo validar os conteúdos passados nas disciplinas da sprint de Desenvolvimento Full-Stack Básico da pós-graduação em Engenharia de Software, pela PUC-Rio.

# Requisitos

- Desenvolvimento de uma SPA (Single Page Application) utilizando HTML, CSS e JavaScript;
- Criatividade e Interatividade do front-end proposto;
- Que na tela seja apresentado itens em listas (por exemplo, lista de usuários ou livros);
- Que, ao longo do código, seja feita a chamada a todas as rotas implementadas pela API.

# Funcionalidades

- Listar os serviços agendados em formato tabela, usando filtros de data início e fim.
- Os registros são exibidos com os seguintes campos: Data/Hora agendado, Serviço, Cliente/Pet, Valor serviço, Cancelado e Ações (Cancelar e/ou Excluir agendamento). 
- Registrar novo agendamento de serviço com formulário para informar Data, Hora, Cliente, Pet e serviço a ser realizado.
- Os serviços disponíveis para execução são cadastrados previamente.
- Só será possível fazer exclusão do agendamento previamente com no mínimo 4h de antecedência.
- Cancelamento do agendamento não irá liberar o horário para novo agendamento.
- Somente será possível agendar um serviço por horário na data selecionada.

# Tecnologias utilizadas

Em adicional ao HTML, CSS e JavaScript, foi utilizado o toolkit de desenvolvimento web Boostrap.
A utilização do Bootstrap foi pontual, para exibição de ícones nos botões, modal e formulário para cadastro, cumprindo a premissa da aplicação ser SPA.

# Imagens

Home page:

![github-imagem-1](https://github.com/jonathangsilveira/mvp-registro-petshop-frontend/assets/19233288/8e8fa715-961e-4dbc-851c-e3fdeaaccf6c)

Modal de agendamento de serviços:

![github-imagem-2](https://github.com/jonathangsilveira/mvp-registro-petshop-frontend/assets/19233288/c0857448-e452-4559-8b21-3246f96eb53a)

---
## Como executar

Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.
