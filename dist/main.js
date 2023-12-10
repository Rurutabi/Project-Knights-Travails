(()=>{"use strict";class t{allGrid=document.querySelectorAll(".grid-item");placeButton=document.querySelector(".place-knight");clearButton=document.querySelector(".clear");randomButton=document.querySelector(".random-knight");selectButton=document.querySelector(".select-end");travailButton=document.querySelector(".travail");placeMode=!1;travailMode=!1;isKnightOnBoard=!1;chessboard=Array.from({length:8},(()=>Array.from({length:8},(()=>""))));globalRow=0;globalCol=0;constructor(){this.switchKnight(),this.switchOff(),this.placeKnight(),this.switchTravails()}placeKnight(){this.allGrid.forEach(((t,s)=>{t.addEventListener("click",(o=>{!0===this.placeMode&&!1===this.isKnightOnBoard?(this.createKnight(t),this.isKnightOnBoard=!0,this.placeMode=!1,this.updateArray(s)):!0===this.travailMode&&!0===this.isKnightOnBoard&&!0===this.limitMove(s)&&(this.removeKnight(),this.clearArray(),this.createKnight(t),this.updateArray(s),console.log(this.chessboard))}))}))}switchTravails(){this.travailButton.addEventListener("click",(t=>{this.travailMode=!0}))}updateArray(t){const s=Math.floor(t/8),o=t%8;this.globalRow=s,this.globalCol=o,console.log("row : "+s+" col :"+o),this.chessboard[s][o]="Icon"}limitMove(t){const s=Math.floor(t/8),o=t%8,i=(t,s)=>t>=0&&t<8&&s>=0&&s<8;return!!(i(s-2,o+1)&&(this.chessboard[s-2][o+1]===this.chessboard[this.globalRow][this.globalCol]||this.chessboard[s-1][o+2]===this.chessboard[this.globalRow][this.globalCol])||i(s+2,o+1)&&(this.chessboard[s+2][o+1]===this.chessboard[this.globalRow][this.globalCol]||this.chessboard[s+1][o+2]===this.chessboard[this.globalRow][this.globalCol])||i(s+2,o-1)&&(this.chessboard[s+2][o-1]===this.chessboard[this.globalRow][this.globalCol]||this.chessboard[s+1][o-2]===this.chessboard[this.globalRow][this.globalCol])||i(s-2,o-1)&&(this.chessboard[s-2][o-1]===this.chessboard[this.globalRow][this.globalCol]||this.chessboard[s-1][o-2]===this.chessboard[this.globalRow][this.globalCol]))}switchKnight(){this.placeButton.addEventListener("click",(t=>{this.placeMode=!0}))}switchOff(){this.clearButton.addEventListener("click",(t=>{this.clearArray(),this.removeKnight(),this.isKnightOnBoard=!1,this.placeMode=!1,console.log(this.chessboard)}))}createKnight(t){const s=document.createElement("img");s.classList.add("knight-icon"),s.src="images/knighticon.png",t.appendChild(s)}removeKnight(){document.querySelector(".knight-icon").remove()}clearArray(){this.chessboard=this.chessboard.map((t=>t.map((()=>""))))}}new class{constructor(){this.knightMove=new t}}})();