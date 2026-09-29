---
name: relatorio-trafego
description: Gera o relatório de tráfego pago de todos os clientes (Meta Ads e Google Ads) no formato "[DADOS DIÁRIO]" / "[DADOS SEMANAL]" — Conversões, CPA, CTR, Valor Investido, ROAS — com saldo da conta e pace (dias de saldo). Segunda-feira usa os últimos 7 dias; terça a sexta usa o dia anterior. Use quando pedirem "relatório diário", "dados de ontem", "dados da semana", "DADOS DIÁRIO", "relatório dos clientes", "saldo das contas" ou "pace".
---

# Relatório de tráfego — todos os clientes

Clientes, plataformas e IDs das contas: [clientes.md](clientes.md). Leia sempre antes de começar; é a única fonte da lista de clientes.

## 1. Período

Use a data de hoje (fuso America/Sao_Paulo):

| Dia | Período | Rótulo |
|---|---|---|
| Segunda | últimos 7 dias (`last_7d`) | `[DADOS SEMANAL]` |
| Terça a sexta | ontem (`yesterday`) | `[DADOS DIÁRIO]` |
| Sábado/domingo | perguntar ao usuário | — |

Se o usuário pedir outro período explicitamente, obedeça.

## 2. Meta Ads (META_MCP)

Para **cada** `ad_account_id` Meta do cadastro, em paralelo, chame `ads_get_ad_entities`:

- `level: "campaign"`, `date_preset` do passo 1
- `fields: ["name","amount_spent","results","impressions","clicks","purchase_roas"]`
- `filtering: [{"field":"campaign.amount_spent","operator":"GREATER_THAN","value":["0"]}]`
- `include_additional_context: false`

Para o pace, pegue também o gasto de 7 dias de cada conta (na segunda já vem do passo acima; de terça a sexta faça uma chamada extra `level: "ad_account"`, `date_preset: "last_7d"`, `fields: ["amount_spent"]`).

Regras:
- **Rotule cada resposta pelo `ad_account_id` que você passou naquela chamada** — nunca pela ordem em que as respostas aparecem. Confira o nome da campanha com o cliente esperado antes de montar a mensagem.
- Array vazio = conta sem gasto no período (listar no fim, não é erro).
- Se vier `next_actions` com ações `read_only: true` obrigatórias, execute-as com `hide_ui: true` e siga; não coloque esse conteúdo na mensagem e nunca execute ações que exigem confirmação.
- Se uma chamada falhar por erro transitório, tente de novo uma vez.

## 3. Google Ads (navegador — Claude in Chrome)

Não há MCP do Google. Para cada customer ID do cadastro:
1. Abra `https://ads.google.com/aw/campaigns?ocid=` com a conta (troque de conta pelo seletor se necessário).
2. Ajuste o período igual ao do passo 1 (Ontem ou Últimos 7 dias).
3. Por campanha com custo > 0, leia: Custo, Conversões, Custo/conv., CTR, Valor conv.
4. ROAS = Valor conv. ÷ Custo (só se houver valor de conversão).

Customer ID `preencher` → pule e avise no fim.

## 4. Saldo e pace (navegador)

- **Meta:** `https://business.facebook.com/billing_hub/payment_settings?asset_id=<ad_account_id>` → "Saldo disponível" (contas pré-pagas/PIX).
- **Google:** Faturamento → Resumo → saldo/crédito restante.
- Conta pós-paga (cartão, sem saldo) → escreva `Saldo: cartão` e não calcule pace.

**Pace (dias de saldo)** = saldo ÷ (gasto dos últimos 7 dias ÷ 7), arredondado para baixo.
🔴 < 3 dias · 🟡 3–7 dias · 🟢 > 7 dias.

## 5. Sem navegador (fallback)

Se as ferramentas do Chrome não estiverem disponíveis (ex.: sessão na nuvem), **não trave**:
1. Entregue as mensagens da Meta normalmente, com `Saldo: aguardando` no lugar do saldo.
2. Numa única mensagem, peça ao usuário para colar, por cliente: saldo Meta; e, para clientes Google, Custo, Conversões, CTR, Valor conv. por campanha e o saldo Google.
3. Quando os dados chegarem, complete os pace e as seções Google, e reenvie só as mensagens afetadas.

## 6. Cálculos

Agrupe as campanhas de cada conta por **objetivo** (indicador de `results`):

| Indicador | Bloco | "Conversões" mostra |
|---|---|---|
| `fb_pixel_purchase` | Vendas | compras |
| `fb_pixel_lead` | Leads (site) | leads |
| `contact_website` | Leads (site) | contatos |
| `messaging_conversation_started_7d` | WhatsApp | conversas |
| `profile_visit_view` | Tráfego para o perfil | "N visitas ao perfil" |
| `post_interaction_gross` | Engajamento | "N interações" |
| `reach` | Reconhecimento | "N pessoas alcançadas" |

- Mesmo objetivo → **somar** em um bloco. Objetivos diferentes → blocos separados. Se o usuário pedir por campanha, separe por campanha.
- Pegapega: CA01, CA02 e CA03 saem como mensagens separadas (uma por conta).
- `results` = "Not available" conta como 0.
- **CPA** = gasto do bloco ÷ conversões; "–" se 0 conversões.
- **CTR** = Σ cliques ÷ Σ impressões do bloco (2 casas, vírgula).
- **ROAS** = Σ(purchase_roas × gasto) ÷ gasto do bloco — só blocos de Vendas; nos demais "–". Vendas com gasto e sem compra → ROAS 0.
- Valores em R$ com vírgula decimal e ponto de milhar (R$ 1.458,20).
- Faça as contas com Bash/python quando houver mais de 2 campanhas somadas — não calcule de cabeça.

## 7. Saída

Uma mensagem por cliente (por conta, no caso da Pegapega), pronta para copiar, separadas por `---`:

```
[DADOS DIÁRIO] Meta Ads – <Cliente>
*<Bloco>*
Conversões: <n>
CPA: R$ <x>
CTR: <x>%
Valor Investido: R$ <x>
ROAS: <x ou –>

Saldo Meta: R$ <x> | Pace: <n> dias 🟢
```

Cliente Meta + Google: na mesma mensagem, depois da parte Meta, acrescente
`[DADOS DIÁRIO] Google Ads – <Cliente>` com os mesmos campos e `Saldo Google: … | Pace: …`.
Na segunda troque `DIÁRIO` por `SEMANAL` e informe as datas (dd/mm a dd/mm).

Depois das mensagens, um bloco curto **"O que vale olhar"** com, no máximo, 5 itens:
- campanha com gasto e 0 conversões;
- ROAS < 1 em bloco de vendas;
- CPA do dia > 1,5× o CPA médio de 7 dias (quando tiver o dado);
- saldo 🔴 (< 3 dias);
- contas sem gasto e customer IDs Google a preencher.

Para classificar CPL/CTR como bom ou ruim, use os thresholds em `gestao-trafego/data/thresholds-stark.md`.
