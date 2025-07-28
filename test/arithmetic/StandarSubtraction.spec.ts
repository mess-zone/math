import { describe, expect, test } from "vitest";
import StandardSubtraction from "./StandardSubtraction";

describe('Standard Subtraction', () => {
    test('Should not subtract if minuendo is small then subtraendo', () => {
        const minuendo = 1
        const subtraendo = 4

        const sut = new StandardSubtraction()
        sut.setMinuendo(minuendo)
        sut.setSubtraendo(subtraendo)

        expect(() => sut.run()).toThrow()
    })

    test('Should subtract order 1 numbers', () => {
        const minuendo = 4
        const subtraendo = 1

        const sut = new StandardSubtraction()
        sut.setMinuendo(minuendo)
        sut.setSubtraendo(subtraendo)

        sut.run()

        expect(sut.getDiferenca().toNumber()).toBe(3)
    })

    test('Should subtract order 2 numbers', () => {
        const minuendo = 43
        const subtraendo = 21

        const sut = new StandardSubtraction()
        sut.setMinuendo(minuendo)
        sut.setSubtraendo(subtraendo)

        sut.run()

        expect(sut.getDiferenca().toNumber()).toBe(22)
    })

    test('Should subtract order 3 numbers', () => {
        const minuendo = 437
        const subtraendo = 216

        const sut = new StandardSubtraction()
        sut.setMinuendo(minuendo)
        sut.setSubtraendo(subtraendo)

        sut.run()

        expect(sut.getDiferenca().toNumber()).toBe(221)
    })

    test('Should subtract order 4 numbers', () => {
        const minuendo = 4375
        const subtraendo = 2165

        const sut = new StandardSubtraction()
        sut.setMinuendo(minuendo)
        sut.setSubtraendo(subtraendo)

        sut.run()

        expect(sut.getDiferenca().toNumber()).toBe(2210)
    })

    test('Should subtract order 5 numbers', () => {
        const minuendo = 43750
        const subtraendo = 21650

        const sut = new StandardSubtraction()
        sut.setMinuendo(minuendo)
        sut.setSubtraendo(subtraendo)

        sut.run()

        expect(sut.getDiferenca().toNumber()).toBe(22100)
    })

    test('Should subtract different order numbers', () => {
        const minuendo =   43750
        const subtraendo =   630

        const sut = new StandardSubtraction()
        sut.setMinuendo(minuendo)
        sut.setSubtraendo(subtraendo)

        sut.run()

        expect(sut.getDiferenca().toNumber()).toBe(43120)
    })

    test('Should subtract order 2 numbers with regrouping (borrow one)', () => {
        const minuendo =   50
        const subtraendo = 13

        const sut = new StandardSubtraction()
        sut.setMinuendo(minuendo)
        sut.setSubtraendo(subtraendo)

        sut.run()

        expect(sut.getDiferenca().toNumber()).toBe(37)
    })

    test('Should subtract order 3 numbers with regrouping (borrow one)', () => {
        const minuendo =   500
        const subtraendo =  413

        const sut = new StandardSubtraction()
        sut.setMinuendo(minuendo)
        sut.setSubtraendo(subtraendo)

        sut.run()

        expect(sut.getDiferenca().toNumber()).toBe(87)
    })

    test('Should subtract order 4 numbers with regrouping (borrow one)', () => {
        const minuendo =   2000
        const subtraendo = 1153

        const sut = new StandardSubtraction()
        sut.setMinuendo(minuendo)
        sut.setSubtraendo(subtraendo)

        sut.run()

        expect(sut.getDiferenca().toNumber()).toBe(847)
    })

    test('Should subtract different order numbers with regrouping (borrow one)', () => {
        const minuendo =   1000
        const subtraendo =  153

        const sut = new StandardSubtraction()
        sut.setMinuendo(minuendo)
        sut.setSubtraendo(subtraendo)

        sut.run()

        expect(sut.getDiferenca().toNumber()).toBe(847)
    })

    test('Same number subtraction should be zero', () => {
        const minuendo =   1564
        const subtraendo = 1564

        const sut = new StandardSubtraction()
        sut.setMinuendo(minuendo)
        sut.setSubtraendo(subtraendo)

        sut.run()

        expect(sut.getDiferenca().toNumber()).toBe(0)
    })
})