import { describe, expect, test } from "vitest";

enum Place {
    ONES = 0,
    TENS = 1,
    HUNDREDS = 2,
    THOUSANDS = 3,
    TEN_THOUSANDS = 4,
}

class PlaceValueTable {
    private table: number[]

    private constructor(array: number[]) {
        this.table = array
    }

    getPlace(position: number) {
        return this.table[position]
    }

    static create(value: number) {
        // Converts the number to string, splits into chars, maps back to numbers, reverse array
        return new PlaceValueTable(value
            .toString()
            .split('')
            .map(Number)
            .reverse())
    }
}

class StandardAddition {

    private _parcela1: number
    private _parcela2: number
    private _total: number

    constructor() {
        this._parcela1 = 0
        this._parcela2 = 0
        this._total = 0
    }
    
    setParcela1(value: number) {
        this._parcela1 = value
    }
    
    setParcela2(value: number) {
        this._parcela2 = value
    }

    getTotal() {
        return this._total
    }

    run() {
        this._total = this._parcela1 + this._parcela2
    }
}

describe('PlaceValueTable', () => {
    test('Should create a place value table from a number', () => {
        const placeValue = PlaceValueTable.create(345)
        expect(placeValue.getPlace(Place.ONES)).toBe(5) 
        expect(placeValue.getPlace(Place.TENS)).toBe(4) 
        expect(placeValue.getPlace(Place.HUNDREDS)).toBe(3) 
        expect(placeValue.getPlace(Place.THOUSANDS)).toBe(undefined) 
        expect(placeValue.getPlace(Place.TEN_THOUSANDS)).toBe(undefined) 
    })

})

describe('Addition', () => {

    test('Should add', () => {
        const parcela1 = 2
        const parcela2 = 3

        const sut = new StandardAddition()
        sut.setParcela1(parcela1)
        sut.setParcela2(parcela2)

        sut.run()

        expect(sut.getTotal()).toBe(5)
    })
})