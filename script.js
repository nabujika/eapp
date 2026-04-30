const technicalData = [
  {
    label: "Kerala",
    value: 0.85,
    color: "#47f5d1",
    note: "Closest to the frontier in this illustrative comparison, leaving a relatively small efficiency gap.",
    source: "Illustrative frontier benchmark"
  },
  {
    label: "Tamil Nadu",
    value: 0.8,
    color: "#2ed1ba",
    note: "Strong conversion of public inputs into service output, though still short of the frontier.",
    source: "Illustrative frontier benchmark"
  },
  {
    label: "Maharashtra",
    value: 0.74,
    color: "#23bfa7",
    note: "Moderately high technical efficiency with noticeable room for process improvement.",
    source: "Illustrative frontier benchmark"
  },
  {
    label: "Gujarat",
    value: 0.7,
    color: "#1ca593",
    note: "Productive, but not yet extracting the same output intensity as the frontier states.",
    source: "Illustrative frontier benchmark"
  },
  {
    label: "Rajasthan",
    value: 0.64,
    color: "#ffb067",
    note: "Around one-third of potential output remains unrealized at the same input level.",
    source: "Illustrative frontier benchmark"
  },
  {
    label: "Uttar Pradesh",
    value: 0.52,
    color: "#ff8a52",
    note: "A wide frontier gap suggests bottlenecks in management, staffing mix, or care processes.",
    source: "Illustrative frontier benchmark"
  },
  {
    label: "Bihar",
    value: 0.45,
    color: "#ff6f6f",
    note: "The lowest score in the comparison, showing major headroom before reaching best-practice output.",
    source: "Illustrative frontier benchmark"
  }
];

const allocativeData = [
  {
    label: "Curative & tertiary",
    value: 54,
    color: "#ff9b4a",
    note: "The largest spending share still sits in downstream treatment, which crowds out earlier intervention.",
    signal: "Dominant budget line",
    source: "NHSRC 2022 mix cited in the presentation"
  },
  {
    label: "Primary care",
    value: 21,
    color: "#1eb69e",
    note: "Primary care remains far below the policy ambition of making it the system's main spending platform.",
    signal: "Policy priority area",
    source: "Government health spending share"
  },
  {
    label: "Preventive & public health",
    value: 13,
    color: "#71f5c4",
    note: "Prevention receives a small share even though it often carries the strongest long-run social return.",
    signal: "Upstream investment gap",
    source: "Government health spending share"
  },
  {
    label: "Admin & other",
    value: 12,
    color: "#8aa4c9",
    note: "Support and administration matter, but their value depends on how well they reinforce frontline delivery.",
    signal: "Support expenditure",
    source: "Government health spending share"
  }
];

const governanceData = [
  {
    label: "Tamil Nadu",
    value: 94,
    color: "#47f5d1",
    note: "High utilization suggests strong budget execution and relatively fewer delivery frictions.",
    source: "Illustrative NHM utilization comparison"
  },
  {
    label: "Kerala",
    value: 91,
    color: "#2ed1ba",
    note: "Most allocated funds are translated into actual spending, indicating a well-functioning delivery chain.",
    source: "Illustrative NHM utilization comparison"
  },
  {
    label: "Gujarat",
    value: 83,
    color: "#6ab7ff",
    note: "Execution remains solid, though some spending capacity is still left unrealized.",
    source: "Illustrative NHM utilization comparison"
  },
  {
    label: "Rajasthan",
    value: 72,
    color: "#ffc96b",
    note: "A sizeable share of budget authority does not fully convert into delivered expenditure.",
    source: "Illustrative NHM utilization comparison"
  },
  {
    label: "Madhya Pradesh",
    value: 65,
    color: "#ff9b4a",
    note: "Lower utilization points to execution losses from procurement, staffing, or management bottlenecks.",
    source: "Illustrative NHM utilization comparison"
  },
  {
    label: "Jharkhand",
    value: 58,
    color: "#ff845d",
    note: "A large execution gap means fewer resources actually reach facilities than the budget suggests.",
    source: "Illustrative NHM utilization comparison"
  },
  {
    label: "Assam",
    value: 51,
    color: "#ff6f6f",
    note: "The lowest utilization in the comparison, highlighting how weak execution can shrink effective spending.",
    source: "Illustrative NHM utilization comparison"
  }
];

