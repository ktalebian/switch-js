import { Matched } from "./switch";

/**
 * Helper method to return the result of a matched predictor
 *
 * @param value		the value to return
 */
export function doReturn<R>(value: any): Matched<R> {
	return () => {
		return value;
	}
}
