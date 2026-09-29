# Coleta de dados: MCP primeiro, Chrome quando faltar

## Camada 1 – MCP (ordem sugerida)
| Necessidade | Ferramenta |
|---|---|
| Contas acessíveis | `ads_get_ad_accounts` |
| Estrutura e status (campanhas, conjuntos, anúncios, objetivo, orçamento, otimização) | `ads_get_ad_entities` (siga o `next_actions` se vier) |
| Tendência de performance | `ads_insights_performance_trend` |
| Anomalias | `ads_insights_anomaly_signal` |
| Contexto do anunciante | `ads_insights_advertiser_context` |
| Benchmark de indústria | `ads_insights_industry_benchmark` |
| Ranking de qualidade/engajamento/conversão vs leilão | `ads_insights_auction_ranking_benchmarks` |
| Pixel/CAPI/eventos | `ads_get_datasets`, `ads_get_dataset_quality`, `ads_get_dataset_stats`, `ads_pixel_event_read` |
| Erros/reprovações | `ads_get_errors` |
| Alterações recentes (o que mudou e quando) | `ads_account_get_activity_logs` |
| Oportunidades da Meta | `ads_get_opportunity_score` |
| Criativos e previews | `ads_get_creatives`, `ads_get_ad_preview` |
| Catálogo (e-commerce) | `ads_catalog_get_dynamic_ads_health`, `ads_catalog_get_diagnostics` |
| Alternativa/complemento | Windsor `get_data` (conector `facebook`) |

Se `ads_get_ad_entities` devolver `next_actions`, guarde a fila e execute as ações read-only obrigatórias antes de concluir.

## Mínimo de dados por objetivo
| Objetivo | Precisa ter |
|---|---|
| Vendas/E-commerce | gasto, compras, receita, ROAS, CPA, ATC/checkout iniciado, CPM, CTR (link), frequência, por criativo e público |
| Leads (formulário/site) | gasto, leads, CPL, CTR, CPM, taxa de conclusão do formulário, qualidade do lead (feedback), frequência |
| Mensagens/WhatsApp | gasto, conversas iniciadas, custo por conversa, CTR, CPM, frequência, qualificação (feedback do cliente) |
| Tráfego | gasto, cliques no link, CPC (link), LPV, taxa clique→LPV, CTR |
| Reconhecimento/Alcance | gasto, alcance, impressões, frequência, CPM, ThruPlay/custo por ThruPlay |
| Seguidores/Engajamento | gasto, visitas ao perfil, seguidores, custo por seguidor, engajamento |
| Remarketing | tamanho da audiência, frequência, CPA/ROAS vs prospecção |

Sempre: saldo da conta e pace (dias de verba restantes), pois conta parada distorce tudo.

## Quando escalar para o Chrome
- Breakdowns ausentes (posicionamento, idade/gênero, dispositivo, região, hora).
- Ranking de qualidade/engajamento/conversão por anúncio.
- Colunas personalizadas ou métricas de vídeo detalhadas.
- Janela de atribuição usada; configurações do conjunto (público, exclusões, posicionamentos, Advantage+).
- Estado de aprendizado / "aprendizado limitado", diagnósticos e recomendações exibidas só na interface.
- Divergência entre MCP e Gerenciador (registre a divergência).

## Qualidade dos dados: cheque antes de concluir
- Volume mínimo: menos de ~50 conversões por conjunto/semana → conclusões fracas; declare.
- Período muito curto ou com alteração recente (ver activity log) → não compare com antes.
- Janela de atribuição diferente entre períodos → não comparável.
