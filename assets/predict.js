/* ============================================================
   Frontend Staff Prep — predict-then-reveal widget

   Retrieval practice. The answer is gated behind committing a
   prediction in writing, because reading an explanation you have
   not first tried to produce yourself builds fluency, not storage.

   <div class="predict" data-predict data-key="0002-a">
     <span class="predict-label">Predict</span>
     <p class="predict-prompt">…</p>
     <textarea class="predict-input" placeholder="…"></textarea>
     <button class="predict-btn">Reveal</button>
     <div class="predict-answer" hidden>…</div>
   </div>
   ============================================================ */

(() => {
  "use strict";

  const KEY = "fsp:predictions";

  const read = () => {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); }
    catch { return {}; }
  };
  const write = (v) => {
    try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* private mode */ }
  };

  const saved = read();

  document.querySelectorAll("[data-predict]").forEach((el, i) => {
    const key = el.dataset.key || `p${i}`;
    const input = el.querySelector(".predict-input");
    const btn = el.querySelector(".predict-btn");
    const answer = el.querySelector(".predict-answer");
    if (!input || !btn || !answer) return;

    const sync = () => {
      const empty = input.value.trim().length < 3;
      btn.disabled = empty && answer.hidden;
      if (empty && answer.hidden) btn.textContent = "Write something first";
      else if (answer.hidden) btn.textContent = "Reveal";
    };

    input.addEventListener("input", () => {
      sync();
      saved[key] = input.value;
      write(saved);
    });

    btn.addEventListener("click", () => {
      if (input.value.trim().length < 3) return;
      answer.hidden = false;
      btn.hidden = true;
      input.readOnly = true;
      saved[key] = input.value;
      saved[`${key}:revealed`] = true;
      write(saved);
    });

    // Restore a previous attempt.
    if (key in saved) input.value = saved[key];
    if (saved[`${key}:revealed`]) {
      answer.hidden = false;
      btn.hidden = true;
      input.readOnly = true;
    }
    sync();
  });
})();
