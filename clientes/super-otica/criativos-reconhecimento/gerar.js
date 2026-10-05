// Gera os criativos estáticos (PNG) no estilo do modelo da Super Ótica (assets/modelo-referencia.png).
// Logo e armações são recortes do próprio modelo; trocar por arquivos originais quando o cliente enviar.
// Uso: NODE_PATH=$(npm root -g) node gerar.js
const { chromium } = require('playwright');
const path = require('path');
const ref = 'data:image/png;base64,' + require('fs').readFileSync(path.join(__dirname, 'assets/modelo-referencia.png')).toString('base64');

const AM = '#FFD000', PR = '#0E0E0E', BR = '#FFFFFF';
const calendario = `<svg viewBox="0 0 64 64" fill="none" stroke="${AM}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="12" width="48" height="44" rx="6"/><path d="M8 26h48M20 6v12M44 6v12"/></svg>`;
const pin = `<svg viewBox="0 0 24 24" fill="${AM}"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>`;
const oculos = `<svg viewBox="0 0 200 80" fill="none" stroke="${AM}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="22" width="76" height="50" rx="14"/><rect x="114" y="22" width="76" height="50" rx="14"/><path d="M86 38h28"/></svg>`;

// l1: linha branca grande | l2: linha amarela (faixa) | l3: caixa preta secundária | l4: pílula branca | rod: pílula preta
const conceitos = [
  { id: '01-estamos-aqui', icone: oculos, l1: 'ÓTICA PERTO<br>DE VOCÊ!', l2: 'CONHEÇA A SUPER ÓTICA', l3a: 'GRAU E', l3b: 'SOLAR', l4: 'EM MOGI DAS CRUZES!', rod: 'VENHA NOS VISITAR' },
  { id: '02-vizinha', icone: pin, l1: 'SUA ÓTICA<br>AQUI DO LADO!', l2: 'PASSE E CONHEÇA NOSSO ESPAÇO', l3a: 'ATENDIMENTO', l3b: 'DE PERTO', l4: 'ÓTICA DO SEU BAIRRO!', rod: '[ENDEREÇO] · MOGI' },
  { id: '03-grau-e-solar', icone: oculos, l1: 'ARMAÇÕES<br>PRA TODO ESTILO!', l2: 'ESCOLHA COM CALMA NA LOJA', l3a: 'EXPERIMENTE', l3b: 'À VONTADE', l4: 'GRAU E SOLAR!', rod: 'SUPER ÓTICA · MOGI DAS CRUZES' },
  { id: '04-atendimento', icone: pin, l1: 'ATENDIMENTO<br>ESPECIALIZADO!', l2: 'EQUIPE PRONTA PRA TE AJUDAR', l3a: 'ESCOLHA', l3b: 'COM CONFIANÇA', l4: 'VISITE A LOJA!', rod: '[ENDEREÇO] · MOGI' },
  { id: '05-condicoes', icone: calendario, l1: 'CONDIÇÕES<br>FACILITADAS!', l2: 'PERGUNTE NA LOJA', l3a: 'PAGAMENTO', l3b: 'FACILITADO', l4: 'ÓCULOS DE GRAU E SOLAR!', rod: 'SUPER ÓTICA · MOGI DAS CRUZES' },
];

