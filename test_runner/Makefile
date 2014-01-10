test: module_under_test_copied
	./node_modules/.bin/mocha \
		--debug \
		--reporter nyan \
		--check-leaks \
		--require tests_init.js \
		node_modules/extended-exceptions/spec/*

module_under_test_copied: deps_installed
	rm -rf node_modules/extended-exceptions
	mkdir  node_modules/extended-exceptions
	cp -r ../*.js         node_modules/extended-exceptions
	cp -r ../package.json node_modules/extended-exceptions
	cp -r ../README.md node_modules/extended-exceptions
	cp -r ../spec         node_modules/extended-exceptions

deps_installed:
	npm install

.PHONY: test
