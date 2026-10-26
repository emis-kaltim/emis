
/* =====================================================
   EMIS
   MODUL ENERGI — EXECUTIVE ENERGY PERFORMANCE
===================================================== */

document.addEventListener("DOMContentLoaded", init);

let currentView = "gallery";
let energyData = [];

/* =====================================================
   CONFIGURATION
===================================================== */

const ENERGY_DATA_URL = "../../data/energi.json";
const BASELINE_YEAR = 2025;
const CURRENT_YEAR = 2026;
const SAVING_TARGET = 0.08;

const MONTH_NAMES = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
];

/* =====================================================
   FORMATTERS
===================================================== */

function formatNumber(value, decimals = 0) {
    if (!Number.isFinite(value)) return "—";

    return new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value);
}

function formatKwh(value) {
    return `${formatNumber(value)} kWh`;
}

function formatPercent(value, decimals = 2) {
    if (!Number.isFinite(value)) return "—";

    const sign = value > 0 ? "+" : "";

    return `${sign}${formatNumber(value, decimals)}%`;
}

function formatRupiah(value) {
    if (!Number.isFinite(value)) return "—";

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(value);
}

function getNumericValue(value) {
    if (value === null || value === undefined || value === "") {
        return null;
    }

    const number = Number(value);

    return Number.isFinite(number) ? number : null;
}

/* =====================================================
   DATA HELPERS
===================================================== */

function getYearData(year) {
    return energyData
        .filter(item => Number(item.year) === year)
        .sort((a, b) => Number(a.monthNumber) - Number(b.monthNumber));
}

function getValidMonthlyData(year) {
    return getYearData(year).filter(item => {
        const month = Number(item.monthNumber);
        const total = getNumericValue(item.totalKwh);

        return (
            month >= 1 &&
            month <= 12 &&
            total !== null &&
            total > 0
        );
    });
}

function getComparableData() {
    const baseline = getYearData(BASELINE_YEAR);
    const current = getYearData(CURRENT_YEAR);

    const currentValidMonths = current
        .filter(item => {
            const total = getNumericValue(item.totalKwh);

            return total !== null && total > 0;
        })
        .map(item => Number(item.monthNumber));

    if (currentValidMonths.length === 0) {
        return {
            baselineTotal: 0,
            currentTotal: 0,
            monthCount: 0,
            baselineMonths: [],
            currentMonths: []
        };
    }

    const lastCurrentMonth = Math.max(...currentValidMonths);

    const baselineMonths = baseline.filter(item => {
        const month = Number(item.monthNumber);
        const total = getNumericValue(item.totalKwh);

        return (
            month >= 1 &&
            month <= lastCurrentMonth &&
            total !== null &&
            total > 0
        );
    });

    const currentMonths = current.filter(item => {
        const month = Number(item.monthNumber);
        const total = getNumericValue(item.totalKwh);

        return (
            month >= 1 &&
            month <= lastCurrentMonth &&
            total !== null &&
            total > 0
        );
    });

    const baselineMonthNumbers = new Set(
        baselineMonths.map(item => Number(item.monthNumber))
    );

    const currentMonthNumbers = new Set(
        currentMonths.map(item => Number(item.monthNumber))
    );

    const comparableMonths = [...baselineMonthNumbers]
        .filter(month => currentMonthNumbers.has(month));

    const comparableBaseline = baselineMonths.filter(item =>
        comparableMonths.includes(Number(item.monthNumber))
    );

    const comparableCurrent = currentMonths.filter(item =>
        comparableMonths.includes(Number(item.monthNumber))
    );

    return {
        baselineTotal: comparableBaseline.reduce(
            (sum, item) => sum + Number(item.totalKwh),
            0
        ),

        currentTotal: comparableCurrent.reduce(
            (sum, item) => sum + Number(item.totalKwh),
            0
        ),

        monthCount: comparableMonths.length,
        baselineMonths: comparableBaseline,
        currentMonths: comparableCurrent
    };
}

