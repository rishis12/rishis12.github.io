/**
 * Prediction Market Cards
 * Interactive Kalshi-style charts for experience and interests
 * Reusable across multiple pages
 */

(function() {
  'use strict';

  // ============================================================
  // DATA — Experience markets (chronological order)
  // ============================================================
  const LIVE_PCT = 68; // <-- SET THIS: paper-trading model confidence %

  const EXPERIENCE_MARKETS = [
    {
      id: "fith",
      tag: "PROJECTS \u00B7 POKER",
      title: "Will Rishi build a working EV solver?",
      start: "2025-05", end: "2026-05",
      status: "RESOLVED", pct: 100, delta: null,
      repo: "https://github.com/rishis12/FITH",
      blurb: "Preflop 6-max 100BB EV solver for a custom poker variant. Monte Carlo equity engine, frequency-weighted opponent ranges, fold/call/raise/jam EV across all 169 starting hands.",
      milestones: [
        { date: "2025-05", label: "Started build" },
        { date: "2025-09", label: "Monte Carlo equity engine + range modeling" },
        { date: "2026-02", label: "Bluff-selection logic (value-to-bluff sizing)" },
        { date: "2026-05", label: "Validated within 0.5% across 84-test suite" }
      ]
    },
    {
      id: "birdsong",
      tag: "RESEARCH \u00B7 ML",
      title: "Will Rishi's birdsong research produce results?",
      start: "2025-08", end: null,
      status: "RESOLVED", pct: 100, delta: null,
      repo: null,
      blurb: "Self-supervised LSTM autoencoder computing latent trajectories from raw zebra-finch birdsong (100+ recordings, PyTorch). Topological data analysis with UW BME and Yale MCDB.",
      milestones: [
        { date: "2025-08", label: "Joined CompBio/ML lab (Dr. Bhaskar)" },
        { date: "2025-11", label: "Trained LSTM autoencoder on 100+ recordings" },
        { date: "2026-01", label: "Yale MCDB collaboration (Dr. Brudner)" },
        { date: "2026-04", label: "Presented at UW Undergrad Research Symposium" }
      ]
    },
    {
      id: "donna",
      tag: "PROJECTS \u00B7 AI",
      title: "Will Rishi ship a cross-platform AI assistant?",
      start: "2025-12", end: "2026-01",
      status: "RESOLVED", pct: 100, delta: null,
      repo: "https://github.com/rishis12/donna",
      blurb: "Cross-platform AI assistant. Tauri (Rust + TS/React) desktop client, FastAPI backend. Natural-language reminders and calendar events, inbox summarization, email draft generation, secure Google + Microsoft OAuth.",
      milestones: [
        { date: "2025-12", label: "Built Tauri desktop client + FastAPI backend" },
        { date: "2025-12", label: "Google + Microsoft OAuth integrations" },
        { date: "2026-01", label: "NL task creation, inbox digests, email drafts" }
      ]
    },
    {
      id: "btcbilboard",
      tag: "PROJECTS \u00B7 QUANT",
      title: "Will Rishi ship a calibrated trading model?",
      start: "2026-05", end: null,
      status: "LIVE", pct: LIVE_PCT, delta: "+4.2",
      repo: "https://github.com/rishis12/btcBilboard",
      blurb: "ML trading system for Kalshi BTC markets. XGBoost + isotonic calibration on 6yr of hourly OHLCV, on-chain, and sentiment data. 0.777 ROC-AUC, in paper-trading validation.",
      milestones: [
        { date: "2026-05", label: "Built real-time pipeline (fetch \u2192 25-feature \u2192 calibrated inference \u2192 signal)" },
        { date: "2026-05", label: "0.777 ROC-AUC" },
        { date: "2026-06", label: "Killed sub-2h and 24h variants as noise-dominated" },
        { date: "2026-06", label: "Paper-trading validation (live 5-min loop)" }
      ]
    },
    {
      id: "lumath",
      tag: "WORK \u00B7 INTERNSHIP",
      title: "Will Rishi be working this summer?",
      start: "2026-06", end: "2026-09",
      status: "RESOLVED", pct: 100, delta: null,
      repo: null,
      blurb: "Intelligence Engineer Intern at LuMATH. Researching and prototyping mathematical and algorithmic applications for LuMATH's Nova reasoning system in Python.",
      milestones: [
        { date: "2026-04", label: "Offered Intelligence Engineer role" },
        { date: "2026-06", label: "Started \u2014 incoming June 2026" }
      ]
    }
  ];

  // ============================================================
  // DATA — Interests markets (leadership/philanthropy)
  // ============================================================
  const INTERESTS_MARKETS = [
    {
      id: "phikap-philanthropy",
      tag: "LEADERSHIP \u00B7 PHILANTHROPY",
      title: "Will Rishi leave the chapter better than he found it?",
      start: "2025-01", end: "2026-01",
      status: "RESOLVED", pct: 100, delta: null,
      repo: null,
      blurb: "Philanthropy Officer, Phi Kappa Sigma (Alpha Theta Chapter). Ran all fundraising and philanthropic efforts. Built the first Philanthropy Week in chapter history, raising $2,900 for the Leukemia and Lymphoma Society, with collaborations supporting Gift of Life and Letters of Love.",
      milestones: [
        { date: "2025-01", label: "Took over philanthropy operations" },
        { date: "2025-08", label: "Launched first-ever Philanthropy Week" },
        { date: "2025-11", label: "Raised $2,900 for Leukemia & Lymphoma Society" },
        { date: "2026-01", label: "Handed off a new chapter tradition" }
      ]
    },
    {
      id: "humorology",
      tag: "LEADERSHIP \u00B7 PRODUCTION",
      title: "Can Rishi direct a 100-person musical and raise real money?",
      start: "2025-05", end: "2026-05",
      status: "RESOLVED", pct: 100, delta: null,
      repo: null,
      blurb: "Director of the 'Zapkap' subgroup, Humorology. Directed a high-grade musical production with a 100+ member cast, coordinating rehearsals and logistics. Led the subgroup to raise $100K in under 9 months \u2014 part of $850K collectively raised for Gio's Garden Respite Care Center.",
      milestones: [
        { date: "2025-05", label: "Took the director role for Zapkap" },
        { date: "2025-09", label: "100+ cast rehearsals underway" },
        { date: "2026-02", label: "$100K raised in under 9 months" },
        { date: "2026-05", label: "$850K total for Gio's Garden" }
      ]
    },
    {
      id: "valorant",
      tag: "PERSONAL \u00B7 GAMING",
      title: "Will Rishi ever escape Gold in Valorant?",
      start: "2020-06", end: null,
      status: "LIVE", pct: 1, delta: "-0.3",
      repo: null,
      blurb: "Playing since the beta. Peaked Diamond 3 once. Hardstuck Gold 2 ever since. The market has priced in the aim.",
      milestones: [
        { date: "2020-06", label: "Played the beta" },
        { date: "2023-01", label: "Peaked Diamond 3 (briefly)" },
        { date: "2026-01", label: "Back in Gold 2, hardstuck" }
      ]
    }
  ];

  // ============================================================
  // UTILITIES
  // ============================================================

  // Seeded PRNG (mulberry32) — stable across reloads
  function seededRandom(seed) {
    let t = seed + 0x6D2B79F5;
    return function() {
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  // Hash string to number for seeding
  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  // Parse "YYYY-MM" to Date
  function parseYearMonth(ym) {
    const [y, m] = ym.split('-').map(Number);
    return new Date(y, m - 1, 1);
  }

  // Format date for display
  function formatDate(date) {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }

  // Format "YYYY-MM" for display
  function formatYearMonth(ym) {
    return formatDate(parseYearMonth(ym));
  }

  // Get current date as "YYYY-MM"
  function nowYM() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
  }

  // Months between two "YYYY-MM" strings
  function monthsBetween(start, end) {
    const s = parseYearMonth(start);
    const e = parseYearMonth(end);
    return (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  }

  // Check reduced motion preference
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // ============================================================
  // CHART GENERATION
  // ============================================================

  // Generate smooth pseudo-random walk trending to target pct
  function generateChartPath(id, startYM, endYM, targetPct, numPoints) {
    const rand = seededRandom(hashString(id));
    const points = [];
    const startPct = 20 + rand() * 30; // Start between 20-50%

    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      // Bias toward target as we progress
      const trend = startPct + (targetPct - startPct) * Math.pow(t, 0.7);
      // Add smoothed noise that decreases near the end
      const noise = (rand() - 0.5) * 25 * (1 - t * 0.7);
      let val = trend + noise;
      // Clamp between 5 and 100
      val = Math.max(5, Math.min(100, val));
      // Final point exactly at target
      if (i === numPoints) val = targetPct;
      points.push(val);
    }

    // Smooth the points with a simple moving average
    const smoothed = [];
    for (let i = 0; i < points.length; i++) {
      const window = 3;
      let sum = 0, count = 0;
      for (let j = Math.max(0, i - window); j <= Math.min(points.length - 1, i + window); j++) {
        sum += points[j];
        count++;
      }
      smoothed.push(sum / count);
    }
    // Ensure final point is exact
    smoothed[smoothed.length - 1] = targetPct;

    return smoothed;
  }

  // Convert points array to SVG path d attribute
  function pointsToPath(points, width, height, padding) {
    const usableWidth = width - padding * 2;
    const usableHeight = height - padding * 2;

    let d = '';
    points.forEach(function(pct, i) {
      const x = padding + (i / (points.length - 1)) * usableWidth;
      const y = padding + usableHeight - (pct / 100) * usableHeight;
      d += (i === 0 ? 'M' : 'L') + x.toFixed(2) + ',' + y.toFixed(2);
    });
    return d;
  }

  // Create area path (for gradient fill under the line)
  function pointsToAreaPath(points, width, height, padding) {
    const usableWidth = width - padding * 2;
    const usableHeight = height - padding * 2;
    const baseline = height - padding;

    let d = 'M' + padding + ',' + baseline;
    points.forEach(function(pct, i) {
      const x = padding + (i / (points.length - 1)) * usableWidth;
      const y = padding + usableHeight - (pct / 100) * usableHeight;
      d += 'L' + x.toFixed(2) + ',' + y.toFixed(2);
    });
    d += 'L' + (width - padding) + ',' + baseline + 'Z';
    return d;
  }

  // ============================================================
  // CARD RENDERING
  // ============================================================

  function renderMarketCard(market, container) {
    const card = document.createElement('article');
    card.className = 'card market-card';
    card.setAttribute('data-reveal', '');
    card.id = 'market-' + market.id;

    const effectiveEnd = market.end || nowYM();
    const totalMonths = monthsBetween(market.start, effectiveEnd);

    // Determine available ranges
    const ranges = [];
    if (totalMonths >= 1) ranges.push({ label: '6M', months: 6 });
    if (totalMonths >= 6) ranges.push({ label: '1Y', months: 12 });
    ranges.push({ label: 'ALL', months: totalMonths });

    // Status badge HTML
    var statusHTML;
    if (market.status === 'RESOLVED') {
      statusHTML = '<span class="market-badge market-badge--resolved">RESOLVED <span class="market-badge__yes">\u00B7 YES</span></span>';
    } else {
      statusHTML = '<span class="market-badge market-badge--live">LIVE</span>';
    }

    // Delta HTML
    var deltaHTML = '';
    if (market.delta && market.status === 'LIVE') {
      deltaHTML = '<span class="market-delta"><svg class="market-delta__arrow" viewBox="0 0 12 12" fill="currentColor"><path d="M6 2L10 8H2L6 2Z"/></svg>' + market.delta + '</span>';
    }

    // Footer links
    var footerLinks = '';
    if (market.repo) {
      footerLinks = '<a href="' + market.repo + '" class="market-footer__link" target="_blank" rel="noopener" aria-label="View repository on GitHub"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg><svg class="market-footer__external" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg></a>';
    }

    // Date range text
    var dateRange = formatYearMonth(market.start) + ' \u2013 ' + (market.end ? formatYearMonth(market.end) : 'Present');

    // Title - clickable if repo exists
    var titleHTML;
    if (market.repo) {
      titleHTML = '<h3 class="market-title"><a href="' + market.repo + '" class="market-title__link" target="_blank" rel="noopener">' + market.title + '</a></h3>';
    } else {
      titleHTML = '<h3 class="market-title">' + market.title + '</h3>';
    }

    card.innerHTML =
      '<div class="market-header">' +
        '<span class="market-tag">' + market.tag + '</span>' +
        titleHTML +
      '</div>' +
      '<div class="market-stats">' +
        '<div class="market-pct">' +
          '<span class="market-pct__value">' + market.pct + '</span>' +
          '<span class="market-pct__symbol">%</span>' +
        '</div>' +
        '<div class="market-status">' +
          statusHTML +
          deltaHTML +
        '</div>' +
      '</div>' +
      '<div class="market-chart-wrap">' +
        '<div class="market-ranges" role="group" aria-label="Time range selector"></div>' +
        '<div class="market-chart" role="img" aria-label="Probability chart for ' + market.title + '"></div>' +
        '<div class="market-tooltip" aria-hidden="true"></div>' +
      '</div>' +
      '<p class="market-blurb">' + market.blurb + '</p>' +
      '<div class="market-footer">' +
        '<span class="market-dates">' + dateRange + '</span>' +
        footerLinks +
      '</div>';

    container.appendChild(card);

    // Initialize chart after DOM insertion
    requestAnimationFrame(function() {
      initChart(card, market, ranges);
    });
  }

  // ============================================================
  // CHART INITIALIZATION
  // ============================================================

  function initChart(card, market, ranges) {
    var chartWrap = card.querySelector('.market-chart');
    var rangesWrap = card.querySelector('.market-ranges');
    var tooltip = card.querySelector('.market-tooltip');

    var width = 400;
    var height = 140;
    var padding = 16;
    var numPoints = 50;

    // Create range buttons
    var activeRange = ranges[ranges.length - 1]; // Default to ALL
    ranges.forEach(function(range, idx) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'market-range-btn' + (idx === ranges.length - 1 ? ' is-active' : '');
      btn.textContent = range.label;
      btn.setAttribute('aria-pressed', idx === ranges.length - 1 ? 'true' : 'false');

      // Disable if range > total span
      var effectiveEnd = market.end || nowYM();
      var totalMonths = monthsBetween(market.start, effectiveEnd);
      if (range.months > totalMonths && range.label !== 'ALL') {
        btn.disabled = true;
        btn.setAttribute('aria-disabled', 'true');
      }

      btn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent navigation if card were clickable
        if (btn.disabled) return;
        activeRange = range;
        rangesWrap.querySelectorAll('.market-range-btn').forEach(function(b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        renderSVG(range);
      });

      rangesWrap.appendChild(btn);
    });

    // Generate base data for ALL range
    var effectiveEnd = market.end || nowYM();
    var allPoints = generateChartPath(market.id, market.start, effectiveEnd, market.pct, numPoints);

    function renderSVG(range) {
      // Calculate visible window
      var totalMonths = monthsBetween(market.start, effectiveEnd);
      var visibleMonths = Math.min(range.months, totalMonths);
      var startIdx = Math.floor((1 - visibleMonths / totalMonths) * (allPoints.length - 1));
      var visiblePoints = allPoints.slice(startIdx);

      // Calculate visible date range
      var visibleStartMonth = Math.floor(startIdx / numPoints * totalMonths);
      var visibleStartDate = new Date(parseYearMonth(market.start));
      visibleStartDate.setMonth(visibleStartDate.getMonth() + visibleStartMonth);

      // Build SVG
      var svgNS = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      svg.setAttribute('class', 'market-svg');
      svg.setAttribute('role', 'presentation');

      // Gradient definition
      var defs = document.createElementNS(svgNS, 'defs');
      var gradient = document.createElementNS(svgNS, 'linearGradient');
      gradient.setAttribute('id', 'grad-' + market.id);
      gradient.setAttribute('x1', '0%');
      gradient.setAttribute('y1', '0%');
      gradient.setAttribute('x2', '0%');
      gradient.setAttribute('y2', '100%');

      var stop1 = document.createElementNS(svgNS, 'stop');
      stop1.setAttribute('offset', '0%');
      stop1.setAttribute('stop-color', '#3D5AFE');
      stop1.setAttribute('stop-opacity', '0.15');

      var stop2 = document.createElementNS(svgNS, 'stop');
      stop2.setAttribute('offset', '100%');
      stop2.setAttribute('stop-color', '#3D5AFE');
      stop2.setAttribute('stop-opacity', '0');

      gradient.appendChild(stop1);
      gradient.appendChild(stop2);
      defs.appendChild(gradient);
      svg.appendChild(defs);

      // Baseline (faint volume area)
      var baseline = document.createElementNS(svgNS, 'rect');
      baseline.setAttribute('x', padding);
      baseline.setAttribute('y', height - padding - 2);
      baseline.setAttribute('width', width - padding * 2);
      baseline.setAttribute('height', 2);
      baseline.setAttribute('fill', '#DCE1EA');
      baseline.setAttribute('rx', '1');
      svg.appendChild(baseline);

      // Area fill
      var areaPath = document.createElementNS(svgNS, 'path');
      areaPath.setAttribute('d', pointsToAreaPath(visiblePoints, width, height, padding));
      areaPath.setAttribute('fill', 'url(#grad-' + market.id + ')');
      svg.appendChild(areaPath);

      // Line
      var linePath = document.createElementNS(svgNS, 'path');
      linePath.setAttribute('d', pointsToPath(visiblePoints, width, height, padding));
      linePath.setAttribute('fill', 'none');
      linePath.setAttribute('stroke', '#3D5AFE');
      linePath.setAttribute('stroke-width', '2.5');
      linePath.setAttribute('stroke-linecap', 'round');
      linePath.setAttribute('stroke-linejoin', 'round');
      linePath.setAttribute('class', 'market-line');

      // Animate line drawing (if motion allowed)
      if (!prefersReducedMotion()) {
        var lineLength = 1000; // Estimate
        linePath.style.strokeDasharray = lineLength;
        linePath.style.strokeDashoffset = lineLength;
      }
      svg.appendChild(linePath);

      // Milestone dots
      var usableWidth = width - padding * 2;
      var usableHeight = height - padding * 2;

      market.milestones.forEach(function(ms, msIdx) {
        var msDate = parseYearMonth(ms.date);
        var startDate = parseYearMonth(market.start);
        var endDate = parseYearMonth(effectiveEnd);

        // Check if milestone is in visible range
        var visibleStart = new Date(startDate);
        visibleStart.setMonth(visibleStart.getMonth() + visibleStartMonth);
        if (msDate < visibleStart) return;

        // Calculate x position
        var totalMs = endDate - startDate;
        var msVisibleOffset = msDate - visibleStart;
        var visibleMs = endDate - visibleStart;

        if (totalMs === 0) return;

        var xRatio = msVisibleOffset / visibleMs;
        if (xRatio < 0 || xRatio > 1) return;

        var x = padding + xRatio * usableWidth;

        // Get y from the line data
        var pointIdx = Math.round(xRatio * (visiblePoints.length - 1));
        var pctVal = visiblePoints[Math.min(pointIdx, visiblePoints.length - 1)];
        var y = padding + usableHeight - (pctVal / 100) * usableHeight;

        // Create dot group
        var dotGroup = document.createElementNS(svgNS, 'g');
        dotGroup.setAttribute('class', 'market-dot-group');
        dotGroup.setAttribute('tabindex', '0');
        dotGroup.setAttribute('role', 'button');
        dotGroup.setAttribute('aria-label', ms.label + ', ' + formatYearMonth(ms.date));
        dotGroup.setAttribute('data-label', ms.label);
        dotGroup.setAttribute('data-date', formatYearMonth(ms.date));

        // Outer ring (hover state)
        var outerRing = document.createElementNS(svgNS, 'circle');
        outerRing.setAttribute('cx', x);
        outerRing.setAttribute('cy', y);
        outerRing.setAttribute('r', '8');
        outerRing.setAttribute('fill', 'rgba(61, 90, 254, 0.15)');
        outerRing.setAttribute('class', 'market-dot-ring');
        dotGroup.appendChild(outerRing);

        // Inner dot
        var dot = document.createElementNS(svgNS, 'circle');
        dot.setAttribute('cx', x);
        dot.setAttribute('cy', y);
        dot.setAttribute('r', '4');
        dot.setAttribute('fill', '#3D5AFE');
        dot.setAttribute('stroke', '#FFFFFF');
        dot.setAttribute('stroke-width', '2');
        dotGroup.appendChild(dot);

        // Tooltip handlers
        function showMilestoneTooltip() {
          tooltip.innerHTML = '<strong>' + ms.label + '</strong><br><span class="market-tooltip__date">' + formatYearMonth(ms.date) + '</span>';
          tooltip.classList.add('is-visible');

          // Position tooltip
          var svgRect = svg.getBoundingClientRect();
          var scale = svgRect.width / width;
          var tipX = (x * scale);
          var tipY = (y * scale) - 12;

          tooltip.style.left = tipX + 'px';
          tooltip.style.top = tipY + 'px';
        }

        function hideMilestoneTooltip() {
          tooltip.classList.remove('is-visible');
        }

        dotGroup.addEventListener('mouseenter', showMilestoneTooltip);
        dotGroup.addEventListener('mouseleave', hideMilestoneTooltip);
        dotGroup.addEventListener('focus', showMilestoneTooltip);
        dotGroup.addEventListener('blur', hideMilestoneTooltip);
        dotGroup.addEventListener('click', function(e) {
          e.stopPropagation(); // Prevent navigation
          e.preventDefault();
        });

        svg.appendChild(dotGroup);
      });

      // Crosshair elements (hidden by default)
      var crosshairLine = document.createElementNS(svgNS, 'line');
      crosshairLine.setAttribute('class', 'market-crosshair');
      crosshairLine.setAttribute('y1', padding);
      crosshairLine.setAttribute('y2', height - padding);
      crosshairLine.setAttribute('stroke', '#1E3A8A');
      crosshairLine.setAttribute('stroke-width', '1');
      crosshairLine.setAttribute('stroke-dasharray', '3,3');
      crosshairLine.setAttribute('opacity', '0');
      svg.appendChild(crosshairLine);

      var crosshairDot = document.createElementNS(svgNS, 'circle');
      crosshairDot.setAttribute('class', 'market-crosshair-dot');
      crosshairDot.setAttribute('r', '4');
      crosshairDot.setAttribute('fill', '#1E3A8A');
      crosshairDot.setAttribute('opacity', '0');
      svg.appendChild(crosshairDot);

      // Interaction overlay for crosshair
      var overlay = document.createElementNS(svgNS, 'rect');
      overlay.setAttribute('x', padding);
      overlay.setAttribute('y', padding);
      overlay.setAttribute('width', usableWidth);
      overlay.setAttribute('height', usableHeight);
      overlay.setAttribute('fill', 'transparent');
      overlay.setAttribute('class', 'market-overlay');

      function handlePointerMove(e) {
        var svgRect = svg.getBoundingClientRect();
        var scale = width / svgRect.width;
        var clientX;

        if (e.touches && e.touches.length > 0) {
          clientX = e.touches[0].clientX;
        } else {
          clientX = e.clientX;
        }

        var xPos = (clientX - svgRect.left) * scale;

        if (xPos < padding || xPos > width - padding) {
          crosshairLine.setAttribute('opacity', '0');
          crosshairDot.setAttribute('opacity', '0');
          tooltip.classList.remove('is-visible');
          return;
        }

        // Calculate point on line
        var xRatio = (xPos - padding) / usableWidth;
        var pointIdx = Math.round(xRatio * (visiblePoints.length - 1));
        var pctVal = visiblePoints[Math.min(pointIdx, visiblePoints.length - 1)];
        var yPos = padding + usableHeight - (pctVal / 100) * usableHeight;

        // Calculate date at this position
        var visibleStartCalc = new Date(parseYearMonth(market.start));
        visibleStartCalc.setMonth(visibleStartCalc.getMonth() + visibleStartMonth);
        var endDateCalc = parseYearMonth(effectiveEnd);
        var visibleMsCalc = endDateCalc - visibleStartCalc;
        var dateAtX = new Date(visibleStartCalc.getTime() + xRatio * visibleMsCalc);

        // Update crosshair
        crosshairLine.setAttribute('x1', xPos);
        crosshairLine.setAttribute('x2', xPos);
        crosshairLine.setAttribute('opacity', '0.5');

        crosshairDot.setAttribute('cx', xPos);
        crosshairDot.setAttribute('cy', yPos);
        crosshairDot.setAttribute('opacity', '1');

        // Update tooltip
        tooltip.innerHTML = '<span class="market-tooltip__pct">' + Math.round(pctVal) + '%</span><br><span class="market-tooltip__date">' + formatDate(dateAtX) + '</span>';
        tooltip.classList.add('is-visible');

        var tipX = (xPos / scale);
        var tipY = (yPos / scale) - 12;
        tooltip.style.left = tipX + 'px';
        tooltip.style.top = tipY + 'px';
      }

      function handlePointerLeave() {
        crosshairLine.setAttribute('opacity', '0');
        crosshairDot.setAttribute('opacity', '0');
        tooltip.classList.remove('is-visible');
      }

      overlay.addEventListener('mousemove', handlePointerMove);
      overlay.addEventListener('touchmove', handlePointerMove, { passive: true });
      overlay.addEventListener('mouseleave', handlePointerLeave);
      overlay.addEventListener('touchend', handlePointerLeave);

      svg.appendChild(overlay);

      // Clear and append
      chartWrap.innerHTML = '';
      chartWrap.appendChild(svg);

      // Trigger line animation
      if (!prefersReducedMotion()) {
        requestAnimationFrame(function() {
          linePath.style.transition = 'stroke-dashoffset 1s ease-out';
          linePath.style.strokeDashoffset = '0';
        });
      }
    }

    // Initial render
    renderSVG(activeRange);
  }

  // ============================================================
  // REUSABLE RENDER FUNCTION
  // ============================================================

  function renderMarkets(markets, containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    markets.forEach(function(market) {
      renderMarketCard(market, container);
    });

    // Trigger reveal animations after a small delay
    setTimeout(function() {
      container.querySelectorAll('[data-reveal]').forEach(function(el, i) {
        setTimeout(function() {
          el.classList.add('is-visible');
        }, i * 80);
      });
    }, 100);
  }

  // ============================================================
  // INITIALIZATION
  // ============================================================

  function init() {
    // Render Experience markets (index.html)
    renderMarkets(EXPERIENCE_MARKETS, 'experience-markets');

    // Render Interests markets (interests.md)
    renderMarkets(INTERESTS_MARKETS, 'interests-markets');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
