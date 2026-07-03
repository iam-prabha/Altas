/**
 * quiz.js – Reusable quiz widget for TypeScript lessons.
 *
 * Usage:
 *   <div class="quiz-question" data-answer="B">
 *     <p>What colour is the sky?</p>
 *     <label class="quiz-option"><input type="radio" name="q1" value="A"> Green</label>
 *     <label class="quiz-option"><input type="radio" name="q1" value="B"> Blue</label>
 *     <label class="quiz-option"><input type="radio" name="q1" value="C"> Red</label>
 *   </div>
 *
 * On selection, highlights correct/incorrect and shows feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.quiz-question').forEach((question) => {
    const answer = question.dataset.answer;
    const options = question.querySelectorAll('.quiz-option');

    options.forEach((opt) => {
      const radio = opt.querySelector('input[type="radio"]');
      if (!radio) return;

      radio.addEventListener('change', () => {
        // Clear previous state
        options.forEach((o) => {
          o.classList.remove('selected', 'correct', 'incorrect');
        });

        const isCorrect = radio.value === answer;
        opt.classList.add(isCorrect ? 'correct' : 'incorrect');

        // Show existing feedback or create one
        let feedback = question.querySelector('.quiz-feedback');
        if (!feedback) {
          feedback = document.createElement('div');
          feedback.className = 'quiz-feedback';
          question.appendChild(feedback);
        }
        feedback.textContent = isCorrect
          ? '✓ Correct!'
          : '✗ Not quite. Try again.';

        if (isCorrect) {
          options.forEach((o) => { o.style.pointerEvents = 'none'; });
        }
      });
    });
  });
});
