import { calculatePaybackMonths } from '../lib/roi';


describe('calculatePaybackMonths', () => {
  it('returns Infinity when daily reward is zero', () => {
    expect(calculatePaybackMonths(1000, 0, 7)).toBe(Infinity);
  });

  it('calculates payback correctly for typical values', () => {
    const payback = calculatePaybackMonths(500, 2, 7);
    expect(payback).toBeCloseTo(500 / (2 * 7 * 4.3), 2);
  });

  it('handles extreme cases', () => {
    const payback = calculatePaybackMonths(1000, 10, 1);
    expect(payback).toBeCloseTo(1000 / (10 * 1 * 4.3), 2);
  });
});
