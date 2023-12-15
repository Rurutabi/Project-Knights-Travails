(()=>{"use strict";class t{allGrid=document.querySelectorAll(".grid-item");placeButton=document.querySelector(".place-knight");clearButton=document.querySelector(".clear");randomButton=document.querySelector(".random-knight");selectButton=document.querySelector(".select-end");travailButton=document.querySelector(".travail");placeMode=!1;isKnightOnBoard=!1;knightMovementRows=[-2,-1,1,2,2,1,-1,-2];knightMovementCols=[-1,-2,-2,-1,1,2,2,1];chessboard=Array.from({length:8},((t,e)=>Array.from({length:8},((t,e)=>[]))));globalRow=0;globalCol=0;globalIndex=0;constructor(){this.switchKnight(),this.switchOff(),this.placeKnight(),this.checkGridLocation(),this.findPath(),this.adjustList()}placeKnight(){this.allGrid.forEach(((t,e)=>{t.addEventListener("click",(o=>{!0===this.placeMode&&!1===this.isKnightOnBoard&&(this.createKnight(t),this.isKnightOnBoard=!0,this.placeMode=!1,this.updateArray(e),console.log(this.globalIndex));const s=Math.floor(e/8),i=e%8;console.log(s,i),console.log("-----------------------------------------------")}))}))}findPath(){this.travailButton.addEventListener("click",(t=>{if(null===this.chessboard)return;let e=[],o=0;for(let t=0;t<this.chessboard.length;t++){e[t]=[];for(let s=0;s<this.chessboard[t].length;s++)e[t][s]={distance:null,predecessor:null,number:o++}}let s=Math.floor(this.globalIndex/8),i=this.globalIndex%8,n=new Set;e[s][i].distance=0;let l=[this.globalIndex];for(;l.length;){const t=l.shift();if(!n.has(t)){let o=Math.floor(t/8),s=t%8;if(7===o&&0===s)return console.log("The distance is "+e[o][s].distance),console.log(e),void console.log("Destination found");for(let i=0;i<this.chessboard[o][s].length;i++){let n=this.chessboard[o][s][i],h=Math.floor(n/8),c=n%8;null===e[h][c].distance&&(e[h][c].distance=e[o][s].distance+1,e[h][c].predecessor=t,l.push(n))}n.add(t)}}}))}checkGridLocation(){this.travailMode=!0}updateArray(t){const e=Math.floor(t/8),o=t%8;this.globalIndex=t,this.globalRow=e,this.globalCol=o}switchKnight(){this.placeButton.addEventListener("click",(t=>{this.placeMode=!0}))}switchOff(){this.clearButton.addEventListener("click",(t=>{this.clearArray(),this.removeKnight(),this.isKnightOnBoard=!1,this.placeMode=!1}))}createKnight(t){const e=document.createElement("img");e.classList.add("knight-icon"),e.src="images/knighticon.png",t.appendChild(e)}removeKnight(){document.querySelector(".knight-icon").remove()}clearArray(){this.chessboard=this.chessboard.map((t=>t.map((()=>""))))}checkGridLocation(){let t=-1;this.allGrid.forEach((e=>{t++,e.textContent=e.textContent+t}))}isWithinBound(t,e){return t>=0&&t<8&&e>=0&&e<8}adjustList(){const t=this.chessboard.length,e=this.chessboard[0].length;for(let o=0;o<t;o++)for(let t=0;t<e;t++)for(let s=0;s<this.knightMovementRows.length;s++){let i=t;const n=o+this.knightMovementRows[s],l=i+this.knightMovementCols[s];if(this.isWithinBound(n,l)){const s=n*e+l;this.chessboard[o][t].push(s)}}console.log(this.chessboard[4][4].length)}}new class{constructor(){this.knightMove=new t}}})();