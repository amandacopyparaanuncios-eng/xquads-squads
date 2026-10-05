// Gera Super-Otica_Reconhecimento.docx (roteiros + criativos). Uso: NODE_PATH=$(npm root -g) node gerar-docx.js
const fs = require('fs'), path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, ShadingType, ImageRun, AlignmentType, LevelFormat, PageBreak, BorderStyle } = require('docx');

const W = 10466; // largura útil (A4, margens 0.5")
const bord = { style: BorderStyle.SINGLE, size: 4, color: 'BBBBBB' };
const borders = { top: bord, bottom: bord, left: bord, right: bord };
const p = (t, o = {}) => new Paragraph({ spacing: { after: 100 }, ...o, children: [new TextRun({ text: t, ...(o.run || {}) })] });
const h1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const h2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const li = (t) => new Paragraph({ numbering: { reference: 'b', level: 0 }, spacing: { after: 60 }, children: [new TextRun(t)] });

const cell = (t, w, head) => new TableCell({
  width: { size: w, type: WidthType.DXA }, borders,
  shading: head ? { fill: 'FFD000', type: ShadingType.CLEAR, color: 'auto' } : undefined,
  margins: { top: 70, bottom: 70, left: 100, right: 100 },
  children: [new Paragraph({ children: [new TextRun({ text: t, bold: !!head, size: 20 })] })],
});
const tabela = (cols, rows) => {
  const tot = cols.reduce((a, b) => a + b, 0);
  const wi = cols.map((c) => Math.round((c / tot) * W));
  wi[wi.length - 1] += W - wi.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: wi,
    rows: rows.map((r, i) => new TableRow({ tableHeader: i === 0, children: r.map((t, j) => cell(t, wi[j], i === 0)) })),
  });
};

const criativos = [
  ['01-estamos-aqui', 'Presença', 'Ótica perto de você!', 'Passou por aqui? 👓 A Super Ótica está em Mogi das Cruzes, com óculos de grau e solar. Venha conhecer a loja. 📍 [ENDEREÇO]'],
  ['02-vizinha', 'Vizinhança', 'Sua ótica aqui do lado!', 'Ótica do seu bairro, atendimento de perto. Passe na Super Ótica e conheça nosso espaço. 📍 [ENDEREÇO]'],
  ['03-grau-e-solar', 'Produto', 'Armações pra todo estilo!', 'Grau e solar: escolha com calma, experimente e leve o que combina com você. 📍 Mogi das Cruzes'],
  ['04-atendimento', 'Atendimento', 'Atendimento especializado!', 'Equipe pronta para te ajudar a escolher com tranquilidade. Visite a Super Ótica. 📍 [ENDEREÇO]'],
  ['05-condicoes', 'Condições', 'Condições facilitadas!', 'Pergunte na loja pelas condições de pagamento. 📍 Mogi das Cruzes'],
];

const roteiros = [
  ['A — "Conheça a loja" (20s)', [
    ['Tempo', 'Imagem', 'Fala / texto na tela'],
    ['0–3s', 'Fachada da loja, plano aberto', 'Texto: "Você conhece a Super Ótica?"'],
    ['3–8s', 'Entrada + vitrine de armações', 'Locução: "Aqui em Mogi das Cruzes, pertinho de você, tem uma ótica com óculos de grau e solar."'],
    ['8–14s', 'Atendente recebendo cliente', '"Atendimento especializado, pra você escolher com calma."'],
    ['14–18s', 'Cliente experimentando armação no espelho', '"E condições facilitadas de pagamento."'],
    ['18–20s', 'Fachada + endereço', '"Super Ótica. Passe aqui e conheça. 📍 [ENDEREÇO]"']]],
  ['B — "Passou por aqui?" (15s)', [
    ['Tempo', 'Imagem', 'Fala / texto na tela'],
    ['0–2s', 'Rua/esquina próxima à loja', 'Texto: "Mora ou trabalha perto de [BAIRRO]?"'],
    ['2–7s', 'Caminhada até a loja, chegada', '"Tem uma ótica pra você conhecer a poucos passos." (usar "nova" só se confirmado)'],
    ['7–12s', 'Interior, armações, cliente sorrindo', '"Óculos de grau e solar, com atendimento de verdade."'],
    ['12–15s', 'Logo + mapa', '"Super Ótica — Mogi das Cruzes. Venha nos visitar."']]],
  ['C — "Tour de 30 segundos" (30s, Stories)', [
    ['Tempo', 'Imagem', 'Fala / texto na tela'],
    ['0–4s', 'Gancho: close em armação sendo escolhida', '"Escolher óculos não precisa ser chato."'],
    ['4–12s', 'Tour: balcão, vitrines, área de atendimento', '"Dá uma olhada no nosso espaço: tudo organizado pra você experimentar à vontade."'],
    ['12–22s', 'Depoimento curto de cliente (com autorização) ou equipe', '"Aqui a gente te ajuda a achar o modelo que combina com você e com o seu dia a dia."'],
    ['22–27s', 'Etiqueta de condições (sem valores sem aprovação)', '"Condições facilitadas de pagamento."'],
    ['27–30s', 'Fachada + endereço + sticker de localização', '"Super Ótica. Te esperamos! 📍"']]],
];

