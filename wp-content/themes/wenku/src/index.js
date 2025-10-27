import './scss/main.scss';

import { dataFilterOnClick } from "./js/app.js";
import { gridItemShave } from "./js/app.js";
import './js/custom-bootstrap.js';
import 'jquery-colorbox';
import { equalHeight } from "./js/app.js";
import { hideUnusedSystemFilters } from "./js/app.js";
import { registerColorboxHandlers } from "./js/app.js";
import { addGridCounter } from "./js/app.js";
import { registerModalScrollBlock } from "./js/app.js";

registerModalScrollBlock();

let windowWidth = $(window).width();

$('body').on('click', '.grid-item:not(.no-hover-mobile) .content .onclick', function() {
	$(this).closest('.grid-item').toggleClass('hover');
});

$(function() {
	$(".img-flex").addClass('start-active');
});

dataFilterOnClick();

// The code below is responsible for hiding the grid and the filter button, and then loading the content of the ALM plugin (a shortcode that loads all Projects) via AJAX.
// After the content is loaded, the `almComplete` function is called to perform additional operations, such as viewing system filters and hiding unused filters.
$('body').on('click', '.filters-btn', function() {
	document.querySelector('.grid.n1').remove();
	$(this).toggleClass('hidden');

	$("#target").load("/?page_id=404 #ajax-load-more", function() {
		var el = document.querySelector('.ajax-load-more-wrap');
		ajaxloadmore.start(el);
		document.querySelector('.alm-btn-wrap').remove();

		window.almComplete = function(){
			$('.img-flex-container').toggle();
            $('.filter-header').toggle();
            hideUnusedSystemFilters();
			
			equalHeight();
			gridItemShave();

			registerColorboxHandlers();

            // Dodaj licznik na początek i koniec .grid.n2
			const $grid = $('#target.grid.n2');
			addGridCounter($grid);
		};

		window.almDone = function(){ 
			document.querySelector('.custom-alm-loader').remove();	
			
			
		};
	});
});

registerColorboxHandlers();

window.almDone = function(){
    document.querySelectorAll('.custom-alm-loader, .alm-btn-wrap').forEach(el => el.remove());
};

// Callback for Wordpress plugin Ajax Load More
window.almComplete = function(alm){
	equalHeight();
	gridItemShave();

	$('.filters-btn').show();
};

$(window).on('resize', function(e) {
	if ($(window).width() != windowWidth) {
	  	// Update the window width for next time
		windowWidth = $(window).width();

		if (window.RT) clearTimeout(window.RT);
		
	 	window.RT = setTimeout(function() {
			$('.grid-item.truncated').removeClass('truncated');

	 		equalHeight();
			gridItemShave();
		}, 100);
  }
});
