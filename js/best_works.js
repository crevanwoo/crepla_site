;(function () {
	
	
	
	
	$('div.single_work_bg').each(function() {
		
		$(this).css('background-image', 'url(' + $(this).parent().find('img.single_work_bg').attr('src') + ')');		
			 
		
	})
	
	
	$('.best_works_footer .single_work').on('mouseenter', function() {
		$(this).find('.single_work_hover').addClass('active');
		
	})
	
	$('.best_works_footer .single_work').on('mouseleave', function() {
		$(this).find('.single_work_hover').removeClass('active');
		
	})
	
	
	
	
	
	
	
	
	
	

	
	
	
})();


	$('.other_works').slick({
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
		arrows: true,
});