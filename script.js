// 1. Portfolio Data (Customized for IMRANICK / behance.net/imrankite)
    const portfolioProjects = [
      {
        id: 'proj-1',
        category: 'design',
        badge: 'Graphic Design • Brand & Logo',
        title: 'MODERN NETWORK & SOLAR PULSE® Brand Identity System',
        duration: '10 Days',
        metric: 'Featured on Behance @imrankite',
        tools: 'Adobe Illustrator • Photoshop • Vector Grid',
        accent: 'from-[#FF5500]/40 via-[#18181E] to-black',
        summary: 'Futuristic vector network logo architecture, custom brand typography, and matte-black & vibrant-orange packaging suite.'
      },
      {
        id: 'proj-2',
        category: 'editing',
        badge: 'Video Editing • Commercial Reel',
        title: 'APEX RUNNER — High-Speed Commercial Cut & VFX',
        duration: '4K 60FPS • 01:15',
        metric: '4.8M Organic Views',
        tools: 'Premiere Pro • After Effects • DaVinci Resolve',
        accent: 'from-[#FF7733]/35 via-[#121216] to-black',
        summary: 'Frame-accurate speed ramping, custom rotoscoped motion trails, spatial whoosh sound design, and punchy orange-carbon cinema LUT grading.'
      },
      {
        id: 'proj-3',
        category: 'design',
        badge: 'Graphic Design • Social & 3D Type',
        title: 'ATTRACTIVE SOCIAL MEDIA BANNER & 3D Text Suite',
        duration: '1 Week',
        metric: '3.4x Feed CTR Lift',
        tools: 'Photoshop • Illustrator • 3D Layer Styles',
        accent: 'from-white/15 via-[#18181E] to-[#FF5500]/30',
        summary: 'High-impact vector social media banner templates and 3D editable text effects engineered for conversion-focused digital campaigns.'
      },
      {
        id: 'proj-4',
        category: 'editing',
        badge: 'Video Editing • YouTube Documentary',
        title: 'INSIDE THE HYPERCAR FACTORY — 28-Min Retention Edit',
        duration: '4K • 28:40',
        metric: '74% Avg View Duration',
        tools: 'Premiere Pro • After Effects • Audition',
        accent: 'from-[#FF5500]/30 via-black to-[#272730]',
        summary: 'Built custom 3D blueprint motion explainers, multi-cam interview pacing, and high-CTR thumbnail packaging that drove 2.9M views.'
      },
      {
        id: 'proj-5',
        category: 'design',
        badge: 'Graphic Design • Print & Corporate Kit',
        title: 'EXECUTIVE PRINT SUITE — Presentation Folder, Flyer & Bi-Fold',
        duration: '10 Days',
        metric: 'Print-Ready CMYK 300DPI',
        tools: 'Illustrator • InDesign • Photoshop',
        accent: 'from-[#FF5500]/35 via-[#141418] to-black',
        summary: 'Cohesive corporate collateral system featuring custom presentation folders, business cards, bi-fold brochures, and promotional flyers.'
      },
      {
        id: 'proj-6',
        category: 'editing',
        badge: 'Video Editing • Short-Form Campaign',
        title: 'CREATOR VAULT — 30 Viral Reels & Kinetic Captions Pack',
        duration: '9:16 Vertical • 30 Clips',
        metric: '19.2M Combined Plays',
        tools: 'After Effects • Premiere Pro',
        accent: 'from-white/10 via-[#18181E] to-[#FF5500]/40',
        summary: 'Dynamic motion-tracked captions, custom sound effects mastering, and seamless hook transitions engineered for TikTok and Instagram Reels.'
      }
    ];

    let activeFilter = 'all';
    let selectedServiceForModal = 'Graphic Design';

    const portfolioGrid = document.getElementById('portfolioGrid');

    function renderPortfolioGrid() {
      const filtered = activeFilter === 'all'
        ? portfolioProjects
        : portfolioProjects.filter(item => item.category === activeFilter);

      portfolioGrid.innerHTML = filtered.map(proj => `
        <article class="bento-card p-5 flex flex-col justify-between group cursor-pointer" data-project-id="${proj.id}">
          <div>
            <!-- Visual Preview Banner -->
            <div class="rounded-3xl bg-gradient-to-br ${proj.accent} border border-white/10 p-5 h-48 flex flex-col justify-between relative overflow-hidden">
              <div class="flex items-center justify-between relative z-10">
                <span class="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-[#FF7733] border border-[#FF5500]/30">
                  ${proj.badge}
                </span>
                <span class="w-8 h-8 rounded-full bg-[#FF5500] text-white flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform">
                  ↗
                </span>
              </div>
              <div class="relative z-10">
                <span class="text-[11px] font-mono text-gray-300 bg-black/50 px-2.5 py-1 rounded-full">${proj.metric}</span>
              </div>
              <div class="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-[#FF5500]/20 blur-xl group-hover:bg-[#FF5500]/40 transition-all"></div>
            </div>

            <!-- Copy -->
            <h3 class="font-display font-bold text-lg text-white mt-4 group-hover:text-[#FF7733] transition-colors">
              ${proj.title}
            </h3>
            <p class="text-xs text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
              ${proj.summary}
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span class="text-gray-400 font-mono truncate max-w-[70%]">${proj.tools}</span>
            <span class="text-[#FF5500] font-semibold">Inspect →</span>
          </div>
        </article>
      `).join('');

      document.querySelectorAll('[data-project-id]').forEach(card => {
        card.addEventListener('click', () => {
          const projId = card.getAttribute('data-project-id');
          openProjectModal(projId);
        });
      });
    }

    // Filter Buttons
    document.querySelectorAll('.work-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.getAttribute('data-filter');
        document.querySelectorAll('.work-filter-btn').forEach(b => {
          b.className = 'work-filter-btn px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-gray-400 hover:text-white transition-all';
        });
        btn.className = 'work-filter-btn px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#FF5500] text-white transition-all';
        renderPortfolioGrid();
      });
    });

    // 2. Hero Showreel Canvas Animation
    const canvas = document.getElementById('heroShowreelCanvas');
    const ctx = canvas.getContext('2d');
    let heroPlaying = true;
    let heroMode = 'video';
    let tick = 0;

    function resizeHeroCanvas() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = Math.max(300, rect.width);
      canvas.height = Math.max(220, rect.height);
    }

    function drawHeroCanvas() {
      if (heroPlaying) {
        tick += 0.035;
      }
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (heroMode === 'video') {
        const barCount = 28;
        const spacing = w / (barCount + 4);
        for (let i = 0; i < barCount; i++) {
          const wave = Math.sin(tick * 2 + i * 0.45) * 0.5 + 0.5;
          const barH = 18 + wave * (h * 0.42);
          const x = spacing * (i + 2);
          const y = (h - barH) / 2;
          ctx.fillStyle = i % 3 === 0 ? '#FF5500' : (i % 2 === 0 ? 'rgba(255,255,255,0.22)' : 'rgba(255,119,51,0.55)');
          ctx.beginPath();
          ctx.roundRect(x, y, Math.max(4, spacing * 0.55), barH, 99);
          ctx.fill();
        }
        const pct = ((Math.sin(tick * 0.5) + 1) / 2) * 75 + 15;
        document.getElementById('heroScrubFill').style.width = pct.toFixed(0) + '%';
        const sec = Math.floor((pct / 100) * 30);
        document.getElementById('heroTimecode').textContent = `00:${sec < 10 ? '0' + sec : sec} / 00:30`;
      } else {
        const cx = w / 2;
        const cy = h / 2;
        for (let r = 1; r <= 3; r++) {
          ctx.strokeStyle = r === 2 ? '#FF5500' : 'rgba(255,255,255,0.18)';
          ctx.lineWidth = r === 2 ? 3 : 1.5;
          ctx.beginPath();
          ctx.arc(cx + Math.cos(tick + r) * 14, cy + Math.sin(tick + r) * 10, r * 34, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      requestAnimationFrame(drawHeroCanvas);
    }

    document.getElementById('heroCanvasToggleBtn').addEventListener('click', () => {
      heroPlaying = !heroPlaying;
      document.getElementById('heroCanvasToggleBtn').textContent = heroPlaying ? 'Pause Preview' : 'Resume Preview';
    });

    document.getElementById('heroModeVideo').addEventListener('click', () => {
      heroMode = 'video';
      document.getElementById('heroModeVideo').className = 'px-3 py-1 rounded-full text-xs font-semibold bg-[#FF5500] text-white transition-all';
      document.getElementById('heroModeDesign').className = 'px-3 py-1 rounded-full text-xs font-semibold text-gray-400 hover:text-white transition-all';
      document.getElementById('heroCanvasTitle').textContent = 'IMRANICK_REEL_2026.PRPROJ';
      document.getElementById('heroLayerLabel').textContent = 'Track 01: Color Grade + Speed Ramp';
    });

    document.getElementById('heroModeDesign').addEventListener('click', () => {
      heroMode = 'design';
      document.getElementById('heroModeDesign').className = 'px-3 py-1 rounded-full text-xs font-semibold bg-[#FF5500] text-white transition-all';
      document.getElementById('heroModeVideo').className = 'px-3 py-1 rounded-full text-xs font-semibold text-gray-400 hover:text-white transition-all';
      document.getElementById('heroCanvasTitle').textContent = 'IMRANICK_BRAND_V4.AI';
      document.getElementById('heroLayerLabel').textContent = 'Artboard 01: Vector Grid + Pantone Orange';
    });

    document.getElementById('heroScrubBar').addEventListener('click', (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = Math.max(0.05, Math.min(0.98, (e.clientX - rect.left) / rect.width));
      tick += ratio * 3;
      document.getElementById('heroScrubFill').style.width = Math.round(ratio * 100) + '%';
    });

    // 3. Sybiosme-Inspired 10-Day Sprint Calendar Milestones
    const dayMilestoneData = {
      '1': {
        title: 'Day 1 (Mon, Oct 26) — Step 01: You Share the Essentials',
        desc: 'Complete a simple 5-minute questionnaire sharing your brand goals, target audience, and raw footage or design assets.'
      },
      '4': {
        title: 'Day 4 (Thu, Oct 29) — Step 02: First Design & Assembly Cut',
        desc: 'You discover a polished first brand identity concept or rough video narrative cut so you can give tangible feedback effortlessly.'
      },
      '7': {
        title: 'Day 7 (Sun, Nov 1) — Step 03: Motion VFX, Color Grade & Revisions',
        desc: 'We apply custom DaVinci Resolve LUTs, After Effects kinetic typography, spatial sound design, and fine-tune every detail.'
      },
      '10': {
        title: 'Day 10 (Wed, Nov 4) — Step 04: Final Master Delivery & Ownership',
        desc: 'Your 4K 60FPS video masters and print/digital design source files (AI, PSD, Figma, PRPROJ) are delivered with 100% ownership.'
      }
    };

    document.querySelectorAll('.day-milestone-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const step = btn.getAttribute('data-day-step');
        const info = dayMilestoneData[step];
        document.querySelectorAll('.day-milestone-btn').forEach(b => {
          b.className = 'day-milestone-btn p-4 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-left transition-all';
        });
        btn.className = 'day-milestone-btn p-4 rounded-3xl bg-[#FF5500] text-white text-left transition-all shadow-lg shadow-[#FF5500]/30';
        document.getElementById('dayReadoutTitle').textContent = info.title;
        document.getElementById('dayReadoutDesc').textContent = info.desc;
      });
    });

    // 4. Graphic Design Interactive Inspector (#design)
    const posterPresets = {
      cyber: {
        category: 'BRAND SYSTEM 01',
        dimensions: '3000 × 3000 PX • CMYK/RGB',
        subhead: 'SOLAR PULSE® VISUAL IDENTITY',
        headline: 'HIGH VOLTAGE<br/><span class="text-[#FF5500]">TYPOGRAPHY.</span>',
        desc: 'Engineered with rounded geometric shapes, deep carbon blacks, and electric orange focal points for maximum shelf & screen authority.'
      },
      minimal: {
        category: 'EDITORIAL POSTER 02',
        dimensions: 'A1 PRINT • 300 DPI',
        subhead: 'SWISS MODERN EXHIBITION',
        headline: 'PRECISION IN<br/><span class="text-[#FF5500]">NEGATIVE SPACE.</span>',
        desc: 'Balanced monochrome grey hierarchy paired with bold orange callout pills and razor-sharp modular grid alignment.'
      },
      energy: {
        category: '3D PACKAGING 03',
        dimensions: 'CAN DIELINE • METALLIC INK',
        subhead: 'IGNIS NITRO COLD BREW',
        headline: 'MATTE BLACK &amp;<br/><span class="text-[#FF5500]">CITRUS FLARE.</span>',
        desc: 'Tactile packaging design system with custom vector badges, nutritional table styling, and 3D studio lighting renders.'
      }
    };

    document.querySelectorAll('.poster-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-poster');
        const p = posterPresets[key];
        document.querySelectorAll('.poster-preset-btn').forEach(b => {
          b.className = 'poster-preset-btn px-4 py-2 rounded-full text-xs font-bold bg-white/5 text-gray-300 hover:text-white border border-white/10 transition-all';
        });
        btn.className = 'poster-preset-btn px-4 py-2 rounded-full text-xs font-bold bg-[#FF5500] text-white transition-all';

        document.getElementById('artboardCategory').textContent = p.category;
        document.getElementById('artboardDimensions').textContent = p.dimensions;
        document.getElementById('artboardSubhead').textContent = p.subhead;
        document.getElementById('artboardHeadline').innerHTML = p.headline;
        document.getElementById('artboardDesc').textContent = p.desc;
      });
    });

    function setupLayerToggle(btnId, targetId, labelText) {
      const btn = document.getElementById(btnId);
      const target = document.getElementById(targetId);
      let active = true;
      btn.addEventListener('click', () => {
        active = !active;
        target.classList.toggle('hidden', !active);
        btn.textContent = (active ? '✓ ' : '✕ ') + labelText;
        btn.className = active
          ? 'px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FF5500]/20 text-[#FF7733] border border-[#FF5500]/40'
          : 'px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-gray-400 border border-white/10';
      });
    }
    setupLayerToggle('toggleGridLayer', 'artboardGridOverlay', 'Golden Grid');
    setupLayerToggle('toggleBadgeLayer', 'artboardStamp', 'Vector Stamp');
    setupLayerToggle('toggleTextureLayer', 'artboardGlowOverlay', 'Halftone Glow');

    // 5. Video Editing Color Grade Slider & NLE Tracks (#editing)
    const colorSlider = document.getElementById('colorGradeSlider');
    const gradedOverlay = document.getElementById('gradedOverlayLayer');
    const gradeBadge = document.getElementById('gradePercentBadge');

    colorSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      gradedOverlay.style.width = val + '%';
      gradeBadge.textContent = `Grade Mix: ${val}%`;
    });

    const nleDetails = {
      v3: {
        title: 'Track V3 — Kinetic Typography & Motion UI',
        desc: 'Custom spring-physics animated captions, glowing product HUD callouts, and branded lower thirds that boost viewer retention by 42% in the first 15 seconds.'
      },
      v2: {
        title: 'Track V2 — Optical Flow Speed Ramps & B-Roll',
        desc: 'Velocity-mapped transitions, whip-pans, and custom rotoscoped subject masks synced to the beat for seamless visual momentum.'
      },
      v1: {
        title: 'Track V1 — Narrative Story Cut & Film Emulation',
        desc: 'Zero-fluff story pacing combined with custom DaVinci Resolve node trees, rich carbon blacks, and signature warm orange highlights.'
      },
      a1: {
        title: 'Track A1 — Multi-Layered Sound Design & Mastering',
        desc: 'Sub-bass drops, crisp Foley textures, risers, and broadcast-ready vocal compression mastered to -14 LUFS for YouTube and Reels.'
      }
    };

    document.querySelectorAll('.nle-track-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-track');
        const info = nleDetails[key];
        document.querySelectorAll('.nle-track-btn').forEach(b => {
          b.className = 'nle-track-btn w-full text-left p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-between';
        });
        btn.className = 'nle-track-btn w-full text-left p-3 rounded-2xl bg-[#FF5500]/20 border border-[#FF5500] transition-all flex items-center justify-between';
        document.getElementById('nleDetailTitle').textContent = info.title;
        document.getElementById('nleDetailDesc').textContent = info.desc;
      });
    });

    // 6. Plans Toggle (Monthly vs Single Project) & Sybiosme 02/03 + 03/03 Add-On Configurator
    const planModeMonthly = document.getElementById('planModeMonthly');
    const planModeProject = document.getElementById('planModeProject');

    let configPlanName = 'Full Creative Partner';
    let configBasePrice = 2450;
    let addonBrandActive = false;
    let addonThumbActive = false;
    let extraLanguages = 0;
    let promoDiscount = 0;

    function updateConfiguratorSummary() {
      const summaryPlanName = document.getElementById('summaryPlanName');
      const summaryBasePrice = document.getElementById('summaryBasePrice');
      const summaryAddonsList = document.getElementById('summaryAddonsList');
      const summaryTotalDisplay = document.getElementById('summaryTotalDisplay');

      summaryPlanName.textContent = configPlanName;
      summaryBasePrice.textContent = `$${configBasePrice.toLocaleString()}/mo`;

      const addons = [];
      let addonSum = 0;
      if (addonBrandActive) {
        addons.push('<div class="flex justify-between"><span>+ Brand Identity &amp; Print Kit</span><span class="text-white font-mono">+$109/mo</span></div>');
        addonSum += 109;
      }
      if (addonThumbActive) {
        addons.push('<div class="flex justify-between"><span>+ High-CTR Thumbnail &amp; Banner Pack</span><span class="text-white font-mono">+$79/mo</span></div>');
        addonSum += 79;
      }
      if (extraLanguages > 0) {
        const langCost = extraLanguages * 39;
        addons.push(`<div class="flex justify-between"><span>+ Multilingual Adapts (${extraLanguages} lang)</span><span class="text-white font-mono">+$${langCost}/mo</span></div>`);
        addonSum += langCost;
      }

      if (addons.length === 0) {
        summaryAddonsList.innerHTML = '<div class="text-gray-500 italic">No optional add-ons selected</div>';
      } else {
        summaryAddonsList.innerHTML = addons.join('');
      }

      let rawTotal = configBasePrice + addonSum;
      if (promoDiscount > 0) {
        rawTotal = Math.round(rawTotal * (1 - promoDiscount));
      }
      summaryTotalDisplay.textContent = `$${rawTotal.toLocaleString()}`;
    }

    document.querySelectorAll('.config-plan-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        configPlanName = btn.getAttribute('data-config-plan');
        configBasePrice = parseInt(btn.getAttribute('data-config-price'), 10);
        document.querySelectorAll('.config-plan-pill').forEach(b => {
          b.className = 'config-plan-pill px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-gray-300 border border-white/10';
        });
        btn.className = 'config-plan-pill px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FF5500] text-white';
        updateConfiguratorSummary();
      });
    });

    document.getElementById('addonBrandToggle').addEventListener('click', (e) => {
      addonBrandActive = !addonBrandActive;
      e.currentTarget.textContent = addonBrandActive ? '✓ Added ($109/mo)' : '+ Add to Plan';
      e.currentTarget.className = addonBrandActive
        ? 'px-4 py-2 rounded-full text-xs font-bold bg-[#FF5500] text-white transition-all whitespace-nowrap'
        : 'px-4 py-2 rounded-full text-xs font-bold bg-white/10 hover:bg-[#FF5500] text-white transition-all whitespace-nowrap';
      updateConfiguratorSummary();
    });

    document.getElementById('addonThumbToggle').addEventListener('click', (e) => {
      addonThumbActive = !addonThumbActive;
      e.currentTarget.textContent = addonThumbActive ? '✓ Added ($79/mo)' : '+ Add to Plan';
      e.currentTarget.className = addonThumbActive
        ? 'px-4 py-2 rounded-full text-xs font-bold bg-[#FF5500] text-white transition-all whitespace-nowrap'
        : 'px-4 py-2 rounded-full text-xs font-bold bg-white/10 hover:bg-[#FF5500] text-white transition-all whitespace-nowrap';
      updateConfiguratorSummary();
    });

    document.getElementById('langMinusBtn').addEventListener('click', () => {
      if (extraLanguages > 0) {
        extraLanguages--;
        document.getElementById('langCountDisplay').textContent = String(extraLanguages);
        updateConfiguratorSummary();
      }
    });

    document.getElementById('langPlusBtn').addEventListener('click', () => {
      if (extraLanguages < 9) {
        extraLanguages++;
        document.getElementById('langCountDisplay').textContent = String(extraLanguages);
        updateConfiguratorSummary();
      }
    });

    document.getElementById('applyPromoBtn').addEventListener('click', () => {
      const code = document.getElementById('promoCodeInput').value.trim().toUpperCase();
      const msg = document.getElementById('promoFeedbackMsg');
      msg.classList.remove('hidden');
      if (code === 'IMRANICK10' || code === 'IMRANICK20' || code === 'SYBIOSME') {
        promoDiscount = 0.10;
        msg.textContent = '✓ 10% Partner Discount Applied!';
      } else {
        promoDiscount = 0;
        msg.textContent = 'Try code IMRANICK10 for 10% off your first month.';
      }
      updateConfiguratorSummary();
    });

    planModeMonthly.addEventListener('click', () => {
      planModeMonthly.className = 'px-4 py-2 rounded-full text-xs font-bold bg-[#FF5500] text-white transition-all';
      planModeProject.className = 'px-4 py-2 rounded-full text-xs font-bold text-gray-400 hover:text-white transition-all';
      document.getElementById('pricePlan1').textContent = '$1,250';
      document.getElementById('periodPlan1').textContent = '/ month';
      document.getElementById('pricePlan2').textContent = '$2,450';
      document.getElementById('periodPlan2').textContent = '/ month';
      document.getElementById('pricePlan3').textContent = '$3,600';
      document.getElementById('periodPlan3').textContent = '/ month';
    });

    planModeProject.addEventListener('click', () => {
      planModeProject.className = 'px-4 py-2 rounded-full text-xs font-bold bg-[#FF5500] text-white transition-all';
      planModeMonthly.className = 'px-4 py-2 rounded-full text-xs font-bold text-gray-400 hover:text-white transition-all';
      document.getElementById('pricePlan1').textContent = '$650';
      document.getElementById('periodPlan1').textContent = '/ project sprint';
      document.getElementById('pricePlan2').textContent = '$1,390';
      document.getElementById('periodPlan2').textContent = '/ bundle';
      document.getElementById('pricePlan3').textContent = '$2,100';
      document.getElementById('periodPlan3').textContent = '/ campaign';
    });

    function scrollToPlans() {
      document.getElementById('plansSection').scrollIntoView({ behavior: 'smooth' });
    }
    document.getElementById('heroExplorePlansBtn').addEventListener('click', scrollToPlans);
    document.getElementById('footerExplorePlansBtn').addEventListener('click', scrollToPlans);
    document.getElementById('mobileExplorePlansBtn').addEventListener('click', () => {
      document.getElementById('mobileMenuPanel').classList.add('hidden');
      scrollToPlans();
    });
    document.getElementById('heroPlayReelBtn').addEventListener('click', () => {
      document.getElementById('editing').scrollIntoView({ behavior: 'smooth' });
    });

    // 7. Book a Call Modal Logic
    const bookCallModal = document.getElementById('bookCallModal');
    const bookingFormView = document.getElementById('bookingFormView');
    const bookingSuccessView = document.getElementById('bookingSuccessView');
    const callPlanInput = document.getElementById('callPlanInput');

    function openBookModal(planTitle) {
      if (planTitle) {
        callPlanInput.value = planTitle;
      }
      bookingFormView.classList.remove('hidden');
      bookingSuccessView.classList.add('hidden');
      bookCallModal.classList.remove('hidden');
      bookCallModal.classList.add('flex');
    }

    function closeBookModal() {
      bookCallModal.classList.add('hidden');
      bookCallModal.classList.remove('flex');
    }

    ['navBookCallBtn', 'heroBookCallBtn', 'footerBookCallBtn', 'editingBookBtn', 'artboardBookDesignBtn'].forEach(id => {
      document.getElementById(id).addEventListener('click', () => openBookModal('Full Creative Partner'));
    });

    document.getElementById('startConfiguredProjectBtn').addEventListener('click', () => {
      const totalStr = document.getElementById('summaryTotalDisplay').textContent;
      openBookModal(`${configPlanName} (${totalStr}/mo)`);
    });

    document.querySelectorAll('.select-plan-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        openBookModal(btn.getAttribute('data-plan'));
      });
    });

    document.getElementById('closeBookModalBtn').addEventListener('click', closeBookModal);
    document.getElementById('resetBookingBtn').addEventListener('click', closeBookModal);

    document.querySelectorAll('.service-pick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedServiceForModal = btn.getAttribute('data-service-pick');
        document.querySelectorAll('.service-pick-btn').forEach(b => {
          b.className = 'service-pick-btn py-2 px-3 rounded-full text-xs font-bold bg-white/5 text-gray-300 border border-white/10 transition-all';
        });
        btn.className = 'service-pick-btn py-2 px-3 rounded-full text-xs font-bold bg-[#FF5500] text-white transition-all';
      });
    });

    document.getElementById('bookCallForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientNameInput').value.trim() || 'Partner';
      const email = document.getElementById('clientEmailInput').value.trim() || 'your inbox';
      const slot = document.getElementById('callDateSelect').value;
      const pkg = callPlanInput.value;

      document.getElementById('bookingSummaryText').textContent =
        `Thanks ${name}! Your ${selectedServiceForModal} discovery call (${pkg}) is scheduled for ${slot}. A calendar invite has been dispatched to ${email}.`;

      bookingFormView.classList.add('hidden');
      bookingSuccessView.classList.remove('hidden');
    });

    // 8. Project Detail Modal
    const projectDetailModal = document.getElementById('projectDetailModal');
    let currentModalProjectTitle = '';

    function openProjectModal(projId) {
      const proj = portfolioProjects.find(p => p.id === projId);
      if (!proj) return;
      currentModalProjectTitle = proj.title;
      document.getElementById('modalProjectTypeBadge').textContent = proj.badge;
      document.getElementById('modalProjectDuration').textContent = proj.duration;
      document.getElementById('modalProjectTitle').textContent = proj.title;
      document.getElementById('modalProjectDesc').textContent = proj.summary;
      document.getElementById('modalProjectTools').textContent = proj.tools;
      document.getElementById('modalProjectMetric').textContent = proj.metric;
      document.getElementById('modalVisualHeadline').textContent = proj.title.split('—')[0];

      projectDetailModal.classList.remove('hidden');
      projectDetailModal.classList.add('flex');
    }

    function closeProjectModal() {
      projectDetailModal.classList.add('hidden');
      projectDetailModal.classList.remove('flex');
    }

    document.getElementById('closeProjectModalBtn').addEventListener('click', closeProjectModal);
    document.getElementById('modalBookSimilarBtn').addEventListener('click', () => {
      closeProjectModal();
      openBookModal('Similar to: ' + currentModalProjectTitle);
    });

    // 9. FAQ Accordion & Direct Message Handler
    document.querySelectorAll('.faq-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-faq');
        const body = document.getElementById('faqBody' + id);
        const isHidden = body.classList.toggle('hidden');
        const iconSpan = btn.querySelector('span:last-child');
        iconSpan.textContent = isHidden ? '+' : '−';
        iconSpan.className = isHidden
          ? 'w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-sm shrink-0'
          : 'w-8 h-8 rounded-full bg-[#FF5500]/20 text-[#FF5500] flex items-center justify-center font-bold text-sm shrink-0';
      });
    });

    document.getElementById('quickMessageForm').addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('quickMsgConfirm').classList.remove('hidden');
      e.target.reset();
    });

    // 10. Real Founder Voiceover Audio Player & Navbar Audio Pill Sync
    const studioAudio = document.getElementById('imranStudioAudio');
    const voicePlayerToggleBtn = document.getElementById('voicePlayerToggleBtn');
    const voicePlayIcon = document.getElementById('voicePlayIcon');
    const voicePlayLabel = document.getElementById('voicePlayLabel');
    const voiceTimecode = document.getElementById('voiceTimecode');
    const voiceProgressFill = document.getElementById('voiceProgressFill');
    const voiceScrubContainer = document.getElementById('voiceScrubContainer');
    const voiceSpeedBtn = document.getElementById('voiceSpeedBtn');
    const voiceRestartBtn = document.getElementById('voiceRestartBtn');
    const voiceWaveformBars = document.querySelectorAll('#voiceWaveformBars span');
    const voiceCues = document.querySelectorAll('.voice-cue');

    function formatAudioTime(seconds) {
      if (!isFinite(seconds) || seconds < 0) return '00:00';
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60);
      return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    function syncAudioUI(isPlaying) {
      document.getElementById('audioStatusText').textContent = isPlaying ? 'Playing' : 'Audio';
      ['eqBar1', 'eqBar2', 'eqBar3'].forEach(id => {
        document.getElementById(id).classList.toggle('eq-bar-active', isPlaying);
      });
      voicePlayIcon.textContent = isPlaying ? '❚❚' : '▶';
      voicePlayLabel.textContent = isPlaying ? 'Pause Founder Audio' : 'Play Founder Audio';
      voiceWaveformBars.forEach((bar, idx) => {
        bar.classList.toggle('eq-bar-active', isPlaying);
        bar.style.animationDelay = `${(idx % 5) * 0.12}s`;
      });
    }

    function toggleStudioAudio() {
      if (!studioAudio) return;
      if (studioAudio.paused) {
        studioAudio.play().then(() => {
          syncAudioUI(true);
        }).catch(() => {
          syncAudioUI(false);
        });
      } else {
        studioAudio.pause();
        syncAudioUI(false);
      }
    }

    document.getElementById('studioAudioToggleBtn').addEventListener('click', toggleStudioAudio);
    voicePlayerToggleBtn.addEventListener('click', toggleStudioAudio);

    voiceRestartBtn.addEventListener('click', () => {
      studioAudio.currentTime = 0;
      studioAudio.play().then(() => syncAudioUI(true)).catch(() => {});
    });

    const speedRates = [1.0, 1.25, 1.5];
    let speedIdx = 0;
    voiceSpeedBtn.addEventListener('click', () => {
      speedIdx = (speedIdx + 1) % speedRates.length;
      studioAudio.playbackRate = speedRates[speedIdx];
      voiceSpeedBtn.textContent = speedRates[speedIdx].toFixed(2).replace('.00', '.0') + 'x';
    });

    studioAudio.addEventListener('timeupdate', () => {
      const dur = studioAudio.duration || 22.5;
      const cur = studioAudio.currentTime || 0;
      const pct = Math.min(100, (cur / dur) * 100);
      voiceProgressFill.style.width = `${pct.toFixed(1)}%`;
      voiceTimecode.textContent = `${formatAudioTime(cur)} / ${formatAudioTime(dur)}`;

      voiceCues.forEach(cue => {
        const start = parseFloat(cue.getAttribute('data-cue-start'));
        const end = parseFloat(cue.getAttribute('data-cue-end'));
        if (cur >= start && cur <= end) {
          cue.className = 'voice-cue transition-colors text-[#FF7733] font-semibold';
        } else {
          cue.className = 'voice-cue transition-colors text-gray-400';
        }
      });
    });

    studioAudio.addEventListener('loadedmetadata', () => {
      voiceTimecode.textContent = `00:00 / ${formatAudioTime(studioAudio.duration || 22.5)}`;
    });

    studioAudio.addEventListener('ended', () => {
      syncAudioUI(false);
      voiceProgressFill.style.width = '100%';
    });

    voiceScrubContainer.addEventListener('click', (e) => {
      const rect = voiceScrubContainer.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const dur = studioAudio.duration || 22.5;
      studioAudio.currentTime = ratio * dur;
      if (studioAudio.paused) {
        studioAudio.play().then(() => syncAudioUI(true)).catch(() => {});
      }
    });

    // 11. Live Studio Clock in Footer (Sybiosme-style)
    function updateClock() {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      const el = document.getElementById('liveStudioClock');
      if (el) {
        el.textContent = `Studio Time: ${hh}:${mm}:${ss} (GMT +6)`;
      }
    }
    setInterval(updateClock, 1000);

    // 12. Mobile Menu & Active Nav Highlighting
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuPanel = document.getElementById('mobileMenuPanel');
    const menuIconOpen = document.getElementById('menuIconOpen');
    const menuIconClose = document.getElementById('menuIconClose');

    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenuPanel.classList.toggle('hidden');
      menuIconOpen.classList.toggle('hidden', !isHidden);
      menuIconClose.classList.toggle('hidden', isHidden);
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuPanel.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      });
    });

    document.querySelectorAll('.nav-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.nav-pill').forEach(p => {
          p.className = 'nav-pill px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white transition-all flex items-center gap-1.5';
        });
        pill.className = 'nav-pill px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-[#FF5500] transition-all flex items-center gap-1.5';
      });
    });

    // Initialize on Load
    window.addEventListener('load', () => {
      renderPortfolioGrid();
      updateConfiguratorSummary();
      updateClock();
      resizeHeroCanvas();
      drawHeroCanvas();
    });
    window.addEventListener('resize', resizeHeroCanvas);
