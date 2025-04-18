$(document).ready(function () {
	const correctAnswer = "Blob";

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
});

document.querySelectorAll('.draggable').forEach(elem => {
    elem.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', e.target.id);
        // Reset any error states when starting to drag
        e.target.classList.remove('bg-danger', 'text-white');
        e.target.classList.add('bg-warning');
    });
});

document.querySelectorAll('.droppable').forEach(target => {
    target.addEventListener('dragover', e => {
        e.preventDefault();
    });

    target.addEventListener('drop', e => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        const expected = target.getAttribute('data-accept');
        const draggableElem = document.getElementById(data);
        
        if (data === expected) {
            target.querySelector('.drop-label').textContent = data;
            draggableElem.style.visibility = 'hidden';
            // Show next button if all are correct (you might want to add this logic)
        } else {
            // Make the draggable element red to show error
            draggableElem.classList.remove('bg-warning');
            draggableElem.classList.add('bg-danger', 'text-white');
        }
    });
});
