(()=>{"use strict";class t{allGrid=document.querySelectorAll(".grid-item");placeButton=document.querySelector(".place-knight");clearButton=document.querySelector(".clear");randomButton=document.querySelector(".random-knight");endButton=document.querySelector(".select-end");searchButton=document.querySelector(".travail");placeMode=!1;isKnightOnBoard=!1;isBoardRed=!1;selectendMode=!1;knightMovementRows=[-2,-1,1,2,2,1,-1,-2];knightMovementCols=[-1,-2,-2,-1,1,2,2,1];chessboard=Array.from({length:8},((t,e)=>Array.from({length:8},((t,e)=>[]))));starterPosition=0;destinationIndex=null;pathArr=[];constructor(){this.switchKnight(),this.switchOff(),this.placeKnight(),this.checkGridLocation(),this.findPath(),this.adjacencyList(),this.switchEnd()}placeKnight(){this.allGrid.forEach(((t,e)=>{t.addEventListener("click",(i=>this.handleGridClick(t,e)))}))}handleGridClick(t,e){!0===this.placeMode&&!1===this.isKnightOnBoard?(this.createKnight(t),this.isKnightOnBoard=!0,this.placeMode=!1,this.starterPosition=e):!0===this.isKnightOnBoard&&!0===this.selectendMode&&!1===this.isBoardRed&&(t.classList.add("red"),this.isBoardRed=!0,this.destinationIndex=e);const i=this.getRow(e),s=e%8;console.log("Row : ",i,"Col ",s),console.log("-----------------------------------------------"),console.log(this.pathArr)}findPath(){this.searchButton.addEventListener("click",(t=>{if(null!==this.destinationIndex&&!0===this.isKnightOnBoard){let t=[],e=0;for(let i=0;i<this.chessboard.length;i++){t[i]=[];for(let s=0;s<this.chessboard[i].length;s++)t[i][s]={distance:null,predecessor:null,number:e++}}let i=this.getRow(this.starterPosition),s=this.getCol(this.starterPosition),n=new Set;t[i][s].distance=0;let o=[this.starterPosition];for(;o.length;){const e=o.shift();if(!n.has(e)){let i=this.getRow(e),s=this.getCol(e);if(e===this.destinationIndex){let n=t[i][s].distance;if(null!==t[i][s].distance)for(let e=0;e<n;e++){let e=t[i][s].predecessor;i=this.getRow(e),s=this.getCol(e),this.pathArr.push(e),this.pathArr.reverse()}this.moveKnight(this.pathArr,e)}for(let n=0;n<this.chessboard[i][s].length;n++){let h=this.chessboard[i][s][n],r=this.getRow(h),c=this.getCol(h);null===t[r][c].distance&&(t[r][c].distance=t[i][s].distance+1,t[r][c].predecessor=e,o.push(h))}n.add(e)}}}}))}moveKnight(t,e){this.removeKnight();for(let i=0;i<t.length;i++)void 0!==t[i+1]?console.log("We go from",t[i],t[i+1]):console.log("We go from",t[i],e)}checkGridLocation(){this.travailMode=!0}switchKnight(){this.placeButton.addEventListener("click",(t=>{this.placeMode=!0}))}switchEnd(){this.endButton.addEventListener("click",(()=>{this.selectendMode=!0}))}switchOff(){this.clearButton.addEventListener("click",(t=>{this.pathArr.length=0,this.removeKnight(),this.isKnightOnBoard=!1,this.placeMode=!1}))}getRow(t){return Math.floor(t/8)}getCol(t){return t%8}getIndex(t,e,i){return t*i+e}createKnight(t){const e=document.createElement("img");e.classList.add("knight-icon"),e.src="images/knighticon.png",t.appendChild(e)}removeKnight(){document.querySelector(".knight-icon").remove()}clearArray(){this.chessboard=this.chessboard.map((t=>t.map((()=>""))))}isWithinBound(t,e){return t>=0&&t<8&&e>=0&&e<8}adjacencyList(){const t=this.chessboard.length,e=this.chessboard[0].length;for(let i=0;i<t;i++)for(let t=0;t<e;t++)for(let s=0;s<this.knightMovementRows.length;s++){const n=t,o=i+this.knightMovementRows[s],h=n+this.knightMovementCols[s];if(this.isWithinBound(o,h)){const s=this.getIndex(o,h,e);this.chessboard[i][t].push(s)}}}checkGridLocation(){let t=-1;this.allGrid.forEach((e=>{t++,e.textContent=e.textContent+t}))}}new class{constructor(){this.knightMove=new t}}})();