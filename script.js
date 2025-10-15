// script.js - interactivity: mobile nav, smooth scroll, simple form validation

document.addEventListener('DOMContentLoaded', function () {
  // mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  navToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    siteNav.classList.toggle('open');
  });

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 60; // offset for sticky header
        window.scrollTo({ top, behavior: 'smooth' });
        // close mobile nav after clicking
        if (siteNav.classList.contains('open')) {
          siteNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // fill year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // basic contact form validation and fake submit
  const contactForm = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    feedback.textContent = '';
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    const service = contactForm.service.value;

    if (!name || !email || !message || !service) {
      feedback.textContent = 'Please complete all required fields.';
      feedback.style.color = '#ffcccb';
      return;
    }

    // simple email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      feedback.textContent = 'Please enter a valid email address.';
      feedback.style.color = '#ffcccb';
      return;
    }

    // Disable submit & show sending state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Simulate network submission (replace with real AJAX / API)
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      contactForm.reset();
      feedback.style.color = '';
      feedback.textContent = 'Thanks — your message was sent. I will respond within 24-48 hours.';
    }, 1100);
  });

  // Accessibility: enable keyboard close for nav when open
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });

});
