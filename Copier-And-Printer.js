document.onkeydown = checkKey;
Xstart = 0, Ystart = 0, XFinish = 16, YFinish = 16, Speed = 1, XPos = 0, YPos = 0, array = [], Copied = 0, Mode = 1;

setInterval(function() {if (Mode === 1 && Copied === 0) {if (array.length < XFinish*YFinish) {array.push(OWOP.world.getPixel(XPos+Xstart,YPos+Ystart))}; XPos++; if (XPos >= XFinish && YPos < YFinish) {XPos= 0, YPos++;} else if (YPos >= YFinish && XPos >= XFinish) {Copied = 1, XPos = 0, YPos = 0;}} else if (Mode === 0 && Copied === 1) {OWOP.world.setPixel((XPos+Xstart),(YPos+Ystart), array[XPos+YPos*16]); XPos++; if (XPos >= XFinish && YPos < YFinish) {XPos = 0, YPos++;} else if (YPos >= YFinish && XPos >= XFinish) {YPos = 0, XPos = 0;}}}, Speed);
function checkKey(e) {
  e = e || window.event;
  if (e.keyCode === 77 && Copied === 1) {Mode++;}
  if (Mode === 2) {Mode = 0;}
  if (e.keyCode === 67) {console.log(array);}
}
