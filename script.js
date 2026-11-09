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

// ===== Run everything once the page is ready =====
// Each feature is wrapped so an error in one can never stop the others.
document.addEventListener("DOMContentLoaded", function () {
  [initMenu, initTyped, initSlider, initContactForm].forEach(function (fn) {
    try {
      fn();
    } catch (err) {
      console.error(fn.name + " failed:", err);
    }
  });
});
