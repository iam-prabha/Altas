// ======================================
// RAG Teaching Workspace — Quiz Widget
// Reusable quiz component for lessons
// ======================================

(function () {
  'use strict';

  function initQuiz(container) {
    const options = container.querySelectorAll('.quiz-option');
    const feedback = container.querySelector('.quiz-feedback');
    const correctIdx = parseInt(container.dataset.correct, 10);
    let answered = false;

    options.forEach(function (btn, idx) {
      btn.addEventListener('click', function () {
        if (answered) return;
        answered = true;

        // Disable all buttons
        options.forEach(function (b) { b.disabled = true; });

        // Mark correct / wrong
        if (idx === correctIdx) {
          btn.classList.add('correct');
          feedback.className = 'quiz-feedback correct show';
          feedback.textContent = feedback.dataset.correct || '✓ Correct!';
        } else {
          btn.classList.add('wrong');
          options[correctIdx].classList.add('correct');
          feedback.className = 'quiz-feedback wrong show';
          feedback.textContent = feedback.dataset.wrong || '✗ Not quite. ' + (feedback.dataset.explain || '');
        }
      });
    });
  }

  // Auto-init all quizzes on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    var quizzes = document.querySelectorAll('.quiz');
    quizzes.forEach(initQuiz);
  });
})();
