<h1 align="center">Desenvolvimento de Sistemas Web I</h1>

<p align="center">
<a href="https://www.typescriptlang.org/"><img alt="Made With TypeScript Badge" src="https://img.shields.io/badge/Made%20with-TypeScript-1f425f.svg"></a>
<a href="blob/master/LICENSE"><img alt="MIT License Badge" src="http://img.shields.io/badge/license-MIT-blue.svg?style=flat"></a>
<br>
<a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"></a>
<a href="https://vercel.com/"><img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"></a>
</p>

Aplicação backend do projeto para a disciplina de Desenvolvimento de Sistemas Web I, do curso de Tecnologia da Informação da Universidade Federal do Rio Grande do Norte (UFRN).

## Iniciando

Essas instruções lhe darão uma cópia do projeto e um caminho para executá-lo localmente para fins de desenvolvimento e teste.

### Pré-Requisitos

Você precisará basicamente do Node em sua versão LTS mais recente e do NPM para instalar as dependências do projeto.

### Variáveis de Ambiente

O arquivo .env.example contém a relação das variáveis de ambiente que o bot precisa para funcionar. Defina-as antes de executar o projeto.
Caso prefira carregar essas variáveis localmente, copie o arquivo ```.env.example``` para um arquivo ```.env```:

```bash
cp .env.example .env
```

Em seguida, edite o novo arquivo, inserindo os valores das variáveis.

### Instalação

Para instalar as dependências do projeto, execute:

```bash
npm install
```

Para rodar o projeto, execute:

```bash
npm run dev
```

## Construído Com

* [Express](https://expressjs.com/) - Um framework web rápido, flexível e minimalista para Node.js.
* [node-sqlite3](https://www.npmjs.com/package/sqlite3) - Um driver assíncrono do SQLite para Node.js.

## Licença

Esse projeto é distribuído sob a Licença MIT. Leia o arquivo [LICENSE](LICENSE) para ter mais detalhes.
