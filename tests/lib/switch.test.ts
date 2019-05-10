import Switch from 'app/lib/switch';
import {doReturn} from 'app/lib/matched';

describe('Switch', () => {
	it('return first result', () => {
		const result = Switch(10)
			.when(x => x > 8, () => 'first')
			.when(x => x > 7, () => 'second')
			.otherwise(() => 'otherwise');

		expect(result).toEqual('first');
	});

	it('should return second result', () => {
		const result = Switch(8)
			.when(x => x > 8, () => 'first')
			.when(x => x > 7, () => 'second')
			.otherwise(() => 'otherwise');

		expect(result).toEqual('second');
	});

	it('should return otherwise', () => {
		const result = Switch(7)
			.when(x => x > 8, () => 'first')
			.when(x => x > 7, () => 'second')
			.otherwise(() => 'otherwise');

		expect(result).toEqual('otherwise');
	});

	it('should return first with multi-argument', () => {
		const result = Switch(10, 8)
			.when((x, y) => x > 8 && y === 8, () => 'first')
			.when((x, y) => x > 8 && y === 7, () => 'second')
			.otherwise(() => 'otherwise');

		expect(result).toEqual('first');
	});

	it('should return second with multi-argument', () => {
		const result = Switch(10, 7)
			.when((x, y) => x > 8 && y === 8, () => 'first')
			.when((x, y) => x > 8 && y === 7, () => 'second')
			.otherwise(() => 'otherwise');

		expect(result).toEqual('second');
	});

	it('should return otherwise with multi-argument', () => {
		const result = Switch(10, 6)
			.when((x, y) => x > 8 && y === 8, () => 'first')
			.when((x, y) => x > 8 && y === 7, () => 'second')
			.otherwise(() => 'otherwise');

		expect(result).toEqual('otherwise');
	});

	it('should return first result with thenReturn', () => {
		const result = Switch(10)
			.when(x => x === 10, doReturn('match'))
			.otherwise(doReturn('otherwise'));

		expect(result).toEqual('match');
	});

	it('should return otherwise with thenReturn', () => {
		const result = Switch(9)
			.when(x => x === 10, doReturn('match'))
			.otherwise(doReturn('otherwise'));

		expect(result).toEqual('otherwise');
	});
});
