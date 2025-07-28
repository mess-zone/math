import { describe, expect, test } from "vitest";


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