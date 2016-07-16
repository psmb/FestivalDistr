function stickInParent (selector) {
	var fixedClass = 'isFixed';
	selector = selector || '.js-stickInParent';

	this.nav = document.querySelector(selector);
	if (!this.nav) {
		return;
	}
	this.parent = this.nav.parentElement;
	this.update = function (scrollPosition) {
		if (scrollPosition > this.parent.offsetTop) {
			this.nav.classList.add(fixedClass);
		} else {
			this.nav.classList.remove(fixedClass);
		}
	};
	debouncedScroll(this.update.bind(this));
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
