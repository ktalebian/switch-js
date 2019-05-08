import * as matched from '../../src/lib/matched';
import {doReturn} from "../../src/lib/matched";

describe('matched', () => {
	describe('doReturn', () => {
		it('should return single value', () => {
			expect(doReturn('single')()).toEqual('single');
		});
	});
});
