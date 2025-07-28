export enum Places {
    ONES = 0,
    TENS = 1,
    HUNDREDS = 2,
    THOUSANDS = 3,
    TEN_THOUSANDS = 4,
}

export class PlaceValueTable {
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