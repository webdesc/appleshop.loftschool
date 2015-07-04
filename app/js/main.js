$(document).ready(function(){

	up.init();

	if ($('.catalog-select-view').length) {
		viewer.init();
	};
	
	if ($('.menu-side__item_subcat').length) {
		accordeon.init();
	};

});