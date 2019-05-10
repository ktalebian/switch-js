[![Build Status](https://travis-ci.com/ktalebian/switch.svg?branch=master)](https://travis-ci.com/ktalebian/switch)

# switch-js
A declarative and functional replacement of JavaScript `switch` statement

## What's Wrong with `switch`?

There are a few reasons why the [JavaScript switch is not loved](https://bit.ly/305Kxmg). 

The motivation behind this project is to allow a functional switch statement that can also test for multiple variables simultaneously. 

## Installation

Install using `npm` by running

```bash
npm install @ktalebian/switch
```

## Usage 

Switch creates a declarative chains of `when` to build up your case statements:

```javascript
import Switch from '@ktalebian/switch';

const response = Switch(...variables)
    .when(Predictor, Matched)
    .otherwise(Matched)
``` 

It can take a variable number of arguments. 

The `when` clause takes two arguments, `Predictor` and `Matched` response; `Predictor` is a callback method that returns boolean whether there is a match. If there is a match, the `Matched` callback is invoked. 

The `otherwise` cause takes a `Matched` clause and is invoked if none of the `Predictors` from the `when` clause are matched.

### Examples

**Example with single argument**

```javascript
import Switch from '@ktalebian/switch';

const response = Switch(variable)
    .when(x => x < 5, () => 'ok')
    .when(x => x < 10, () => 'warning')
    .when(x => x < 100, () => 'error')
    .otherwise(() => 'critical');

// For `variable = 1`, you get `ok`, matching the 1st when clause
// For `variable = 10`, you get `error`, marching the 3rd clause
// For `variable = 1000`, you get `critical`, because none of the when clauses match, so otherwise clause is used
```

**Example with multiple arguments**

```javascript
import Switch from '@ktalebian/switch';

const response = Switch(variable1, variable2)
    .when((x, y) => x > y, () => x)
    .when((x, y) => x < y, () => y)
    .otherwise(() => x);

// This is a simple comparator that effectively performs the same task as
const max = Math.max(variable1, variable2);
```

### Predictor

The `Predictor` is a callback function that receives the number of variables we are testing against, and expects a boolean response. 

```javascript
const predictor = (arg1, arg2, arg3, ...) => {
  // return true/false
}

// use this predictor in the `.when` method
```

#### Helper Predictors

There are a few common helpers that `SwithCase` provides

##### is Predictor

```javascript
import Switch, { is } from '@ktalebian/switch';

const resp = Switch(error)
    .when(is(CustomError), () => 'this is a custom-error')
    .when(is(Error), () => 'this is an error')
    .otherwise(() => 'This is unknown');
```

This predictor checks that the variable passed is an `instanceof` `CustomError` or `Error`.

##### eq Predictor

```javascript
import Switch, { eq } from '@ktalebian/switch';

const resp = Switch(variable)
    .when(eq(5), () => 'equals 5')
    .otherwise(() => 'does not equal 5');
```

The predictor does a `===` check.

#### Creating Custom Predictors

A custom predictor is just a function that takes in some argument, and returns a predictor. For example the `eq` predictor is

```javascript
function eq(...values) {
    // The return function is the predictor
	return (...variables) => {
		return variables
			.every((variable, index) => variable === values[index]);
	}
}
```

### Matched

The `Matched` callback is invoked when the `when` clause of the predictor is truthy. This method takes no argument and should return the result.

If your result is a simple value back, you can use the `doReturn` helper callback:

```javascript
import Switch, { eq, doReturn } from  '@ktalebian/switch';

const resp = Switch(variable)
    .when(eq(5), doReturn('this is 5'))
    .otherwise(doReturn('this is 5'))
```
