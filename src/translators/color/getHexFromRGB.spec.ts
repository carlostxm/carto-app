import getHexFromRGB from './getHexFromRGB';

describe('getHexFromRGB', () => {
  describe('invalid values', () => {
    test.each`
      input        | expected
      ${null}      | ${null}
      ${undefined} | ${null}
      ${[]}        | ${null}
      ${[1]}       | ${null}
      ${[1, 2]}    | ${null}
    `('returns $expected when input is $input', ({ input, expected }) => {
      expect(getHexFromRGB(input)).toBe(expected);
    });
  });
  describe('valid values', () => {
    test.each`
      input              | expected
      ${[0, 0, 0]}       | ${'#000000'}
      ${[255, 255, 255]} | ${'#ffffff'}
      ${[252, 3, 3]}     | ${'#fc0303'}
    `('returns $expected when input is $input', ({ input, expected }) => {
      expect(getHexFromRGB(input)).toBe(expected);
    });
  });
});
