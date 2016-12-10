	var slider = document.querySelectorAll('.slider');

	function hideSliderArrow(indexSlider, indexArrow) {
		if (slider[indexSlider]) {
			slider[indexSlider].getElementsByClassName('arrow')[indexArrow].setAttribute('hidden', '');
		}

	}

	function showSliderArrow(indexSlider, indexArrow) {
		if (slider[indexSlider]) {
			slider[indexSlider].getElementsByClassName('arrow')[indexArrow].removeAttribute('hidden');
		}
	}



	function hideArrowsByDefault() {
		if (slider.length > 0) {
			if (slider[1].getElementsByClassName('slide').length === 1) {
				hideSliderArrow(1, 1)
			}
			if (slider[2].getElementsByClassName('slide').length < 4 && slider[2].getElementsByClassName('slide').length > 1) {
				hideSliderArrow(2, 1)
			}
		}
	}

	hideArrowsByDefault()
    