const html = (c, w, h) => {
  const s = h > 1500; // story
  const u = w / 1254; // escala em relação ao modelo
  return `<!doctype html><meta charset="utf-8"><style>
  *{box-sizing:border-box;margin:0}
  body{width:${w}px;height:${h}px;background:${AM};
    font-family:'FreeSans','Liberation Sans',Arial,sans-serif;font-weight:700;font-style:italic;position:relative;overflow:hidden}
  .rec{position:absolute;background:url(${ref}) no-repeat;-webkit-mask-image:radial-gradient(ellipse at center,#000 55%,transparent 98%);mask-image:radial-gradient(ellipse at center,#000 55%,transparent 98%)}
  .arm1,.arm2{-webkit-mask-image:linear-gradient(to var(--d),#000 70%,transparent 100%),linear-gradient(to var(--v),#000 70%,transparent 100%);-webkit-mask-composite:source-in;mask-composite:intersect}
  .arm1{--d:left;--v:bottom}.arm2{--d:right;--v:top}
  .logo{left:${(w - 530 * u) / 2}px;top:${s ? 170 : 40 * u}px;width:${530 * u}px;height:${195 * u}px;background-size:${1254 * u}px;background-position:${-350 * u}px ${-50 * u}px}
  .arm1{right:0;top:${s ? 0 : 0}px;width:${329 * u}px;height:${228 * u}px;background-size:${1254 * u}px;background-position:${-925 * u}px 0}
  .arm2{left:0;bottom:${s ? 90 : 0}px;width:${275 * u}px;height:${290 * u}px;background-size:${1254 * u}px;background-position:0 ${-964 * u}px}
  .col{position:absolute;left:${70 * u}px;right:${70 * u}px;top:${s ? 470 : 255 * u}px;display:flex;flex-direction:column;gap:${22 * u}px}
  .p1{background:${PR};border-radius:${32 * u}px;padding:${34 * u}px ${44 * u}px;display:flex;align-items:center;gap:${30 * u}px;box-shadow:0 10px 30px #0006}
  .p1 i{width:${150 * u}px;flex:none;display:block}
  .p1 span{color:${BR};font-size:${112 * u}px;line-height:1;letter-spacing:-2px;-webkit-text-stroke:${3 * u}px ${BR};text-shadow:${4 * u}px ${6 * u}px 0 #0008;text-transform:none}
  .p2{background:${AM};border:${5 * u}px solid ${PR};border-radius:${24 * u}px;padding:${22 * u}px ${30 * u}px;color:${PR};font-size:${56 * u}px;-webkit-text-stroke:${2 * u}px ${PR};text-align:center;box-shadow:0 8px 20px #0004}
  .p3{background:${PR};border-radius:${32 * u}px;padding:${34 * u}px ${44 * u}px;color:${BR};font-size:${100 * u}px;line-height:1.02;-webkit-text-stroke:${3 * u}px currentColor;text-align:center;box-shadow:0 10px 30px #0006}
  .p3 em{color:${AM};font-style:inherit;display:block}
  .p4{align-self:center;background:${BR};border-radius:${22 * u}px;padding:${14 * u}px ${46 * u}px;color:${PR};font-size:${48 * u}px;box-shadow:0 8px 20px #0004}
  .rod{align-self:center;background:${PR};border-radius:${28 * u}px;padding:${22 * u}px ${44 * u}px;display:flex;align-items:center;gap:${22 * u}px;color:${BR};font-size:${54 * u}px}
  .rod svg{width:${70 * u}px;height:${70 * u}px}
  .reg{position:absolute;bottom:${s ? 130 : 20 * u}px;width:100%;text-align:center;font-size:${22 * u}px;font-style:normal;font-weight:400;color:${PR}}
  </style><body>
  <div class="rec arm1"></div><div class="rec arm2"></div><div class="rec logo"></div>
  <div class="col">
    <div class="p1"><i>${c.icone}</i><span>${c.l1}</span></div>
    <div class="p2">${c.l2}</div>
    <div class="p3">${c.l3a}<em>${c.l3b}</em></div>
    <div class="p4">${c.l4}</div>
    <div class="rod">${pin}<span>${c.rod}</span></div>
  </div>
  <div class="reg">consulte regulamento</div></body>`;
};

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  for (const c of conceitos) {
    for (const [fmt, w, h] of [['feed-1080x1350', 1080, 1350], ['story-1080x1920', 1080, 1920]]) {
      const page = await browser.newPage({ viewport: { width: w, height: h } });
      await page.setContent(html(c, w, h));
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(__dirname, 'png', `${c.id}_${fmt}.png`) });
      await page.close();
    }
  }
  await browser.close();
})();
