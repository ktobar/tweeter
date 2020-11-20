//input character counter
$(document).ready(function() {
  // --- our code goes here ---
  const countVal = 140;
  const counter = $('.counter');
  counter.text(countVal);

  $("#tweet-text").on("input", function() {
    const charCount = $(this).val().length;
    counter.html(countVal - charCount);

    if (countVal < charCount) {
      counter.css('color', 'red');
    } else {
      counter.css('color', 'black');
    }
  });

});