/**
 * Cyberpunk Portfolio — script.js
 * Hamburger menu, navbar scroll, scroll reveal, stagger
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Hamburger Menu ── */
  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (hamburger && mobileDrawer) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('active');
      mobileDrawer.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open);
      // prevent body scroll when drawer open
      document.body.style.overflow = open ? 'hidden' : '';
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileDrawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Navbar scroll border ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── Smooth scroll for all anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Intersection Observer — Scroll Reveal ── */
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

  // Observe all .reveal elements
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Stagger: skills grid cards
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = `${(i % 4) * 0.07}s`;
    observer.observe(card);
  });

  // Stagger: project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = `${(i % 3) * 0.1}s`;
    observer.observe(card);
  });

  // Stagger: contact cards
  const contactCards = document.querySelectorAll('.contact-card');
  contactCards.forEach((card, i) => {
    card.classList.add('reveal');
    card.style.transitionDelay = `${i * 0.08}s`;
    observer.observe(card);
  });

  /* ── Active nav link highlight on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.style.color = '');
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.style.color = '#00F0FF';
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(sec => sectionObserver.observe(sec));
});
