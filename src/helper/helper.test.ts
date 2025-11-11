import { describe, it, expect } from 'vitest';
import { formatRupiah, formatTimestamp, snakeToCamel } from './helper';

describe('formatRupiah', () => {
    it('formats positive numbers correctly', () => {
        expect(formatRupiah(1000000)).toBe('Rp\u00A01.000.000,00');
    });

    it('formats zero correctly', () => {
        expect(formatRupiah(0)).toBe('Rp\u00A00,00');
    })
});

describe('formatTimestamp', () => {
    it('formats 13-digit timestamp', () => {
        const ts = 1717430400000; // 2024-06-04T00:00:00.000Z
        expect(formatTimestamp(ts)).toMatch(/\d{4}/); // Contains year
    });

    it('formats 10-digit timestamp', () => {
        const ts = 1717430400; // 2024-06-04T00:00:00Z (seconds)
        expect(formatTimestamp(ts)).toMatch(/\d{4}/);
    });
});

describe('snakeToCamel', () => {
    it('converts snake_case keys to camelCase in objects', () => {
        const input = { first_key: 1, second_key: 2 };
        expect(snakeToCamel(input)).toEqual({ firstKey: 1, secondKey: 2 });
    });

    it('converts nested objects', () => {
        const input = { outer_key: { inner_key: 3 } };
        expect(snakeToCamel(input)).toEqual({ outerKey: { innerKey: 3 } });
    });

    it('converts arrays of objects', () => {
        const input = [{ some_key: 1 }, { another_key: 2 }];
        expect(snakeToCamel(input)).toEqual([{ someKey: 1 }, { anotherKey: 2 }]);
    });

    it('returns primitives unchanged', () => {
        expect(snakeToCamel('test')).toBe('test');
        expect(snakeToCamel(123)).toBe(123);
        expect(snakeToCamel(null)).toBe(null);
    });

    it('handles empty objects and arrays', () => {
        expect(snakeToCamel({})).toEqual({});
        expect(snakeToCamel([])).toEqual([]);
    });
});