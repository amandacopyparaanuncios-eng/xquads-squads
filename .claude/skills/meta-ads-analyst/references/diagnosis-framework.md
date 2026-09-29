# Árvore de diagnóstico

Siga a ordem. Só desça se o nível anterior estiver limpo.

## Nível 0 – A conta está rodando de verdade?
- Saldo/pace: conta sem saldo, gasto zerado, campanha pausada por engano, reprovações (`ads_get_errors`).
- Mudanças recentes que reiniciam aprendizado (`ads_account_get_activity_logs`): edição de orçamento >20%, público, criativo, otimização.
- Estado de aprendizado: "aprendizado limitado" → pouco volume/orçamento/fragmentação.

## Nível 1 – Os dados são confiáveis?
- Pixel/CAPI ativos, eventos corretos, deduplicação, qualidade de correspondência (`ads_get_dataset_quality`).
- Evento de otimização = evento que importa? (lead/compra vs clique).
- Conversão fora da Meta: WhatsApp/loja física → dependa do feedback do cliente.

## Nível 2 – Gargalo no leilão/criativo/oferta
Fórmula: `CPA = CPM ÷ (CTR × taxa de conversão) × 1000 (ajuste de unidades)`
| Sintoma | Provável causa | Ação |
|---|---|---|
| CPM alto | público estreito/saturado, sazonalidade, baixa qualidade de anúncio | ampliar, rotacionar criativo, checar ranking |
| CTR baixo | criativo/gancho/oferta fracos, público errado | novos ângulos/hooks, testar formatos |
| CTR bom, conversão baixa | página/formulário/oferta ou tracking | revisar LP/formulário, velocidade, promessa vs página |
| Frequência alta + CTR caindo | fadiga | rotacionar criativos, ampliar público |
| Resultado concentrado em 1 anúncio | dependência de criativo | novos criativos, teste estruturado |
| Muitos conjuntos com pouco gasto | fragmentação | consolidar |

## Nível 3 – Estrutura e funil
- Fragmentação, sobreposição, ausência de remarketing/exclusões, verba mal distribuída entre etapas, objetivo incompatível com a meta do cliente.

## Nível 4 – Pós-clique (quando o Meta parece "bom" mas não há venda)
Gatilhos: CPL/custo por conversa baixo + feedback "leads só perguntam preço" / "nenhuma venda".
Hipóteses a listar (e testar):
1. Público/criativo atraem curiosos (sem filtro de preço/faixa).
2. Geografia fora da área de atendimento.
3. Mensagem inicial/formulário sem pré-qualificação.
4. Velocidade e qualidade do atendimento; horário.
5. Oferta desalinhada (preço, prazo, disponibilidade).
Recomende mudanças que **aumentem a qualidade** mesmo que subam o CPL, e proponha como medir (leads qualificados/vendas informados pelo cliente).

## Testes e volume
- Decida só com volume suficiente (~50 conversões/semana/conjunto é o ideal; abaixo disso, declare baixa confiança).
- Proponha **um teste por vez** com hipótese, métrica e prazo.
- Escala: aumentos graduais (≈20% a cada 2–3 dias) para não resetar aprendizado.
