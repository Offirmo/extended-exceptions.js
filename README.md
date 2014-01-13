extended-exceptions.js
======================

[![Build Status](https://travis-ci.org/Offirmo/extended-exceptions.js.png?branch=master)](https://travis-ci.org/Offirmo/extended-exceptions.js)
[![NPM version](https://badge.fury.io/js/extended-exceptions.png)](http://badge.fury.io/js/extended-exceptions)
[![Bower version](https://badge.fury.io/bo/extended-exceptions.js.png)](http://badge.fury.io/bo/extended-exceptions.js)
[![status](https://sourcegraph.com/api/repos/github.com/Offirmo/extended-exceptions.js/badges/status.png)](https://sourcegraph.com/github.com/Offirmo/extended-exceptions.js)
[![Total views](https://sourcegraph.com/api/repos/github.com/Offirmo/extended-exceptions.js/counters/views.png)](https://sourcegraph.com/github.com/Offirmo/extended-exceptions.js)

Introduction
------------

Allow easy declaration of custom exceptions.

Also defines common exceptions for Javascript that are missing in the standard : RuntimeError, NotImplementedError, InvalidArgument, OutOfRange, etc.

Works in node.js + browser, AMD.

Full testsuite. No dependencies.


Usage
-----

Throwing an exception :

```javascript
define(
[
	'extended-exceptions'
],
function(EE) {
	"use strict";

	throw new EE.RuntimeError("Oups !");
```

Defining our own exceptions inheriting from an existing one :

```javascript
define(
[
	'extended-exceptions'
],
function(EE) {
	"use strict";

	// inheriting from RuntimeError
	var CustomError = EE.create_custom_error("CustomError", EE.RuntimeError);
	
	throw new CustomError("Oups !");
	
	...
	
	console.log( caught_error.name );
	console.log( caught_error.message );
	console.log( caught_error.stack );
```

Catching and testing exceptions :



Predefined exceptions
---------------------

Note : we keep the "error" naming scheme of standard javascript.

 * Error (standard)
 *  ExtendedError
 *   LogicError
 *    InvalidArgument
 *    LengthError
 *    OutOfRange
 *   RuntimeError
 *    NotImplementedError
 *    UnknownEnumValueError
 *    IllegalStateError
 *    InvariantNotMetError

Installation
------------

Bower : `bower install extended-exceptions.js`
Npm : `npm install extended-exceptions`

Unit tests
----------

in the 'spec' folder. See also readme.txt in the 'test_runner' folder.
