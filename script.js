// script.js
document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Projects data - 
  const projects = [
    {
      id: 'p1',
      title: 'By the Blade',
      thumb: 'images/bythebladebanner.jpg',
      short: 'Isometric hack and slash game with a focus on timed parries',
      long: `<p>Worked on designing and implementing player's actions, state machine, animation timings. Contributed to combat feedbacks with both player and enemy attack VFXs.</p>
             <p><strong>Engine:</strong> Unity • <strong>Role:</strong> Technical Designer, Combat Designer, VFX artist</p>`
    },
    // {
    //   id: 'p2',
    //   title: 'Procedural FX Tests',
    //   thumb: 'images/project2.jpg',
    //   short: 'Realtime particle shaders and trail systems.',
    //   long: `<p>Built GPU-driven ribbon trails, dissolve effects, and procedural textures for slash FX. Focused on performance & artist control.</p>`
    // },
    // {
    //   id: 'p3',
    //   title: 'AI Tactics Prototype',
    //   thumb: 'images/project3.jpg',
    //   short: 'Small AI tactics system for flanking and cover.',
    //   long: `<p>Prototype included behavior trees and lightweight squad coordination for varied combat encounters.</p>`
    // }
  ];

  // Render project cards
  const grid = document.getElementById('projectsGrid');
  function renderProjects(){
    grid.innerHTML = projects.map(p => `
      <article class="card" data-id="${p.id}" tabindex="0" role="button" aria-pressed="false">
        <img src="${p.thumb}" alt="${p.title} thumbnail" loading="lazy">
        <div class="card-body">
          <h4>${p.title}</h4>
          <p>${p.short}</p>
        </div>
      </article>
    `).join('');
    // attach listeners
    grid.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', openCard);
      card.addEventListener('keypress', (e) => { if (e.key === 'Enter') openCard(e); });
    });
  }

  function openCard(e){
    const id = e.currentTarget.dataset.id;
    const p = projects.find(x => x.id === id);
    if (!p) return;
    openModal(p);
  }

  // Modal behavior
  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  function openModal(project){
    modalContent.innerHTML = `
      <h2 id="modalTitle">${project.title}</h2>
      <img src="${project.thumb}" alt="${project.title} image">
      ${project.long}
      <p><em>Close with ESC or the × button.</em></p>
    `;
    modal.setAttribute('aria-hidden', 'false');
    modalClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    modal.setAttribute('aria-hidden', 'true');
    modalContent.innerHTML = '';
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (ev) => {
    if (ev.target === modal) closeModal();
  });
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });

  // initialize
  renderProjects();
});
