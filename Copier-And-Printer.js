Xstart = 0, Ystart = 0, XFinish = 16, YFinish = 16, Speed = 1, XPos = Xstart, YPos = Ystart, array = [];

setInterval(function() {if (Mode === 1) {array.push(OWOP.getPixel(Xpos,YPos)); if (XPos >= XFinish) {XPos = 0, YPos++}}}, Speed)
