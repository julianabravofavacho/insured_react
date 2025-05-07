# insured_react

## Descrição

**insured_react** é uma aplicação de página única (SPA) em React (v19.1.0) que permite gerenciar usuários segurados. Inclui autenticação, roteamento com rotas protegidas e integração simplificada com uma API backend.

## Funcionalidades

- **Contexto de Autenticação** (`src/auth/AuthContext.js`): Gerencia sessão de usuário e token de autenticação.  
- **Configuração de API** (`src/config/api.js`): Instância Axios centralizada para chamadas HTTP.  
- **Roteamento** (`src/index.js`, `src/pages/layout.js`): Navegação com React Router v7 e rotas protegidas.  
- **Páginas** (`src/pages`):  
  - `home.js`: Tela inicial.  
  - `insureds.js`: Lista e detalhes de segurados.  
  - `login.js` / `logout.js`: Autenticação de usuário.  
  - `layout.js` / `index.js`: Componentes de layout e definição de rotas.  
- **Bootstrap**: Layout responsivo e componentes visuais estilizados.

## Estrutura de Diretórios

```
public/
  ├─ favicon.ico
  ├─ index.html
  ├─ logo192.png
  ├─ logo512.png
  ├─ manifest.json
  └─ robots.txt

src/
  ├─ auth/
  │   └─ AuthContext.js      # Provedor de contexto de autenticação
  ├─ config/
  │   └─ api.js              # Configuração Axios
  ├─ pages/
  │   ├─ home.js             # Página Home
  │   ├─ insureds.js         # Página de segurados
  │   ├─ layout.js           # Componente de layout e rotas
  │   ├─ login.js            # Tela de login
  │   ├─ logout.js           # Tela de logout
  │   └─ index.js            # Ponto de entrada de rotas
  ├─ index.js                # Renderiza App
  └─ package.json            # Dependências e scripts

.env                         # Variáveis de ambiente (ex: REACT_APP_API_URL)
.gitignore                   # Arquivos ignorados pelo Git
README.md                    # Este arquivo
```

## Começando

### Pré-requisitos

- Node.js >= 16.x  
- npm >= 8.x ou yarn >= 1.x  

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://seu-repositorio.git
   cd insured_react
   ```
2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```
3. Crie um arquivo `.env` na raiz com as variáveis necessárias:
   ```env
   REACT_APP_API_URL=https://api.seudominio.com
   ```

## Executando a aplicação

- Iniciar em modo de desenvolvimento:
  ```bash
  npm start
  # ou
  yarn start
  ```
  Acesse: `http://localhost:3000`

- Build para produção:
  ```bash
  npm run build
  # ou
  yarn build
  ```

## Scripts Disponíveis

| Script   | Descrição                            |
|----------|--------------------------------------|
| `start`  | Inicia o servidor de desenvolvimento |
| `build`  | Cria otimizações para produção       |
| `test`   | Executa suíte de testes              |
| `eject`  | Ejecta configurações do CRA          |

## Variáveis de Ambiente

| Variável            | Descrição                   |
|---------------------|-----------------------------|
| `REACT_APP_API_URL` | URL base da API backend     |

## Dependências

- **React** (v19.1.0)  
- **React DOM** (v19.1.0)  
- **React Router DOM** (v7.5.3)  
- **React Scripts** (5.0.1)  
- **Web Vitals** (2.1.4)  
- **Testing Library** (DOM, React, Jest, User Event)  

## Contribuindo

1. Fork o repositório  
2. Crie uma branch feature: `git checkout -b feature/nova-funcionalidade`  
3. Commit suas alterações: `git commit -m "feat: descrição da mudança"`  
4. Push para a branch: `git push origin feature/nova-funcionalidade`  
5. Abra um Pull Request  

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