const body = [
  new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun('Super Ótica — Campanha de Reconhecimento')] }),
  p('Mogi das Cruzes · Roteiros e criativos estáticos', { run: { color: '666666', size: 24 } }),
  p('Tarefa ClickUp: Criar criativos de reconhecimento para as óticas (https://app.clickup.com/t/17tgxqybkbm)', { run: { size: 20 } }),

  h1('1. Contexto levantado'),
  li('Cliente: Super Ótica — óculos de grau e solar, Mogi das Cruzes.'),
  li('Hoje: campanha de mensagens (WhatsApp), CPA médio de R$ 4–5, CTR ~1,1%, verba curta (~R$ 30–45/dia).'),
  li('Copy atual: "Cuidar da sua visão nunca foi tão fácil… atendimento especializado, condições facilitadas de pagamento e qualidade de verdade".'),
  li('Objetivo desta campanha: reconhecimento local — quem mora ou passa perto das lojas conhecer o espaço físico.'),
  li('Sugestão de mídia: objetivo Reconhecimento (alcance), raio de 3–5 km ao redor de cada loja, 18+, frequência 2–3/semana; depois remarketing de quem viu 50%+ do vídeo para a campanha de mensagens.'),

  h2('A preencher (não existia no ClickUp)'),
  li('Endereço e horário de cada loja; fotos reais da fachada/interior; logo original; oferta vigente.'),
  li('Evitar promessas de saúde e preços sem confirmação do cliente (políticas da Meta).'),
  li('Os criativos seguem o modelo enviado pelo cliente; logo e armações são recortes dele e a fonte é aproximada.'),

  new Paragraph({ children: [new PageBreak()] }),
  h1('2. Criativos estáticos'),
  p('Formatos: feed 1080x1350 e story 1080x1920 (arquivos PNG na pasta png/). CTA sugerido: "Como chegar" ou "Saiba mais". Teste A/B: 01 e 02 (presença) vs 03 e 05 (produto/condição), comparando alcance, custo por mil e cliques em "como chegar".'),
  tabela([1, 2, 5], [['#', 'Ângulo / headline', 'Legenda sugerida'], ...criativos.map((c, i) => ['0' + (i + 1), `${c[1]} — ${c[2]}`, c[3]])]),
];

criativos.forEach((c, i) => {
  if (i % 2 === 0) body.push(new Paragraph({ children: [new PageBreak()] }));
  body.push(p(`Criativo 0${i + 1} — ${c[1]}`, { run: { bold: true }, spacing: { before: 120, after: 60 } }));
  body.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new ImageRun({
    type: 'png', data: fs.readFileSync(path.join(__dirname, 'png', `${c[0]}_feed-1080x1350.png`)),
    transformation: { width: 336, height: 420 }, altText: { title: c[2], description: c[2], name: c[0] } })] }));
});

body.push(new Paragraph({ children: [new PageBreak()] }), h1('3. Roteiros em vídeo (Reels/Stories)'));
roteiros.forEach(([t, rows]) => { body.push(h2('Roteiro ' + t), tabela([1, 3, 5], rows), p('')); });

const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Arial', size: 22 } } },
    paragraphStyles: [
      { id: 'Title', name: 'Title', basedOn: 'Normal', run: { size: 44, bold: true }, paragraph: { spacing: { after: 120 } } },
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 32, bold: true }, paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 26, bold: true }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
    ],
  },
  numbering: { config: [{ reference: 'b', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }] },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 720, bottom: 720, left: 720, right: 720 } } }, children: body }],
});
Packer.toBuffer(doc).then((b) => fs.writeFileSync(path.join(__dirname, 'Super-Otica_Reconhecimento.docx'), b));
