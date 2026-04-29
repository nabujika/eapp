const technicalData = [
  { label: "Kerala", value: 0.85, color: "#20c7b3" },
  { label: "Tamil Nadu", value: 0.80, color: "#1fa899" },
  { label: "Maharashtra", value: 0.74, color: "#199b8f" },
  { label: "Gujarat", value: 0.70, color: "#17897f" },
  { label: "Rajasthan", value: 0.64, color: "#f6a154" },
  { label: "Uttar Pradesh", value: 0.52, color: "#e26c3b" },
  { label: "Bihar", value: 0.45, color: "#d24632" }
];

const allocativeData = [
  { label: "Curative & tertiary", value: 54, color: "#ef7f42" },
  { label: "Primary care", value: 21, color: "#169887" },
  { label: "Preventive & public health", value: 13, color: "#3dcdb6" },
  { label: "Admin & other", value: 12, color: "#a6b6ca" }
];

const governanceData = [
  { label: "Tamil Nadu", value: 94, color: "#1fa899" },
  { label: "Kerala", value: 91, color: "#169887" },
  { label: "Gujarat", value: 83, color: "#17897f" },
  { label: "Rajasthan", value: 72, color: "#f6a154" },
  { label: "Madhya Pradesh", value: 65, color: "#ea7a41" },
  { label: "Jharkhand", value: 58, color: "#de5d39" },
  { label: "Assam", value: 51, color: "#d24632" }
];

function renderBarChart(targetId, data, options) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const width = 760;
  const height = 320;
  const margin = { top: 24, right: 20, bottom: 84, left: 52 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const step = innerWidth / data.length;
  const barWidth = step * 0.48;
  const min = options.min ?? 0;
  const max = options.max ?? 1;
  const ticks = options.ticks ?? 5;

  let svg = `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${targetId}-title">
      <title id="${targetId}-title">${options.title}</title>
      <g transform="translate(${margin.left},${margin.top})">
  `;

  for (let i = 0; i <= ticks; i += 1) {
    const value = min + ((max - min) / ticks) * i;
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

    svg += `
      <g>
        <rect class="chart-bar" x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="10" fill="${entry.color}"></rect>
        <text class="chart-value" x="${labelX}" y="${Math.max(14, y - 8)}" text-anchor="middle">${options.valueFormat(entry.value)}</text>
        <text class="chart-label" x="${labelX}" y="${labelY}" transform="rotate(35 ${labelX} ${labelY})" text-anchor="start">${displayLabel}</text>
      </g>
    `;
  });

  svg += "</g></svg>";
  target.innerHTML = svg;
}

function renderDonutChart(targetId, data) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const width = 420;
  const height = 320;
  const cx = width / 2;
  const cy = 150;
  const radius = 104;
  const stroke = 54;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  let svg = `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${targetId}-title">
      <title id="${targetId}-title">Government health spend mix</title>
      <g transform="translate(${cx},${cy})">
        <circle cx="0" cy="0" r="${radius}" fill="none" stroke="rgba(18, 40, 68, 0.08)" stroke-width="${stroke}"></circle>
  `;

  data.forEach((entry) => {
    const fraction = entry.value / 100;
    const dash = fraction * circumference;
    svg += `
      <circle
        class="chart-segment"
        cx="0"
        cy="0"
        r="${radius}"
        fill="none"
        stroke="${entry.color}"
        stroke-width="${stroke}"
        stroke-linecap="butt"
        stroke-dasharray="${dash} ${circumference - dash}"
        stroke-dashoffset="${-offset}"
        transform="rotate(-90)">
      </circle>
    `;
    offset += dash;
  });

  svg += `
        <circle cx="0" cy="0" r="58" fill="#f6f7fb"></circle>
        <text class="chart-value" x="0" y="-6" text-anchor="middle" font-size="28">Spend</text>
        <text class="chart-label" x="0" y="18" text-anchor="middle" font-size="14">mix by category</text>
      </g>
  `;

  data.forEach((entry, index) => {
    const prior = data.slice(0, index).reduce((sum, item) => sum + item.value, 0);
    const angle = ((prior + entry.value / 2) / 100) * 2 * Math.PI - Math.PI / 2;
    const labelX = cx + Math.cos(angle) * 118;
    const labelY = cy + Math.sin(angle) * 118;
    svg += `<text class="chart-value" x="${labelX}" y="${labelY}" text-anchor="middle">${entry.value}%</text>`;
  });

  svg += "</svg>";
  target.innerHTML = svg;
}

function setupSectionViewer() {
  const buttons = [...document.querySelectorAll(".section-button")];
  const panels = [...document.querySelectorAll(".topic-panel")];
  const chartFrames = [...document.querySelectorAll(".chart-frame")];
  const stage = document.getElementById("section-stage");
  const validSections = new Set(panels.map((panel) => panel.dataset.section));

  chartFrames.forEach((frame) => frame.classList.add("is-visible"));

  function showSection(sectionId, shouldScroll) {
    if (!validSections.has(sectionId)) return;

    buttons.forEach((button) => {
      const isActive = button.dataset.section === sectionId;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.section === sectionId;
      panel.hidden = !isActive;
      panel.classList.toggle("is-visible", isActive);
    });

    if (window.location.hash !== `#${sectionId}`) {
      history.replaceState(null, "", `#${sectionId}`);
    }

    if (shouldScroll && stage) {
      stage.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      showSection(button.dataset.section, true);
    });
  });

  window.addEventListener("hashchange", () => {
    const requested = window.location.hash.replace("#", "");
    if (validSections.has(requested)) {
      showSection(requested, false);
    }
  });

  const initialSection = window.location.hash.replace("#", "");
  showSection(validSections.has(initialSection) ? initialSection : "intro", false);
}

renderBarChart("technical-chart", technicalData, {
  title: "Illustrative state technical efficiency spread",
  min: 0,
  max: 1,
  ticks: 5,
  tickFormat: (value) => value.toFixed(1).replace(".0", ""),
  valueFormat: (value) => value.toFixed(2),
  labelShortener: (label) => label === "Uttar Pradesh" ? "UP" : label
});

renderDonutChart("allocative-chart", allocativeData);

renderBarChart("governance-chart", governanceData, {
  title: "NHM fund utilization rates by state",
  min: 0,
  max: 100,
  ticks: 5,
  tickFormat: (value) => String(Math.round(value)),
  valueFormat: (value) => `${Math.round(value)}`,
  labelShortener: (label) => {
    if (label === "Madhya Pradesh") return "MP";
    return label;
  }
});

setupSectionViewer();
