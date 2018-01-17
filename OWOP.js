'use strict'

/**
 * OWOP.js
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
			WorldOfPixels.world.setPixel(this.x + i, this.y, this.color)
			WorldOfPixels.world.setPixel(this.x + i, this.y + height - 1, this.color)
		}
		// Draw the left and right sides of the rectangle, starting top to bottom
		for (let i = 1; i < height - 1; i++) {
			WorldOfPixels.world.setPixel(this.x, this.y + i, this.color)
			WorldOfPixels.world.setPixel(this.x + width - 1, this.y + i, this.color)
		}
	}

	/** Draws a 2D grid of colors onto the canvas.
	 *
	 * @grid: an array of arrays, each full of length three arrays representing RGB
	 */
	draw2DArray(grid) {
		for (let i = 0; i < grid.length; i++)
			for (let j = 0; j < grid.length; j++)
				WorldOfPixels.world.setPixel(j, i, grid[i][j])
	}

	/** Renders a grid object onto the canvas
	 *
	 * @grid: a grid object
	 */
	drawGrid(grid) {
		for (let i = 0; i < grid.width; i++)
			for (let j = 0; j < grid.height; j++)
				WorldOfPixels.world.setPixel(i, j, grid.getColor(i, j))
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

let Colors = {
	black: [0, 0, 0],
	red: [255, 0, 0],
	green: [0, 255, 0],
	blue: [0, 0, 255],
	white: [255, 255, 255]
}

class Pixel {
	constructor(color, above, below, left, right) {
		this.color = color
		this.up = above
		this.down = below
		this.left = left
		this.right = right
		this.visited = false
	}

	// returns a list of unvisited neighboring pixels
	get unvisited() {
		let unvisited = []
		if (this.up && !this.up.visited)
			unvisited.push(this.up)
		if (this.down && !this.down.visited)
			unvisited.push(this.up)
		if (this.right && !this.right.visited)
			unvisited.push(this.up)
		if (this.left && !this.left.visited)
			unvisited.push(this.up)
		return unvisited
	}
}

class Grid {
	constructor(width, height) {
		this.width = width
		this.height = height
		this.matrix = []

		// Initialize the grid
		for (let i = 0; i < this.width; i++) {
			let newArr = []
			for (let j = 0; j < this.height; j++)
				newArr.push(new Pixel(Colors.black))
			this.matrix.push(newArr)
		}

		// Lace the pixels together
		for (let i = 0; i < this.matrix.length; i++) {
			for (let j = 0; j < this.matrix[i].length; j++) {
				let curNode = this.matrix[i][j]
				if (i > 0)
					curNode.left = this.matrix[i-1][j]
				if (i < this.matrix.length - 1)
					curNode.right = this.matrix[i+1][j]
				if (j > 0)
					curNode.up = this.matrix[i][j-1]
				if (j < this.matrix[i].length - 1)
					curNode.down = this.matrix[i][j+1]
			}
		}
	}

	// Returns the color of the pixel at coordinates x, y
	getColor(x, y) {
		this._validateCoords(x, y)
		return this.matrix[x][y].color
	}

	getPixel(x, y) {
		this._validateCoords(x, y)
		return this.matrix[x][y]
	}

	_validateCoords(x, y) {
		if (x < 0 || y < 0 || x >= this.width || y >= this.height)
			throw "Cannot get the color: index out of bounds"
	}
}
