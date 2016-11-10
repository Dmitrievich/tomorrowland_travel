suite('Global Tests', function() {
	test('У даной страницы допустимый заголовок', function() {
		assert(document.title && document.title.match(/\S/) &&
			document.title.toUpperCase() !== 'TODO');
	});
});