(()=>{"use strict";class t{allGrid=document.querySelectorAll(".grid-item");placeButton=document.querySelector(".place-knight");clearButton=document.querySelector(".clear");randomButton=document.querySelector(".random-knight");placeMode=!1;isKnightOnBoard=!1;chessboard=Array.from({length:8},(()=>Array.from({length:8},(()=>""))));constructor(){this.switchKnight(),this.switchOff(),this.placeKnight()}placeKnight(){this.allGrid.forEach(((t,e)=>{t.addEventListener("click",(i=>{if(!0===this.placeMode&&!1===this.isKnightOnBoard){const i=document.createElement("img");i.classList.add("knight-icon"),i.src="images/knighticon.png",t.appendChild(i),this.isKnightOnBoard=!0,this.updateArray(t,e)}}))}))}updateArray(t,e){const i=Math.floor(e/8),s=e%8;this.chessboard[i][s]="Icon",console.log(this.chessboard)}switchKnight(){this.placeButton.addEventListener("click",(t=>{this.placeMode=!0}))}switchOff(){this.clearButton.addEventListener("click",(t=>{this.chessboard=this.chessboard.map((t=>t.map((()=>"")))),this.removeKnight(),this.isKnightOnBoard=!1,this.placeMode=!1,console.log(this.chessboard)}))}removeKnight(){document.querySelectorAll(".knight-icon").forEach((t=>{t.remove()}))}}new class{constructor(){this.knightMove=new t}}})();