const equityMetrics = [
  {
    label: "OOP share",
    caption: "Out-of-pocket share of total health expenditure",
    value: "48.2%",
    level: 48.2,
    note: "The burden has fallen since 2004, but households still finance nearly half of all health spending directly.",
    detail:
      "Long-run improvement is real, yet the remaining level still signals a substantial transfer of risk from the public system to households.",
    footerLeft: "69% in 2004",
    footerRight: "48.2% in 2021",
    color: "#ff9b4a"
  },
  {
    label: "CHE",
    caption: "Households facing catastrophic health expenditure",
    value: "17.3%",
    level: 17.3,
    note: "Nearly one in six households still crosses the catastrophic expenditure threshold.",
    detail:
      "If this many families breach the CHE rule, the system is not insulating households from medical shock even when average spending looks contained.",
    footerLeft: "WHO-style 10% threshold",
    footerRight: "NSSO 75th Round",
    color: "#ff719c"
  },
  {
    label: "Poverty",
    caption: "People pushed into poverty by health costs each year",
    value: "6.3 Cr",
    level: 63,
    note: "Healthcare payments still push millions below the poverty line every year.",
    detail:
      "This converts medical spending into a direct welfare loss and shows why efficiency has to be judged partly by financial protection.",
    footerLeft: "Annual estimate",
    footerRight: "Selvaraj et al.",
    color: "#6ab7ff"
  },
  {
    label: "Quintile gap",
    caption: "CHE gap between poorest and richest quintiles",
    value: "5x",
    level: 83,
    note: "The poorest households face a far higher catastrophic burden than the richest.",
    detail:
      "An unequal risk profile means national averages can improve while the households under the greatest strain are still being left behind.",
    footerLeft: "Distributional gap",
    footerRight: "Das et al.",
    color: "#ffc96b"
  }
];

let scheduleSlideFit = () => {};

function clampPercent(value) {
  return Math.max(0, Math.min(100, value));
}

function buildDetailCard({ label, value, copy, fill, footerLeft, footerRight }) {
  return `
    <div class="detail-top">
      <div>
        <p class="detail-label">${label}</p>
        <p class="detail-value">${value}</p>
      </div>
    </div>
    <div class="detail-meter">
      <span class="detail-fill" style="width: ${clampPercent(fill)}%"></span>
    </div>
    <p class="detail-copy">${copy}</p>
    <div class="detail-footer">
      <span>${footerLeft}</span>
      <span>${footerRight}</span>
    </div>
  `;
}

function setFigureInteraction({ target, detailTargetId, data, renderDetail, initialIndex = 0, onActivate }) {
  if (!target) return;

  const detailTarget = document.getElementById(detailTargetId);
  const nodes = [...target.querySelectorAll(".chart-node")];
  if (!nodes.length || !detailTarget) return;

  let activeIndex = initialIndex;

  function activate(index) {
    const nextIndex = Math.max(0, Math.min(data.length - 1, index));
    activeIndex = nextIndex;

    nodes.forEach((node, nodeIndex) => {
      node.classList.toggle("is-active", nodeIndex === nextIndex);
    });

    detailTarget.innerHTML = renderDetail(data[nextIndex]);
    scheduleSlideFit();

    if (onActivate) {
      onActivate(data[nextIndex], nextIndex, target);
    }
  }

  nodes.forEach((node, index) => {
    node.addEventListener("mouseenter", () => activate(index));
    node.addEventListener("focus", () => activate(index));
    node.addEventListener("click", () => activate(index));
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate(index);
      }
    });
  });

  target.addEventListener("mouseleave", () => activate(activeIndex));

  activate(initialIndex);
}

