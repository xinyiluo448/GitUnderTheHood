$(document).ready(function () {
	const correctAnswer = "Blob";

	$(".option-btn").on("click", function () {
		// Reset all buttons
		$(".option-btn")
			.removeClass("btn-success btn-danger")
			.addClass("btn-outline-dark");

		const selected = $(this).data("value");

		if (selected === correctAnswer) {
			console.log("correct");
			$(this).removeClass("btn-outline-dark").addClass("btn-success");
			$("#next-btn").removeClass("d-none");
		} else {
			$(this).removeClass("btn-outline-dark").addClass("btn-danger");
			$("#next-btn").addClass("d-none");
		}
	});
});