suite('Test of the "about" page', function() {
	test('страница должна содержать ссылку на страницу контактов', function() {
		assert($('a[href="/contact"]').length);
	});
});