function renderBarChart(targetId, data, options) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const width = 760;
  const height = 320;
  const margin = { top: 24, right: 16, bottom: 96, left: 56 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const step = innerWidth / data.length;
  const barWidth = step * 0.5;
  const min = options.min ?? 0;
  const max = options.max ?? 1;
  const ticks = options.ticks ?? 5;

  let svg = `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${targetId}-title">
      <title id="${targetId}-title">${options.title}</title>
      <g transform="translate(${margin.left},${margin.top})">
  `;

  for (let index = 0; index <= ticks; index += 1) {
    const value = min + ((max - min) / ticks) * index;
    const y = innerHeight - ((value - min) / (max - min)) * innerHeight;
    svg += `
      <line class="chart-gridline" x1="0" y1="${y}" x2="${innerWidth}" y2="${y}"></line>
      <text class="chart-label" x="-14" y="${y + 4}" text-anchor="end">${options.tickFormat(value)}</text>
    `;
  }

  svg += `
      <line class="chart-axis" x1="0" y1="${innerHeight}" x2="${innerWidth}" y2="${innerHeight}"></line>
      <line class="chart-axis" x1="0" y1="0" x2="0" y2="${innerHeight}"></line>
  `;

  data.forEach((entry, index) => {
    const scaled = (entry.value - min) / (max - min);
    const barHeight = Math.max(0, scaled * innerHeight);
    const x = index * step + (step - barWidth) / 2;
    const y = innerHeight - barHeight;
    const labelX = x + barWidth / 2;
    const labelY = innerHeight + 18;
    const displayLabel = options.labelShortener ? options.labelShortener(entry.label) : entry.label;
    const valueLabel = options.valueFormat(entry.value);

    svg += `
      <g
        class="chart-node"
        data-index="${index}"
        tabindex="0"
        focusable="true"
        role="button"
        aria-label="${entry.label}: ${valueLabel}"
      >
        <rect class="chart-bar" x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="12" fill="${entry.color}"></rect>
        <text class="chart-value" x="${labelX}" y="${Math.max(14, y - 8)}" text-anchor="middle">${valueLabel}</text>
        <text class="chart-label" x="${labelX}" y="${labelY}" transform="rotate(28 ${labelX} ${labelY})" text-anchor="start">${displayLabel}</text>
      </g>
    `;
  });

  svg += "</g></svg>";
  target.innerHTML = svg;

  setFigureInteraction({
    target,
    detailTargetId: options.detailTargetId,
    data,
    renderDetail: options.renderDetail,
    initialIndex: options.initialIndex ?? 0
  });
}

function renderDonutChart(targetId, data, options) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const width = 440;
  const height = 320;
  const cx = width / 2;
  const cy = 148;
  const radius = 102;
  const stroke = 54;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  let svg = `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${targetId}-title">
      <title id="${targetId}-title">${options.title}</title>
      <g transform="translate(${cx},${cy})">
        <circle cx="0" cy="0" r="${radius}" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="${stroke}"></circle>
  `;

  data.forEach((entry, index) => {
    const dash = (entry.value / 100) * circumference;
    svg += `
      <g
        class="chart-node"
        data-index="${index}"
        tabindex="0"
        focusable="true"
        role="button"
        aria-label="${entry.label}: ${entry.value}%"
      >
        <circle
          class="chart-segment"
          cx="0"
          cy="0"
          r="${radius}"
          fill="none"
          stroke="${entry.color}"
          stroke-width="${stroke}"
          stroke-dasharray="${dash} ${circumference - dash}"
          stroke-dashoffset="${-offset}"
          transform="rotate(-90)"
        ></circle>
      </g>
    `;
    offset += dash;
  });

  svg += `
        <circle cx="0" cy="0" r="56" fill="#081427"></circle>
        <text id="${targetId}-center-value" class="chart-value" x="0" y="-2" text-anchor="middle" font-size="30">21%</text>
        <text id="${targetId}-center-label" class="chart-label" x="0" y="20" text-anchor="middle">Primary care</text>
      </g>
  `;

  data.forEach((entry, index) => {
    const previousShare = data.slice(0, index).reduce((sum, item) => sum + item.value, 0);
    const angle = ((previousShare + entry.value / 2) / 100) * (2 * Math.PI) - Math.PI / 2;
    const x = cx + Math.cos(angle) * 122;
    const y = cy + Math.sin(angle) * 122;
    svg += `<text class="chart-value" x="${x}" y="${y}" text-anchor="middle">${entry.value}%</text>`;
  });

  svg += "</svg>";
  target.innerHTML = svg;

  setFigureInteraction({
    target,
    detailTargetId: options.detailTargetId,
    data,
    renderDetail: options.renderDetail,
    initialIndex: options.initialIndex ?? 0,
    onActivate: (entry) => {
      const centerValue = document.getElementById(`${targetId}-center-value`);
      const centerLabel = document.getElementById(`${targetId}-center-label`);
      if (centerValue) centerValue.textContent = `${entry.value}%`;
      if (centerLabel) centerLabel.textContent = entry.label;
    }
  });
}

function renderTechnicalDetail(entry) {
  const frontierGap = Math.round((1 - entry.value) * 100);
  return buildDetailCard({
    label: entry.label,
    value: entry.value.toFixed(2),
    copy: entry.note,
    fill: entry.value * 100,
    footerLeft: `${frontierGap}% below frontier`,
    footerRight: entry.source
  });
}

