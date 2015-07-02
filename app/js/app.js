var viewer = (function(){

	var catalogSelectView = $('.catalog-select-view'),
		catalogList       = $('.catalog-list');

	return {
		init: function(){
			this.setupListener();
		},
		setupListener: function(){
			catalogSelectView.on('change', toggleViewCatalog);
		}
	};

	function toggleViewCatalog(){
		var setView = $(this).find('option:checked').data('view'),
			classList = catalogList.attr('class').split(/\s+/);
		catalogList.removeClass(classList[1]).addClass('catalog-list_view-' + setView);
	}

})();