/* =====================================================
   INITIALIZATION
===================================================== */

async function init() {
    loadModuleInformation();

    renderEnergyDashboards();
    initTabs();
    initViewerMode();

    /*
       Tetap pertahankan navigasi dashboard melalui hash.
    */
    if (typeof openDashboardFromHash === "function") {
        openDashboardFromHash();
    }

    await loadEnergyData();
}

/* =====================================================
   LOAD ENERGY JSON
===================================================== */

async function loadEnergyData() {
    const status = document.getElementById("executive-status");

    try {
        if (status) {
            status.className = "executive-status";
            status.innerHTML = `
                <i class="fa-solid fa-circle-notch fa-spin"></i>
                Memuat data kinerja energi...
            `;
        }

        const response = await fetch(
            `${ENERGY_DATA_URL}?v=${Date.now()}`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const payload = await response.json();

        if (!Array.isArray(payload)) {
            throw new Error("Format JSON harus berupa array data.");
        }

        energyData = payload;

        if (energyData.length === 0) {
            throw new Error("Data energi tidak tersedia.");
        }

        renderSummary();
        renderExecutiveDashboard();

    } catch (error) {
        console.error("Gagal memuat data energi:", error);

        showExecutiveError(
            "Data energi belum dapat dimuat. Periksa file /emis/data/energi.json dan pastikan file sudah tersedia di GitHub Pages."
        );
    }
}

/* =====================================================
   EXECUTIVE SUMMARY — KPI CARDS
===================================================== */

function renderSummary() {
    const container = document.getElementById("summary-grid");

    if (!container) return;

    const comparison = getComparableData();

    if (comparison.monthCount === 0 || comparison.baselineTotal <= 0) {
        container.innerHTML = `
            <div class="summary-card">
                <div class="summary-icon" style="background:#64748B;">
                    <i class="fa-solid fa-database"></i>
                </div>
                <div class="summary-info">
                    <span>Status Data</span>
                    <strong>Belum tersedia</strong>
                    <small>Data pembanding belum lengkap</small>
                </div>
            </div>
        `;

        return;
    }

    const difference =
        comparison.currentTotal - comparison.baselineTotal;

    const changePercent =
        difference / comparison.baselineTotal * 100;

    const savingTargetKwh =
        comparison.baselineTotal * SAVING_TARGET;

    const actualSaving =
        comparison.baselineTotal - comparison.currentTotal;

    /*
       Positif = penghematan.
       Negatif = konsumsi lebih tinggi dari baseline.
    */
    const targetAchievement =
        savingTargetKwh > 0
            ? actualSaving / savingTargetKwh * 100
            : 0;

    const cards = [
        {
            title: `Konsumsi ${CURRENT_YEAR}`,
            value: formatKwh(comparison.currentTotal),
            subtitle: `Januari–${MONTH_NAMES[
                Math.max(
                    ...comparison.currentMonths.map(
                        item => Number(item.monthNumber)
                    )
                ) - 1
            ]}`,
            icon: "fa-solid fa-bolt",
            color: "#16805D"
        },
        {
            title: `Baseline ${BASELINE_YEAR}`,
            value: formatKwh(comparison.baselineTotal),
            subtitle: `${comparison.monthCount} bulan pembanding`,
            icon: "fa-solid fa-chart-line",
            color: "#64748B"
        },
        {
            title: "Perubahan Konsumsi",
            value: formatPercent(changePercent),
            subtitle: difference > 0
                ? `${formatKwh(difference)} lebih tinggi`
                : difference < 0
                    ? `${formatKwh(Math.abs(difference))} lebih rendah`
                    : "Sama dengan baseline",
            icon: difference > 0
                ? "fa-solid fa-arrow-trend-up"
                : "fa-solid fa-arrow-trend-down",
            color: difference > 0 ? "#DC3545" : "#16805D"
        },
        {
            title: "Target Penghematan",
            value: `${formatNumber(SAVING_TARGET * 100)}%`,
            subtitle: `Setara ${formatKwh(savingTargetKwh)}`,
            icon: "fa-solid fa-bullseye",
            color: "#2563EB"
        },
        {
            title: "Pencapaian Target",
            value: formatPercent(targetAchievement),
            subtitle: targetAchievement >= 100
                ? "Target penghematan tercapai"
                : targetAchievement >= 0
                    ? "Target penghematan belum tercapai"
                    : "Konsumsi masih di atas baseline",
            icon: "fa-solid fa-gauge-high",
            color: targetAchievement >= 100
                ? "#16805D"
                : targetAchievement >= 0
                    ? "#D97706"
                    : "#DC3545"
        }
    ];

    container.innerHTML = cards.map(item => `
        <div class="summary-card">

            <div class="summary-icon"
                 style="background:${item.color};">

                <i class="${item.icon}"></i>

            </div>

            <div class="summary-info">

                <span>${item.title}</span>

                <strong>${item.value}</strong>

                <small>${item.subtitle}</small>

            </div>

        </div>
    `).join("");
}

/* =====================================================
   RENDER EXECUTIVE DASHBOARD
===================================================== */

function renderExecutiveDashboard() {
    const period = document.getElementById("executive-period");
    const status = document.getElementById("executive-status");

    const comparison = getComparableData();

    if (comparison.monthCount === 0) {
        showExecutiveError(
            "Belum terdapat periode yang dapat dibandingkan antara tahun baseline dan tahun berjalan."
        );
        return;
    }

    const latestMonth = Math.max(
        ...comparison.currentMonths.map(
            item => Number(item.monthNumber)
        )
    );

    if (period) {
        period.textContent =
            `Jan–${MONTH_NAMES[latestMonth - 1]} ${CURRENT_YEAR}`;
    }

    const change =
        comparison.baselineTotal > 0
            ? (
                comparison.currentTotal - comparison.baselineTotal
            ) / comparison.baselineTotal * 100
            : 0;

    if (status) {
        status.className =
            `executive-status ${change > 0 ? "warning" : "success"}`;

        status.innerHTML = change > 0
            ? `
                <i class="fa-solid fa-triangle-exclamation"></i>
                Konsumsi listrik meningkat ${formatNumber(change)}%
                dibandingkan periode yang sama tahun ${BASELINE_YEAR}.
            `
            : `
                <i class="fa-solid fa-circle-check"></i>
                Konsumsi listrik ${change < 0 ? "lebih rendah" : "sama"}
                dibandingkan periode yang sama tahun ${BASELINE_YEAR}.
            `;
    }

    renderMonthlyChart();
}

/* =====================================================
   MONTHLY BAR CHART — SVG
===================================================== */

function renderMonthlyChart() {
    const container = document.getElementById("executive-monthly-chart");

    if (!container) return;

    const baseline = getYearData(BASELINE_YEAR);
    const current = getYearData(CURRENT_YEAR);

    const baselineMap = new Map(
        baseline.map(item => [
            Number(item.monthNumber),
            getNumericValue(item.totalKwh)
        ])
    );

    const currentMap = new Map(
        current.map(item => [
            Number(item.monthNumber),
            getNumericValue(item.totalKwh)
        ])
    );

    const validCurrentMonths = current
        .filter(item => {
            const total = getNumericValue(item.totalKwh);

            return total !== null && total > 0;
        })
        .map(item => Number(item.monthNumber));

    if (validCurrentMonths.length === 0) {
        container.innerHTML = `
            <p class="chart-placeholder">
                Data konsumsi tahun berjalan belum tersedia.
            </p>
        `;
        return;
    }

    const lastMonth = Math.max(...validCurrentMonths);

    const chartData = [];

    for (let month = 1; month <= lastMonth; month++) {
        const baselineValue = baselineMap.get(month);
        const currentValue = currentMap.get(month);

        chartData.push({
            month,
            label: MONTH_NAMES[month - 1],
            baseline: baselineValue !== null && baselineValue > 0
                ? baselineValue
                : null,
            current: currentValue !== null && currentValue > 0
                ? currentValue
                : null
        });
    }

    const width = 900;
    const height = 340;
    const left = 65;
    const right = 20;
    const top = 25;
    const bottom = 55;

    const plotWidth = width - left - right;
    const plotHeight = height - top - bottom;

    const allValues = chartData.flatMap(item => [
        item.baseline,
        item.current
    ]).filter(value => value !== null && value > 0);

    const maxValue = Math.max(...allValues) * 1.15;
    const step = plotWidth / chartData.length;
    const barWidth = Math.min(17, step * 0.27);

    let svg = `
        <svg
            viewBox="0 0 ${width} ${height}"
            role="img"
            aria-label="Grafik perbandingan konsumsi listrik bulanan tahun ${BASELINE_YEAR} dan ${CURRENT_YEAR}"
            xmlns="http://www.w3.org/2000/svg">

            <title>
                Tren konsumsi listrik bulanan ${BASELINE_YEAR} dan ${CURRENT_YEAR}
            </title>
    `;

    for (let i = 0; i <= 4; i++) {
        const value = maxValue * i / 4;
        const y = top + plotHeight - (value / maxValue) * plotHeight;

        svg += `
            <line
                x1="${left}"
                y1="${y}"
                x2="${width - right}"
                y2="${y}"
                stroke="#E8EDF3"
                stroke-width="1"/>

            <text
                x="${left - 10}"
                y="${y + 4}"
                text-anchor="end"
                font-size="11"
                fill="#64748B">
                ${formatNumber(value / 1000, 0)}k
            </text>
        `;
    }

    chartData.forEach((item, index) => {
        const center = left + step * index + step / 2;

        [
            {
                value: item.baseline,
                color: "#94A3B8",
                x: center - barWidth - 2,
                year: BASELINE_YEAR
            },
            {
                value: item.current,
                color: "#16805D",
                x: center + 2,
                year: CURRENT_YEAR
            }
        ].forEach(bar => {
            if (bar.value === null || bar.value <= 0) return;

            const barHeight = bar.value / maxValue * plotHeight;
            const y = top + plotHeight - barHeight;

            svg += `
                <rect
                    x="${bar.x}"
                    y="${y}"
                    width="${barWidth}"
                    height="${barHeight}"
                    rx="3"
                    fill="${bar.color}">
                    <title>
                        ${item.label} ${bar.year}: ${formatNumber(bar.value)} kWh
                    </title>
                </rect>
            `;
        });

        svg += `
            <text
                x="${center}"
                y="${height - 25}"
                text-anchor="middle"
                font-size="12"
                fill="#64748B">
                ${item.label}
            </text>
        `;
    });

    svg += `</svg>`;

    container.innerHTML = svg;
}

/* =====================================================
   EXECUTIVE ERROR
===================================================== */

function showExecutiveError(message) {
    const status = document.getElementById("executive-status");
    const chart = document.getElementById("executive-monthly-chart");

    if (status) {
        status.className = "executive-status error";
        status.innerHTML = `
            <i class="fa-solid fa-circle-exclamation"></i>
            ${message}
        `;
    }

    if (chart) {
        chart.innerHTML = `
            <p class="chart-placeholder">
                Grafik belum dapat ditampilkan.
            </p>
        `;
    }
}

/* =====================================================
   LOAD MODULE INFORMATION
===================================================== */

function loadModuleInformation() {
    const pagePeriod = document.getElementById("page-period");

    if (pagePeriod) {
        pagePeriod.textContent = ENERGY_CONFIG.period;
    }

    const updatePeriode = document.getElementById("update-periode");

    if (updatePeriode) {
        updatePeriode.textContent = ENERGY_CONFIG.period;
    }

    const dashboardCount = document.getElementById("dashboard-count");

    if (dashboardCount) {
        dashboardCount.textContent =
            `${ENERGY_CONFIG.totalDashboard} Dashboard`;
    }

    document.title = `${ENERGY_CONFIG.title} | EMIS`;
}

/* =====================================================
   DEVICE DETECTION
===================================================== */

function isMobileDevice() {
    return (
        window.matchMedia("(pointer: coarse)").matches ||
        navigator.maxTouchPoints > 1
    );
}

/* =====================================================
   PDF PREVIEW
===================================================== */

function renderPDFPreview(item) {
    if (isMobileDevice()) {
        return `
            <div class="viewer-pdf viewer-pdf-mobile">
                <div class="pdf-mobile-content">

                    <div class="pdf-mobile-icon">
                        <i class="fa-solid fa-file-pdf"></i>
                    </div>

                    <h4>PDF Dashboard</h4>

                    <p>${item.title}</p>

                    <span>${item.pageSize} ${item.orientation}</span>

                    <a
                        href="${item.pdf}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="pdf-mobile-button">

                        Buka Dashboard

                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>

                </div>
            </div>
        `;
    }

    return `
        <div class="viewer-pdf">

            <iframe
                src="${item.pdf}#page=1&toolbar=0&navpanes=0&scrollbar=0"
                title="${item.title}"
                loading="lazy">
            </iframe>

        </div>
    `;
}

/* =====================================================
   RENDER DASHBOARD PDF
===================================================== */

function renderEnergyDashboards(filter = "all") {
    const container = document.getElementById("energy-dashboard");

    if (!container) return;

    container.classList.toggle(
        "focus-mode",
        currentView === "focus"
    );

    container.innerHTML = "";

    const dashboards = filter === "all"
        ? ENERGY_DASHBOARDS
        : ENERGY_DASHBOARDS.filter(
            item => item.type === filter
        );

    dashboards.forEach(item => {
        container.innerHTML += `
            <article
                class="viewer"
                id="${item.type}-dashboard">

                <div class="viewer-header">

                    <div class="viewer-title">

                        <div
                            class="viewer-icon"
                            style="background:${item.color};">

                            <i class="${item.icon}"></i>

                        </div>

                        <div>
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>

                    </div>

                    <div class="viewer-period">
                        <span>Periode</span>
                        <strong>${item.period}</strong>
                    </div>

                </div>

                ${renderPDFPreview(item)}

                <div class="viewer-footer">

                    <div class="viewer-meta">

                        <span>
                            <i class="fa-solid fa-folder"></i>
                            ${item.category}
                        </span>

                        <span>
                            <i class="fa-solid fa-file-pdf"></i>
                            ${item.format}
                        </span>

                        <span>
                            <i class="fa-solid fa-file-lines"></i>
                            ${item.pageSize} ${item.orientation}
                        </span>

                    </div>

                    <a
                        href="${item.pdf}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="viewer-button">

                        ${item.button}

                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>

                </div>

            </article>
        `;
    });
}

/* =====================================================
   DASHBOARD FILTER
===================================================== */

function initTabs() {
    const tabs = document.querySelectorAll(".tab");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(item => item.classList.remove("active"));

            tab.classList.add("active");

            renderEnergyDashboards(tab.dataset.filter);
        });
    });
}

/* =====================================================
   VIEW MODE
===================================================== */

function initViewerMode() {
    const buttons = document.querySelectorAll(".mode-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(item => item.classList.remove("active"));

            btn.classList.add("active");

            currentView = btn.dataset.mode;

            const activeTab = document.querySelector(".tab.active");
            const filter = activeTab ? activeTab.dataset.filter : "all";

            renderEnergyDashboards(filter);
        });
    });
}
