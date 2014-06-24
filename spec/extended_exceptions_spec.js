if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(
[
	'chai',
	'extended-exceptions',
	'mocha'
],
function(chai, EE) {
	'use strict';

	var expect = chai.expect;

	describe('Extended exceptions', function() {

		describe('ExtendedError (base)', function() {

			it('should inherit from Error', function() {
				var out = new EE.ExtendedError('Test error');
				expect(out).to.exist;

				expect(out).to.be.an('object');
				expect(out).to.be.an.instanceof(Error);
				expect(out).to.be.an.instanceof(EE.ExtendedError);
			});

			it('should behave like an Error', function() {
				var out = new EE.ExtendedError('Test error');

				expect(out.name).to.equals('ExtendedError');
				expect(out.message).to.equals('Test error');
				expect(out.stack).not.to.be.empty;
			});

			// some 3rd party libs expect that
			// see also GitHub issue #1
			describe('message property systematic generation', function() {

				it('should be done when none given', function() {
					var out = new EE.ExtendedError(/* no param */);
					expect(out.message).to.equals(''); // empty but not undefined
				});

				it('should be done when wrapping another error with none given', function() {
					var base_err = new Error();
					var out = new EE.ExtendedError(base_err);
					expect(out.message).to.equals(''); // empty but not undefined
				});

				it('should be done when given a non-string object', function() {
					var out = new EE.ExtendedError({foo: 'bar'});
					expect(out.message).to.be.a('string');
					expect(out.message).not.to.be.empty; // stringification may vary amongst interpreters
				});

			});

			it('should allow wrapping/retyping of an existing Error', function() {
				var base_err = new Error('Test error');
				var out = new EE.ExtendedError(base_err);

				expect(out.name).to.equals('ExtendedError');
				expect(out.message).to.equals('Test error');
				expect(out.stack).not.to.be.empty;
				expect( out.stack ).to.equals(base_err.stack);
			});

			it('should work along chai expectations', function() {
				var tempfn = function() {throw new EE.IllegalState('Not started !'); };
				expect(tempfn).to.throw(EE.IllegalState, 'Not started !');
			});

		});

		var test_extended_error = function(CustomErrorClass, custom_error_name, ParentErrorClass) {
			var out = new CustomErrorClass('test_extended_error 1');
			expect(out).to.exist;

			expect(out).to.be.an.instanceof(CustomErrorClass);
			expect(out).to.be.an.instanceof(ParentErrorClass);

			expect(out.name).to.equals(custom_error_name);
			expect(out.message).to.equals('test_extended_error 1');
			expect(out.stack).not.to.be.empty;

			// should be throwable of course
			try {
				throw new CustomErrorClass('test_extended_error 2');
				expect(false).to.be.true; // should never arrive here
			}
			catch(e) {
				expect(e).to.be.an.instanceof(CustomErrorClass);
				expect(e.message).to.equals('test_extended_error 2');
			}

			// and the chai assertion should work (even in FF ;)
			var tempfn = function() {
				throw new CustomErrorClass('test_extended_error 3');
			}
			expect(tempfn).to.throw(CustomErrorClass, 'test_extended_error 3');
		};


		describe('Custom errors creation', function() {
			it('should allow easy creation of a custom error which works', function() {
				var CustomError = EE.create_custom_error('CustomError', EE.RuntimeError);

				test_extended_error(CustomError, 'CustomError', EE.RuntimeError );
			});
		}); // describe feature


		describe('predefined error', function() {
			describe('LogicError', function() {
				it('should work', function() {
					test_extended_error(EE.LogicError, 'LogicError', EE.ExtendedError );
				});
			}); // describe feature

			describe('InvalidArgument', function() {
				it('should work', function() {
					test_extended_error(EE.InvalidArgument, 'InvalidArgument', EE.LogicError );
				});
			}); // describe feature

			describe('LengthError', function() {
				it('should work', function() {
					test_extended_error(EE.LengthError, 'LengthError', EE.LogicError );
				});
			}); // describe feature

			describe('OutOfRange', function() {
				it('should work', function() {
					test_extended_error(EE.OutOfRange, 'OutOfRange', EE.LogicError );
				});
			}); // describe feature

			describe('RuntimeError', function() {
				it('should work', function() {
					test_extended_error(EE.RuntimeError, 'RuntimeError', EE.ExtendedError );
				});
			}); // describe feature

			describe('NotImplemented', function() {
				it('should work', function() {
					test_extended_error(EE.NotImplemented, 'NotImplemented', EE.RuntimeError );
				});
			}); // describe feature

			describe('UnknownEnumValue', function() {
				it('should work', function() {
					test_extended_error(EE.UnknownEnumValue, 'UnknownEnumValue', EE.RuntimeError );
				});
			}); // describe feature

			describe('IllegalState', function() {
				it('should work', function() {
					test_extended_error(EE.IllegalState, 'IllegalState', EE.RuntimeError );
				});
			}); // describe feature

			describe('InvariantNotMet', function() {
				it('should work', function() {
					test_extended_error(EE.InvariantNotMet, 'InvariantNotMet', EE.LogicError );
				});
			}); // describe feature
		}); // describe feature
	});
});
