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
      long: `<p>I worked on designing and implementing player's actions, state machine, animation timings. Contributed to combat feedbacks with both player and enemy attack VFXs.</p>
             <p><strong>Engine:</strong> Unity • <strong>Role:</strong> Technical Designer, Combat Designer, VFX artist</p>`,
      itchUrl: 'https://mooncako.itch.io/by-the-blade',
      design: {
        description: "Designed and implemented the fundamentals of player combat, from basic movement and attacking to more complex parry and empowered attack systems. In later stage of development, I worked with another technical designer to tune and improve the overall feedback of combat through camerashake, stopframes and other VFXs.",
        videos: [
          {
            src: 'videos/Attacking.mp4',
            title: 'Basic Player Combat',
            description: 'Showcasing basic attack and parry system'
          },
          {
            src: 'videos/Execution.mp4',
            title: 'Muso Attack',
            description: 'Empowered attack the player can use after a series of successful parries'
          }
        ]
      },
      vfx: {
        description: 'Worked on VFXs for both the player and enemy.',
        videos: [
          {
            src: 'videos/slash.mp4',
            title: 'Player Slash VFX',
            description: "Slash for player's three hit combo"
          },
          {
            src: 'videos/Afterimage.mp4',
            title: 'Afterimage VFX',
            description: "Afterimage for player's muso state"
          },
          {
            src: 'videos/fireball.mp4',
            title: 'Fireball VFX',
            description: "Fireball attack for the paper lantern enemy"
          },
          {
            src: 'videos/Explosion.mp4',
            title: 'Fireball Explosion VFX',
            description: "Fireball explosion on impact"
          },
          {
            src: 'videos/Slam.mp4',
            title: 'Slam Attack VFX',
            description: "Slam attack for the boss Shadow"
          } 
        ]
      }
    },
    {
      id: 'p2',
      title: 'Beats and Bolts',
      thumb: 'images/beatsandboltsbanner.jpg',
      short: 'Rhythm boss rush game where the player needs to attack and evade on beat in a circular grid-based arena.',
      long: `<p>Worked on Boss skill design and state machine, circular grid-based arena design and implementation.</p>
             <p><strong>Engine:</strong> Unity • <strong>Role:</strong> Programmer, Designer</p>`,
      itchUrl: 'https://noggindecay.itch.io/beats-and-bolts',
      design: {
        description: "The boss will punish the player if they are acting off-beat, and uses a decision tree evaluating player's position and action to determine its behavior.",
        videos: [
          {
            src: 'videos/Full.mp4',
            title: 'Boss Behavior and Circular Arena',
            description: ''
          },
          {
            src: 'videos/rotate.mp4',
            title: 'Rotating Turret',
            description: 'Will rotate in either direction and fire multiple times'
          },
          {
            src: 'videos/steam.mp4',
            title: 'Steam Attack',
            description: 'Pushes players away from the center and damages them'
          },
          {
            src: 'videos/spike.mp4',
            title: 'Spike Attack',
            description: 'Attack three columns centered around the player'
          },
          {
            src: 'videos/nails.mp4',
            title: 'Junk Drop',
            description: 'Leaves nails on the ground that damage players when stepped on or melting metal that lingers for longer and deals damage over time if player stays in the tile'
          }
        ]
      }
    },
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
    const itchLinkHtml = project.itchUrl ? `
      <div class="project-links">
        <a href="${project.itchUrl}" target="_blank" rel="noopener noreferrer" class="itch-link">
          🎮 Play on itch.io
        </a>
      </div>
    ` : '';

    // Generate tabs HTML if either design or vfx sections exist
    const hasDesign = project.design && project.design.videos.length > 0;
    const hasVfx = project.vfx && project.vfx.videos.length > 0;

    const tabsHtml = (hasDesign || hasVfx) ? `
      <div class="project-tabs">
        <div class="tab-buttons">
          ${hasDesign ? `<button class="tab-button active" data-tab="design">Design</button>` : ''}
          ${hasVfx ? `<button class="tab-button ${!hasDesign ? 'active' : ''}" data-tab="vfx">VFX</button>` : ''}
        </div>

        <div class="tab-content">
          ${hasDesign ? `
            <div class="tab-panel ${hasDesign ? 'active' : ''}" id="design-panel">
              <p>${project.design.description}</p>
              <div class="video-grid">
                ${project.design.videos.map(video => `
                  <div class="video-item">
                    <video preload="metadata" autoplay loop muted>
                      <source src="${video.src}" type="video/mp4">
                      Your browser does not support the video tag.
                    </video>
                    <div class="video-info">
                      <h4>${video.title}</h4>
                      <p>${video.description}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${hasVfx ? `
            <div class="tab-panel ${!hasDesign ? 'active' : ''}" id="vfx-panel">
              <p>${project.vfx.description}</p>
              <div class="video-grid">
                ${project.vfx.videos.map(video => `
                  <div class="video-item">
                    <video preload="metadata" autoplay loop muted>
                      <source src="${video.src}" type="video/mp4">
                      Your browser does not support the video tag.
                    </video>
                    <div class="video-info">
                      <h4>${video.title}</h4>
                      <p>${video.description}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    ` : '';

    modalContent.innerHTML = `
      <h2 id="modalTitle">${project.title}</h2>
      <img src="${project.thumb}" alt="${project.title} image">
      ${project.long}
      ${tabsHtml}
      ${itchLinkHtml}
      <p><em>Close with ESC or the × button.</em></p>
    `;

    // Add tab functionality
    if (hasDesign || hasVfx) {
      setupTabs();
    }

    modal.setAttribute('aria-hidden', 'false');
    modalClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function setupTabs() {
    const tabButtons = modalContent.querySelectorAll('.tab-button');
    const tabPanels = modalContent.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Add active class to clicked button and corresponding panel
        button.classList.add('active');
        const targetPanel = modalContent.querySelector(`#${targetTab}-panel`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
      });
    });
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
