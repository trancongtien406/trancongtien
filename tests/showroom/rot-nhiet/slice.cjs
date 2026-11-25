const s=require('/Users/mac/mern/works/hancitywebsite/node_modules/sharp');
(async()=>{const f=process.argv[2],W=+process.argv[3],H=+process.argv[4],pre=process.argv[5];const m=await s(f).metadata();console.log(m.width,m.height);
const n=Math.ceil(m.height/H);for(let i=0;i<n;i++)await s(f).extract({left:0,top:i*H,width:m.width,height:Math.min(H,m.height-i*H)}).resize({width:W}).toFile(pre+i+'.png');console.log(n)})()
