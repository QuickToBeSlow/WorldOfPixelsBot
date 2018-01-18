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
				WorldOfPixels.world.setPixel(this.x + j, this.y + i, grid[i][j])
	}

	/** Renders a grid object onto the canvas
	 *
	 * @grid: a grid object
	 */
	drawGrid(grid) {
		for (let i = 0; i < grid.width; i++)
			for (let j = 0; j < grid.height; j++)
				WorldOfPixels.world.setPixel(this.x + i, this.y + j, grid.getColor(i, j))
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

/** Inserts a maze into the grid using recursive backtracking
 *
 * @grid: a freshly instantiated grid
 */
 // TODO: make this a grid method
function generateMaze(grid) {
	// Traverses nodes in a depth-first style, visiting each and marking them as
	// white IF they are not already adjacent to two or more white nodes.
	function carveTunnels(node) {
		// mark node as visited
		node.visited = true

		// Check and see if this is next to more than one white space. If not,
		// make it another white space.
		let whiteCount = 0
		let surroundingNodes = node.unvisited
		for (let i = 0; i < surroundingNodes.length; i++)
			if (surroundingNodes[i].color === Colors.white)
				whiteCount++
		if (whiteCount < 2) {
			node.color = Colors.white

			// While there are unvisited nodes next to this one, visit them
			while (surroundingNodes.length > 0) {
				let randomIndex = Math.floor(Math.random() * surroundingNodes.length)
				let randomNode = surroundingNodes[randomIndex]
				carveTunnels(randomNode)
				surroundingNodes = node.unvisited
			}
		}
	}

	// Check the size of our grid
	if (grid.width < 3 || grid.height < 3)
		throw "Grid must be at least 3x3"

	// Get the start and end pixels and turn them white
	let entry = grid.getPixel(0, 1)
	let exit = grid.getPixel(grid.width - 1, grid.height - 2)
	entry.color = exit.color = Colors.white

	// Mark the edges as visited, so that they don't get dug out
	for (let i = 0; i < grid.width; i++)
		grid.getPixel(i, 0).visited = grid.getPixel(i, grid.height - 1).visited = true
	for (let j = 1; j < grid.height - 1; j++)
		grid.getPixel(0, j).visited = grid.getPixel(grid.width - 1, j).visited = true

	// Begin carving tunnels, starting at the first block after the entry
	carveTunnels(entry.right)
}

// TODO: remove this test script
debugger
let g = new Grid(5, 5)
generateMaze(g)
