import { describe, expect, test } from "vitest";

enum Places {
    ONES = 0,
    TENS = 1,
    HUNDREDS = 2,
    THOUSANDS = 3,
    TEN_THOUSANDS = 4,
}

class PlaceValueTable {
    /**
     * table[0] ones, table[1] tens, table[2] hundreds, etc
     * */
    private table: number[]

    constructor(value: number = 0) {
        if(value < 0) throw new Error('Negative numbers not supported yet')
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

    setPlace(position: number, value: number) {
        this.table[position] = value
    }

    getOrder() {
        return this.table.length
    }

    /**
     * 
     * @param tableValue array[0] ones, array[1] tens, array[2] hundreds, etc
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
    private _carryBuffer: PlaceValueTable

    constructor() {
        this._parcela1 = new PlaceValueTable(0)
        this._parcela2 = new PlaceValueTable(0)
        this._carryBuffer = new PlaceValueTable(0)
        this._total = new PlaceValueTable()
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

    private addDigits(digit1: number, digit2: number, carryDigit: number) {
        const sum = digit1 + digit2 + carryDigit
     
        return {
            digit: sum % 10,
            carryFlag: sum >= 10
        }
    }

    run() {
        const size = Math.max(this._parcela1.getOrder(), this._parcela2.getOrder())

        for(let i = 0; i < size; i++) {
            const value1 = this._parcela1.getPlace(i) || 0
            const value2 = this._parcela2.getPlace(i) || 0
            const carry = this._carryBuffer.getPlace(i) || 0

            const { digit, carryFlag } = this.addDigits(value1, value2, carry)

            this._total.setPlace(i, digit)
            if(carryFlag) {
                this._carryBuffer.setPlace(i + 1, 1)
            }

            console.log(`${i}: ${carry ? `[${carry}] +` : ''} ${value1} + ${value2} = ${this._total.getPlace(i)} ${carryFlag ? '(carry one)' : '' }`)
        }

        if(this._carryBuffer.getPlace(size)) {
           this._total.setPlace(size, this._carryBuffer.getPlace(size))
            console.log(`${size}: [${this._carryBuffer.getPlace(size)}] = ${this._carryBuffer.getPlace(size)}`)
        }
    }
}

describe('PlaceValueTable', () => {
    test('Should create a place value table from a positive number', () => {
        const placeValue = new PlaceValueTable()
        expect(placeValue.getPlace(Places.ONES)).toBe(0) 
        expect(placeValue.getPlace(Places.TENS)).toBe(undefined) 
        expect(placeValue.getPlace(Places.HUNDREDS)).toBe(undefined) 
        expect(placeValue.getPlace(Places.THOUSANDS)).toBe(undefined) 
        expect(placeValue.getPlace(Places.TEN_THOUSANDS)).toBe(undefined) 

        expect(placeValue.getOrder()).toBe(1)
        expect(placeValue.toNumber()).toBe(0)
    })

    test('Should create a place value table from a positive number', () => {
        const placeValue = new PlaceValueTable(345)
        expect(placeValue.getPlace(Places.ONES)).toBe(5) 
        expect(placeValue.getPlace(Places.TENS)).toBe(4) 
        expect(placeValue.getPlace(Places.HUNDREDS)).toBe(3) 
        expect(placeValue.getPlace(Places.THOUSANDS)).toBe(undefined) 
        expect(placeValue.getPlace(Places.TEN_THOUSANDS)).toBe(undefined) 

        expect(placeValue.getOrder()).toBe(3)
        expect(placeValue.toNumber()).toBe(345)
    })

    test('Should not support negative numbers', () => {
        expect(() => new PlaceValueTable(-1)).toThrow()
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

    test('Should add different order numbers', () => {
        const parcela1 = 32070
        const parcela2 =   421

        const sut = new StandardAddition()
        sut.setParcela1(parcela1)
        sut.setParcela2(parcela2)

        sut.run()

        expect(sut.getTotal().toNumber()).toBe(32491)
    })

    test('Should add order 1 numbers with regrouping (carry one)', () => {
        const parcela1 = 9
        const parcela2 = 9

        const sut = new StandardAddition()
        sut.setParcela1(parcela1)
        sut.setParcela2(parcela2)

        sut.run()

        expect(sut.getTotal().toNumber()).toBe(18)
        expect(sut.getTotal().getOrder()).toBe(2)
    })

    test('Should add order 2 numbers with regrouping (carry one)', () => {
        const parcela1 = 99
        const parcela2 = 99

        const sut = new StandardAddition()
        sut.setParcela1(parcela1)
        sut.setParcela2(parcela2)

        sut.run()

        expect(sut.getTotal().toNumber()).toBe(198)
        expect(sut.getTotal().getOrder()).toBe(3)
    })

    test('Should add order 3 numbers with regrouping (carry one)', () => {
        const parcela1 = 759
        const parcela2 = 283

        const sut = new StandardAddition()
        sut.setParcela1(parcela1)
        sut.setParcela2(parcela2)

        sut.run()

        expect(sut.getTotal().toNumber()).toBe(1042)
        expect(sut.getTotal().getOrder()).toBe(4)
    })

    test('Should add different order numbers with regrouping (carry one)', () => {
        const parcela1 = 32070
        const parcela2 =   931

        const sut = new StandardAddition()
        sut.setParcela1(parcela1)
        sut.setParcela2(parcela2)

        sut.run()

        expect(sut.getTotal().toNumber()).toBe(33001)
    })
})