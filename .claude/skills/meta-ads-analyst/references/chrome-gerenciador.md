# Roteiro: ler o Gerenciador de Anúncios com Claude in Chrome

Use **somente para leitura**. Nunca clique em Publicar, Ativar, Pausar, Excluir, Salvar alterações ou confirmações de pagamento.

## Preparação
1. Confirme que a extensão está conectada (carregue as ferramentas do Chrome via ToolSearch, ex.: "chrome"). Se não estiver: peça ao usuário para conectar ou enviar CSV/print.
2. Abra `https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=<AD_ACCOUNT_ID>` (sem o prefixo `act_` se já estiver na URL do parâmetro `act`).
3. Confirme a conta correta no seletor e o **período** (mesmo do MCP) e a **janela de atribuição** (Colunas → Comparar janelas de atribuição).

## O que extrair (conforme o gap)
- **Colunas personalizadas:** Colunas → Personalizar: gasto, alcance, impressões, frequência, CPM, CTR (link), CPC (link), resultados, custo por resultado, ROAS, compras, ATC, checkout, ThruPlay, conversas iniciadas.
- **Breakdowns:** Detalhamento → Por entrega (posicionamento, plataforma, dispositivo), Por hora, Ação (região/idade/gênero). Extraia gasto, resultados e custo por resultado por segmento; destaque segmentos > 20% do gasto com CPA muito pior.
- **Ranking de anúncio:** classificação de qualidade, taxa de engajamento e taxa de conversão (aba Anúncios → colunas de diagnóstico de relevância).
- **Nível conjunto:** público (idade, gênero, locais, interesses/públicos personalizados, exclusões), posicionamentos, Advantage+, estado de aprendizado, otimização e evento.
- **Diagnósticos/Recomendações da interface** (ícones de alerta/oportunidade).
- **Verba e saldo:** faturamento → saldo, limite de gasto, método de pagamento (só ler).

## Como registrar
- Extraia tabelas como texto; use screenshot só como evidência de algo que o texto não traz.
- Anote de onde veio cada número (MCP vs Gerenciador) e qualquer divergência.
- Se a tabela for grande, filtre por campanhas ativas ou com gasto > 0.

## Falhas comuns
- Conta errada selecionada; período diferente; colunas com atribuição diferente.
- Sessão expirada/checkpoint de segurança → pare e peça ao usuário.
- Interface muda com frequência; se um caminho não existir, procure por texto do rótulo em vez de posição.
