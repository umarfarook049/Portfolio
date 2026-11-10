// ===== Mobile menu dropdown =====
function initMenu() {
  const btn = document.querySelector(".menu-icon");
  const menu = document.querySelector("nav .right");
  if (!btn || !menu) return;

  function setOpen(open) {
    menu.classList.toggle("active", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.innerHTML = open ? "&#10005;" : "&#9776;";
  }

  btn.addEventListener("click", function () {
    setOpen(!menu.classList.contains("active"));
  });

  // close after tapping a link
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      setOpen(false);
    });
  });

  // close when tapping outside
  document.addEventListener("click", function (e) {
    if (!menu.contains(e.target) && !btn.contains(e.target)) setOpen(false);
  });

  // reset when going back to desktop width
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) setOpen(false);
  });
}

// ===== Typed.js: hero text animation =====
function initTyped() {
  if (typeof Typed === "undefined" || !document.getElementById("element"))
    return;

  new Typed("#element", {
    strings: [
      "Web Developer",
      "Data Scientist",
      "Web Designer",
      "Video Editor",
    ],
    typeSpeed: 50,
  });
}

// ===== Certificates slider: arrows + autoplay =====
function initSlider() {
  const radios = document.querySelectorAll('#slider input[type="radio"]');
  const wrap = document.querySelector(".slider-wrap");
  if (!radios.length || !wrap) return;

  const nextBtn = wrap.querySelector(".next");
  const prevBtn = wrap.querySelector(".prev");
  let current = 0;
  let timer = null;

  function show(i) {
    current = (i + radios.length) % radios.length;
    radios[current].checked = true;
  }

  function stop() {
    if (timer) clearInterval(timer);
  }

  function start() {
    stop();
    timer = setInterval(function () {
      show(current + 1);
    }, 3500);
  }

  radios.forEach(function (r, i) {
    r.addEventListener("change", function () {
      current = i;
    });
  });

  if (nextBtn)
    nextBtn.addEventListener("click", function () {
      show(current + 1);
    });
  if (prevBtn)
    prevBtn.addEventListener("click", function () {
      show(current - 1);
    });

  wrap.addEventListener("mouseenter", stop);
  wrap.addEventListener("mouseleave", start);

  start();
}

// ===== Contact form: EmailJS =====
function initContactForm() {
  // Paste your own values from the EmailJS dashboard
  const PUBLIC_KEY = "BJZbwoe2t-qrYCXjV";
  const SERVICE_ID = "service_zhvwxvg";
  const TEMPLATE_ID = "template_rmoapxo";

  const form = document.getElementById("contact-form");
  const btn = document.getElementById("contact-btn");
  const status = document.getElementById("form-status");
  if (!form || typeof emailjs === "undefined") return;

  emailjs.init({ publicKey: PUBLIC_KEY });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = "Sending...";
    status.textContent = "";

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form)
      .then(function () {
        status.textContent =
          "Thank you! Your message has been sent. I will reply soon.";
        status.className = "text-center form-success";
        form.reset();
      })
      .catch(function (err) {
        console.error("EmailJS error:", err);
        status.textContent =
          "Could not send: " + (err.text || err.message || "unknown error");
        status.className = "text-center form-error";
      })
      .finally(function () {
        btn.disabled = false;
        btn.innerHTML = "Send Mail to <b>Umar</b>";
      });
  });
}

// ===== Visual effects: reveal on scroll, progress bar, active link, back-to-top =====
function initEffects() {
  document.documentElement.classList.add("js");

  // reveal sections as they scroll into view
  const targets = document.querySelectorAll(
    "main > section:not(.cert-section), footer",
  );
  targets.forEach(function (el) {
    el.classList.add("reveal");
  });
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    targets.forEach(function (el) {
      io.observe(el);
    });
  } else {
    targets.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // progress bar + back-to-top button
  const bar = document.createElement("div");
  bar.id = "scroll-progress";
  document.body.appendChild(bar);

  const topBtn = document.createElement("button");
  topBtn.id = "back-to-top";
  topBtn.type = "button";
  topBtn.setAttribute("aria-label", "Back to top");
  topBtn.innerHTML = "&#8593;";
  topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(topBtn);

  const nav = document.querySelector("nav");
  const links = document.querySelectorAll('nav .right a[href^="#"]');
  const anchors = Array.from(links).map(function (a) {
    return document.querySelector(a.getAttribute("href"));
  });
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    topBtn.classList.toggle("show", y > 400);
    if (nav) nav.classList.toggle("scrolled", y > 10);

    let current = 0;
    anchors.forEach(function (el, i) {
      if (el && el.getBoundingClientRect().top <= 140) current = i;
    });
    links.forEach(function (a, i) {
      a.classList.toggle("active", i === current);
    });
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true },
  );
  onScroll();
}

// ===== Run everything once the page is ready =====
// Each feature is wrapped so an error in one can never stop the others.
document.addEventListener("DOMContentLoaded", function () {
  [initMenu, initTyped, initSlider, initContactForm, initEffects].forEach(
    function (fn) {
      try {
        fn();
      } catch (err) {
        console.error(fn.name + " failed:", err);
      }
    },
  );
});
