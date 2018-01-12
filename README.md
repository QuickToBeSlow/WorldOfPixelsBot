Go to OurWorldOfPixels.com, then go to inspect element, then paste one of these codes into the console to see what they do. (The names should be fairly self-explanatory.)

Random Pixel Placer:

setInterval(function()	{WorldOfPixels.world.setPixel(Math.floor(-100 + (Math.random() * (100 - 5))),Math.floor(-100 + (Math.random() * (100 - 5))),127)}, 1)

Large Rectangle Drawer:

Xdistance= 0, Ydistance=0, Xstart = -100, Ystart = -100, Xfinish = 100, Yfinish = 100, Speed = 1, RedPix = 0, GreenPix = 127, BluePix = 255, stop = 0
setInterval(function()	{if (Xdistance <Xfinish && Ydistance <Yfinish && stop === 0) {WorldOfPixels.world.setPixel(Xdistance+Xstart,Ydistance+Ystart,[RedPix,GreenPix,BluePix]),Xdistance+=1} else if (Xdistance >= Xfinish) {Xdistance = 0, Ydistance+=1} else if (Ydistance >=Yfinish) {Ydistance = 0, Xdistance = 0}}, Speed)

Random Pixel Color Rectangle:

Xdistance= 0, Ydistance=0, Xstart =-100, Ystart =100, Xfinish =100, Yfinish =100, Speed = 1, RedPix = 127+Math.floor(Math.random()*(128)), GreenPix = 127+Math.floor(Math.random()*(128)), BluePix = 127+Math.floor(Math.random()*(128)), stop = 0
setInterval(function()	{ if (stop === 0) {RedPix = 127+Math.floor(Math.random()*(128)), GreenPix = 127+Math.floor(Math.random()*(128)), BluePix = 127+Math.floor(Math.random()*(128))} if (Xdistance <Xfinish && Ydistance <Yfinish && stop === 0) {WorldOfPixels.world.setPixel(Xdistance+Xstart,Ydistance+Ystart,[RedPix,GreenPix,BluePix]),Xdistance+=1} else if (Xdistance >= Xfinish) {Xdistance = 0, Ydistance+=1} else if (Ydistance >=Yfinish) {Ydistance = 0, Xdistance = 0}}, Speed)

Chess Board Drawer:

Xdistance= 0, Ydistance=0, Xstart = 0, Ystart = 0, Xfinish = 8, Yfinish = 8, Speed = 1, RedPix = 127, GreenPix = 63, BluePix = 0, stop = 0
setInterval(function()	{if (RedPix === 127 && GreenPix === 63) {RedPix = 0, GreenPix = 0} else {RedPix = 127, GreenPix = 63} if (Xdistance <Xfinish && Ydistance <Yfinish && stop === 0) {WorldOfPixels.world.setPixel(Xdistance+Xstart,Ydistance+Ystart,[RedPix,GreenPix,BluePix]),Xdistance+=1} else if (Xdistance >= Xfinish) {Xdistance = 0, Ydistance+=1} else if (Ydistance >=Yfinish) {Ydistance = 0, Xdistance = 0, RedPix = 0, GreenPix = 0}}, Speed)

3 by 3 Tile Chess Board Drawer:

Xdistance= 0, Ydistance=0, Xstart = 0, Ystart = 0, Xfinish = 24, Yfinish = 24, Speed = 1, RedPix = 127, GreenPix = 63, BluePix = 0, stop = 0, XSequence = 1, YSequence = 0
setInterval(function()	{if (YSequence >= 0 && YSequence <=2) { if (XSequence >=0 && XSequence <= 3) {RedPix = 0, GreenPix = 0} else if (XSequence === 6) {RedPix = 127, GreenPix = 63, XSequence = 0} else {RedPix = 127, GreenPix = 63}} else if (YSequence === 6) { if (XSequence >=0 && XSequence <= 3) {RedPix =0, GreenPix =0, YSequence = 0} else if (XSequence === 6) {RedPix = 127, GreenPix = 63, XSequence = 0, YSequence = 0} else {RedPix = 127, GreenPix = 63, YSequence = 0}} else if (YSequence >= 3 && YSequence <=6) { if (XSequence >=0 && XSequence <= 3) {RedPix = 127, GreenPix = 63} else if (XSequence === 6) {RedPix = 0, GreenPix = 0, XSequence = 0} else {RedPix = 0, GreenPix = 0}} if (Xdistance <Xfinish && Ydistance <Yfinish && stop === 0) {WorldOfPixels.world.setPixel(Xdistance+Xstart,Ydistance+Ystart,[RedPix,GreenPix,BluePix]),Xdistance+=1, XSequence += 1} else if (Xdistance >= Xfinish) {Xdistance = 0, Ydistance+=1, YSequence += 1} else if (Ydistance >=Yfinish) {Ydistance = 0, Xdistance = 0}}, Speed)

