/**
 * ANCHIALO — LUXURY ORGANIC BALNEOLOGY & E-COMMERCE CLIENT ENGINE
 * Azimut 6000 Ltd · Pomorie Black Sea Natural Minerals · Australia $49 AUD
 */

(function () {
  'use strict';

  // ==================== CONFIGURATION & STATE ====================
  const STATE = {
    currency: localStorage.getItem('anchialov2_currency') || 'AUD',
    rates: {
      AUD: { symbol: 'A$', rate: 1.55, fixedJar: 49.00, suffix: ' AUD' },
      USD: { symbol: '$', rate: 1.00, fixedJar: 32.00, suffix: ' USD' },
      EUR: { symbol: '€', rate: 0.92, fixedJar: 28.00, suffix: ' EUR' },
      BGN: { symbol: '', rate: 1.80, fixedJar: 45.00, suffix: ' лв.' }
    },
    cart: JSON.parse(localStorage.getItem('anchialov2_cart') || '[]'),
    activeCategory: 'all',
    searchQuery: '',
    selectedBlend: 'arnica',
    activeDetailTab: 'purpose',
    products: [],
    blogPosts: []
  };

  // Official Verbatim Texts
  const TEXTS = {
    usage: "Gently massage a generous amount into clean, dry skin on the desired muscle or joint area. Allow the bioavailable mineral gel to absorb for 30 minutes to several hours, or leave overnight for deep restorative relaxation. If slight natural mineral salt crystals form on the skin, simply rinse with cool water. Avoid open abrasions and eyes.",
    warning: "For external topical use only. Keep out of reach of children. Avoid direct contact with eyes. If unexpected dermal irritation occurs, rinse thoroughly with cool water. Storage: Store in a cool, dry place between 5°C and 25°C. Natural Black Sea lye maintains stability at ambient room temperatures when shielded from direct sunlight.",
    heritage: "Formed naturally during the slow fractional solar crystallization of sea water in the ancient coastal salterns of Lake Pomorie. As sodium chloride precipitates out as sea salt, a super-dense colloidal liquid rich in ionic magnesium chloride, magnesium sulfate, trace iodine, bromine, and organic peloids settles on top. Revering Thracian healing traditions dating back to 400 BC.",
    producer: "Handcrafted by: AZIMUT 6000 Ltd, Bulgaria, Pomorie 8200, Ivan Vazov 18 str. Tel: +359887470548 | E-mail: sales@luga.bg. GTIN-13: 3 800230 111746. Batch / Expiry: Lot № 04 / Expiry 2027. Net weight: 300 g ℮. PAO 12M | ♳ PET 1 Recyclable. ISO 22716 European GMP Certified."
  };

  // The 5 Signature Botanical Blends
  const BLENDS = {
    arnica: {
      id: 'arnica',
      name: 'ARNICA MONTANA BLEND',
      fullName: 'ARNICA BLEND — DUAL MAGNESIUM COMPLEX',
      accentColor: '#d97706',
      heroJar: 'assets/images/products/06_file_transp.png',
      lidImg: 'assets/official_labels_rendered/anhialo_massage_gel_arnica_top_fv17.png',
      sideImg: 'assets/official_labels_rendered/side_label_grey_arnica_v12.png',
      sidePdf: 'assets/official_drive_assets/labels/Side Label Grey Arnica v12.pdf',
      lidPdf: 'assets/official_drive_assets/labels/Anhialo Massage Gel_Arnica Top Fv17.pdf',
      botanical: 'Arnica Montana Flower Extract',
      subtitle: 'Muscle Soreness, Bruises & Physical Trauma Recovery',
      purpose: "Fast-absorbing topical body gel combining pure transdermal magnesium chloride and magnesium sulfate with natural Arnica Montana extract. Revered by athletes and physical therapists to relieve acute muscle fatigue, ease heavy bruised limbs, reduce post-workout soreness, and soothe inflamed joint tendons.",
      inci: "AQUA (WATER), MINERALS DERIVED FROM BLACK SEA LYE (MAGNESIUM SULFATE, MAGNESIUM CHLORIDE, SODIUM CHLORIDE), HYDROXYETHYLCELLULOSE, GLYCERINE, ARNICA MONTANA FLOWER EXTRACT."
    },
    lavender: {
      id: 'lavender',
      name: 'BULGARIAN LAVENDER BLEND',
      fullName: 'LAVENDER BLEND — DUAL MAGNESIUM COMPLEX',
      accentColor: '#7c3aed',
      heroJar: 'assets/images/products/01_file_transp.png',
      lidImg: 'assets/official_labels_rendered/anhialo_massage_gel_lavender_top_fv17.png',
      sideImg: 'assets/official_labels_rendered/side_label_grey_lavender_v12.png',
      sidePdf: 'assets/official_drive_assets/labels/Side Label Grey Lavender v12.pdf',
      lidPdf: 'assets/official_drive_assets/labels/Anhialo Massage Gel_Lavender Top Fv17.pdf',
      botanical: 'Lavandula Angustifolia Essential Flower Extract',
      subtitle: 'Restorative Sleep, Deep Calming & Tension Ease',
      purpose: "A deeply calming bedtime balneotherapy formulation. Synergizes transdermal magnesium chloride with authentic Bulgarian lavender to calm neuromuscular irritability, reduce restless legs, quiet an overactive nervous system, and usher in deep, uninterrupted sleep cycles.",
      inci: "AQUA (WATER), MINERALS DERIVED FROM BLACK SEA LYE (MAGNESIUM SULFATE, MAGNESIUM CHLORIDE, SODIUM CHLORIDE), HYDROXYETHYLCELLULOSE, GLYCERINE, LAVANDULA ANGUSTIFOLIA FLOWER EXTRACT."
    },
    rosemary: {
      id: 'rosemary',
      name: 'GARDEN ROSEMARY BLEND',
      fullName: 'ROSEMARY BLEND — DUAL MAGNESIUM COMPLEX',
      accentColor: '#059669',
      heroJar: 'assets/images/products/04_file_transp.png',
      lidImg: 'assets/official_labels_rendered/anhialo_massage_gel_rosemary_top_fv17.png',
      sideImg: 'assets/official_labels_rendered/side_label_grey_rosemary_v12.png',
      sidePdf: 'assets/official_drive_assets/labels/Side Label Grey Rosemary v12.pdf',
      lidPdf: 'assets/official_drive_assets/labels/Anhialo Massage Gel_Rosemary Top Fv17.pdf',
      botanical: 'Rosmarinus Officinalis Leaf Powder Extract',
      subtitle: 'Thermal Microcirculation & Tendon Warm-Up',
      purpose: "Invigorating microcirculatory botanical gel. Rosemary terpenes stimulate localized capillary blood flow and oxygen delivery. Highly recommended for pre-training warm-up, morning tendon stiffness, and reviving cold extremities with natural bio-heat.",
      inci: "AQUA (WATER), MINERALS DERIVED FROM BLACK SEA LYE (MAGNESIUM SULFATE, MAGNESIUM CHLORIDE, SODIUM CHLORIDE), HYDROXYETHYLCELLULOSE, GLYCERINE, ROSMARINUS OFFICINALIS LEAF POWDER EXTRACT."
    },
    juniper: {
      id: 'juniper',
      name: 'ALPINE JUNIPER BLEND',
      fullName: 'JUNIPER BLEND — DUAL MAGNESIUM COMPLEX',
      accentColor: '#0284c7',
      heroJar: 'assets/images/products/07_file_transp.png',
      lidImg: 'assets/official_labels_rendered/anhialo_massage_gel_juniper_top_fv17.png',
      sideImg: 'assets/official_labels_rendered/side_label_grey_juniper_v12.png',
      sidePdf: 'assets/official_drive_assets/labels/Side Label Grey Juniper v12.pdf',
      lidPdf: 'assets/official_drive_assets/labels/Anhialo Massage Gel_Juniper Top Fv17.pdf',
      botanical: 'Juniperus Chinensis Leaf Extract & Fruit Oil',
      subtitle: 'Joint Mobility, Detoxification & Lymphatic Flow',
      purpose: "Targeted joint mobility and cellular detox gel. Alpine juniper fruit pinene terpenes assist osmotic tissue drainage, helping flush cellular metabolic residues, ease chronic arthritic stiffness, and refresh heavy, congested joints.",
      inci: "AQUA (WATER), MINERALS DERIVED FROM BLACK SEA LYE (MAGNESIUM SULFATE, MAGNESIUM CHLORIDE, SODIUM CHLORIDE), HYDROXYETHYLCELLULOSE, PARFUM, GLYCERINE, JUNIPERUS CHINENSIS LEAF EXTRACT."
    },
    grape: {
      id: 'grape',
      name: 'RED GRAPE SEED BLEND',
      fullName: 'GRAPE BLEND — DUAL MAGNESIUM COMPLEX',
      accentColor: '#9d174d',
      heroJar: 'assets/images/products/03_file_transp.png',
      lidImg: 'assets/official_labels_rendered/anhialo_massage_gel_grape_top_fv17.png',
      sideImg: 'assets/official_labels_rendered/side_label_grey_grape_v12.png',
      sidePdf: 'assets/official_drive_assets/labels/Side Label Grey Grape v12.pdf',
      lidPdf: 'assets/official_drive_assets/labels/Anhialo Massage Gel_Grape Top Fv17.pdf',
      botanical: 'Vitis Vinifera (Grape) Seed Polyphenol Extract',
      subtitle: 'Cellular Antioxidant & Dermal Elasticity',
      purpose: "Rich in proanthocyanidins and resveratrol antioxidants. Shields dermal collagen against oxidative free-radical breakdown while feeding transdermal magnesium to tired muscles. Restores skin firmness and velvety softness with a delicate vineyard aroma.",
      inci: "AQUA (WATER), MINERALS DERIVED FROM BLACK SEA LYE (MAGNESIUM SULFATE, MAGNESIUM CHLORIDE, SODIUM CHLORIDE), HYDROXYETHYLCELLULOSE, PARFUM, GLYCERINE."
    }
  };

  // Product Catalog (9 Authentic Formulations)
  const CATALOG_PRODUCTS = [
    {
      id: 'gel-arnica',
      name: 'Dual Magnesium Gel | Arnica Blend',
      category: 'gel',
      priceAUD: 49.00,
      image: 'assets/images/products/06_file_transp.png',
      badge: 'Bestseller · Muscle Relief',
      isStaged: false,
      description: 'Fast-absorbing topical gel enriched with Arnica Montana and 253 g/L natural Black Sea magnesium. Relieves acute muscle aches, bruises, joint inflammation, and spasms. 300g net.'
    },
    {
      id: 'gel-lavender',
      name: 'Dual Magnesium Gel | Lavender Blend',
      category: 'gel',
      priceAUD: 49.00,
      image: 'assets/images/products/01_file_transp.png',
      badge: 'Deep Sleep & Calming',
      isStaged: false,
      description: 'Infused with Mediterranean Lavender. Calms central nervous excitability, alleviates restless leg syndrome, and supports restorative night sleep. 300g net.'
    },
    {
      id: 'gel-rosemary',
      name: 'Dual Magnesium Gel | Rosemary Blend',
      category: 'gel',
      priceAUD: 49.00,
      image: 'assets/images/products/04_file_transp.png',
      badge: 'Joint Mobility & Warm-Up',
      isStaged: false,
      description: 'Invigorating rosemary extract stimulates microcirculation and speeds tendon warm-up. Perfect for active athletes and post-workout recovery. 300g net.'
    },
    {
      id: 'gel-juniper',
      name: 'Dual Magnesium Gel | Juniper Blend',
      category: 'gel',
      priceAUD: 49.00,
      image: 'assets/images/products/07_file_transp.png',
      badge: 'Deep Tissue Detox',
      isStaged: false,
      description: 'Alpine juniper fruit terpenes assist lymphatic drainage and ease chronic morning joint stiffness and inflammation. 300g net.'
    },
    {
      id: 'gel-grape',
      name: 'Dual Magnesium Gel | Grape Blend',
      category: 'gel',
      priceAUD: 49.00,
      image: 'assets/images/products/03_file_transp.png',
      badge: 'Antioxidant & Skin Tone',
      isStaged: false,
      description: 'Rich in grape seed polyphenols and resveratrol. Promotes skin elasticity, reduces oxidative tension, and hydrates tired tissues. 300g net.'
    },
    {
      id: 'oil-pure',
      name: 'Dual Magnesium Oil | Natural Topical Brine',
      category: 'oil',
      priceAUD: 49.00,
      image: 'assets/images/products/08_file_transp.png',
      badge: '100% Pure Liquid Brine',
      isStaged: false,
      description: 'Unscented, highly bioavailable liquid Black Sea mineral oil. Silky transdermal glide for full-body massage or foot soak mineralization. 300ml.'
    },
    {
      id: 'combo-gel-oil',
      name: 'Special Offer | Gel + Oil Combo',
      category: 'combo',
      priceAUD: 49.00,
      image: 'assets/images/products/02_file.png',
      badge: '1+1 Free Value Deal',
      isStaged: true,
      description: 'Buy 1 Dual Magnesium Gel (any blend) and receive 1 Dual Magnesium Oil FREE! Double the care for the price of one single jar. Limited stock.'
    },
    {
      id: 'combo-starter',
      name: 'Starter Combo | Dual Magnesium Gel (2-Pack)',
      category: 'combo',
      priceAUD: 89.00,
      image: 'assets/images/products/05_file.png',
      badge: 'Save $9 · Day & Night Pair',
      isStaged: true,
      description: 'Pair Arnica for daytime athletic recovery with Lavender for evening sleep and nervous system reset. Total 600g pure Pomorie peloids.'
    },
    {
      id: 'combo-best-value',
      name: 'Best Value Combo | Dual Magnesium Gel (3-Pack)',
      category: 'combo',
      priceAUD: 129.00,
      image: 'assets/images/products/09_file.png',
      badge: 'Save $18 · Combat Team Pack',
      isStaged: true,
      description: 'Choose any three 300g jars. Maximum value package designed for active fighters, gyms, and balneotherapy enthusiasts. Free Australia Post shipping.'
    }
  ];

  // ==================== PRICE FORMATTER ====================
  function formatPrice(audAmount) {
    if (STATE.currency === 'AUD') {
      return `A$ ${audAmount.toFixed(2)} AUD`;
    }
    if (STATE.currency === 'USD') {
      const val = audAmount / 1.55;
      return `$ ${val.toFixed(2)} USD`;
    }
    if (STATE.currency === 'EUR') {
      const val = (audAmount / 1.55) * 0.92;
      return `€ ${val.toFixed(2)} EUR`;
    }
    if (STATE.currency === 'BGN') {
      const val = (audAmount / 1.55) * 1.80;
      return `${val.toFixed(2)} лв.`;
    }
    return `A$ ${audAmount.toFixed(2)}`;
  }

  // ==================== INITIALIZATION ====================
  document.addEventListener('DOMContentLoaded', () => {
    initCurrency();
    initHeroBlendSwitcher();
    initBotanicalApothecary();
    initProductsGrid();
    initBlogJournal();
    initCartDrawer();
    initModals();
    initFaqAccordion();
  });

  // ==================== CURRENCY CONTROLLER ====================
  function initCurrency() {
    const select = document.getElementById('currencySelect');
    if (!select) return;

    select.value = STATE.currency;
    select.addEventListener('change', (e) => {
      STATE.currency = e.target.value;
      localStorage.setItem('anchialov2_currency', STATE.currency);
      updateAllPrices();
    });
    updateAllPrices();
  }

  function updateAllPrices() {
    const heroPrice = document.getElementById('heroPriceTag');
    if (heroPrice) heroPrice.textContent = formatPrice(49.00);

    const blendPrice = document.getElementById('activeBlendPrice');
    if (blendPrice) blendPrice.textContent = formatPrice(49.00);

    renderCatalog();
    updateCartDrawer();
  }

  // ==================== HERO BLEND SWITCHER ====================
  function initHeroBlendSwitcher() {
    const dots = document.querySelectorAll('.blend-dot-btn');
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        const blendKey = dot.getAttribute('data-blend');
        applyHeroBlend(blendKey);
      });
    });

    const quickAdd = document.getElementById('heroQuickAddBtn');
    if (quickAdd) {
      quickAdd.addEventListener('click', () => {
        addToCart(`gel-${STATE.selectedBlend}`);
      });
    }
  }

  function applyHeroBlend(blendKey) {
    const blend = BLENDS[blendKey];
    if (!blend) return;

    STATE.selectedBlend = blendKey;

    const heroJar = document.getElementById('heroJarImage');
    if (heroJar) heroJar.src = blend.heroJar;

    const heroSub = document.getElementById('heroCardSub');
    if (heroSub) heroSub.textContent = blend.name;

    // Sync Botanical Apothecary Tabs
    document.querySelectorAll('.btn-blend-tab').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-blend') === blendKey);
    });
    applyBotanicalBlend(blendKey);
  }

  // ==================== BOTANICAL APOTHECARY SECTION ====================
  function initBotanicalApothecary() {
    const tabs = document.querySelectorAll('.btn-blend-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const blendKey = tab.getAttribute('data-blend');

        // Sync hero dots
        document.querySelectorAll('.blend-dot-btn').forEach(d => {
          d.classList.toggle('active', d.getAttribute('data-blend') === blendKey);
        });

        applyBotanicalBlend(blendKey);
      });
    });

    // Detail tabs (Purpose, INCI, Usage, Producer)
    const detailTabs = document.querySelectorAll('.btn-detail-tab');
    detailTabs.forEach(dTab => {
      dTab.addEventListener('click', () => {
        detailTabs.forEach(t => t.classList.remove('active'));
        dTab.classList.add('active');
        STATE.activeDetailTab = dTab.getAttribute('data-tab');
        renderDetailTab();
      });
    });

    // Add Active Blend to Bag
    const addBtn = document.getElementById('btnAddActiveBlend');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        addToCart(`gel-${STATE.selectedBlend}`);
      });
    }

    // Default select Arnica
    applyBotanicalBlend('arnica');
  }

  function applyBotanicalBlend(blendKey) {
    const blend = BLENDS[blendKey];
    if (!blend) return;
    STATE.selectedBlend = blendKey;

    const titleEl = document.getElementById('activeBlendTitle');
    if (titleEl) titleEl.textContent = blend.fullName;

    const botEl = document.getElementById('activeBlendBotanical');
    if (botEl) botEl.textContent = blend.botanical;

    const lidImg = document.getElementById('studioLidImg');
    if (lidImg) lidImg.src = blend.lidImg;

    const sideImg = document.getElementById('studioSideImg');
    if (sideImg) sideImg.src = blend.sideImg;

    const dlLid = document.getElementById('downloadLidPdf');
    if (dlLid) dlLid.href = blend.lidPdf;

    const dlSide = document.getElementById('downloadSidePdf');
    if (dlSide) dlSide.href = blend.sidePdf;

    // WhatsApp link
    const waBtn = document.getElementById('btnWaActiveBlend');
    if (waBtn) {
      const priceFormatted = formatPrice(49.00);
      const msg = encodeURIComponent(`Hi Sotir, I would like to order Anchialo ${blend.fullName} (${priceFormatted}). Please confirm delivery / Melbourne pickup.`);
      waBtn.href = `https://wa.me/61423269586?text=${msg}`;
    }

    renderDetailTab();
  }

  function renderDetailTab() {
    const body = document.getElementById('hudTabBody');
    if (!body) return;
    const blend = BLENDS[STATE.selectedBlend] || BLENDS.arnica;

    let html = '';
    switch (STATE.activeDetailTab) {
      case 'purpose':
        html = `
          <h4 style="font-family:var(--font-serif); font-size:18px; color:var(--accent-pine); margin-bottom:8px;">Therapeutic Indications &amp; Action</h4>
          <p>${blend.purpose}</p>
          <div style="margin-top:14px; padding:12px 16px; background:var(--accent-pine-soft); border-radius:10px; font-size:13.5px; border-left:3px solid var(--accent-pine);">
            <strong style="color:var(--accent-pine);">Active Botanical Essence:</strong> ${blend.botanical}
          </div>
        `;
        break;
      case 'inci':
        html = `
          <h4 style="font-family:var(--font-serif); font-size:18px; color:var(--accent-pine); margin-bottom:8px;">100% Transparent INCI Formula</h4>
          <p style="font-size:13.5px; background:var(--bg-canvas); padding:16px; border-radius:10px; border:1px solid var(--border-subtle); color:var(--text-primary); line-height:1.7;">
            ${blend.inci}
          </p>
          <p style="font-size:12.5px; color:var(--text-muted); margin-top:10px;">
            Free from artificial colors, synthetic fragrances, parabens, petrolatum, and GMO derivatives. Cruelty-free &amp; vegan.
          </p>
        `;
        break;
      case 'usage':
        html = `
          <h4 style="font-family:var(--font-serif); font-size:18px; color:var(--accent-pine); margin-bottom:8px;">Application Ritual &amp; Massage</h4>
          <p>${TEXTS.usage}</p>
          <div style="border-top:1px solid var(--border-subtle); margin-top:12px; padding-top:10px; font-size:13px; color:var(--text-muted);">
            <strong style="color:var(--accent-gold);">Storage &amp; Caution:</strong> ${TEXTS.warning}
          </div>
        `;
        break;
      case 'producer':
        html = `
          <h4 style="font-family:var(--font-serif); font-size:18px; color:var(--accent-pine); margin-bottom:8px;">Origin &amp; Producer Traceability</h4>
          <p>${TEXTS.producer}</p>
          <p style="margin-top:10px; font-size:13px; color:var(--text-secondary); line-height:1.6;">${TEXTS.heritage}</p>
        `;
        break;
    }
    body.innerHTML = html;
  }

  // ==================== PRODUCT CATALOG ====================
  function initProductsGrid() {
    STATE.products = CATALOG_PRODUCTS;

    // Filter pills
    document.querySelectorAll('.btn-filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        STATE.activeCategory = btn.getAttribute('data-cat');
        renderCatalog();
      });
    });

    // Search input
    const search = document.getElementById('catalogSearch');
    if (search) {
      search.addEventListener('input', (e) => {
        STATE.searchQuery = e.target.value.toLowerCase().trim();
        renderCatalog();
      });
    }

    renderCatalog();
  }

  function renderCatalog() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const filtered = STATE.products.filter(p => {
      if (STATE.activeCategory !== 'all' && p.category !== STATE.activeCategory) return false;
      if (STATE.searchQuery) {
        const text = `${p.name} ${p.description} ${p.badge}`.toLowerCase();
        if (!text.includes(STATE.searchQuery)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <h3 style="font-family:var(--font-serif); font-size:24px; margin-bottom:8px;">No matching formulations found</h3>
          <p style="color:var(--text-muted); font-size:15px;">Try searching for "arnica", "lavender", "oil", or "combo".</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(prod => {
      const priceFormatted = formatPrice(prod.priceAUD);
      const isStagedClass = prod.isStaged ? 'has-staged-img' : '';
      const waMsg = encodeURIComponent(`Hi Sotir, I would like to order ${prod.name} (${priceFormatted}). Please confirm delivery / Melbourne pickup.`);

      return `
        <div class="product-card">
          <div class="product-thumb ${isStagedClass}">
            <span class="product-flag">${prod.badge}</span>
            <img src="${prod.image}" alt="${prod.name}" loading="lazy">
          </div>
          <div class="product-body">
            <h3 class="product-name">${prod.name}</h3>
            <div class="product-price-row">
              <span class="price-main">${priceFormatted}</span>
              <span class="price-unit">/ 300g Net</span>
            </div>
            <p class="product-desc">${prod.description}</p>
            <div class="product-actions">
              <button class="btn-card-add" data-id="${prod.id}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Add to Bag</span>
              </button>
              <a href="https://wa.me/61423269586?text=${waMsg}" target="_blank" rel="noopener" class="btn-card-wa" title="Order via WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.53 11.51c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.16 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3Z"/></svg>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click events
    grid.querySelectorAll('.btn-card-add').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        addToCart(id);
      });
    });
  }

  // ==================== BLOG JOURNAL ====================
  function initBlogJournal() {
    fetch('data/blog_posts.json')
      .then(res => res.json())
      .then(posts => {
        STATE.blogPosts = posts || [];
        renderBlogGrid();
      })
      .catch(err => {
        console.warn('Could not load blog posts:', err);
      });
  }

  function renderBlogGrid() {
    const grid = document.getElementById('blogGrid');
    if (!grid || !STATE.blogPosts.length) return;

    // First 6 articles
    const featured = STATE.blogPosts.slice(0, 6);

    grid.innerHTML = featured.map((post, idx) => {
      const imgUrl = (post.image && post.image.url) ? post.image.url : 'assets/images/blog/01_blog.png';
      const author = post.author || 'Sotir Kichukov';
      const desc = post.description || '';

      return `
        <div class="blog-card">
          <div class="blog-card-thumb">
            <img src="${imgUrl}" alt="${post.title}" loading="lazy">
          </div>
          <div class="blog-card-body">
            <span class="blog-card-meta">BALNEOLOGY REPORT · ${author}</span>
            <h3 class="blog-card-title">${post.title}</h3>
            <p class="blog-card-excerpt">${desc}</p>
            <button class="btn-read-article" data-idx="${idx}">
              <span>Read Full Article</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.btn-read-article').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        openBlogModal(STATE.blogPosts[idx]);
      });
    });
  }

  function openBlogModal(post) {
    if (!post) return;
    const modal = document.getElementById('blogModalBackdrop');
    const titleEl = document.getElementById('blogModalTitle');
    const catEl = document.getElementById('blogModalCategory');
    const authorEl = document.getElementById('blogModalAuthor');
    const bodyEl = document.getElementById('blogModalBody');
    if (!modal || !titleEl || !bodyEl) return;

    titleEl.textContent = post.title;
    if (catEl) catEl.textContent = 'POMORIE BALNEOTHERAPY RESEARCH';
    if (authorEl) authorEl.textContent = `Authored by ${post.author || 'Sotir Kichukov'} · Peer Reviewed Clinical Archive`;

    const paragraphs = (post.body_text || post.description || '').split('\n').filter(p => p.trim());
    bodyEl.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');

    modal.classList.add('active');
  }

  // ==================== SHOPPING BAG DRAWER ====================
  function initCartDrawer() {
    const backdrop = document.getElementById('bagBackdrop');
    const drawer = document.getElementById('bagDrawer');
    const openBtn = document.getElementById('openBagBtn');
    const closeBtn = document.getElementById('closeBagBtn');

    if (openBtn) openBtn.addEventListener('click', () => openBagDrawer());
    if (closeBtn) closeBtn.addEventListener('click', () => closeBagDrawer());
    if (backdrop) backdrop.addEventListener('click', () => closeBagDrawer());

    // WhatsApp Checkout
    const btnWa = document.getElementById('btnProceedWhatsApp');
    if (btnWa) {
      btnWa.addEventListener('click', (e) => {
        if (!STATE.cart.length) {
          e.preventDefault();
          alert('Your shopping bag is currently empty. Please select a formulation.');
          return;
        }

        let summary = 'Hello Sotir, I would like to place an order from Anchialo Australia:\n\n';
        let total = 0;
        STATE.cart.forEach((it, i) => {
          const itemTotal = it.priceAUD * it.qty;
          total += itemTotal;
          summary += `${i + 1}. ${it.name} × ${it.qty} = A$ ${itemTotal.toFixed(2)} AUD\n`;
        });
        summary += `\nTotal: A$ ${total.toFixed(2)} AUD\n`;
        summary += `\nPlease let me know availability and delivery / Melbourne gym pickup details!`;

        btnWa.href = `https://wa.me/61423269586?text=${encodeURIComponent(summary)}`;
      });
    }

    // Copy Summary Button
    const copyBtn = document.getElementById('btnCopyOrderSummary');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (!STATE.cart.length) {
          alert('Your shopping bag is empty.');
          return;
        }
        let summary = 'ANCHIALO AUSTRALIA — ORDER SUMMARY:\n';
        let total = 0;
        STATE.cart.forEach((it, i) => {
          const itemTotal = it.priceAUD * it.qty;
          total += itemTotal;
          summary += `${i + 1}. ${it.name} × ${it.qty} = A$ ${itemTotal.toFixed(2)} AUD\n`;
        });
        summary += `\nEstimated Total: A$ ${total.toFixed(2)} AUD\nContact: Sotir Kichukov (+61 423 269 586)`;

        navigator.clipboard.writeText(summary).then(() => {
          const orig = copyBtn.textContent;
          copyBtn.textContent = '✓ Summary Copied to Clipboard!';
          setTimeout(() => { copyBtn.textContent = orig; }, 2500);
        });
      });
    }

    updateCartDrawer();
  }

  function openBagDrawer() {
    const backdrop = document.getElementById('bagBackdrop');
    const drawer = document.getElementById('bagDrawer');
    if (backdrop) backdrop.classList.add('active');
    if (drawer) drawer.classList.add('active');
  }

  function closeBagDrawer() {
    const backdrop = document.getElementById('bagBackdrop');
    const drawer = document.getElementById('bagDrawer');
    if (backdrop) backdrop.classList.remove('active');
    if (drawer) drawer.classList.remove('active');
  }

  function addToCart(productId) {
    let prod = STATE.products.find(p => p.id === productId);
    if (!prod) {
      // Fallback for blend IDs
      const blendKey = productId.replace('gel-', '');
      const blend = BLENDS[blendKey];
      if (blend) {
        prod = {
          id: productId,
          name: blend.fullName,
          priceAUD: 49.00,
          image: blend.heroJar
        };
      }
    }
    if (!prod) return;

    const existing = STATE.cart.find(it => it.id === prod.id);
    if (existing) {
      existing.qty += 1;
    } else {
      STATE.cart.push({
        id: prod.id,
        name: prod.name,
        priceAUD: prod.priceAUD,
        image: prod.image,
        qty: 1
      });
    }

    saveCart();
    openBagDrawer();
  }

  function saveCart() {
    localStorage.setItem('anchialov2_cart', JSON.stringify(STATE.cart));
    updateCartDrawer();
  }

  function updateCartDrawer() {
    const listEl = document.getElementById('bagItemsContainer');
    const badgeEl = document.getElementById('cartCountBadge');
    const countEl = document.getElementById('drawerItemCount');
    const totalEl = document.getElementById('drawerSubtotalPrice');
    const meterBar = document.getElementById('shippingMeterBar');
    const meterText = document.getElementById('shippingMeterText');
    const meterPct = document.getElementById('shippingMeterPercent');

    const totalQty = STATE.cart.reduce((sum, it) => sum + it.qty, 0);
    const subtotalAUD = STATE.cart.reduce((sum, it) => sum + (it.priceAUD * it.qty), 0);

    if (badgeEl) badgeEl.textContent = totalQty;
    if (countEl) countEl.textContent = `${totalQty} item${totalQty === 1 ? '' : 's'}`;
    if (totalEl) totalEl.textContent = formatPrice(subtotalAUD);

    // Free shipping threshold ($80 AUD)
    const threshold = 80;
    const progress = Math.min(100, (subtotalAUD / threshold) * 100);
    if (meterBar) meterBar.style.width = `${progress}%`;
    if (meterPct) meterPct.textContent = `${Math.round(progress)}%`;

    if (meterText) {
      if (subtotalAUD >= threshold) {
        meterText.textContent = '🎉 Qualified for FREE Australia-wide delivery!';
      } else {
        const remaining = threshold - subtotalAUD;
        meterText.textContent = `Add A$ ${remaining.toFixed(2)} AUD for FREE delivery`;
      }
    }

    if (!listEl) return;
    if (STATE.cart.length === 0) {
      listEl.innerHTML = `
        <div class="bag-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          <h4>Your bag is empty</h4>
          <p>Explore our pure Black Sea mineral formulations above.</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = STATE.cart.map((item, idx) => `
      <div class="bag-item-card">
        <img class="bag-item-img" src="${item.image}" alt="${item.name}">
        <div>
          <h5 class="bag-item-title">${item.name}</h5>
          <div class="bag-item-price">${formatPrice(item.priceAUD)}</div>
        </div>
        <div class="bag-item-qty">
          <button class="btn-qty" data-action="minus" data-idx="${idx}">−</button>
          <span style="font-size:13px; font-weight:700;">${item.qty}</span>
          <button class="btn-qty" data-action="plus" data-idx="${idx}">+</button>
          <button class="btn-qty" data-action="remove" data-idx="${idx}" title="Remove" style="margin-left:4px; color:var(--text-muted);">&times;</button>
        </div>
      </div>
    `).join('');

    // Attach actions
    listEl.querySelectorAll('.btn-qty').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const action = btn.getAttribute('data-action');
        if (action === 'plus') {
          STATE.cart[idx].qty += 1;
        } else if (action === 'minus') {
          STATE.cart[idx].qty -= 1;
          if (STATE.cart[idx].qty <= 0) STATE.cart.splice(idx, 1);
        } else if (action === 'remove') {
          STATE.cart.splice(idx, 1);
        }
        saveCart();
      });
    });
  }

  // ==================== MODALS ====================
  function initModals() {
    // Certificate Modal
    const certModal = document.getElementById('certModalBackdrop');
    const openCert1 = document.getElementById('btnBannerCert');
    const openCert2 = document.getElementById('btnOpenCertModal');
    const closeCert = document.getElementById('btnCloseCertModal');

    [openCert1, openCert2].forEach(btn => {
      if (btn) btn.addEventListener('click', (e) => {
        e.preventDefault();
        certModal.classList.add('active');
      });
    });
    if (closeCert) closeCert.addEventListener('click', () => certModal.classList.remove('active'));
    if (certModal) certModal.addEventListener('click', (e) => {
      if (e.target === certModal) certModal.classList.remove('active');
    });

    // Certificate Page Switcher
    const certImg = document.getElementById('certModalImage');
    const pageBtns = document.querySelectorAll('.btn-cert-page');
    pageBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        pageBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const page = btn.getAttribute('data-page');
        if (certImg) {
          certImg.src = `assets/official_labels_rendered/quality_certificate_page_${page}.png`;
        }
      });
    });

    // Blog Modal
    const blogModal = document.getElementById('blogModalBackdrop');
    const closeBlog = document.getElementById('btnCloseBlogModal');
    if (closeBlog) closeBlog.addEventListener('click', () => blogModal.classList.remove('active'));
    if (blogModal) blogModal.addEventListener('click', (e) => {
      if (e.target === blogModal) blogModal.classList.remove('active');
    });
  }

  // ==================== FAQ ACCORDION ====================
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          faqItems.forEach(i => i.classList.remove('active'));
          if (!isActive) item.classList.add('active');
        });
      }
    });
  }

})();
