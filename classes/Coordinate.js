class Coordinate extends Array {
    constructor(x, y) {
        const coords = super(x, y)
        this.coordsArray = coords
        
        this.x = this.coordsArray[0]
        this.y = this.coordsArray[1]
    }
}

module.exports = Coordinate