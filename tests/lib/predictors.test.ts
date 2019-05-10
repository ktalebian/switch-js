import * as predictors from 'app/lib/predictors';

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

	describe('greaterThan', () => {
		it('should be truthy', () => {
			expect(predictors.greaterThan(7)(10)).toBeTruthy();
			expect(predictors.greaterThan(7, 8)(10, 11)).toBeTruthy();
		});

		it('should be falsy', () => {
			expect(predictors.greaterThan(7)(6)).toBeFalsy();
			expect(predictors.greaterThan(7, 8)(6, 5)).toBeFalsy();
			expect(predictors.greaterThan(7, 8)(10, 5)).toBeFalsy();
		});
	});

	describe('greaterThanAll', () => {
		it('should be truthy', () => {
			expect(predictors.greaterThanAll(8)(11)).toBeTruthy();
			expect(predictors.greaterThanAll(8)(11, 10, 9)).toBeTruthy();
		});

		it('should be falsy', () => {
			expect(predictors.greaterThanAll(8)(7)).toBeFalsy();
			expect(predictors.greaterThanAll(8)(7, 6, 5)).toBeFalsy();
			expect(predictors.greaterThanAll(8)(7, 6, 9)).toBeFalsy();
		});
	});

	describe('atLeastOneGreaterThan', () => {
		it('should be truthy', () => {
			expect(predictors.atLeastOneGreaterThan(8)(11)).toBeTruthy();
			expect(predictors.atLeastOneGreaterThan(8)(11, 10, 9)).toBeTruthy();
			expect(predictors.atLeastOneGreaterThan(8)(11, 2)).toBeTruthy();
			expect(predictors.atLeastOneGreaterThan(8)(2, 11)).toBeTruthy();
		});

		it('should be falsy', () => {
			expect(predictors.greaterThanAll(8)(7)).toBeFalsy();
			expect(predictors.greaterThanAll(8)(7, 6, 5)).toBeFalsy();
		});
	});
});
