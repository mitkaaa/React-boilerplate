import { add } from '../function'

describe('server', () => {
    it('store', () => {
        expect(add(1, 2)).toBe(3)
    })
})
