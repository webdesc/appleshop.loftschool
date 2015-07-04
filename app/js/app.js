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
		var setView   = $(this).find('option:checked').data('view'),
			classList = catalogList.attr('class').split(/\s+/);

		catalogList
			.removeClass(classList[1])
			.addClass('catalog-list_view-' + setView);
	};

})();


var accordeon = (function(){

	var accordeon   = $('.menu-side__item_subcat'),
		subCatLinks = $('.menu-side__item_subcat > .menu-side__link'),
		allSubMenu  = accordeon.find('.menu-side__submenu');

	return {
		init: function(){
			this.setupListener();
		},
		setupListener: function(){
			subCatLinks.on('click', toggleSubMenu);
		}
	};

	function toggleSubMenu(e) {
		e.preventDefault();
		var that    = $(this),
			subMenu = that.parent().find('.menu-side__submenu');

		// скрываем подменю всех соседей
		subMenu
			.end()
			.siblings(accordeon)
			.find(allSubMenu)
			.slideUp();

		// показываем текущее подменю
		subMenu
			.stop()
			.slideToggle();

		subCatLinks.removeClass('menu-link_active');
		that.addClass('menu-link_active');
	};

})();


var up = (function(){

	var win        = $(window),
		doc        = $(document),
		upLink     = $('.up'),
		scrollPage = 200,
		speedUp    = 400;

	return {
		init: function(){
			this.setupListener();
		},
		setupListener: function(){
			upLink.on('click', scrollUp);
			win.on('scroll', toggleShowUp);
		}
	};

	function toggleShowUp(){
		if (doc.scrollTop() > scrollPage) {
			upLink.fadeIn(300);
		} else {
			upLink.fadeOut(300);
		}
	};

	function scrollUp(){
		$('html, body').animate({scrollTop:0}, speedUp);
	};

})();