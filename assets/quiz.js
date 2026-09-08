/* ============================================================
   Frontend Staff Prep — reusable quiz + scoring widget
   Used by every lesson. Progressive enhancement over markup:

   <div class="quiz" data-quiz data-lesson="0001">
     <div class="q" data-track="rendering" data-answer="1">
       <span class="q-num">Q1 · Rendering</span>
       <div class="q-stem">…</div>
       <ul class="opts">
         <li><button class="opt">…</button></li>  <!-- index 0 -->
         <li><button class="opt">…</button></li>  <!-- index 1 = answer -->
       </ul>
       <div class="why" hidden>…</div>
     </div>
   </div>

   Optional score panel:
   <div class="score" data-score>
     <div class="track" data-track-row="rendering" data-track-label="Rendering">…</div>
     <p class="verdict" data-verdict></p>
   </div>

   Answers are chosen once and locked — this is retrieval practice, not a
   guessing game. Results persist to localStorage so a session can be resumed.
   ============================================================ */

(() => {
  "use strict";

  const store = {
    read(key) {
      try { return JSON.parse(localStorage.getItem(key) || "{}"); }
      catch { return {}; }
    },
    write(key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* private mode */ }
    },
  };

  document.querySelectorAll("[data-quiz]").forEach(setupQuiz);

  function setupQuiz(quiz) {
    const lessonId = quiz.dataset.lesson || "quiz";
    const storeKey = `fsp:${lessonId}`;
    const saved = store.read(storeKey);
    const questions = [...quiz.querySelectorAll(".q")];

    questions.forEach((q, i) => {
      const id = q.dataset.qid || String(i);
      const answer = Number(q.dataset.answer);
      const opts = [...q.querySelectorAll(".opt")];
      const why = q.querySelector(".why");

      opts.forEach((opt, choice) => {
        opt.addEventListener("click", () => {
          if (q.dataset.state) return;          // already answered — locked
          resolve(q, opts, why, choice, answer);
          saved[id] = choice;
          store.write(storeKey, saved);
          report(quiz, questions, saved);
        });
      });

      // Restore a previous attempt.
      if (id in saved) resolve(q, opts, why, saved[id], answer);
    });

    report(quiz, questions, saved);
    wireCopyButton(quiz, questions, saved);
  }

  function resolve(q, opts, why, choice, answer) {
    const right = choice === answer;
    q.dataset.state = right ? "correct" : "wrong";
    opts.forEach((opt, i) => {
      opt.disabled = true;
      if (i === answer) opt.dataset.mark = "correct";
      else if (i === choice) opt.dataset.mark = "wrong";
    });
    if (why) why.hidden = false;
  }

  /* --- Scoring, grouped by track --- */

  function tally(questions, saved) {
    const tracks = new Map();
    questions.forEach((q, i) => {
      const id = q.dataset.qid || String(i);
      const track = q.dataset.track || "general";
      if (!tracks.has(track)) tracks.set(track, { got: 0, total: 0, answered: 0 });
      const t = tracks.get(track);
      t.total += 1;
      if (id in saved) {
        t.answered += 1;
        if (saved[id] === Number(q.dataset.answer)) t.got += 1;
      }
    });
    return tracks;
  }

  function report(quiz, questions, saved) {
    const panel = quiz.querySelector("[data-score]")
      || document.querySelector(`[data-score][data-for="${quiz.dataset.lesson}"]`)
      || document.querySelector("[data-score]");
    if (!panel) return;

    const tracks = tally(questions, saved);
    let got = 0, total = 0, answered = 0;

    tracks.forEach((t, name) => {
      got += t.got; total += t.total; answered += t.answered;
      const row = panel.querySelector(`[data-track-row="${name}"]`);
      if (!row) return;
      const scoreEl = row.querySelector(".track-score");
      const barEl = row.querySelector(".bar > i");
      if (scoreEl) scoreEl.textContent = `${t.got} / ${t.total}`;
      if (barEl) barEl.style.width = `${(t.got / t.total) * 100}%`;
    });

    const verdict = panel.querySelector("[data-verdict]");
    if (!verdict) return;

    if (answered < total) {
      verdict.textContent =
        `${answered} of ${total} answered. Finish the set — a partial score can't calibrate anything.`;
      return;
    }

    const weakest = [...tracks.entries()]
      .sort((a, b) => (a[1].got / a[1].total) - (b[1].got / b[1].total))
      .slice(0, 2)
      .map(([name]) => label(panel, name));

    verdict.innerHTML =
      `<strong>${got} / ${total}.</strong> ${band(got / total)} ` +
      `Weakest tracks: <strong>${weakest.join("</strong> and <strong>")}</strong>. ` +
      `Copy your results below and paste them back to Claude — that sets where lesson 2 starts.`;
  }

  function label(panel, name) {
    const row = panel.querySelector(`[data-track-row="${name}"]`);
    return row?.dataset.trackLabel || row?.querySelector(".track-name")?.textContent || name;
  }

  function band(ratio) {
    if (ratio >= 0.85) return "The rust is cosmetic — go almost straight to interview reps.";
    if (ratio >= 0.65) return "Solid core with real gaps. Targeted repair, then reps.";
    if (ratio >= 0.40) return "The fundamentals are intact; the last two years are missing. Expected, and fixable.";
    return "Rebuild before reps. This is a starting point, not a verdict.";
  }

  /* --- Copyable summary, so results can be pasted back into a session --- */

  function wireCopyButton(quiz, questions, saved) {
    const btn = document.querySelector("[data-copy-results]");
    if (!btn) return;

    btn.addEventListener("click", async () => {
      const tracks = tally(questions, saved);
      const missed = questions
        .map((q, i) => [q.dataset.qid || String(i), q])
        .filter(([id, q]) => id in saved && saved[id] !== Number(q.dataset.answer))
        .map(([id]) => `Q${Number(id) + 1}`);

      const lines = [`Calibration results (lesson ${quiz.dataset.lesson}):`];
      tracks.forEach((t, name) => {
        lines.push(`- ${label(document.querySelector("[data-score]"), name)}: ${t.got}/${t.total}`);
      });
      lines.push(`Missed: ${missed.length ? missed.join(", ") : "none"}`);

      const text = lines.join("\n");
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = "Copied — paste it into Claude";
      } catch {
        const ta = document.querySelector("[data-results-fallback]");
        if (ta) { ta.hidden = false; ta.value = text; ta.select(); }
        btn.textContent = "Copy failed — select the text below";
      }
    });
  }
})();