Adjustable Tile Size Chess/Checkers Board:

Xdistance= 0, Ydistance=0, Xstart = 0, Ystart = 0, XTiles= 8, YTiles = 8, Speed = 8, BluePix = 0, stop = 0, XSequence = 1, YSequence = 0, TileSize = 3, Tile1Color = [127,63,0], Tile2Color = [0,0,0], TileColor = Tile1Color
setInterval(function()	{if (YSequence >= 0 && YSequence <=TileSize-1) { if (XSequence >= 0 && XSequence <= TileSize) {TileColor = Tile2Color} else if (XSequence === TileSize * 2) {TileColor = Tile1Color, XSequence = 0} else {TileColor = Tile1Color}} else if (YSequence === TileSize * 2) { if (XSequence >=0 && XSequence <= TileSize) {TileColor = Tile2Color, YSequence = 0} else if (XSequence === TileSize * 2) {TileColor = Tile1Color, XSequence = 0, YSequence = 0} else {TileColor = Tile1Color, YSequence = 0}} else if (YSequence >= TileSize && YSequence <=TileSize * 2) { if (XSequence >=0 && XSequence <= TileSize) {TileColor = Tile1Color} else if (XSequence === TileSize * 2) {TileColor = Tile2Color, XSequence = 0} else {TileColor = Tile2Color}} if (Xdistance <XTiles * TileSize && Ydistance < YTiles * TileSize && stop === 0) {WorldOfPixels.world.setPixel(Xdistance+Xstart,Ydistance+Ystart,TileColor),Xdistance+=1, XSequence += 1} else if (Xdistance >= XTiles * TileSize && XTiles%2 === 0) {Xdistance = 0, Ydistance+=1, YSequence += 1} else if (Xdistance >= XTiles * TileSize && XTiles%2 > 0) {Xdistance = 0, Ydistance+=1, YSequence +=1, XSequence = 1} else if (Ydistance >=YTiles * TileSize && YTiles%2 === 0) {Ydistance = 0, Xdistance = 0} else if (Ydistance >=YTiles * TileSize && YTiles%2 > 0) {Ydistance = 0, Xdistance = 0, YSequence = TileSize * 2}}, Speed)

Checkers Piece Placer:

DistanceDown = 1, DistanceSideways = 1, TeamColor = [0,0,255], Team1Color = [255,0,0], Team2Color = [0,0,255], stopcheckers = 0, stop = 1, Speed = 1
setInterval(function() {if (stopcheckers <= 1) {if (DistanceDown > 4) {TeamColor = Team1Color, TileMover = TileSize} else if (DistanceDown <= 4) {TeamColor = Team2Color, TileMover = 0} if (DistanceDown === 1 || DistanceDown === 3|| DistanceDown === YTiles-2 || DistanceDown === YTiles) {if (DistanceSideways * TileSize < XTiles * TileSize+1) {WorldOfPixels.world.setPixel(Xstart+DistanceSideways * TileSize-Math.floor(TileSize/2)-1+TileMover,Ystart+DistanceDown * TileSize-Math.floor(TileSize/2)-1, TeamColor)} DistanceSideways += 2} else if (DistanceDown === 2 || DistanceDown === YTiles-1) {if (DistanceSideways * TileSize < XTiles * TileSize+1) {WorldOfPixels.world.setPixel(Xstart+DistanceSideways * TileSize-Math.floor(TileSize/2)-TileSize+TileMover-1,Ystart+DistanceDown * TileSize-Math.floor(TileSize/2)-1, TeamColor)} DistanceSideways += 2} else {DistanceSideways += 2} if (DistanceSideways * TileSize >= XTiles * TileSize+1) {DistanceDown += 2, DistanceSideways = 1} if (DistanceDown * TileSize >= YTiles * TileSize+1) {DistanceDown = 2, DistanceSideways = 3, stopcheckers += 1}} if (stopcheckers === 0) {if (XTiles%2 === 0) {WorldOfPixels.world.setPixel(XTiles * TileSize - Math.floor(TileSize/2)-1+Xstart,2 * TileSize - Math.floor(TileSize/2)-1+Ystart,[0,0,255])}}}, Speed)

