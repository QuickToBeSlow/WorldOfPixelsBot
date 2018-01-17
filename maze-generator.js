Xstart = 0, Ystart = 0, TileFloorColor = [0, 255, 0], TileWallColor = [0, 0, 0], TileColor = TileFloorColor,
    XFinish = 17, YFinish = 17, Speed = 1, XDistance = 0, YDistance = 0, array = [],
    arrayitem = 0, currentcell = XFinish + 1, stop = 0, arraypicker = 0,
    pathpickerarray = [], UP = 1, DOWN = 2, LEFT = 3, RIGHT = 4

setInterval(function() {
    if (stop === 0) {
        if (XFinish < 5) {
            XFinish = 5
        }
        if (YFinish < 5) {
            YFinish = 5
        }
        if (XFinish % 2 === 0) {
            XFinish += 1
        }
        if (YFinish % 2 === 0) {
            YFinish += 1
        }
        if (array[arrayitem] === 0) {
            TileColor = TileWallColor
        } else if (array[arrayitem] === 1) {
            TileColor = TileFloorColor
        }
        if (array.length >= XFinish * YFinish - 1) {
            WorldOfPixels.world.setPixel(Xstart + arrayitem - Math.floor(arrayitem / XFinish) * XFinish, Ystart + Math.floor(arrayitem / XFinish), TileColor)
        }
        if (XDistance < XFinish) {
            XDistance += 1
        } else if (XDistance >= XFinish) {
            XDistance = 0
        }
        if (YDistance < YFinish) {
            YDistance += 1
        } else if (YDistance >= YFinish) {
            YDistance = 0, XDistance = 0
        }
        if (array.length < XFinish * YFinish - 1) {
            array.push(0)
        }
        if (array.length >= XFinish * YFinish - 1) {
            if (arrayitem < array.length) {
                arrayitem += 1
            } else if (arrayitem >= array.length) {
                arrayitem = 0
            }
            if (array[currentcell - XFinish * 2] === 0) {
                pathpickerarray.push(UP)
            } else if (array[currentcell - XFinish * 2] > 0 || Math.floor((currentcell - XFinish * 2) / XFinish) < Math.floor((currentcell) / XFinish)) {
                pathpickerarray.pop(UP)
            }
            if (array[currentcell + XFinish * 2] === 0) {
                pathpickerarray.push(DOWN)
            } else if (array[currentcell + XFinish * 2] > 0 || Math.floor((currentcell + XFinish * 2) / XFinish) > Math.floor((currentcell) / XFinish)) {
                pathpickerarray.pop(DOWN)
            }
            if (array[currentcell - 2] === 0 && Math.floor((currentcell - 2) / XFinish) === Math.floor((currentcell) / XFinish)) {
                pathpickerarray.push(LEFT)
            } else if (array[currentcell - 2] > 0 || Math.floor((currentcell - 2) / XFinish) < Math.floor((currentcell) / XFinish)) {
                pathpickerarray.pop(LEFT)
            }
            if (array[currentcell + 2] === 0 && Math.floor((currentcell + 2) / XFinish) === Math.floor((currentcell) / XFinish)) {
                pathpickerarray.push(RIGHT)
            } else if (array[currentcell + 2] > 0 || Math.floor((currentcell + 2) / XFinish) < Math.floor((currentcell) / XFinish)) {
                pathpickerarray.pop(RIGHT)
            }
            if (stop === 0) {
                arraypicker = pathpickerarray[Math.round(Math.random() * pathpickerarray.length)]
            }
            if (arraypicker === 1) {
                currentcell += -XFinish, array[currentcell] = 1, currentcell += -XFinish, array[currentcell] = 1
            } else if (arraypicker === 2) {
                currentcell += XFinish, array[currentcell] = 1, currentcell += XFinish, array[currentcell] = 1
            } else if (arraypicker === 3) {
                currentcell += -1, array[currentcell] = 1, currentcell += -1, array[currentcell] = 1
            } else if (arraypicker === 4) {
                currentcell += 1, array[currentcell] = 1, currentcell += 1, array[currentcell] = 1
            }
        }
    }
}, Speed)
