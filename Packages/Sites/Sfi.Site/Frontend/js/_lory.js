document.addEventListener('DOMContentLoaded', function () {
	var loryDom = document.querySelector('.js-Lory');
	if (loryDom) {
		var dotCount = loryDom.querySelectorAll('.js-Lory-slide').length;
		var dotContainer = loryDom.querySelector('.js-Lory-dots');
		var dotListItem = document.createElement('li');
		dotListItem.classList.add('Lory-dot');

		loryDom.addEventListener('before.lory.init', handleDotEvent);
		loryDom.addEventListener('after.lory.init', handleDotEvent);
		loryDom.addEventListener('after.lory.slide', handleDotEvent);
		loryDom.addEventListener('on.lory.resize', handleDotEvent);

		var loryInstance = lory(loryDom, {
			infinite: 1,
			enableMouseEvents: true,
			classNameFrame: 'js-Lory-frame',
			classNameSlideContainer: 'js-Lory-slides',
			classNamePrevCtrl: 'js-Lory-prev',
			classNameNextCtrl: 'js-Lory-next'
		});
	}


	function handleDotEvent(e) {
		if (e.type === 'before.lory.init') {
			for (var i = 0, len = dotCount; i < len; i++) {
				var clone = dotListItem.cloneNode();
				dotContainer.appendChild(clone);
			}
			dotContainer.childNodes[0].classList.add('active');
		}
		if (e.type === 'after.lory.init') {
			for (var i = 0, len = dotCount; i < len; i++) {
				dotContainer.childNodes[i].addEventListener('click', function(e) {
					loryInstance.slideTo(Array.prototype.indexOf.call(dotContainer.childNodes, e.target));
				});
			}
		}
		if (e.type === 'after.lory.slide') {
			for (var i = 0, len = dotContainer.childNodes.length; i < len; i++) {
				dotContainer.childNodes[i].classList.remove('active');
			}
			dotContainer.childNodes[e.detail.currentSlide - 1].classList.add('active');
		}
		if (e.type === 'on.lory.resize') {
			for (var i = 0, len = dotContainer.childNodes.length; i < len; i++) {
				dotContainer.childNodes[i].classList.remove('active');
			}
			dotContainer.childNodes[0].classList.add('active');
		}
	}
});
