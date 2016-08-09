function stickInParent (selector) {
	var update = (function (selector) {
		var fixedClass = 'isFixed';
		selector = selector || '.js-stickInParent';
		var nav = document.querySelector(selector);
		if (!nav) {
			return null;
		}
		var parent = nav.parentElement;

		return function (scrollPosition) {
			// TODO: dirty hack for mobile
			if (scrollPosition > parent.offsetTop && window.innerWidth > 640) {
				nav.classList.add(fixedClass);
			} else {
				nav.classList.remove(fixedClass);
			}
		};
	})(selector);
	if (update) {
		debouncedScroll(update);
	}
}

function debouncedScroll(callback) {
	var lastKnownScrollPosition = 0;
	var isTicking = false;

	window.addEventListener('scroll', function(e) {
		lastKnownScrollPosition = window.scrollY;
		if (!isTicking) {
			window.requestAnimationFrame(function() {
				callback(lastKnownScrollPosition);
				isTicking = false;
			});
		}
		isTicking = true;
	});
}
