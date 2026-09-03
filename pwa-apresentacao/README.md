# Portfólio PWA — Trabalho de Service Worker

Projeto acadêmico de uma aplicação web responsiva transformada em PWA por meio de Manifest e Service Worker.

## Como executar

Service Workers exigem contexto seguro. Para desenvolvimento, `localhost` é aceito.

### Opção 1 — Python
```bash
python3 -m http.server 8080
```
Depois acesse: `http://localhost:8080`

### Opção 2 — VS Code
Use a extensão Live Server e abra `index.html` pelo servidor.

> Não abra o arquivo diretamente com `file://`, pois o Service Worker não funcionará corretamente.

## Como testar o modo off-line

1. Execute a aplicação em localhost e abra-a no Chrome/Edge.
2. Abra DevTools (`F12`) → **Application** → **Service Workers**.
3. Confirme que `service-worker.js` está com status **activated and is running**.
4. Atualize a página pelo menos uma vez.
5. Em **Network**, selecione **Offline**.
6. Recarregue a página. O conteúdo continuará disponível porque HTML, CSS, JavaScript, manifest e imagens foram armazenados no Cache Storage.
7. Também é possível olhar em **Application → Cache Storage → portfolio-pwa-v1** para mostrar os arquivos em cache durante a apresentação.

## Estrutura

- `index.html`: página principal.
- `style.css`: layout responsivo.
- `app.js`: registro do Service Worker e indicador online/offline.
- `manifest.json`: configura a aplicação como instalável/standalone.
- `service-worker.js`: eventos install, activate e fetch + estratégia de cache.
- `assets/`: ilustração e ícones locais, garantindo funcionamento offline.
- `RESUMO-ARTIGO.md`: texto pronto para a entrega e apresentação.

## Observação sobre atualização

Quando alterar arquivos importantes, mude `CACHE_NAME` no `service-worker.js` (por exemplo, de `portfolio-pwa-v1` para `portfolio-pwa-v2`). Na ativação da nova versão, caches antigos são removidos.
