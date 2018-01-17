/** A function for drawing an empty rectangle.
 *
 * @xStart, @yStart: the top left corner x and y coordinates
 * @xFinish, @yFinish: the bottom right corner x and y coordinates
 * @color: an array of length 3 containing RGB values for the line color
 */
function drawRect(xStart, yStart, xFinish, yFinish, color) {
	// TODO: check for color type and length
	// TODO: ensure start and end values are appropriate

	// Draw the top and bottom sides of the rectangle, starting left to right
	for (let i = 0; i < xFinish; i++) {
        WorldOfPixels.world.setPixel(xStart + i, yStart, color)
        WorldOfPixels.world.setPixel(xStart + i, yFinish, color)
	}
	// Draw the left and right sides of the rectangle, starting top to bottom
	for (let i = 1; i < yFinish - 1; i++) {
        WorldOfPixels.world.setPixel(xStart, yStart + i, color)
        WorldOfPixels.world.setPixel(xFinish, yStart + i, color)
	}
}
