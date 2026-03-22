"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface LoaderScreenProps { onComplete: () => void; }

/* ══════════════════════════════════════════════════════════════════════════
   PALETTE
══════════════════════════════════════════════════════════════════════════ */
type BK = keyof typeof PAL;
const PAL = {
  stone:    { t:"#9a9a9a", l:"#6e6e6e", r:"#5a5a5a" },
  cobble:   { t:"#888",    l:"#606060", r:"#505050" },
  brick:    { t:"#a04040", l:"#7a2a2a", r:"#642020" },
  mossy:    { t:"#6a8a5a", l:"#4a6a3a", r:"#3a5a2a" },
  wood:     { t:"#c8a060", l:"#8b6a30", r:"#7a5820" },
  plank:    { t:"#d4a85a", l:"#9a7030", r:"#7a5820" },
  lava:     { t:"#ff5500", l:"#cc2200", r:"#aa1500" },
  diamond:  { t:"#4ecdc4", l:"#2a9d97", r:"#1d7872" },
  gold:     { t:"#ffd700", l:"#c8860a", r:"#a86e08" },
  tnt:      { t:"#dd3333", l:"#882222", r:"#661111" },
  grass:    { t:"#5db85c", l:"#8b5e3c", r:"#6b4a2a" },
  dirt:     { t:"#956342", l:"#6b4a2a", r:"#7a5232" },
  obsidian: { t:"#2a1a3a", l:"#1a0a2a", r:"#150820" },
  torch:    { t:"#ff9900", l:"#cc6600", r:"#aa4400" },
  water:    { t:"#2255cc", l:"#1a3a99", r:"#122a77" },
  iron:     { t:"#c0c0c0", l:"#909090", r:"#707070" },
  bedrock:  { t:"#555",    l:"#333",    r:"#282828"  },
  air:      { t:"transparent", l:"transparent", r:"transparent" },
};

/* ══════════════════════════════════════════════════════════════════════════
   CASTLE BLUEPRINT  — 3D array [layer][row][col]  (Y, Z, X in iso)
   Grid: 13 wide × 11 deep × 10 tall
   Read as: blueprint[y][z][x]  → BK | null
══════════════════════════════════════════════════════════════════════════ */
const W = 13, D = 11, H_MAX = 14;

