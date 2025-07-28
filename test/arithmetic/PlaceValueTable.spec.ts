import { describe, expect, test } from "vitest"
import { Places, PlaceValueTable } from "./PlaceValueTable"

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
