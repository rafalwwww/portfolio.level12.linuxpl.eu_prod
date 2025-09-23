import shave from "shave";

export function registerModalScrollBlock() {
    function isAnyModalOpen() {
        return document.querySelectorAll('.modal.show').length > 0;
    }

    function blockScrollIfModal(e) {
        if (isAnyModalOpen()) {
            e.stopImmediatePropagation();
            e.preventDefault();
            return false;
        }
    }
    ['wheel', 'scroll'].forEach(eventType => {
        window.addEventListener(eventType, blockScrollIfModal, { capture: true });
    });
}

export function equalHeight() {
	let tallest = 0;
		
    $(".grid-item:not(.hover):not(:hover) .content").each( function() {
		$(this).css("height", "auto");

		let thisHeight = $(this).height();
		if ( thisHeight > tallest ) {
			tallest = thisHeight;
		}
	});
	$(".grid-item .content").height(tallest);
}

export function registerColorboxHandlers() {
	$('body').off('click.colorbox').on('click.colorbox', '.colorbox', function(e) {
		if (document.body.classList.contains('system-filter-view')) {
			// Pobierz aktywny system
			const activeFilter = $('.img-flex.active').data('filter');
			if (!activeFilter) return;

			// Sprawdź, czy kliknięty .colorbox ma klasę aktywnego systemu
			if (!$(this).hasClass(activeFilter)) {
				e.preventDefault();
				return;
			}
			// Otwórz galerię tylko dla aktywnego systemu
			$(`.colorbox.${activeFilter}`).colorbox({
				rel: `colorbox-${activeFilter}`,
				scalePhotos: true,
				transition: "elastic",
				maxWidth: "90%",
				fixed: false,
				returnFocus: true
			});
		} else {
			// Standardowa galeria dla wszystkich
			$('.colorbox').colorbox({
				rel: 'colorbox',
				scalePhotos: true,
				transition: "elastic",
				maxWidth: "90%",
				fixed: false,
				returnFocus: true
			});
		}
		e.preventDefault();
	});
}

export function addGridCounter($grid) {
    const counterN1 = `<div class="alm-results-text n1" aria-live="polite" aria-atomic="true">Projektów: <span class="alm-results-post_count"></span>/<span class="alm-results-total_posts"></span></div>`;
    const counterN2 = `<div class="alm-results-text n2" aria-live="polite" aria-atomic="true">Projektów: <span class="alm-results-post_count"></span>/<span class="alm-results-total_posts"></span></div>`;
    $grid.prepend(counterN1);
    $grid.append(counterN2);

    // Zlicz projekty i ustaw wartości
    const allItems = $grid.find('.grid-item');
    const total = allItems.length;
    $grid.find('.alm-results-post_count').text(total);
    $grid.find('.alm-results-total_posts').text(total);
}

export function dataFilterOnClick() {
	$('body').on('click', '.img-flex', function() {
        var filterClass = $(this).data('filter');
        // Jeśli kliknięto reset lub kliknięto aktywny filtr
        if (filterClass === 'reset' || $(this).hasClass('active')) {
			document.body.classList.remove('system-filter-view');

            $(".img-flex").removeClass("active").addClass("start-active");
            $(".grid-item").show();
            gridItemShave();

			// Zlicz wszystkie projekty (RESET = wszystkie widoczne)
            const allItems = document.querySelectorAll('#target .grid-item');
            document.querySelectorAll('.alm-results-post_count').forEach(span => span.textContent = allItems.length);

            return;
        }
		else {
			document.body.classList.add('system-filter-view');
		}

        // ...pozostała logika filtrowania...
        $(".img-flex").removeClass('active').removeClass('start-active');
        $(this).addClass('active');
        $(".grid-item").each(function() {
            $(this).hide();
            if (filterClass === 'ps' && ($(this).hasClass('p17') || $(this).hasClass('p16'))) {
                $(this).show();
            } else if ($(this).hasClass(filterClass)) {
                $(this).show();
            }
        });

		// Zlicz widoczne projekty po filtrze
        const visibleItems = document.querySelectorAll('#target .grid-item:not([style*="display: none"])');
        document.querySelectorAll('.alm-results-post_count').forEach(span => span.textContent = visibleItems.length);

		registerColorboxHandlers();

        gridItemShave();
    });
}

