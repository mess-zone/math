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

    private borrow(position: number) {
        if(this._minuendo.getPlace(position) == undefined) {
            throw new Error('Subtraendo deve ser menor ou igual ao minuendo')
        }
        
        if(this._minuendo.getPlace(position) == 0) {
            // borrow next place
            this.borrow(position + 1)
        } 
        
        console.log('borrow one')
        this._minuendo.setPlace(position, this._minuendo.getPlace(position) - 1)
        this._minuendo.setPlace(position - 1, this._minuendo.getPlace(position - 1) + 10 )
    }

    run() {
        const size = this._minuendo.getOrder()
        for(let i = 0; i < size; i++) {
            let digit1 = this._minuendo.getPlace(i) || 0
            let digit2 = this._subtraendo.getPlace(i) || 0

            // borrow
            if(digit1 < digit2) {
                this.borrow(i + 1)
    
                digit1 = this._minuendo.getPlace(i) || 0
                digit2 = this._subtraendo.getPlace(i) || 0
            }

            const diff = digit1 - digit2
            this._diferenca.setPlace(i, diff)

            console.log(`${i}: ${digit1} - ${digit2} = ${diff}`)
        }
    }
}