function makeCastle(): (BK | null)[][][] {
  const grid: (BK | null)[][][] = Array.from({ length: H_MAX }, () =>
    Array.from({ length: D }, () => Array(W).fill(null))
  );
  const set = (y: number, z: number, x: number, b: BK) => {
    if (y >= 0 && y < H_MAX && z >= 0 && z < D && x >= 0 && x < W) grid[y][z][x] = b;
  };
  const fill = (y0:number,y1:number,z0:number,z1:number,x0:number,x1:number,b:BK)=>{
    for(let y=y0;y<=y1;y++) for(let z=z0;z<=z1;z++) for(let x=x0;x<=x1;x++) set(y,z,x,b);
  };

  /* ── Ground layer — grass + dirt base ── */
  fill(0, 0, 0, D-1, 0, W-1, "grass");

  /* ── Courtyard — stone floor ── */
  fill(1, 1, 2, D-3, 2, W-3, "stone");

  /* ── Moat — water ring around base ── */
  // front + back
  for (let x=0;x<W;x++) { set(0,0,x,"water"); set(0,D-1,x,"water"); }
  // sides
  for (let z=1;z<D-1;z++) { set(0,z,0,"water"); set(0,z,W-1,"water"); }

  /* ── Outer walls (3 high) — cobble ── */
  // front wall
  for(let x=1;x<W-1;x++) for(let y=1;y<=3;y++) set(y,1,x,"cobble");
  // back wall
  for(let x=1;x<W-1;x++) for(let y=1;y<=3;y++) set(y,D-2,x,"cobble");
  // left wall
  for(let z=1;z<D-1;z++) for(let y=1;y<=3;y++) set(y,z,1,"cobble");
  // right wall
  for(let z=1;z<D-1;z++) for(let y=1;y<=3;y++) set(y,z,W-2,"cobble");

  /* ── Gate opening in front wall ── */
  for(let y=1;y<=3;y++) { set(y,1,6,"air"); set(y,1,7,"air"); }
  // Gate arch — wood frame
  set(4,1,5,"wood"); set(4,1,6,"wood"); set(4,1,7,"wood"); set(4,1,8,"wood");

  // front battlement
  for(let x=1;x<=W-2;x+=2) set(4,1,x,"stone");
  // back battlement
  for(let x=1;x<=W-2;x+=2) set(4,D-2,x,"stone");
  // left/right battlements
  for(let z=1;z<=D-2;z+=2) set(4,z,1,"stone");
  for(let z=1;z<=D-2;z+=2) set(4,z,W-2,"stone");

  /* ── Corner towers (4×4 footprint, 7 tall) ── */
  const tower = (tz: number, tx: number) => {
    for(let y=1;y<=7;y++){
      for(let z=tz;z<=tz+1;z++) for(let x=tx;x<=tx+1;x++){
        if(y<=3) set(y,z,x,"brick");
        else set(y,z,x,"stone");
      }
    }
    // tower top battlements
    for(let z=tz;z<=tz+1;z++) for(let x=tx;x<=tx+1;x++) set(8,z,x,"cobble");
    // torch on tower
    set(8, tz, tx, "torch");
  };
  tower(1,1); tower(1,W-3); tower(D-3,1); tower(D-3,W-3);

  /* ── Inner keep — centre, 5 tall, brick ── */
  // keep walls
  for(let y=1;y<=6;y++){
    for(let x=5;x<=8;x++) { set(y,3,x,"brick"); set(y,D-4,x,"brick"); }
    for(let z=3;z<=D-4;z++) { set(y,z,5,"brick"); set(y,z,8,"brick"); }
  }
  // keep floor
  fill(1,1,3,D-4,5,8,"plank");
  // keep battlements
  for(let x=5;x<=8;x+=2){ set(7,3,x,"stone"); set(7,D-4,x,"stone"); }
  for(let z=3;z<=D-4;z+=2){ set(7,z,5,"stone"); set(7,z,8,"stone"); }
  // keep door
  set(1,3,6,"air"); set(2,3,6,"air"); set(1,3,7,"air"); set(2,3,7,"air");

  /* ── Keep tower — centre tall ── */
  for(let y=1;y<=11;y++) for(let z=5;z<=6;z++) for(let x=6;x<=7;x++) set(y,z,x,"obsidian");
  // spire battlements
  for(let z=5;z<=6;z++) for(let x=6;x<=7;x++) set(12,z,x,"diamond");
  // gold top
  set(13,5,6,"gold"); set(13,6,6,"gold"); set(13,5,7,"gold"); set(13,6,7,"gold");

  /* ── Torches on inner walls ── */
  set(3,2,3,"torch"); set(3,2,W-4,"torch");
  set(3,D-3,3,"torch"); set(3,D-3,W-4,"torch");

  /* ── TNT hidden in cellar ── */
  set(1,D-4,6,"tnt"); set(1,D-4,7,"tnt");

  /* ── Lava pit inside keep ── */
  set(1,4,6,"lava"); set(1,4,7,"lava");

  return grid;
}

/* ══════════════════════════════════════════════════════════════════════════
   BUILD ORDER — flatten to a sorted list of (y,z,x,block)
   Sorted: ground first, then layer by layer, inside-out per layer
══════════════════════════════════════════════════════════════════════════ */
interface Voxel { y:number; z:number; x:number; block:BK; placed:boolean; dropOff:number; settled:boolean; vy:number; }

