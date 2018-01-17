'use strict'

/**
 * pixel-wand.js
 * highwind
 *
 * Defines a class that can be imported and used as a tool for the game
 * ourworldofpixels.com
 *
 ********************
 * Using the Cursor *
 ********************
 *
 * Most of the actions that can be done using the PixelWand happen from some
 * point of origin. For example, drawRect starts from the top left corner. The
 * starting position of any method such as this is defined by the cursor. You
 * can use the functions:
 * pixelWand.cursor
 * and
 * pixelWand.cursor = [x, y]
 * to get an array with [x, y] values and set those x and y values, respectively.
 *
 */

class PixelWand {
	constructor(x, y) {
		this.x = x
		this.y = y
	}

	get cursor() {
		return [this.x, this.y]
	}

	set cursor(coords) {
		if (!(Array.isArray(coords) && coords.length === 2 &&
				Number.isInteger(coords[0]) && Number.isInteger(coords[1])))
			throw 'coords must be an array of two integers!'
		this.x = coords[0]
		this.y = coords[1]
	}

	get color() {
		return WorldOfPixels.player.selectedColor
	}

	/** A function for drawing an empty rectangle.
	 *
	 * @width, @height: dimensions of the rectangle
	 */
	drawRect(width, height) {
		this._validateDimensions(width, height)
		// Draw the top and bottom sides of the rectangle, starting left to right
		for (let i = 0; i < width; i++) {
			WorldOfPixels.world.setPixel(this.x + i, this.y, color)
			WorldOfPixels.world.setPixel(this.x + i, this.y + height, this.color)
		}
		// Draw the left and right sides of the rectangle, starting top to bottom
		for (let i = 1; i < height - 1; i++) {
			WorldOfPixels.world.setPixel(this.x, this.y + i, color)
			WorldOfPixels.world.setPixel(this.x + width, this.y + i, this.color)
		}
	}

	/** A function for drawing a filled rectangle
	 *
	 * @width, @height: dimensions of the rectangle
	 */
	drawFillRect(width, height) {
		this._validateDimensions(width, height)
		for (let i = 0; i < width; i++)
			for (let j = 0; j < height; j++)
				WorldOfPixels.world.setPixel(this.x + i, this.y + j, this.color)
	}

	// throws errors if the parameters for rectangle functions are incorrect
	_validateDimensions(width, height) {
		// Ensure start and end values are appropriate
		if (width < 0 || height < 0)
			throw "dimensions of rectangle can't be negative"
	}
}
