function stickInParent () {
	var nav = document.querySelector('.js-stickInParent');
	var parent = nav.parentElement;

	debouncedScroll(setStickyClass);

	function setStickyClass(scrollPosition) {
		if (scrollPosition > parent.offsetTop) {
			nav.classList.add('isFixed');
		} else {
			nav.classList.remove('isFixed');
		}
	}

	function debouncedScroll(callback) {
		var lastKnownScrollPosition = 0;
		var isTicking = false;

		window.addEventListener('scroll', function(e) {
			lastKnownScrollPosition = window.scrollY;
			if (!isTicking) {
				window.requestAnimationFrame(function() {
					setStickyClass(lastKnownScrollPosition);
					isTicking = false;
				});
			}
			isTicking = true;
		});
	}
}
