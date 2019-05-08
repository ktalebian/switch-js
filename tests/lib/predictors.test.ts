import * as predictors from '../../src/lib/predictors';

describe('predictors', () => {
	describe('is', () => {
		class Foo {}

		it('should return truthy for single variables', () => {
			expect(predictors.is(Error, Foo)(new Error('true'))).toBeTruthy();
			expect(predictors.is(Foo)(new Foo())).toBeTruthy();
		});

		it('should return truthy for multiples variables', () => {
			expect(predictors.is(Error, Foo)(new Error('true'), new Foo())).toBeTruthy();
		});

		it('should be falsy for a single variables', () => {
			expect(predictors.is(Foo)(new Error('true'))).toBeFalsy();
			expect(predictors.is(Error)('some-variable')).toBeFalsy();
			expect(predictors.is(Error)(123)).toBeFalsy();
		});

		it('should be falsy for multiple variables', () => {
			expect(predictors.is(Foo, Error)(new Error('true'), new Foo())).toBeFalsy();
			expect(predictors.is(Foo, Error)(new Foo(), 'some-variable')).toBeFalsy();
		});
	});

	describe('eq', () => {
		it('should be truthy for single variable', () => {
			expect(predictors.eq(1)(1)).toBeTruthy();
			expect(predictors.eq('some-string')('some-string')).toBeTruthy();
		});
	});
});


export function is<T extends any[], L extends any[] & {length: T['length']}>(...klasses: L) {
	return (...variables: T) => {
		return variables
			.every((variable, index) => variable instanceof klasses[index]);
	}
}

is(Number, String)(1, 1); // ok
is(Number, String)(1);
