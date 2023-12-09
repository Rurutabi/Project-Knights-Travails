(()=>{"use strict";class t{allGrid=document.querySelectorAll(".grid-item");placeButton=document.querySelector(".place-knight");clearButton=document.querySelector(".clear");randomButton=document.querySelector(".random-knight");selectButton=document.querySelector(".select-end");travailButton=document.querySelector(".travail");placeMode=!1;travailMode=!1;isKnightOnBoard=!1;chessboard=Array.from({length:8},(()=>Array.from({length:8},(()=>""))));globalRow=0;globalCol=0;constructor(){this.switchKnight(),this.switchOff(),this.placeKnight(),this.switchTravails()}placeKnight(){this.allGrid.forEach(((t,e)=>{t.addEventListener("click",(i=>{!0===this.placeMode&&!1===this.isKnightOnBoard?(this.createKnight(t),this.isKnightOnBoard=!0,this.placeMode=!1,this.updateArray(t,e)):!0===this.travailMode&&!0===this.isKnightOnBoard&&!0===this.limitMove(e)&&(this.removeKnight(),this.clearArray(),this.createKnight(t),this.updateArray(t,e))}))}))}switchTravails(){this.travailButton.addEventListener("click",(t=>{this.travailMode=!0}))}updateArray(t,e){const i=Math.floor(e/8),o=e%8;this.globalRow=i,this.globalCol=o,console.log("row : "+i+" col :"+o),this.chessboard[i][o]="Icon"}limitMove(t){const e=Math.floor(t/8),i=t%8;return console.log(e,i),this.chessboard[e-2][i-1]===this.chessboard[this.globalRow][this.globalCol]||this.chessboard[e-1][i-2]===this.chessboard[this.globalRow][this.globalCol]}switchKnight(){this.placeButton.addEventListener("click",(t=>{this.placeMode=!0}))}switchOff(){this.clearButton.addEventListener("click",(t=>{this.clearArray(),this.removeKnight(),this.isKnightOnBoard=!1,this.placeMode=!1,console.log(this.chessboard)}))}createKnight(t){const e=document.createElement("img");e.classList.add("knight-icon"),e.src="images/knighticon.png",t.appendChild(e)}removeKnight(){document.querySelector(".knight-icon").remove()}clearArray(){this.chessboard=this.chessboard.map((t=>t.map((()=>""))))}}new class{constructor(){this.knightMove=new t}}})();