# Benchmarks: como usar sem se enganar

## Ordem de confiança
1. **Histórico da própria conta** (30d anteriores, mesmo período do ano anterior, se houver).
2. **Benchmark do Meta via MCP:** `ads_insights_industry_benchmark` e `ads_insights_auction_ranking_benchmarks` (ranking de qualidade/engajamento/conversão vs concorrentes no leilão).
3. **Faixas direcionais deste arquivo** (abaixo).
4. **Referências do squad:** `traffic-masters/data/platform-benchmarks.yaml` (médias globais em USD; converter e desconfiar para o Brasil).

Todo benchmark citado no relatório deve trazer: fonte, unidade/moeda e o aviso "direcional".

## Faixas direcionais de Meta Ads (Brasil, ordem de grandeza — validar com o MCP)
| Métrica | Leitura |
|---|---|
| CTR (link) | < 0,8% fraco · 1–2% ok · > 2% bom (varia por formato/objetivo) |
| CPM | varia muito por região e público; compare com histórico e com o benchmark do MCP |
| Frequência (prospecção 7d) | > 3 sinal de fadiga · remarketing tolera mais, monitore CPA |
| Custo por conversa (WhatsApp) | muito dependente do nicho; julgue vs ticket e taxa de fechamento |
| CPL | julgue vs ticket × taxa de fechamento (CPL aceitável = ticket × margem × taxa lead→venda) |
| ROAS | compare com o ROAS de equilíbrio (1 ÷ margem) |

## CPA/CPL aceitável — calcule, não chute
`CPA máx. = ticket × margem de contribuição × taxa de fechamento do lead`
Se o cliente não informar margem/fechamento, peça ou use faixa hipotética marcada como tal.

## Ajustes de contexto
- **Sazonalidade:** CPM sobe em datas comemorativas e Black Friday; não compare com meses neutros sem ajustar.
- **Verba baixa:** contas com poucos R$/dia saem do aprendizado devagar; benchmark de conta grande não se aplica.
- **Maturidade:** conta nova ou com pixel sem histórico → expectativas menores nas primeiras 2–4 semanas.
- **Região:** capitais vs interior mudam CPM e CTR; turismo local muda por temporada.
- **Canal de conversão fora da Meta:** compare custo por conversa com fechamento no WhatsApp, não com "vendas da Meta".
