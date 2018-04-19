document.onkeydown = checkKey;
Xstart = 0, Ystart = 0, XFinish = 16, YFinish = 16, Speed = 1, XPos = Xstart, YPos = Ystart, array = [], Copied = 0, Mode = 1;

setInterval(function() {if (Mode === 1 && Copied === 0) {array.push(OWOP.getPixel(Xpos,YPos)) if (XPos >= XFinish && YPos < YFinish) {XPos = 0, YPos++;} else if (YPos >= YFinish && XPos >= XFinish) {Copied = 1;}} if (Mode === 0 && Copied === 1) {OWOP.setPixel(XPos,Ypos,array[XPos+(YPos*16)])}}, Speed);
function checkKey(e) {
  e = e || window.event;
  if (e.keyCode === 77) {Mode++;}
  if (Mode === 2) {Mode = 0;}
  if (e.keyCode === 67) {console.log(array);}


}