function renderAllocativeDetail(entry) {
  return buildDetailCard({
    label: entry.label,
    value: `${entry.value}%`,
    copy: entry.note,
    fill: entry.value,
    footerLeft: entry.signal,
    footerRight: entry.source
  });
}

function renderGovernanceDetail(entry) {
  const executionGap = Math.max(0, 100 - entry.value);
  return buildDetailCard({
    label: entry.label,
    value: `${entry.value}%`,
    copy: entry.note,
    fill: entry.value,
    footerLeft: `${executionGap}% not utilized`,
    footerRight: entry.source
  });
}

function setupEquityDashboard() {
  const selector = document.getElementById("equity-selector");
  const detailTarget = document.getElementById("equity-detail");
  const caption = document.getElementById("equity-caption");
  const value = document.getElementById("equity-value");
  const note = document.getElementById("equity-note");
  const visual = document.getElementById("equity-visual");

  if (!selector || !detailTarget || !caption || !value || !note || !visual) return;

  const buttons = [...selector.querySelectorAll(".selector-chip")];

  function activate(index) {
    const metric = equityMetrics[index];
    if (!metric) return;

    buttons.forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === index);
    });

    caption.textContent = metric.caption;
    value.textContent = metric.value;
    value.style.color = metric.color;
    note.textContent = metric.note;
    visual.style.boxShadow = `inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 18px 44px ${metric.color}22`;

    detailTarget.innerHTML = buildDetailCard({
      label: metric.label,
      value: metric.value,
      copy: metric.detail,
      fill: metric.level,
      footerLeft: metric.footerLeft,
      footerRight: metric.footerRight
    });

    scheduleSlideFit();
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => activate(Number(button.dataset.index)));
    button.addEventListener("mouseenter", () => activate(Number(button.dataset.index)));
    button.addEventListener("focus", () => activate(Number(button.dataset.index)));
  });

  activate(0);
}

function setupSlideAutoFit() {
  const shells = [...document.querySelectorAll(".slide-shell")];
  let frameId = 0;

  shells.forEach((shell) => {
    if (shell.querySelector(":scope > .slide-content")) return;

    const content = document.createElement("div");
    content.className = "slide-content";

    while (shell.firstChild) {
      content.appendChild(shell.firstChild);
    }

    shell.appendChild(content);
  });

  function fitShell(shell) {
    const content = shell.querySelector(".slide-content");
    if (!content) return;

    shell.style.setProperty("--fit-scale", "1");
    content.style.width = "";

    const shellHeight = shell.clientHeight;
    if (!shellHeight) return;

    let scale = 1;

    for (let iteration = 0; iteration < 3; iteration += 1) {
      const naturalHeight = content.scrollHeight;
      if (!naturalHeight) break;

      scale = Math.min(1, shellHeight / naturalHeight);
      if (scale >= 0.999) {
        scale = 1;
        break;
      }

      shell.style.setProperty("--fit-scale", scale.toFixed(4));
    }

    shell.style.setProperty("--fit-scale", scale.toFixed(4));
  }

  function fitAllSlides() {
    shells.forEach((shell) => fitShell(shell));
  }

  scheduleSlideFit = () => {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = requestAnimationFrame(() => {
      fitAllSlides();
      frameId = 0;
    });
  };

  window.addEventListener("resize", scheduleSlideFit);
  window.addEventListener("load", scheduleSlideFit);

  scheduleSlideFit();
}

