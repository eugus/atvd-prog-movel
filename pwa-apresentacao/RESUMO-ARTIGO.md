# Resumo — O ciclo de vida do Service Worker

O artigo **“O ciclo de vida do service worker”**, de Jake Archibald, explica como o navegador instala, ativa, atualiza e substitui um Service Worker. O objetivo desse ciclo de vida é favorecer experiências que funcionem off-line, permitir que uma nova versão seja preparada sem interromper a versão que já está sendo utilizada e manter consistência entre as páginas controladas pela aplicação.

## Principais etapas

### Registro
A página registra o arquivo do Service Worker usando `navigator.serviceWorker.register(...)`. Depois disso, o navegador baixa, analisa e executa o script. Caso exista algum erro nessa etapa, o registro falha.

### Evento `install`
`install` é o primeiro evento recebido pelo Service Worker e ocorre uma vez para cada versão do worker. Ele é muito usado para preparar os recursos necessários à aplicação, principalmente armazenando arquivos no Cache Storage. O método `event.waitUntil(...)` permite informar ao navegador que a instalação só deve ser considerada concluída depois que determinada Promise terminar. Se ela falhar, a instalação também é considerada inválida.

### Evento `activate`
Depois de instalado e quando está pronto para assumir o controle, ocorre o evento `activate`. Essa etapa é apropriada para realizar tarefas de manutenção, como apagar caches de versões antigas. O artigo mostra que uma nova versão normalmente pode ficar aguardando enquanto a versão anterior ainda controla páginas abertas.

### Evento `fetch`
Quando um Service Worker ativo controla uma página, requisições feitas por essa página podem gerar o evento `fetch`. Com `event.respondWith(...)`, o worker pode decidir de onde virá a resposta: da rede, do cache ou até de outro recurso. É esse poder de interceptar requisições que possibilita estratégias de funcionamento off-line.

## Exemplo das imagens do artigo

No primeiro exemplo, o HTML registra o Service Worker e depois solicita a imagem `dog.svg`. Durante o `install`, o worker coloca `cat.svg` no cache. No evento `fetch`, ele identifica uma solicitação para `dog.svg` e responde com `cat.svg`, demonstrando que o Service Worker pode interceptar e substituir uma resposta.

Em seguida, o artigo apresenta uma atualização do Service Worker. A nova versão passa a usar outro cache e armazena `horse.svg`. No `fetch`, a solicitação por `dog.svg` passa a receber a imagem do cavalo. No `activate`, caches que não pertencem à versão esperada são removidos. Esse exemplo também demonstra por que uma nova versão pode ficar no estado de espera até que a versão antiga deixe de controlar clientes.

## Atualização do Service Worker

Ao detectar que o arquivo do worker mudou, o navegador trata o código como uma nova versão. A nova versão passa novamente pela instalação. Por padrão, depois de instalada, ela aguarda até que o worker antigo não esteja mais controlando páginas. O método `self.skipWaiting()` pode antecipar a ativação, enquanto `clients.claim()` pode fazer o worker ativo assumir clientes que ainda não estavam sob seu controle. O artigo alerta que esses recursos devem ser utilizados com cuidado para evitar que uma página combine comportamentos de versões diferentes.

## Relação com este projeto

Neste trabalho foram manipulados os três eventos fundamentais mostrados no artigo:

- `install`: abre o cache `portfolio-pwa-v1` e armazena os arquivos necessários para abrir a aplicação sem internet;
- `activate`: remove caches antigos e permite que a versão atual assuma o controle;
- `fetch`: intercepta requisições GET, utiliza recursos em cache e, quando necessário, tenta a rede. Caso uma navegação falhe por falta de conexão, devolve o `index.html` armazenado.

Dessa maneira, a aplicação deixa de depender totalmente da conexão após a primeira visita e passa a oferecer uma experiência típica de uma PWA.

## Etapas de desenvolvimento para apresentar

1. Foi criada uma página web responsiva com HTML, CSS, texto e imagens.
2. Foi criado o `manifest.json`, contendo nome da aplicação, ícones, cores, URL inicial e modo `standalone`.
3. Em `app.js`, foi usado `navigator.serviceWorker.register()` para registrar o worker.
4. No Service Worker, o evento `install` foi usado para criar o cache inicial.
5. O evento `activate` foi usado para limpar caches de versões antigas.
6. O evento `fetch` foi implementado para responder usando o cache e permitir o uso off-line.
7. O funcionamento foi verificado pelo DevTools, colocando a rede em modo Offline e recarregando a página.
