$(document).ready(function () {
	const correctAnswer = "Blob";
	let correctNum = 0;

	if (window.location.pathname.includes('/quiz/1')) {
		if (bestQuizPage >= 1) {
			$('.draggable').each(function() {
				$(this).css('visibility', 'hidden');
				const data = $(this).attr('id');
				$(`.droppable[data-accept="${data}"] .drop-label`).text(data);
			});
			return;
		}

		$('.draggable').css('visibility', 'visible');

		$('.draggable').on('dragstart', function (e) {
			e.originalEvent.dataTransfer.setData('text/plain', this.id);
			// Reset any error states when starting to drag
			$(this).removeClass('bg-danger text-white')
				   .addClass('bg-warning');
		});
		
		$('.droppable').each(function () {
			$(this).on('dragover', function (e) {
				e.preventDefault();
			});
		
			$(this).on('drop', function (e) {
				e.preventDefault();
				const data = e.originalEvent.dataTransfer.getData('text/plain');
				const expected = $(this).data('accept');
				const $draggableElem = $('#' + data);

				if (data === expected) {
					correctNum += 1;
					$(this).find('.drop-label').text(data);
					$draggableElem.css('visibility', 'hidden');
					
					if (correctNum == 3) {
						$("#next-btn").removeClass("d-none");
					}
				} else {
					$draggableElem.removeClass('bg-warning')
								  .addClass('bg-danger text-white');
				}
			});
		});
	}

	if (window.location.pathname.includes('/quiz/2')) {
		$(".option-btn").on("click", function () {
			// Reset all buttons
			$(".option-btn")
				.removeClass("btn-success btn-danger")
				.addClass("btn-outline-dark");

			const selected = $(this).data("value");

			if (selected === correctAnswer) {
				$(this).removeClass("btn-outline-dark").addClass("btn-success");
				$("#next-btn").removeClass("d-none");
			} else {
				$(this).removeClass("btn-outline-dark").addClass("btn-danger");
				$("#next-btn").addClass("d-none");
			}
		});
	}

	if (window.location.pathname.includes('/quiz/3') || window.location.pathname.includes('/quiz/4')) {
		// Handle image click event
		$(".clickable-image").on("click", function () {
			var selectedIndex = $(this).data("index");

			// If left image (index 1) is clicked, apply green border and show next button
			// there might be a better way to handle this, but it works for now
			if (selectedIndex === 1) {
				$("[data-index=2]").removeClass("red-border");
				$(this).addClass("green-border");
				$("#next-btn").removeClass("d-none");
				$(".clickable-image").off("click");
			} else {
				$(this).addClass("red-border"); 
				$("#next-btn").addClass("d-none");
			}
		});
	}

	if (window.location.pathname.includes('/quiz/5')) {
		$(".option-btn").on("click", function () {
			// Reset all buttons
			$(".option-btn")
				.removeClass("btn-success btn-danger")
				.addClass("btn-outline-dark");

			const selected = $(this).data("value");

			if (selected === correctAnswer) {
				$(this).removeClass("btn-outline-dark").addClass("btn-success");
				$("#next-btn").removeClass("d-none");
			} else {
				$(this).removeClass("btn-outline-dark").addClass("btn-danger");
				$("#next-btn").addClass("d-none");
			}
		});
	}
});
