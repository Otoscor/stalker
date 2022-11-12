(() => {

	let moon = document.querySelector('#moon');
	let person = document.querySelector('#person');
	let stars = document.querySelector('#stars');
	let mountains_behind = document.querySelector('#mountains_behind');
	let text = document.querySelector('#text');
	let mountains_front = document.querySelector('#mountains_front');
	let header = document.querySelector('header')
	let progress = document.querySelector('.progress');
	let bar = document.querySelector('.bar');
	const toTopEl = document.querySelector('#to-top');


	window.addEventListener('scroll', () => {
		let value = window.scrollY;

		stars.style.left = `${value * 0.25}px`
		moon.style.top = `${value * 1.05}px`
		person.style.bottom = `${value * 0.25}px`
		mountains_behind.style.top = `${value * 0.5}px`
		mountains_front.style.top = `${value * 0}px`
		text.style.marginRight = `${value * 3}px`
		text.style.marginTop = `${value * 0.5}px`
		header.style.top = `${value * 0.5}px`
		scrollTop = document.documentElement.scrollTop;
		let per = Math.ceil(scrollTop / document.body.scrollHeight * 100 + 9);
		bar.style.width = `${per}%`
		if (per > 30) {
			progress.classList.add('show');
		} else {
			progress.classList.remove('show');
		}

	})

	const actions = {
		birdFlies(key) {
			if (key) {
				document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
			} else {
				document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
			}
		},
		birdFlies2(key) {
			if (key) {
				document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`;
			} else {
				document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
			}
		}
	};

	const stepElems = document.querySelectorAll('.step');
	const graphicElems = document.querySelectorAll('.graphic-item');
	let currentItem = graphicElems[0];
	let ioIndex;

	const io = new IntersectionObserver((entries, observer) => {
		ioIndex = entries[0].target.dataset.index * 1;
	});

	for (let i = 0; i < stepElems.length; i++) {
		io.observe(stepElems[i]);
		stepElems[i].dataset.index = i;
		graphicElems[i].dataset.index = i;
	}

	function activate(action) {
		currentItem.classList.add('visible');
		if (action) {
			actions[action](true);
		}
	}

	function inactivate(action) {
		currentItem.classList.remove('visible');
		if (action) {
			actions[action](false);
		}
	}

	let scrollTop = 0;

	window.addEventListener('scroll', () => {
		let step;
		let boundingRect;

		for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
			step = stepElems[i];
			if (!step) continue;
			boundingRect = step.getBoundingClientRect();

			if (boundingRect.top > window.innerHeight * 0.1 &&
				boundingRect.top < window.innerHeight * 0.8) {

				inactivate(currentItem.dataset.action);
				currentItem = graphicElems[step.dataset.index];
				activate(currentItem.dataset.action);
			}
		}
	});

	window.addEventListener('load', () => {
		setTimeout(() => scrollTo(0, 0), 100);

	});

	activate();


	toTopEl.addEventListener('click', function () {
		gsap.to(window, .7, {
			scrollTo: 0,
		});
	})

	window.addEventListener('scroll', function () {
		if (window.scrollY > 2000) {
			// gsap.to(badgeEl, .6, {
			// 	opacity: 0,
			// 	display: 'none',
			// });
			// 버튼 보이기
			gsap.to(toTopEl, .2, {
				x: 0,
			})
		} else {
			// gsap.to(badgeEl, .6, {
			// 	opacity: 1,
			// 	display: 'block',
			// });
			// 버튼 숨기기
			gsap.to(toTopEl, .2, {
				x: 100,
			})
		}
	},);



})();