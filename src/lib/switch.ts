export type Predictor<T extends any[]> = (...variables: T) => boolean;
export type Matched<R, T extends any[]> = (...variables: T) => R;
export type Otherwise<R, T extends any[]> = (matched: Matched<R, T>) => R;
export type When<R, T extends any[]> = (predictor: Predictor<T>, matched: Matched<R, T>) => ISwitch<R, T>;
export interface ISwitch<R, T extends any[]> {
    _matched: R;
    _variables: T;
    when: When<R, T>;
    otherwise: Otherwise<R, T>;
}

/**
 * Switch-case
 *
 * @param variables	list of variables to switch over
 */
export default function Switch<R, T extends any[]>(...variables: T): ISwitch<R, T> {
    if (!this) {
        return Switch.call({}, ...variables);
    }

    this._matched = null;
    this._variables = variables;

    /**
     * Otherwise/default result of the switch case
     *
     * @param matched	the default response
     * @returns the result of the switch statement
     */
    this.otherwise = (matched: Matched<R, T>) => {
        return this._matched ? this._matched : matched(...this._variables);
    };

    /**
     * The when/case method
     *
     * @param predictor	the predictor to test the case
     * @param matched	the matched response if the predictor is truthy
     */
    this.when = (predictor: Predictor<T>, matched: Matched<R, T>): When<R, T> => {
        if (!this._matched && predictor(...this._variables)) {
            this._matched = matched(...this._variables);
        }

        return this;
    };

    return this;
}
