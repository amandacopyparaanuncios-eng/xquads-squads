// Gera os criativos estáticos (PNG) a partir dos conceitos abaixo.
// Uso: NODE_PATH=$(npm root -g) node gerar.js
const { chromium } = require('playwright');
const path = require('path');

// Paleta provisória — trocar pelas cores da marca quando o cliente enviar o manual.
const C = { azul: '#0B2A5B', azul2: '#123F86', ambar: '#FFB400', claro: '#F6F8FC', branco: '#FFFFFF' };

const oculos = (cor) => `<svg viewBox="0 0 200 80" fill="none" stroke="${cor}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><circle cx="50" cy="45" r="30"/><circle cx="150" cy="45" r="30"/><path d="M80 42 Q100 28 120 42"/><path d="M20 40 L6 24"/><path d="M180 40 L194 24"/></svg>`;
const pin = (cor) => `<svg viewBox="0 0 24 24" fill="${cor}"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>`;

const conceitos = [
  { id: '01-estamos-aqui', tema: 'azul', topo: 'ÓTICA NA SUA REGIÃO', titulo: 'A Super Ótica<br>está pertinho<br>de você.', sub: 'Óculos de grau e solar em <b>Mogi das Cruzes</b>.', rodape: 'Venha conhecer a loja' },
  { id: '02-vizinha', tema: 'claro', topo: 'ÓTICA DO SEU BAIRRO', titulo: 'Sua próxima<br>ótica é<br><em>aqui do lado.</em>', sub: 'Passe na Super Ótica e conheça nosso espaço.', rodape: 'Mogi das Cruzes · [ENDEREÇO]' },
  { id: '03-grau-e-solar', tema: 'ambar', topo: 'GRAU E SOLAR', titulo: 'Armações<br>pra todo<br>estilo.', sub: 'Escolha com calma, experimente e leve o que combina com você.', rodape: 'Super Ótica · Mogi das Cruzes' },
  { id: '04-atendimento', tema: 'azul', topo: 'ATENDIMENTO ESPECIALIZADO', titulo: 'Aqui você<br>é atendido<br>de verdade.', sub: 'Equipe pronta pra te ajudar a escolher com tranquilidade.', rodape: 'Visite a Super Ótica' },
  { id: '05-condicoes', tema: 'claro', topo: 'CONDIÇÕES FACILITADAS', titulo: 'Cabe no<br>seu bolso,<br><em>cabe no seu estilo.</em>', sub: 'Pergunte na loja pelas condições de pagamento.', rodape: 'Super Ótica · Mogi das Cruzes' },
];

const temas = {
  azul:  { bg: `linear-gradient(160deg, ${C.azul}, ${C.azul2})`, fg: C.branco, destaque: C.ambar, icone: C.branco, chip: C.ambar, chipFg: C.azul },
  claro: { bg: C.claro, fg: C.azul, destaque: C.azul2, icone: C.azul, chip: C.azul, chipFg: C.branco },
  ambar: { bg: `linear-gradient(160deg, ${C.ambar}, #FFCF4D)`, fg: C.azul, destaque: C.azul, icone: C.azul, chip: C.azul, chipFg: C.branco },
};

const html = (c, w, h) => {
  const t = temas[c.tema];
  const story = h > 1500;
  return `<!doctype html><meta charset="utf-8"><style>
  *{box-sizing:border-box;margin:0}
  body{width:${w}px;height:${h}px;background:${t.bg};color:${t.fg};font-family:'Poppins','Segoe UI',Arial,sans-serif;
    padding:${story ? '230px 90px 260px' : '90px'};display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
  .anel{position:absolute;right:-180px;bottom:-180px;width:640px;height:640px;border-radius:50%;border:70px solid ${t.destaque};opacity:.18}
  .topo{display:flex;align-items:center;gap:20px;z-index:1}
  .chip{background:${t.chip};color:${t.chipFg};font-weight:700;font-size:28px;letter-spacing:2px;padding:14px 26px;border-radius:40px}
  .ic{width:130px;margin-bottom:30px}
  h1{font-size:${story ? 120 : 108}px;line-height:1.05;font-weight:800;letter-spacing:-2px;z-index:1}
  h1 em{font-style:normal;color:${t.destaque}}
  p.sub{font-size:44px;line-height:1.3;margin-top:36px;max-width:820px;opacity:.95;z-index:1}
  p.sub b{color:${t.destaque}}
  .rod{display:flex;align-items:center;gap:18px;font-size:36px;font-weight:700;z-index:1}
  .rod svg{width:48px;height:48px}
  .marca{font-size:30px;font-weight:600;opacity:.8;letter-spacing:1px}
  </style><body><div class="anel"></div>
  <div class="topo"><span class="chip">${c.topo}</span></div>
  <div><div class="ic">${oculos(t.icone)}</div><h1>${c.titulo}</h1><p class="sub">${c.sub}</p></div>
  <div><div class="rod">${pin(t.destaque)}<span>${c.rodape}</span></div><div class="marca" style="margin-top:18px">SUPER ÓTICA</div></div>
  </body>`;
};

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  for (const c of conceitos) {
    for (const [fmt, w, h] of [['feed-1080x1350', 1080, 1350], ['story-1080x1920', 1080, 1920]]) {
      const page = await browser.newPage({ viewport: { width: w, height: h } });
      await page.setContent(html(c, w, h));
      await page.screenshot({ path: path.join(__dirname, 'png', `${c.id}_${fmt}.png`) });
      await page.close();
    }
  }
  await browser.close();
})();
