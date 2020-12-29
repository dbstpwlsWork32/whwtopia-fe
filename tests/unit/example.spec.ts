import { expect } from 'chai'
import { numberFlag as formatNumber } from '@/globals/pluginFormatter'

describe('number flag Format', () => {
  it('0 to 0', () => {
    expect(formatNumber(0)).to.equal('0')
  })
  it('9999 to 9999', () => {
    expect(formatNumber(9999)).to.equal('9999')
  })
  it('10000 to 1만', () => {
    expect(formatNumber(10000)).to.equal('1만')
  })
  it('100000 to 10만', () => {
    expect(formatNumber(100000)).to.equal('10만')
  })
  it('10000000 to 1000만', () => {
    expect(formatNumber(10000000)).to.equal('1000만')
  })
  it('100000100 to 1억', () => {
    expect(formatNumber(100000000)).to.equal('1억')
  })
  it('119999999 to 1.1억', () => {
    expect(formatNumber(119000000)).to.equal('1.1억')
  })
  it('1019999999 to 10억', () => {
    expect(formatNumber(1019124000)).to.equal('10억')
  })
})
