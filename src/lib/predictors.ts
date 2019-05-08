import { Predictor } from './switch';

type FixedArray<T, L extends Array<any>>  = Array<T> & { length: L['length'] };

/**
 * A predictor that checks the variable is of the same instance
 * @param klasses	the list of classes to check
 */
export function is<T extends Array<any>>(...klasses: FixedArray<any, T>): Predictor<T> {
	return (...variables: T) => {
		return variables
			.every((variable, index) => variable instanceof klasses[index]);
	}
}

/**
 * A predictor that checks the variable equals the value
 * @param values	the values
 */
export function eq<T extends Array<any>>(...values: FixedArray<any, T>): Predictor<T> {
	return (...variables: T) => {
		return variables
			.every((variable, index) => variable === values[index]);
	}
}

/**
 * A predictor that checks all the variables are larger than the provided list.
 * Each variable is checked against its corresponding value based on the index
 * @example
 * 		SwithCase(var1, var2)
 * 			.when(greaterThan(a, b))
 *
 *		Checks that v1 > a, and v2 > b
 *
 * @param values	the list of values to compare it to
 */
export function greaterThan<T extends Array<any>>(...values: FixedArray<number, T>): Predictor<T> {
	return (...variables: T) => {
		return variables
			.every((variable, index) => variable > values[index]);
	}
}

export function greaterThanAll<T extends Array<any>>(value: number): Predictor<T> {
	return (...variables: T) => {
		return variables
			.every((variable, index) => variable > value);
	}
}

export function atleastOneGreaterThan<T extends Array<any>>(value: number): Predictor<T> {
	return (...variables: T) => {
		return variables
			.some((variable, index) => variable > value);
	}
}
