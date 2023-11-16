# HeartBeat

## Execução

### Ambiente de Desenvolvimento

Clone o repositório do GitHub:

```bash
$ cd ~/your/directory/
$ git clone https://github.com/FranciscoHeronildo/heartbeat.git
$ cd heartbeat
```

Instale as dependências.

```bash
$ npm install
```

Crie um arquivo `.env` com as seguites variáveis de ambiente:

```dosini
PORT= {porta do serviço}
CMD_START= {comando para iniciar o serviço}
CMD_STOP= {comando para parar o serviço}
URL_SERVER= {url do serviço}
BOT=true {ativar(true)/desativar(false) bot}
TIMEBOT= {tempo do bot em minutos}

```

Inicie a aplicação:

```bash
$ npm run dev
```

### Ambiente de Produção

Crie os executáveis:

```bash
$ npm run dist
```

Crie um arquivo `.env` com as seguites variáveis de ambiente:

```dosini
PORT= {porta do serviço}
CMD_START= {comando para iniciar o serviço}
CMD_STOP= {comando para parar o serviço}
URL_SERVER= {url do serviço}
BOT=true {ativar(true)/desativar(false) bot}
TIMEBOT= {tempo do bot em minutos}

```

Adicione o `.env` e o executável no mesmo diretório e execute o programa gerado de acordo com o seu SO.
