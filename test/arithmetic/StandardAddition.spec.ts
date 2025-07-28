import { describe, expect, test } from "vitest";
import { StandardAddition } from "./StandardAddition";

describe('Standard Addition', () => {

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