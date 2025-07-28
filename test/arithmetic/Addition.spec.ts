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

    constructor(value: number = 0) {
        // Converts the number to string, splits into chars, maps back to numbers, reverse array
        this.table =  value
            .toString()
            .split('')
            .map(Number)
            .reverse()
    }

    getPlace(position: number) {
        return this.table[position]
    }

    getOrder() {
        return this.table.length
    }

    /**
     * 
     * @param tableValue array[0] ones, array[1] tens, array[2] hundereds, etc
     * @returns 
     */
    static fromArray(tableValue: number[]) {
        const result = new PlaceValueTable()
        result.table = tableValue
        return result
    }

    toNumber() {
        return +[...this.table].reverse().join('')
    }
}

class StandardAddition {

    private _parcela1: PlaceValueTable
    private _parcela2: PlaceValueTable
    private _total: PlaceValueTable

    constructor() {
        // this._parcela1 = 0
        // this._parcela2 = 0
        // this._total = 0
    }
    
    setParcela1(value: number) {
        this._parcela1 = new PlaceValueTable(value)
    }
    
    setParcela2(value: number) {
        this._parcela2 = new PlaceValueTable(value)
    }

    getTotal() {
        return this._total
    }

    run() {
        const size = Math.max(this._parcela1.getOrder(), this._parcela2.getOrder())

        const result: number[] = []
        for(let i = 0; i < size; i++) {
            result.push(this._parcela1.getPlace(i) + this._parcela2.getPlace(i))
        }

        this._total = PlaceValueTable.fromArray(result)
        
    }
}

describe('PlaceValueTable', () => {
    test('Should create a place value table from a positive number', () => {
        const placeValue = new PlaceValueTable()
        expect(placeValue.getPlace(Place.ONES)).toBe(0) 
        expect(placeValue.getPlace(Place.TENS)).toBe(undefined) 
        expect(placeValue.getPlace(Place.HUNDREDS)).toBe(undefined) 
        expect(placeValue.getPlace(Place.THOUSANDS)).toBe(undefined) 
        expect(placeValue.getPlace(Place.TEN_THOUSANDS)).toBe(undefined) 

        expect(placeValue.getOrder()).toBe(1)
        expect(placeValue.toNumber()).toBe(0)
    })

    test('Should create a place value table from a positive number', () => {
        const placeValue = new PlaceValueTable(345)
        expect(placeValue.getPlace(Place.ONES)).toBe(5) 
        expect(placeValue.getPlace(Place.TENS)).toBe(4) 
        expect(placeValue.getPlace(Place.HUNDREDS)).toBe(3) 
        expect(placeValue.getPlace(Place.THOUSANDS)).toBe(undefined) 
        expect(placeValue.getPlace(Place.TEN_THOUSANDS)).toBe(undefined) 

        expect(placeValue.getOrder()).toBe(3)
        expect(placeValue.toNumber()).toBe(345)
    })

})

describe('Addition', () => {

    test('Should add order 1 numbers', () => {
        const parcela1 = 2
        const parcela2 = 3

        const sut = new StandardAddition()
        sut.setParcela1(parcela1)
        sut.setParcela2(parcela2)

        sut.run()

        expect(sut.getTotal().toNumber()).toBe(5)
    })

    test('Should add order 2 numbers', () => {
        const parcela1 = 32
        const parcela2 = 43

        const sut = new StandardAddition()
        sut.setParcela1(parcela1)
        sut.setParcela2(parcela2)

        sut.run()

        expect(sut.getTotal().toNumber()).toBe(75)
    })

    test('Should add order 3 numbers', () => {
        const parcela1 = 320
        const parcela2 = 431

        const sut = new StandardAddition()
        sut.setParcela1(parcela1)
        sut.setParcela2(parcela2)

        sut.run()

        expect(sut.getTotal().toNumber()).toBe(751)
    })

    test('Should add order 4 numbers', () => {
        const parcela1 = 3207
        const parcela2 = 4311

        const sut = new StandardAddition()
        sut.setParcela1(parcela1)
        sut.setParcela2(parcela2)

        sut.run()

        expect(sut.getTotal().toNumber()).toBe(7518)
    })

    test('Should add order 5 numbers', () => {
        const parcela1 = 32070
        const parcela2 = 43113

        const sut = new StandardAddition()
        sut.setParcela1(parcela1)
        sut.setParcela2(parcela2)

        sut.run()

        expect(sut.getTotal().toNumber()).toBe(75183)
    })
})