// Utility: select helpers
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// Footer year
(function setYear(){
	const yearEl = $('#year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Mobile navigation
(function mobileNav(){
	const toggle = $('.nav-toggle');
	const nav = $('#nav');
	if (!toggle || !nav) return;
	function setExpanded(expanded){
		toggle.setAttribute('aria-expanded', String(expanded));
		nav.classList.toggle('open', expanded);
	}
	toggle.addEventListener('click', () => {
		const expanded = toggle.getAttribute('aria-expanded') === 'true';
		setExpanded(!expanded);
	});
	// Close on link click (mobile)
	$$('#nav a').forEach(a => a.addEventListener('click', () => setExpanded(false)));
})();

// Smooth anchor scrolling with offset for sticky header
(function smoothAnchors(){
	const header = $('.header');
	const offset = () => (header ? header.offsetHeight + 8 : 0);
	$$('a[href^="#"]').forEach(link => {
		link.addEventListener('click', (e) => {
			const id = link.getAttribute('href');
			if (!id || id === '#') return;
			const target = $(id);
			if (!target) return;
			e.preventDefault();
			const top = target.getBoundingClientRect().top + window.scrollY - offset();
			window.scrollTo({ top, behavior: 'smooth' });
		});
	});
})();

// Reveal on scroll using IntersectionObserver
(function revealOnScroll(){
	const items = $$('.reveal');
	if (!items.length) return;
	const obs = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				obs.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12 });
	items.forEach(el => obs.observe(el));
})();

// Contact form validation & demo submission
(function contactForm(){
	const form = $('#contactForm');
	const status = $('#formStatus');
	if (!form || !status) return;
	function showStatus(message, ok){
		status.hidden = false;
		status.textContent = message;
		status.style.color = ok ? 'rgb(22 163 74)' : '#B42318';
	}
	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const data = new FormData(form);
		const name = String(data.get('name')||'').trim();
		const email = String(data.get('email')||'').trim();
		const message = String(data.get('message')||'').trim();
		if (!name || !email || !message) {
			showStatus('Please fill in all required fields.', false);
			return;
		}
		// Simple email check
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			showStatus('Please enter a valid email address.', false);
			return;
		}
		// Simulate async submission
		showStatus('Sending…', true);
		await new Promise(r => setTimeout(r, 900));
		showStatus('Thanks! We will reach out within 1 business day.', true);
		form.reset();
	});
})();
