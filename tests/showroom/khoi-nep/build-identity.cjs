// Sinh logo SVG (chữ chuyển thành path), favicon, og-image. Chạy: node build-identity.cjs <thư mục opentype.js> <thư mục fonts @fontsource>
const OT=require(process.argv[2]+'/node_modules/opentype.js');
const sharp=require('/Users/mac/mern/works/hancitywebsite/node_modules/sharp');
const fs=require('fs');const FD=process.argv[3];
const OUT='/Users/mac/mern/personal/trancongtien/public/images/demos/khoi-nep';
const load=(w)=>['latin','vietnamese'].map(s=>OT.loadSync(`${FD}/ibm-plex-sans-${s}-${w}-normal.woff`));
const F={600:load(600),400:load(400)};
const INK='#262824',PAPER='#EDEAE2',TERRA='#A65338';
function glyphFont(fs_,ch){for(const f of fs_){if(f.charToGlyphIndex(ch)>0)return f}return fs_[0]}
// trả về {d,width}
function textPath(str,x,y,size,weight,track,anchor='start'){
  const fonts=F[weight];let cx=0;const parts=[];
  for(const ch of str){const f=glyphFont(fonts,ch);const g=f.charToGlyph(ch);const sc=size/f.unitsPerEm;
    parts.push({g,f,x:cx});cx+=g.advanceWidth*sc+track*size+(/[ẤẾỐẦỀỒẨỂỔẪỄỖẬỆỘ]/.test(ch)?0.13*size:0);}
  const width=cx-track*size;let ox=x;if(anchor==='middle')ox=x-width/2;
  let d='';for(const p of parts){const sc=size/p.f.unitsPerEm;d+=p.g.getPath(ox+p.x,y,size).toPathData(2);}
  return {d,width};
}
const symbol=(ink,terra,ox=0,oy=0,s=1)=>`<g transform="translate(${ox} ${oy}) scale(${s})"><rect x="16" y="8" width="20" height="112" fill="${ink}"/><polygon points="36,74 36,50 78,8 98,8" fill="${ink}"/><polygon points="36,54 36,78 78,120 98,120" fill="${ink}"/><rect x="108" y="8" width="12" height="112" fill="${ink}"/><rect x="44" y="8" width="14" height="14" fill="${terra}"/></g>`;
const svg=(vb,w,h,body,title,bg)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${w}" height="${h}" role="img" aria-label="${title}"><title>${title}</title>${bg?`<rect width="100%" height="100%" fill="${bg}"/>`:''}${body}</svg>\n`;
const wm=(x,y,size,fill,anchor)=>`<path fill="${fill}" d="${textPath('KHỐI NẾP',x,y,size,600,-0.02,anchor).d}"/>`;
const ds=(x,y,size,fill,anchor)=>`<path fill="${fill}" d="${textPath('INTERIOR & SPATIAL DESIGN',x,y,size,400,0.18,anchor).d}"/>`;
const T='Khối Nếp — Interior &amp; Spatial Design';
const primary=(ink,terra,bg)=>svg('0 0 320 200',320,200,symbol(ink,terra,120,8,0.625)+wm(160,138,48,ink,'middle')+ds(160,166,11,ink,'middle'),T,bg);
const horiz=(ink,terra,bg)=>svg('0 0 400 96',400,96,symbol(ink,terra,8,8,0.625)+wm(104,54,38,ink)+ds(106,75,8.6,ink),T,bg);
const w=(n,c)=>fs.writeFileSync(`${OUT}/identity/${n}`,c);
fs.mkdirSync(`${OUT}/identity`,{recursive:true});
w('logo-primary.svg',primary(INK,TERRA));
w('logo-horizontal.svg',horiz(INK,TERRA));
w('symbol.svg',svg('0 0 128 128',128,128,symbol(INK,TERRA),'Biểu tượng Khối Nếp'));
w('logo-mono.svg',horiz(INK,INK));
w('logo-reversed.svg',horiz(PAPER,'#D98B6E',INK));
w('favicon.svg',svg('0 0 128 128',128,128,symbol(PAPER,'#D98B6E',0,0,1),'Khối Nếp','').replace('<g','<rect width="128" height="128" fill="'+INK+'"/><g transform="translate(14 14) scale(.78)"><g').replace('</g></svg>','</g></g></svg>'));
(async()=>{
 const fav=fs.readFileSync(`${OUT}/identity/favicon.svg`);
 await sharp(fav,{density:300}).resize(32,32).png().toFile(`${OUT}/identity/favicon-32.png`);
 await sharp(fav,{density:300}).resize(180,180).png().toFile(`${OUT}/identity/apple-touch-icon.png`);
 // og
 const hero=await sharp(`${OUT}/hero-room-1200.webp`).resize(1200,630,{fit:'cover',position:'centre'}).toBuffer();
 const panel=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect x="0" y="0" width="1200" height="630" fill="${PAPER}" opacity="0.0"/><rect x="0" y="430" width="1200" height="200" fill="${PAPER}"/><rect x="0" y="430" width="1200" height="2" fill="${INK}"/>
 ${symbol(INK,TERRA,48,452,1.25)}
 <path fill="${INK}" d="${textPath('KHỐI NẾP',230,540,76,600,-0.02).d}"/>
 <path fill="${INK}" d="${textPath('INTERIOR & SPATIAL DESIGN',232,580,17,400,0.18).d}"/>
 <path fill="${INK}" d="${textPath('THIẾT KẾ & THI CÔNG NỘI THẤT',820,500,15,400,0.12).d}"/></svg>`);
 await sharp(hero).composite([{input:panel}]).webp({quality:82}).toFile(`${OUT}/identity/og-image.webp`);
})();