function buildOrder(grid:(BK|null)[][][]): Voxel[] {
  const voxels: Voxel[] = [];
  for(let y=0;y<H_MAX;y++){
    for(let z=0;z<D;z++){
      for(let x=0;x<W;x++){
        const b = grid[y][z][x];
        if(b && b !== "air"){
          voxels.push({ y,z,x, block:b, placed:false, dropOff:-(180+Math.random()*160), settled:false, vy:0 });
        }
      }
    }
  }
  return voxels;
}

/* ══════════════════════════════════════════════════════════════════════════
   DRAW ONE ISO BLOCK
══════════════════════════════════════════════════════════════════════════ */
function drawBlock(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  BW: number, BH: number, SH: number,
  pal: {t:string;l:string;r:string},
  type: BK,
  glowAmt: number,
  tntBlink: boolean,
  torchPhase: number,
){
  if(pal.t === "transparent") return;
  const hw=BW/2, qh=BH/2;

  if(glowAmt>0){
    ctx.save();
    ctx.shadowColor = type==="lava"?"#ff5500":type==="torch"?"#ffaa00":type==="diamond"?"#4ecdc4":type==="gold"?"#ffd700":"#ff2222";
    ctx.shadowBlur  = glowAmt * 20;
  }

  /* TOP */
  ctx.beginPath();
  ctx.moveTo(cx,    cy);
  ctx.lineTo(cx+hw, cy+qh);
  ctx.lineTo(cx,    cy+BH);
  ctx.lineTo(cx-hw, cy+qh);
  ctx.closePath();
  const topFill = (type==="tnt"&&tntBlink) ? "#ff8888" : (type==="lava") ? lavaColor(torchPhase) : pal.t;
  ctx.fillStyle=topFill; ctx.fill();
  ctx.strokeStyle="rgba(0,0,0,0.2)"; ctx.lineWidth=0.7; ctx.stroke();

  /* LEFT */
  ctx.beginPath();
  ctx.moveTo(cx-hw, cy+qh);
  ctx.lineTo(cx,    cy+BH);
  ctx.lineTo(cx,    cy+BH+SH);
  ctx.lineTo(cx-hw, cy+qh+SH);
  ctx.closePath();
  ctx.fillStyle=pal.l; ctx.fill();
  ctx.strokeStyle="rgba(0,0,0,0.28)"; ctx.stroke();

  /* RIGHT */
  ctx.beginPath();
  ctx.moveTo(cx,    cy+BH);
  ctx.lineTo(cx+hw, cy+qh);
  ctx.lineTo(cx+hw, cy+qh+SH);
  ctx.lineTo(cx,    cy+BH+SH);
  ctx.closePath();
  ctx.fillStyle=pal.r; ctx.fill();
  ctx.strokeStyle="rgba(0,0,0,0.32)"; ctx.stroke();

  if(glowAmt>0) ctx.restore();

  /* detail pixels */
  if(type==="torch"){
    ctx.save();
    ctx.shadowColor="#ffaa00"; ctx.shadowBlur=14;
    ctx.fillStyle=`rgba(255,${140+Math.sin(torchPhase)*40},0,0.9)`;
    ctx.beginPath(); ctx.arc(cx, cy+qh*0.6, BW*0.15, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  }
  if(type==="diamond"||type==="gold"){
    ctx.save();
    ctx.globalAlpha=0.35+Math.sin(torchPhase*1.3)*0.15;
    ctx.fillStyle="#fff";
    ctx.beginPath(); ctx.arc(cx-BW*0.1, cy+qh*0.55, BW*0.08, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  }
  if(type==="tnt"){
    ctx.save();
    ctx.fillStyle=tntBlink?"rgba(255,220,220,0.9)":"rgba(255,80,80,0.7)";
    ctx.font=`bold ${Math.max(6,BW*0.2)}px monospace`;
    ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText("TNT", cx, cy+BH*0.55);
    ctx.restore();
  }
}

function lavaColor(t:number):string{
  const r=220+Math.round(Math.sin(t*0.7)*35);
  const g=60+Math.round(Math.sin(t*0.5+1)*30);
  return `rgb(${r},${g},0)`;
}

/* ══════════════════════════════════════════════════════════════════════════
   PARTICLE / ORB / SHOCKWAVE types
══════════════════════════════════════════════════════════════════════════ */
interface Particle{ x:number;y:number;vx:number;vy:number;size:number;color:string;life:number;rot:number;rspd:number;glow:boolean; }
interface Orb{ x:number;y:number;vx:number;vy:number;size:number;life:number; }
interface Shockwave{ r:number;maxR:number;life:number;cx:number;cy:number; }
interface DustPuff{ x:number;y:number;r:number;life:number; }

const easeInOut=(t:number)=>t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2;

/* ══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════════ */
export default function LoaderScreen({onComplete}:LoaderScreenProps){
  const {theme}=useTheme();
  const isDark=theme==="dark";
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const doneRef=useRef(false);

  useEffect(()=>{
    const canvas=canvasRef.current; if(!canvas) return;
    const ctx=canvas.getContext("2d",{alpha:false})!;
    const dpr=devicePixelRatio||1;

    /* ── resize ── */
    const resize=()=>{
      canvas.width=window.innerWidth*dpr;
      canvas.height=window.innerHeight*dpr;
      canvas.style.width=window.innerWidth+"px";
      canvas.style.height=window.innerHeight+"px";
    };
    resize();
    window.addEventListener("resize",resize,{passive:true});

    /* ── castle data ── */
    const grid   = makeCastle();
    const voxels = buildOrder(grid);
    const TOTAL  = voxels.length;

    /* ── mutable state (no React re-renders — everything in rAF) ── */
    const S={
      t:         0,       // 0..1 loader progress
      count:     0,       // 0..100
      countDisp: 0,
      phase:     "build" as "build"|"explode"|"flash"|"done",
      torchPhase:0,
      tntBlink:  false,
      tntTimer:  0,
      particles: [] as Particle[],
      orbs:      [] as Orb[],
      shockwaves:[] as Shockwave[],
      dustPuffs: [] as DustPuff[],
      orbTimer:  0,
      shakeX:    0,
      shakeY:    0,
      shakeLife: 0,
      camScale:  1,
      camTargetS:1,
      camOffY:   0,
      camTargetY:0,
      flashAlpha:0,
      flashRed:  false,
      labelText: "Building...",
      // last placed voxel index
      lastPlaced:-1,
    };

    /* ── helpers ── */
    const triggerShake=(str:number)=>{
      S.shakeX=(Math.random()-0.5)*str*2;
      S.shakeY=(Math.random()-0.5)*str;
      S.shakeLife=1;
    };

    const spawnDebris=(cx:number,cy:number,n:number,colors:string[],spd:number,glow:boolean)=>{
      for(let i=0;i<n;i++){
        const a=Math.random()*Math.PI*2, v=spd*0.5+Math.random()*spd;
        S.particles.push({x:cx,y:cy,vx:Math.cos(a)*v,vy:Math.sin(a)*v-spd*0.4,
          size:5+Math.random()*12,color:colors[Math.floor(Math.random()*colors.length)],
          life:1,rot:Math.random()*6.28,rspd:(Math.random()-0.5)*0.18,glow});
      }
    };

    const spawnDust=(cx:number,cy:number)=>{
      S.dustPuffs.push({x:cx,y:cy,r:2,life:1});
    };

    /* ── main frame ── */
    const TOTAL_SECS = 4.2;
    let last=performance.now();
    const startTime=performance.now();
    let raf=0;

    const frame=(now:number)=>{
      if(doneRef.current) return;
      const dt=Math.min((now-last)/1000,0.05); last=now;
      const elapsed=(now-startTime)/1000;
      S.t=Math.min(elapsed/TOTAL_SECS,1);
      S.count=Math.round(easeInOut(S.t)*100);
      S.countDisp+=(S.count-S.countDisp)*Math.min(1,dt*10);
      S.torchPhase+=dt*3.5;

      /* responsive block size */
      const VW=canvas.width/dpr, VH=canvas.height/dpr;
      const BW=Math.max(28,Math.min(56,VW/((W+D)*0.62)));
      const BH=BW*0.55, SH=BW*0.36;

      /* world pixel size */
      const worldPxW=(W+D)*BW*0.5;
      const worldPxH=(W+D)*BH*0.5 + H_MAX*SH;

      /* isometric origin — centre of screen */
      const OX=VW*0.5;
      const OY=VH*0.5 - worldPxH*0.28 + S.camOffY;

      const toIso=(x:number,z:number,y:number)=>{
        const ix=OX + (x-z)*(BW*0.5);
        const iy=OY + (x+z)*(BH*0.5) - y*SH;
        return {ix,iy};
      };

      /* TNT blink */
      if(S.count>=85){ S.tntTimer+=dt; if(S.tntTimer>0.16){S.tntBlink=!S.tntBlink;S.tntTimer=0;} }

      /* place voxels up to current progress */
      const toPlace=Math.floor(S.t*TOTAL);
      for(let i=S.lastPlaced+1;i<toPlace;i++){
        const v=voxels[i];
        v.placed=true;
        S.lastPlaced=i;
        /* every 12th block spawn a dust puff */
        if(i%12===0){
          const {ix,iy}=toIso(v.x+0.5,v.z+0.5,v.y);
          spawnDust(ix,iy);
        }
        /* milestone shakes */
        if(i===Math.floor(TOTAL*0.25)) triggerShake(4);
        if(i===Math.floor(TOTAL*0.5))  triggerShake(5);
        if(i===Math.floor(TOTAL*0.75)) triggerShake(6);
      }

      /* settle physics */
      voxels.forEach(v=>{
        if(!v.placed||v.settled) return;
        v.vy+=1200*dt;
        v.dropOff+=v.vy*dt;
        if(v.dropOff>=0){
          v.vy*=-0.22;
          v.dropOff=0;
          if(Math.abs(v.vy)<5){v.vy=0;v.settled=true;}
        }
      });

      /* orbs */
      S.orbTimer+=dt;
      if(S.orbTimer>0.3&&S.phase==="build"){
        S.orbTimer=0;
        const {ix,iy}=toIso(W/2,D/2,0);
        for(let i=0;i<3;i++){
          S.orbs.push({x:ix+(Math.random()-0.5)*worldPxW*0.6,y:iy,
            vx:(Math.random()-0.5)*1.6,vy:-(1.3+Math.random()*2),
            size:3+Math.random()*5,life:1});
        }
      }
      S.orbs.forEach(o=>{o.x+=o.vx;o.y+=o.vy;o.vy-=0.035;o.life-=0.01;});
      S.orbs=S.orbs.filter(o=>o.life>0);

      /* particles */
      S.particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=0.26;p.vx*=0.97;p.life-=0.02;p.rot+=p.rspd;});
      S.particles=S.particles.filter(p=>p.life>0);

      /* dust */
      S.dustPuffs.forEach(d=>{d.r+=40*dt;d.life-=dt*2.5;});
      S.dustPuffs=S.dustPuffs.filter(d=>d.life>0);

      /* shockwaves */
      S.shockwaves.forEach(sw=>{
        sw.r+=(sw.maxR-sw.r)*dt*6;
        sw.life-=dt*1.6;
      });
      S.shockwaves=S.shockwaves.filter(sw=>sw.life>0);

      /* shake decay */
      if(S.shakeLife>0){
        S.shakeX*=0.75; S.shakeY*=0.75;
        S.shakeLife-=dt*3.5;
        if(S.shakeLife<=0){S.shakeX=0;S.shakeY=0;}
      }

      /* camera lerp */
      S.camScale+=(S.camTargetS-S.camScale)*Math.min(1,dt*5);
      S.camOffY +=(S.camTargetY-S.camOffY)*Math.min(1,dt*5);

      /* flash decay */
      if(S.phase!=="flash") S.flashAlpha=Math.max(0,S.flashAlpha-dt*3.5);

      /* label */
      if(S.count<20)       S.labelText="Laying Foundation...";
      else if(S.count<40)  S.labelText="Building Walls...";
      else if(S.count<60)  S.labelText="Raising Towers...";
      else if(S.count<80)  S.labelText="Constructing Keep...";
      else if(S.count<90)  S.labelText="Almost Done...";
      else if(S.count<100) S.labelText="⚠  TNT Detected";
      else                 S.labelText="⚡  BOOM!";

      /* 100% → explode */
      if(S.count===100&&S.phase==="build"){
        S.phase="explode";
        triggerShake(16);
        const {ix,iy}=toIso(W/2,D/2,4);
        S.flashAlpha=0.55; S.flashRed=true;
        spawnDebris(ix,iy,80,
          ["#ff4500","#ff2200","#ffd700","#ff6600","#fff","#4ecdc4","#5cb85c","#cc2222","#ff8800"],
          10,true);
        S.shockwaves.push({r:10,maxR:Math.max(VW,VH)*0.6,life:1,cx:ix,cy:iy});
        S.camTargetS=1.06; S.camTargetY=-VH*0.04;

        setTimeout(()=>{
          if(doneRef.current) return;
          const {ix:ix2,iy:iy2}=toIso(W/2,D/2,4);
          spawnDebris(ix2,iy2,60,["#ffd700","#ff4500","#4ecdc4","#fff","#ff8800","#a3d977"],13,true);
          S.shockwaves.push({r:10,maxR:Math.max(VW,VH)*0.75,life:1,cx:ix2,cy:iy2});
          triggerShake(22);
          S.flashAlpha=0.45; S.flashRed=false;
          S.camTargetS=0.88; S.camTargetY=VH*0.05;
        },320);

        setTimeout(()=>{
          if(doneRef.current) return;
          S.flashAlpha=1; S.flashRed=false; S.phase="flash";
          setTimeout(()=>{ doneRef.current=true; onComplete(); },380);
        },1300);
      }

      /* ══════════════════════════════════════════════════════════════
         DRAW
      ══════════════════════════════════════════════════════════════ */
      ctx.save();
      ctx.scale(dpr,dpr);

      /* bg */
      ctx.fillStyle=isDark?"#06090e":"#0d1117";
      ctx.fillRect(0,0,VW,VH);

      /* subtle scanlines */
      for(let y=0;y<VH;y+=3){
        ctx.fillStyle="rgba(0,0,0,0.07)";
        ctx.fillRect(0,y,VW,1);
      }

      /* sky stars */
      ctx.save();
      for(let i=0;i<60;i++){
        const sx=((i*137.5)%VW);
        const sy=((i*91.3)%VH*0.5);
        const sr=0.5+((i*31)%3)*0.5;
        const sa=0.2+Math.sin(S.torchPhase*0.3+i)*0.15;
        ctx.globalAlpha=sa;
        ctx.fillStyle="#ffffff";
        ctx.beginPath(); ctx.arc(sx,sy,sr,0,Math.PI*2); ctx.fill();
      }
      ctx.restore();

      /* vignette */
      const vig=ctx.createRadialGradient(VW*.5,VH*.5,VH*.1,VW*.5,VH*.5,VH*.8);
      vig.addColorStop(0,"rgba(0,0,0,0)");
      vig.addColorStop(1,"rgba(0,0,0,0.72)");
      ctx.fillStyle=vig; ctx.fillRect(0,0,VW,VH);

      /* camera */
      ctx.save();
      ctx.translate(S.shakeX,S.shakeY);
      ctx.translate(VW*.5,VH*.5);
      ctx.scale(S.camScale,S.camScale);
      ctx.translate(-VW*.5,-VH*.5);

      /* ── draw voxels painter's order (back to front, bottom to top) ── */
      /* Sort key: (z+x) asc for depth, then y asc for layers */
      const placed=voxels.filter(v=>v.placed);
      placed.sort((a,b)=>{
        const da=(a.z+a.x), db=(b.z+b.x);
        if(da!==db) return da-db;
        return a.y-b.y;
      });

      placed.forEach(v=>{
        const {ix,iy}=toIso(v.x+0.5,v.z+0.5,v.y);
        const screenY=iy+v.dropOff;
        const pal=PAL[v.block];
        const glowBlocks:BK[]=["lava","diamond","gold","torch","tnt"];
        const glow=glowBlocks.includes(v.block)?0.7:0;
        drawBlock(ctx,ix,screenY,BW,BH,SH,pal,v.block,glow,S.tntBlink,S.torchPhase);
      });

      /* torch glow halos */
      placed.filter(v=>v.block==="torch"&&v.settled).forEach(v=>{
        const {ix,iy}=toIso(v.x+0.5,v.z+0.5,v.y+0.5);
        ctx.save();
        const rad=ctx.createRadialGradient(ix,iy,0,ix,iy,BW*2.5);
        const flicker=0.18+Math.sin(S.torchPhase*2.1+v.x)*0.07;
        rad.addColorStop(0,`rgba(255,160,0,${flicker})`);
        rad.addColorStop(1,"rgba(255,100,0,0)");
        ctx.fillStyle=rad;
        ctx.beginPath(); ctx.arc(ix,iy,BW*2.5,0,Math.PI*2); ctx.fill();
        ctx.restore();
      });

      /* lava glow halos */
      placed.filter(v=>v.block==="lava"&&v.settled).forEach(v=>{
        const {ix,iy}=toIso(v.x+0.5,v.z+0.5,v.y+0.5);
        ctx.save();
        const rad=ctx.createRadialGradient(ix,iy,0,ix,iy,BW*3);
        const flicker=0.15+Math.sin(S.torchPhase*1.7+v.z)*0.08;
        rad.addColorStop(0,`rgba(255,80,0,${flicker})`);
        rad.addColorStop(1,"rgba(255,40,0,0)");
        ctx.fillStyle=rad;
        ctx.beginPath(); ctx.arc(ix,iy,BW*3,0,Math.PI*2); ctx.fill();
        ctx.restore();
      });

      /* shockwaves */
      S.shockwaves.forEach(sw=>{
        ctx.save();
        ctx.globalAlpha=sw.life*0.55;
        ctx.strokeStyle=`rgba(255,180,0,${sw.life})`;
        ctx.lineWidth=4*sw.life;
        ctx.shadowColor="#ff8800"; ctx.shadowBlur=18;
        ctx.beginPath(); ctx.arc(sw.cx,sw.cy,sw.r,0,Math.PI*2); ctx.stroke();
        ctx.restore();
      });

      /* orbs */
      S.orbs.forEach(o=>{
        ctx.save();
        ctx.globalAlpha=Math.max(0,o.life);
        ctx.shadowColor="#a3d977"; ctx.shadowBlur=o.size*3;
        ctx.fillStyle="#a3d977";
        ctx.beginPath(); ctx.arc(o.x,o.y,o.size/2,0,Math.PI*2); ctx.fill();
        ctx.restore();
      });

      /* dust puffs */
      S.dustPuffs.forEach(d=>{
        ctx.save();
        ctx.globalAlpha=Math.max(0,d.life*0.4);
        ctx.strokeStyle="#aaaaaa";
        ctx.lineWidth=1;
        ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,Math.PI*2); ctx.stroke();
        ctx.restore();
      });

      /* particles */
      S.particles.forEach(p=>{
        ctx.save();
        ctx.globalAlpha=Math.max(0,p.life);
        ctx.translate(p.x,p.y); ctx.rotate(p.rot);
        if(p.glow){ctx.shadowColor=p.color;ctx.shadowBlur=p.size*1.6;}
        ctx.fillStyle=p.color;
        ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);
        ctx.restore();
      });

      ctx.restore(); /* camera */

      /* ── HUD ── */

      /* progress bar bg track */
      ctx.fillStyle="rgba(255,255,255,0.07)";
      ctx.fillRect(0,VH-3,VW,3);
      /* progress fill */
      const pbColor=S.count>=88?"#ff5544":"#5cb85c";
      ctx.save();
      ctx.shadowColor=pbColor; ctx.shadowBlur=8;
      ctx.fillStyle=pbColor;
      ctx.fillRect(0,VH-3,(S.countDisp/100)*VW,3);
      ctx.restore();

      /* stage dots */
      const stages=[0,20,40,60,80,88];
      stages.forEach((thresh,i)=>{
        const active=S.count>=thresh;
        const isCur=i===stages.reduce((acc,t,j)=>S.count>=t?j:acc,0);
        const dw=isCur?20:active?10:5, dh=5;
        const dx=VW*0.5-(stages.length*14)*0.5+i*14;
        ctx.save();
        if(isCur){ctx.shadowColor=S.count>=88?"#ff5544":"#5cb85c";ctx.shadowBlur=7;}
        ctx.fillStyle=active?(i===stages.length-1?"#4ecdc4":"#5cb85c"):"rgba(255,255,255,0.14)";
        ctx.beginPath();
        if(ctx.roundRect) ctx.roundRect(dx-dw/2,VH-18,dw,dh,3);
        else ctx.rect(dx-dw/2,VH-18,dw,dh);
        ctx.fill(); ctx.restore();
      });

      /* counter */
      const fSize=Math.max(28,Math.min(72,VW*0.08));
      ctx.save();
      ctx.shadowColor=S.count>=88?"#ff4444":"#5cb85c"; ctx.shadowBlur=24;
      ctx.fillStyle="#ffffff";
      ctx.font=`900 ${fSize}px 'Courier New',monospace`;
      ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText(String(Math.round(S.countDisp)).padStart(2,"0"),VW*0.5,VH*0.87);
      ctx.restore();
      ctx.fillStyle="rgba(255,255,255,0.3)";
      ctx.font=`400 ${fSize*0.27}px 'Courier New',monospace`;
      ctx.textAlign="center";
      ctx.fillText("%",VW*0.5+fSize*0.6,VH*0.87+fSize*0.18);

      /* label */
      const lblColor=S.count>=85?(S.tntBlink?"#ff5555":"#ffaa44"):"rgba(255,255,255,0.45)";
      ctx.fillStyle=lblColor;
      ctx.font=`600 ${Math.max(9,VW*0.015)}px 'Courier New',monospace`;
      ctx.textAlign="center";
      ctx.fillText(S.labelText.toUpperCase(),VW*0.5,VH*0.92);

      /* corner labels */
      const cf=Math.max(8,VW*0.011);
      ctx.fillStyle="rgba(255,255,255,0.18)";
      ctx.font=`400 ${cf}px 'Courier New',monospace`;
      ctx.textAlign="left";  ctx.fillText("NAMANDADHICH.IN",22,24);
      ctx.textAlign="right"; ctx.fillText(`${Math.round(S.countDisp)}%`,VW-22,24);

      /* flash */
      if(S.flashAlpha>0.01){
        ctx.fillStyle=S.flashRed?`rgba(255,30,0,${S.flashAlpha})`:`rgba(255,255,255,${S.flashAlpha})`;
        ctx.fillRect(0,0,VW,VH);
      }

      ctx.restore(); /* dpr */
      raf=requestAnimationFrame(frame);
    };

    raf=requestAnimationFrame(frame);
    return ()=>{
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",resize);
    };
  },[isDark,onComplete]);

  return(
    <div style={{position:"fixed",inset:0,zIndex:9999}}>
      <canvas ref={canvasRef} style={{display:"block",width:"100%",height:"100%"}}/>
    </div>
  );
}