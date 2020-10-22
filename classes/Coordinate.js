class Coordinate extends Array {
    constructor(x, y) {
        const coords = super(x, y)
        this.coordsArray = coords
        
        this._x = this.coordsArray[0]
        this._y = this.coordsArray[1]
    }
    
    get x() {
        return this._x
    }
    
    get y() {
        return this._y
    }
}

module.exports = Coordinate