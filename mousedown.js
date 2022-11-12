const worldElem = document.querySelector('.world');

function clickHandler(e) {
	const targetElem = e.target;
	// targetElem.setAttribute('data-flip', 'true');

	if (targetElem.classList.contains('world')) {
		return;
	}

	if (targetElem.dataset.flip === 'false') {
		// data-flip="false"라면
		targetElem.dataset.flip = 'true';
	} else {
		// data-flip="true"라면
		targetElem.dataset.flip = 'false';
	}
}

worldElem.addEventListener('click', clickHandler);