function setupSlideDeck() {
  const slides = [...document.querySelectorAll(".slide")];
  const slideMap = new Map(slides.map((slide, index) => [slide.id, index]));
  const dots = [...document.querySelectorAll(".slide-dot")];
  const prevButton = document.getElementById("prev-slide");
  const nextButton = document.getElementById("next-slide");
  const chromeLabel = document.getElementById("chrome-label");
  const chromeTitle = document.getElementById("chrome-title");
  const slideCounter = document.getElementById("slide-counter");
  const progressBar = document.getElementById("progress-bar");
  const liveRegion = document.getElementById("live-region");
  const stage = document.getElementById("deck-stage");

  if (!slides.length || !prevButton || !nextButton || !chromeLabel || !chromeTitle || !slideCounter || !progressBar) {
    return;
  }

  let currentIndex = 0;
  let pointerStartX = null;
  let pointerStartY = null;

  function showSlide(index, { updateHash = true, announce = true } = {}) {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
    currentIndex = nextIndex;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === nextIndex;
      slide.classList.toggle("is-active", isActive);
      slide.classList.toggle("is-before", slideIndex < nextIndex);
      slide.setAttribute("aria-hidden", String(!isActive));

      if (isActive) {
        slide.removeAttribute("inert");
        const shell = slide.querySelector(".slide-shell");
        if (shell) shell.scrollTop = 0;
      } else {
        slide.setAttribute("inert", "");
      }
    });

    dots.forEach((dot) => {
      dot.classList.toggle("is-active", dot.dataset.target === slides[nextIndex].id);
    });

    chromeLabel.textContent = slides[nextIndex].dataset.label ?? "";
    chromeTitle.textContent = slides[nextIndex].dataset.title ?? "";
    slideCounter.textContent = `${String(nextIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    progressBar.style.width = `${((nextIndex + 1) / slides.length) * 100}%`;
    prevButton.disabled = nextIndex === 0;
    nextButton.disabled = nextIndex === slides.length - 1;

    if (updateHash && window.location.hash !== `#${slides[nextIndex].id}`) {
      history.replaceState(null, "", `#${slides[nextIndex].id}`);
    }

    if (announce && liveRegion) {
      liveRegion.textContent = `Slide ${nextIndex + 1} of ${slides.length}: ${slides[nextIndex].dataset.label}`;
    }

    scheduleSlideFit();
  }

  function moveBy(step) {
    showSlide(currentIndex + step);
  }

  prevButton.addEventListener("click", () => moveBy(-1));
  nextButton.addEventListener("click", () => moveBy(1));

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const targetIndex = slideMap.get(dot.dataset.target);
      if (typeof targetIndex === "number") {
        showSlide(targetIndex);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.key === "ArrowRight" || event.key === "PageDown") {
      event.preventDefault();
      moveBy(1);
    } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      moveBy(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      showSlide(0);
    } else if (event.key === "End") {
      event.preventDefault();
      showSlide(slides.length - 1);
    }
  });

  if (stage) {
    stage.addEventListener("pointerdown", (event) => {
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
    });

    stage.addEventListener("pointerup", (event) => {
      if (pointerStartX === null || pointerStartY === null) return;

      const deltaX = event.clientX - pointerStartX;
      const deltaY = event.clientY - pointerStartY;

      if (Math.abs(deltaX) > 60 && Math.abs(deltaY) < 70) {
        if (deltaX < 0) {
          moveBy(1);
        } else {
          moveBy(-1);
        }
      }

      pointerStartX = null;
      pointerStartY = null;
    });

    stage.addEventListener("pointercancel", () => {
      pointerStartX = null;
      pointerStartY = null;
    });
  }

  window.addEventListener("hashchange", () => {
    const targetIndex = slideMap.get(window.location.hash.replace("#", ""));
    if (typeof targetIndex === "number") {
      showSlide(targetIndex, { updateHash: false, announce: false });
    }
  });

  const initialSlide = slideMap.get(window.location.hash.replace("#", ""));
  showSlide(typeof initialSlide === "number" ? initialSlide : 0, { updateHash: false, announce: false });
}

renderBarChart("technical-chart", technicalData, {
  title: "Illustrative state technical efficiency spread",
  min: 0,
  max: 1,
  ticks: 5,
  tickFormat: (value) => value.toFixed(1).replace(".0", ""),
  valueFormat: (value) => value.toFixed(2),
  labelShortener: (label) => (label === "Uttar Pradesh" ? "UP" : label),
  detailTargetId: "technical-detail",
  renderDetail: renderTechnicalDetail,
  initialIndex: 0
});

renderDonutChart("allocative-chart", allocativeData, {
  title: "Government health spend mix",
  detailTargetId: "allocative-detail",
  renderDetail: renderAllocativeDetail,
  initialIndex: 1
});

renderBarChart("governance-chart", governanceData, {
  title: "NHM fund utilization rates by state",
  min: 0,
  max: 100,
  ticks: 5,
  tickFormat: (value) => String(Math.round(value)),
  valueFormat: (value) => `${Math.round(value)}%`,
  labelShortener: (label) => {
    if (label === "Madhya Pradesh") return "MP";
    return label;
  },
  detailTargetId: "governance-detail",
  renderDetail: renderGovernanceDetail,
  initialIndex: 1
});

setupSlideAutoFit();
setupEquityDashboard();
setupSlideDeck();
