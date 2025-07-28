import { PlaceValueTable } from "./PlaceValueTable";

export default class StandardSubtraction {
    private _minuendo: PlaceValueTable
    private _subtraendo: PlaceValueTable
    private _diferenca: PlaceValueTable

    constructor() {
        this._minuendo = new PlaceValueTable(0)
        this._subtraendo = new PlaceValueTable(0)
        this._diferenca = new PlaceValueTable(0)
    }

    setMinuendo(value: number) {
        this._minuendo = new PlaceValueTable(value)
    }

    setSubtraendo(value: number) {
        this._subtraendo = new PlaceValueTable(value)
    }

    getDiferenca() {
        return this._diferenca
    }

    run() {

        // if(this._minuendo.toNumber() < this._subtraendo.toNumber()) throw new Error('Subtraendo deve ser menor ou igual ao minuendo')

        const size = this._minuendo.getOrder()
        for(let i = 0; i < size; i++) {
            let digit1 = this._minuendo.getPlace(i) || 0
            let digit2 = this._subtraendo.getPlace(i) || 0

            // borrow
            if(digit1 < digit2) {
                if(this._minuendo.getPlace(i + 1)) {
                    this._minuendo.setPlace(i + 1, this._minuendo.getPlace(i + 1) - 1)
                    this._minuendo.setPlace(i, this._minuendo.getPlace(i) + 10 )
                } else {
                    // TODO borrow next place
                    throw new Error('Subtraendo deve ser menor ou igual ao minuendo')
                }

                digit1 = this._minuendo.getPlace(i) || 0
                digit2 = this._subtraendo.getPlace(i) || 0
            }


            const diff = digit1 - digit2
            this._diferenca.setPlace(i, diff)

            console.log(`${i}: ${digit1} - ${digit2} = ${diff}`)
        }
    }
}