export type Callback<R> = () => R;
export type Predictor<T extends Array<any>> = (...x: T) => boolean;
export type Matched<R> = Callback<any>;
export type Otherwise<R> = (matched: Matched<R>) => null;
export type When<R, T extends Array<any>> = (predictor: Predictor<T>, matched: Matched<R>) => ISwitch<R, T>;
export interface ISwitch<R, T extends Array<any>> {
	_matched: R;
	when: When<R, T>;
	otherwise: Otherwise<R>
}

/**
 * Calls the {@link Matched} method
 *
 * @param matched	the match method
 * @returns the result of {@link Matched}
 */
function callMatched<R>(matched: Matched<R>): R {
	if (typeof matched === 'function') {
		return (matched as Function) ();
	}

	return matched;
}

/**
 * When/case method
 *
 * @param variables the variables to test
 * @returns a when clause {@link When}
 */
function whenFn<R, T extends Array<any>>(...variables: T) {
	return (predictor: Predictor<T>, matched: Matched<R>): When<R, T> => {
		if (this._matched) {
			return this;
		}

		if (predictor(...variables)) {
			this._matched = callMatched(matched);
		}

		return this;
	}
}

/**
 * Otherwise/default result of the switch case
 *
 * @param matched	the default response
 * @returns the result of the switch statement
 */
function otherwiseFn(matched) {
	if (this._matched) {
		return this._matched;
	}

	return callMatched(matched);
}

/**
 * Switch-case
 *
 * @param variables	list of variables to switch over
 */
export default function Switch<R, T extends Array<any>>(...variables: T): ISwitch<R, T> {
	if (!(this instanceof Switch)) {
		return new (Switch as any)(...variables);
	}

	this._matched = null;
	this.otherwise = otherwiseFn.bind(this);
	this.when = whenFn.bind(this);
	this.when = whenFn.call(this, ...variables);

	return this;
}

