# Super Ótica — Campanha de Reconhecimento (Mogi das Cruzes)

Tarefa ClickUp: [Criar criativos de reconhecimento para as óticas](https://app.clickup.com/t/17tgxqybkbm)

## Contexto levantado (ClickUp + Meta Ads)
- Cliente: Super Ótica — óculos de grau e solar, Mogi das Cruzes.
- Hoje: campanha de mensagens (WhatsApp), CPA médio ~R$ 4–5, CTR ~1,1%, verba curta (~R$ 30–45/dia).
- Copy atual dos anúncios: "Cuidar da sua visão nunca foi tão fácil… atendimento especializado, condições facilitadas de pagamento e qualidade de verdade".
- Objetivo desta campanha: **reconhecimento local** — fazer quem mora/passa perto das lojas conhecer o espaço físico.
- Sugestão de configuração: objetivo Reconhecimento (alcance), raio de 3–5 km ao redor de cada loja, 18+; frequência 2–3/semana; depois remarketing de quem viu 50%+ do vídeo para a campanha de mensagens.

## A preencher (não existia no ClickUp)
- Endereço de cada loja, horário, fotos reais da fachada/interior, logo e paleta oficial, oferta vigente.
- Os PNGs usam paleta **provisória** (azul/âmbar) e ícone genérico; trocar por identidade da marca.
- Evitar promessas de saúde ("resolva seu problema de vista") e preços sem confirmação do cliente (políticas Meta).

## Criativos estáticos (pasta `png/`, feed 1080x1350 e story 1080x1920)
| # | Ângulo | Headline | Legenda sugerida |
|---|--------|----------|------------------|
| 01 | Presença | A Super Ótica está pertinho de você. | Passou por aqui? 👓 A Super Ótica está em Mogi das Cruzes, com óculos de grau e solar. Venha conhecer a loja. 📍 [ENDEREÇO] |
| 02 | Vizinhança | Sua próxima ótica é aqui do lado. | Ótica do seu bairro, atendimento de perto. Passe na Super Ótica e conheça nosso espaço. 📍 [ENDEREÇO] |
| 03 | Produto | Armações pra todo estilo. | Grau e solar: escolha com calma, experimente e leve o que combina com você. 📍 Mogi das Cruzes |
| 04 | Atendimento | Aqui você é atendido de verdade. | Equipe pronta para te ajudar a escolher com tranquilidade. Visite a Super Ótica. 📍 [ENDEREÇO] |
| 05 | Condições | Cabe no seu bolso, cabe no seu estilo. | Pergunte na loja pelas condições de pagamento. 📍 Mogi das Cruzes |

CTA do anúncio: "Como chegar" (ou "Saiba mais" apontando ao mapa/WhatsApp).
Teste sugerido: 01 e 02 (presença) vs 03 e 05 (produto/condição) — comparar alcance, custo por mil e cliques em "como chegar".

## Roteiros em vídeo (Reels/Stories, 15–30s)

### Roteiro A — "Conheça a loja" (20s)
| Tempo | Imagem | Fala / texto na tela |
|---|---|---|
| 0–3s | Fachada da loja, plano aberto | Texto: "Você conhece a Super Ótica?" |
| 3–8s | Entrada + vitrine de armações | Locução: "Aqui em Mogi das Cruzes, pertinho de você, tem uma ótica com óculos de grau e solar." |
| 8–14s | Atendente recebendo cliente | "Atendimento especializado, pra você escolher com calma." |
| 14–18s | Cliente experimentando armação no espelho | "E condições facilitadas de pagamento." |
| 18–20s | Fachada + endereço | "Super Ótica. Passe aqui e conheça. 📍 [ENDEREÇO]" |

### Roteiro B — "Passou por aqui?" (15s, estilo vizinhança)
| Tempo | Imagem | Fala / texto |
|---|---|---|
| 0–2s | Rua/esquina próxima à loja | Texto: "Mora ou trabalha perto de [BAIRRO]?" |
| 2–7s | Caminhada até a loja, chegada | "Tem uma ótica nova pra você conhecer a poucos passos." *(só usar "nova" se confirmado)* |
| 7–12s | Interior, armações, cliente sorrindo | "Óculos de grau e solar, com atendimento de verdade." |
| 12–15s | Logo + mapa | "Super Ótica — Mogi das Cruzes. Venha nos visitar." |

### Roteiro C — "Tour de 30 segundos" (30s, Stories com enquete)
| Tempo | Imagem | Fala / texto |
|---|---|---|
| 0–4s | Gancho: close em armação sendo escolhida | "Escolher óculos não precisa ser chato." |
| 4–12s | Tour: balcão, vitrines, área de exames/atendimento (se houver) | "Dá uma olhada no nosso espaço: tudo organizado pra você experimentar à vontade." |
| 12–22s | Depoimento curto de cliente (com autorização) ou equipe | "Aqui a gente te ajuda a achar o modelo que combina com o seu rosto e com o seu dia a dia." |
| 22–27s | Etiqueta de condições (sem valores sem aprovação) | "Condições facilitadas de pagamento." |
| 27–30s | Fachada + endereço + sticker de localização | "Super Ótica. Te esperamos! 📍" |

## Reprodução
`NODE_PATH=$(npm root -g) node gerar.js` regenera os PNGs; edite o array `conceitos` e a paleta `C` no topo do arquivo.
