/* ==========================================================================
   CONFIGURATION — edit everything here
   ========================================================================== */

const CONFIG = {
  // Link to the video. While empty, the button reads "Video coming soon" and is disabled.
  VIDEO_URL: "",

  // Contact. Leave EMAIL empty to hide it.
  EMAIL: "",
  PORTFOLIO_URL: "https://movuk.me",
  INSTAGRAM: "outdoorscmt", // without the @

  // The question on the first screen.
  QUESTION: "Have you ever felt minuscule in a place so gigantic?", // over 01.jpg

  // One phrase per photo, in page order (the last one has no photo).
  PHRASES: [
    "The feeling of being outside, humbled by the reminder of our size.", // 02.jpg
    "Up here, I am the smallest thing in the frame.",                     // 03.jpg
    "That alpine feeling: just you and the mountains.",                   // 04.jpg
    "Some feelings can't be explained. Maybe they can be filmed.",        // 05.jpg
    "This film is my attempt to bring that feeling home.",                // before the title
  ],
};

/* ==========================================================================
   No need to edit below this line
   ========================================================================== */

(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // --- Texts ---------------------------------------------------------------
  const question = $("[data-question]");
  if (question && CONFIG.QUESTION) question.textContent = CONFIG.QUESTION;

  $$("[data-phrase]").forEach((el) => {
    const text = CONFIG.PHRASES[Number(el.dataset.phrase)];
    if (text) el.textContent = text;
  });

  // --- Video button ----------------------------------------------------------
  const btn = $("[data-video]");
  const url = (CONFIG.VIDEO_URL || "").trim();
  if (btn && url) {
    btn.href = url;
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.removeAttribute("aria-disabled");
    btn.innerHTML = 'Watch the video <span aria-hidden="true">↗</span><span class="visually-hidden"> (opens in a new tab)</span>';
  }

  // --- Contact ---------------------------------------------------------------
  const email = (CONFIG.EMAIL || "").trim();
  const emailItem = $("[data-email-item]");
  const emailLink = $("[data-email]");
  if (email && emailItem && emailLink) {
    emailLink.href = "mailto:" + email;
    emailLink.textContent = email;
    emailItem.hidden = false;
  }

  const portfolio = $("[data-portfolio]");
  if (portfolio && CONFIG.PORTFOLIO_URL) {
    portfolio.href = CONFIG.PORTFOLIO_URL;
    portfolio.textContent = CONFIG.PORTFOLIO_URL.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }

  const insta = $("[data-instagram]");
  const handle = (CONFIG.INSTAGRAM || "").replace(/^@/, "").trim();
  if (insta && handle) {
    insta.href = "https://www.instagram.com/" + handle + "/";
    insta.textContent = "@" + handle;
  }

  // --- Motion ----------------------------------------------------------------
  // Skipped entirely for reduced motion or old browsers: the photos simply
  // scroll one after another and all text stays visible.
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  const root = document.documentElement;

  // Photo fade: the photo whose block crosses the middle of the screen is
  // "active". Earlier photos stay opaque underneath, so the next one fades in
  // on top of them (and fades out again when scrolling back up).
  const story = $(".story");
  const frames = $$(".story .frame");
  if (story && frames.length) {
    let current = null;
    const update = () => {
      const vh = window.innerHeight;
      const mid = vh / 2;
      let active = -1;
      frames.forEach((f, i) => {
        const r = f.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) active = i;
      });
      // Once the end of the photos comes into view, fade back to paper.
      if (story.getBoundingClientRect().bottom < vh * 0.9) active = -1;
      if (active === current) return;
      current = active;
      frames.forEach((f, i) => {
        f.classList.toggle("is-active", i === active);
        f.classList.toggle("is-under", active > -1 && i < active);
      });
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; update(); });
    };

    root.classList.add("no-transition", "js-fade");
    update();
    setTimeout(() => root.classList.remove("no-transition"), 60);

    // Once the opening photo is in, fetch the rest so each fade has its photo ready.
    const preload = () => frames.forEach((f) => {
      const img = f.querySelector("img");
      if (img && img.loading === "lazy") img.loading = "eager";
    });
    if (document.readyState === "complete") preload();
    else window.addEventListener("load", preload);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }

  // Gentle fade-in for the text after the photos.
  const items = $$(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  // Anything already on screen is shown right away, so nothing flickers.
  const vh = window.innerHeight;
  items.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < vh && r.bottom > 0) el.classList.add("is-visible");
    else observer.observe(el);
  });

  root.classList.add("js-reveal");
})();
