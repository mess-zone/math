import { PlaceValueTable } from "./PlaceValueTable"

export class StandardAddition {

    private _parcela1: PlaceValueTable
    private _parcela2: PlaceValueTable
    private _total: PlaceValueTable
    private _carryBuffer: PlaceValueTable

    constructor() {
        this._parcela1 = new PlaceValueTable(0)
        this._parcela2 = new PlaceValueTable(0)
        this._carryBuffer = new PlaceValueTable(0)
        this._total = new PlaceValueTable(0)
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
            carryFlag: sum > 9
        }
    }

    run() {
        const size = Math.max(this._parcela1.getOrder(), this._parcela2.getOrder())

        for(let i = 0; i < size; i++) {
            const digit1 = this._parcela1.getPlace(i) || 0
            const digit2 = this._parcela2.getPlace(i) || 0
            const carry = this._carryBuffer.getPlace(i) || 0

            const { digit, carryFlag } = this.addDigits(digit1, digit2, carry)

            this._total.setPlace(i, digit)
            if(carryFlag) {
                this._carryBuffer.setPlace(i + 1, 1)
            }

            console.log(`${i}: ${carry ? `[${carry}] +` : ''} ${digit1} + ${digit2} = ${digit} ${carryFlag ? '(carry one)' : '' }`)
        }

        if(this._carryBuffer.getPlace(size)) {
           this._total.setPlace(size, this._carryBuffer.getPlace(size))
            console.log(`${size}: [${this._carryBuffer.getPlace(size)}] = ${this._carryBuffer.getPlace(size)}`)
        }
    }
}