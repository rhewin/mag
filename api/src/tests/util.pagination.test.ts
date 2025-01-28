import { getPagination } from '../utils/util.pagination';

describe('getPagination', () => {
  test('should use default values when no arguments are passed', () => {
    const result = getPagination();
    expect(result).toEqual({
      currentPage: 1,
      take: 10,
      skip: 0,
    });
  });

  test('should default perPage to 10 when only pageNum is provided', () => {
    const result = getPagination(3);
    expect(result).toEqual({
      currentPage: 3,
      take: 10,
      skip: 20,
    });
  });

  test('should default pageNum to 1 when only perPage is provided', () => {
    const result = getPagination(undefined, 15);
    expect(result).toEqual({
      currentPage: 1,
      take: 15,
      skip: 0,
    });
  });

  test('should calculate skip correctly for valid pageNum and perPage', () => {
    const result = getPagination(4, 25);
    expect(result).toEqual({
      currentPage: 4,
      take: 25,
      skip: 75,
    });
  });

  test('should handle zero values for pageNum and perPage', () => {
    const result = getPagination(0, 0);
    expect(result).toEqual({
      currentPage: 1,
      take: 10,
      skip: 0,
    });
  });

  test('should handle negative values for pageNum and perPage', () => {
    const result = getPagination(-3, -10);
    expect(result).toEqual({
      currentPage: 1,
      take: 10,
      skip: 0,
    });
  });

  test('should handle non-integer values for pageNum and perPage', () => {
    const result = getPagination(2.5, 7.5);
    expect(result).toEqual({
      currentPage: 2,
      take: 7,
      skip: 7,
    });
  });
});
