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

  let current = 0;
  let timer = null;

  function show(i) {
    current = (i + radios.length) % radios.length;
    radios[current].checked = true;
  }

  function start() {
    stop();
    timer = setInterval(() => show(current + 1), 3500);
  }

  function stop() {
    if (timer) clearInterval(timer);
  }

  radios.forEach((r, i) =>
    r.addEventListener("change", () => {
      current = i;
    }),
  );
  wrap
    .querySelector(".next")
    .addEventListener("click", () => show(current + 1));
  wrap
    .querySelector(".prev")
    .addEventListener("click", () => show(current - 1));
  wrap.addEventListener("mouseenter", stop);
  wrap.addEventListener("mouseleave", start);

  start();
}

// ===== Contact form: EmailJS =====
function initContactForm() {
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
document.addEventListener("DOMContentLoaded", function () {
  initTyped();
  initSlider();
  initContactForm();
});