export function gridItemShave() {
    $('.grid-item:not(.truncated)').each( function() {
		let $gridItem = $(this);
		let h2Height = $gridItem.find('h2').outerHeight();
		let iconsActionHeight = $gridItem.find('.icons-action').outerHeight();
		let gridItemHeight = $gridItem.outerHeight();

			if ($gridItem.find('.modal-btn').length) {
				// Clone the modal button
				let $modalBtnClone = $gridItem.find('.modal-btn').clone();
				// Apply styles to ensure the clone is not visible but still takes up space
				$modalBtnClone.css({
					visibility: 'hidden',
					position: 'absolute',
					left: '-9999px'
				});
				// Append the clone to the body to measure its height
				$('body').append($modalBtnClone);
				// Measure the height
				let modalBtnHeight = $modalBtnClone.outerHeight();
				// Remove the clone from the DOM
				$modalBtnClone.remove();

				let shaveHeight = gridItemHeight - h2Height - iconsActionHeight - modalBtnHeight - 70;

				let $originalDesc = $(this);

				let $clonedDesc = $originalDesc.clone().css({
					position: 'absolute',
					visibility: 'hidden',
					left: '-9999px'
				}).appendTo('body');
				
				$clonedDesc.find('.desc').addClass("display-block");

				let modalId = $originalDesc.find('.modal-btn').data('bs-target');
				let shaved = $(modalId+' .modal-body .shaved');
				if (shaved.length > 0) {
					let shavedText = shaved.text().replace('[...]', '');
					$clonedDesc.find('.desc .txt').append(shavedText);
					shaved.remove();
				}

				shave($clonedDesc.find('.desc .txt'), shaveHeight, { character: '' });				
				
				if ($clonedDesc.find('.js-shave').length > 0) {
					let shavedText1 = $clonedDesc.find('.js-shave').text().replace('[...]', '');
					$(modalId+' .modal-body').prepend('<span class="shaved">'+shavedText1+'</br></br></span>');
				}

					if ($clonedDesc.find('.js-shave').length > 0) {
						$gridItem.addClass('truncated');
						if ($clonedDesc.find('.shaved-char').length <= 0) {
							$clonedDesc.find('.desc .shaved-char-container').append('<span class="shaved-char">[...]</span>');
						}
						if ($(modalId+' .modal-body .shaved').find('.shaved-char').length <= 0) {
							$(modalId+' .modal-body .shaved').prepend('<span class="shaved-char">[...]</span>');
						}
					}
					else {
						$gridItem.removeClass('truncated');
						$clonedDesc.find('.desc .shaved-char-container .shaved-char').remove();

						$(modalId+' .modal-body .shaved .shaved-char').remove();
					}

				$clonedDesc.find('.js-shave').remove();
				$clonedDesc.find('.js-shave-char').remove();

				$originalDesc.find('.desc .txt').replaceWith($clonedDesc.find('.desc .txt'));
				$originalDesc.find('.desc .shaved-char-container').replaceWith($clonedDesc.find('.desc .shaved-char-container'));

				$clonedDesc.remove();
			}
			else {
				let shaveHeight = gridItemHeight - h2Height - iconsActionHeight - 70;

				let $originalDesc = $(this);

				let $clonedDesc = $originalDesc.clone().css(
				{
					position: 'absolute',
					visibility: 'hidden',
					left: '-9999px'
				}).appendTo('body');

				$clonedDesc.find('.desc').addClass("display-block");

				shave($clonedDesc.find('.txt'), shaveHeight, { character: '[...]' });
				
				// Add tooltip to the shaved description
				$clonedDesc.find('span.js-shave-char').attr('data-bs-toggle', 'tooltip');
				$clonedDesc.find('span.js-shave-char').attr('data-bs-title', $clonedDesc.find('span.js-shave').text());
				$clonedDesc.find('span.js-shave-char').attr('data-bs-placement', 'top');

				$('span.js-shave-char[data-bs-toggle="tooltip"]').tooltip();

				$clonedDesc.find('.desc').removeClass("display-block");

				$originalDesc.find('.desc .txt').replaceWith($clonedDesc.find('.desc .txt'));

				$clonedDesc.remove();
			}
	});
};

export function hideUnusedSystemFilters() {
  // Get all filter buttons and create a systemFilters array based on data-filter
  const systemFilters = [];
  $('.img-flex[data-filter]').each(function() {
    const className = $(this).data('filter');
    if (className && className !== 'reset') {
      systemFilters.push({
        className: className,
        selector: '.img-flex.' + className
      });
    }
  });
  // For each system, check if there is a grid-item with that class
  systemFilters.forEach(filter => {
    if ($('.grid-item.' + filter.className).length === 0) {
      $(filter.selector).hide();
	  // wypisz do konsoli, że filtr został ukryty
	  console.log(`Ukryto filtr: ${filter.className}`);
    }
  });
}
    