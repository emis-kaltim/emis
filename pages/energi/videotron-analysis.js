
/* ==========================================================
   EMIS - ANALISIS KONSUMSI ENERGI DAN VIDEOTRON
   Membandingkan:
   1. 2025 Baseline
   2. 2026 Dengan Videotron
   3. 2026 Tanpa Videotron
========================================================== */

(() => {
    "use strict";

    const PRIMARY_URL = "../../data/energi.json";
    const ADJUSTED_URL = "../../data/energi-tanpa-videotron.json";

    const BASELINE_YEAR = 2025;
    const CURRENT_YEAR = 2026;
    const SAVING_TARGET = 0.08;

    const COLORS = {
        baseline: "#94A3B8",
        primary: "#16805D",
        adjusted: "#2563EB"
    };

    document.addEventListener("DOMContentLoaded", initVideotronAnalysis);

    async function initVideotronAnalysis() {
        const container = document.getElementById("videotron-kpi-grid");

        if (!container) return;

        try {
            const [primaryResponse, adjustedResponse] = await Promise.all([
                fetch(`${PRIMARY_URL}?v=${Date.now()}`),
                fetch(`${ADJUSTED_URL}?v=${Date.now()}`)
            ]);

            if (!primaryResponse.ok) {
                throw new Error("Data energi utama gagal dimuat.");
            }

            if (!adjustedResponse.ok) {
                throw new Error("Data energi tanpa videotron gagal dimuat.");
            }

            const [primaryData, adjustedData] = await Promise.all([
                primaryResponse.json(),
                adjustedResponse.json()
            ]);

            if (!Array.isArray(primaryData) || !Array.isArray(adjustedData)) {
                throw new Error("Format data JSON tidak valid.");
            }

            const comparison = prepareComparison(
                primaryData,
                adjustedData
            );

            if (comparison.months.length === 0) {
                throw new Error(
                    "Tidak ditemukan bulan dengan data lengkap untuk dibandingkan."
                );
            }

            renderPeriod(comparison);
            renderKPIs(comparison);
            renderChart(comparison);
            renderDescription(comparison);

        } catch (error) {
            console.error("Analisis videotron:", error);

            container.innerHTML = `
                <div class="videotron-error">
                    <i class="fas fa-exclamation-circle"></i>
                    <span>${escapeHTML(error.message)}</span>
                </div>
            `;

            const chart = document.getElementById(
                "videotron-comparison-chart"
            );

            if (chart) {
                chart.innerHTML = `
                    <div class="videotron-error">
                        Grafik tidak dapat ditampilkan.
                    </div>
                `;
            }
        }
    }

    // ------------------------------------------------------
    // 1. FUNGSI PERSIAPAN DATA
    // ------------------------------------------------------

    function prepareComparison(primaryData, adjustedData) {

        const baselineMap = new Map();
        const primaryMap = new Map();
        const adjustedMap = new Map();

        primaryData.forEach(item => {
            if (Number(item.year) === BASELINE_YEAR) {
                baselineMap.set(
                    Number(item.monthNumber),
                    item
                );
            }

            if (Number(item.year) === CURRENT_YEAR) {
                primaryMap.set(
                    Number(item.monthNumber),
                    item
                );
            }
        });

        adjustedData.forEach(item => {
            if (Number(item.year) === CURRENT_YEAR) {
                adjustedMap.set(
                    Number(item.monthNumber),
                    item
                );
            }
        });

        // Hanya gunakan bulan yang tersedia pada ketiga seri.
        const months = [];

        for (let month = 1; month <= 12; month++) {

            const baseline = baselineMap.get(month);
            const primary = primaryMap.get(month);
            const adjusted = adjustedMap.get(month);

            if (
                !baseline ||
                !primary ||
                !adjusted
            ) {
                continue;
            }

            const baselineKwh = Number(baseline.totalKwh);
            const primaryKwh = Number(primary.totalKwh);
            const adjustedKwh = Number(adjusted.totalKwh);

            if (
                !Number.isFinite(baselineKwh) ||
                !Number.isFinite(primaryKwh) ||
                !Number.isFinite(adjustedKwh) ||
                baselineKwh <= 0 ||
                primaryKwh <= 0 ||
                adjustedKwh <= 0
            ) {
                continue;
            }

            months.push({
                monthNumber: month,
                month: baseline.month,
                baseline: baselineKwh,
                primary: primaryKwh,
                adjusted: adjustedKwh
            });
        }

        const baselineTotal = months.reduce(
            (sum, item) => sum + item.baseline,
            0
        );

        const primaryTotal = months.reduce(
            (sum, item) => sum + item.primary,
            0
        );

        const adjustedTotal = months.reduce(
            (sum, item) => sum + item.adjusted,
            0
        );

        const primaryChange = (
            (primaryTotal - baselineTotal) / baselineTotal
        );

        const adjustedSaving = (
            (baselineTotal - adjustedTotal) / baselineTotal
        );

        const targetAchievement = (
            adjustedSaving / SAVING_TARGET
        );

        return {
            months,
            monthCount: months.length,
            baselineTotal,
            primaryTotal,
            adjustedTotal,
            primaryChange,
            adjustedSaving,
            targetAchievement,
            targetRemaining: SAVING_TARGET - adjustedSaving
        };
    }

    // ------------------------------------------------------
    // 2. FORMAT ANGKA
    // ------------------------------------------------------

    function formatNumber(value) {
        return new Intl.NumberFormat("id-ID", {
            maximumFractionDigits: 0
        }).format(value);
    }

    function formatKwh(value) {
        return `${formatNumber(value)} kWh`;
    }

    function formatPercent(value, digits = 2) {
        return new Intl.NumberFormat("id-ID", {
            style: "percent",
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        }).format(value);
    }

    function formatSignedPercent(value) {
        const sign = value > 0 ? "+" : "";
        return sign + formatPercent(value);
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[char]);
    }

    // ------------------------------------------------------
    // 3. PERIODE ANALISIS
    // ------------------------------------------------------

    function renderPeriod(data) {

        const element = document.getElementById(
            "videotron-period"
        );

        if (!element) return;

        const first = data.months[0].month;
        const last = data.months[data.months.length - 1].month;

        element.textContent =
            `${first} – ${last} ${CURRENT_YEAR}`;
    }

    // ------------------------------------------------------
    // 4. KPI PERBANDINGAN
    // ------------------------------------------------------

    function renderKPIs(data) {

        const container = document.getElementById(
            "videotron-kpi-grid"
        );

        if (!container) return;

        const primaryStatus = data.primaryChange > 0
            ? "Konsumsi meningkat"
            : "Konsumsi menurun";

        const adjustedStatus = data.adjustedSaving >= 0
            ? "Penghematan energi"
            : "Konsumsi meningkat";

        const achievement = Math.max(
            0,
            data.targetAchievement
        );

        const achievementStatus = achievement >= 1
            ? "Target tercapai"
            : "Belum mencapai target";

        const remaining = Math.max(
            0,
            data.targetRemaining
        );

        container.innerHTML = `

            <article class="videotron-kpi-card primary-card">

                <div class="videotron-kpi-top">
                    <span class="videotron-kpi-label">
                        DENGAN VIDEOTRON
                    </span>

                    <span class="videotron-kpi-icon">
                        <i class="fas fa-tv"></i>
                    </span>
                </div>

                <div class="videotron-kpi-value ${
                    data.primaryChange > 0 ? "negative" : "positive"
                }">
                    ${formatSignedPercent(data.primaryChange)}
                </div>

                <div class="videotron-kpi-status">
                    ${primaryStatus} dibandingkan baseline 2025
                </div>

                <div class="videotron-kpi-divider"></div>

                <div class="videotron-kpi-detail">
                    Total konsumsi: <strong>
                    ${formatKwh(data.primaryTotal)}
                    </strong>
                </div>

            </article>

            <article class="videotron-kpi-card adjusted-card">

                <div class="videotron-kpi-top">
                    <span class="videotron-kpi-label">
                        TANPA VIDEOTRON
                    </span>

                    <span class="videotron-kpi-icon">
                        <i class="fas fa-leaf"></i>
                    </span>
                </div>

                <div class="videotron-kpi-value ${
                    data.adjustedSaving >= 0 ? "positive" : "negative"
                }">
                    ${formatPercent(data.adjustedSaving)}
                </div>

                <div class="videotron-kpi-status">
                    ${adjustedStatus} dibandingkan baseline 2025
                </div>

                <div class="videotron-kpi-divider"></div>

                <div class="videotron-kpi-detail">
                    Total konsumsi: <strong>
                    ${formatKwh(data.adjustedTotal)}
                    </strong>
                </div>

            </article>

            <article class="videotron-kpi-card target-card">

                <div class="videotron-kpi-top">
                    <span class="videotron-kpi-label">
                        PENCAPAIAN TARGET
                    </span>

                    <span class="videotron-kpi-icon">
                        <i class="fas fa-bullseye"></i>
                    </span>
                </div>

                <div class="videotron-kpi-value neutral">
                    ${formatPercent(achievement)}
                </div>

                <div class="videotron-kpi-status">
                    ${achievementStatus} penghematan 8%
                </div>

                <div class="videotron-kpi-progress">
                    <div
                        class="videotron-kpi-progress-bar"
                        style="width: ${Math.min(achievement * 100, 100)}%"
                    ></div>
                </div>

                <div class="videotron-kpi-detail">
                    Target: <strong>8%</strong>
                    ${
                        remaining > 0
                            ? ` · Sisa ${formatPercent(remaining)}`
                            : " · Target terpenuhi"
                    }
                </div>

            </article>

        `;
    }

    // ------------------------------------------------------
    // 5. GRAFIK PERBANDINGAN
    // ------------------------------------------------------

    function renderChart(data) {

        const container = document.getElementById(
            "videotron-comparison-chart"
        );

        if (!container) return;

        const width = 900;
        const height = 350;

        const margin = {
            top: 25,
            right: 35,
            bottom: 55,
            left: 75
        };

        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        const allValues = data.months.flatMap(item => [
            item.baseline,
            item.primary,
            item.adjusted
        ]);

        const rawMin = Math.min(...allValues);
        const rawMax = Math.max(...allValues);

        const padding = (rawMax - rawMin) * 0.15 || rawMax * 0.1;

        const minValue = Math.max(
            0,
            Math.floor((rawMin - padding) / 10000) * 10000
        );

        const maxValue = Math.ceil(
            (rawMax + padding) / 10000
        ) * 10000;

        const x = index => (
            margin.left +
            (data.months.length === 1
                ? chartWidth / 2
                : index * chartWidth / (data.months.length - 1))
        );

        const y = value => (
            margin.top +
            chartHeight -
            ((value - minValue) / (maxValue - minValue)) * chartHeight
        );

        const series = [
            {
                key: "baseline",
                color: COLORS.baseline,
                dash: "7 5"
            },
            {
                key: "primary",
                color: COLORS.primary,
                dash: ""
            },
            {
                key: "adjusted",
                color: COLORS.adjusted,
                dash: ""
            }
        ];

        let svg = `
            <svg
                viewBox="0 0 ${width} ${height}"
                role="img"
                aria-label="Grafik perbandingan konsumsi energi tahun 2025 dan 2026"
                xmlns="http://www.w3.org/2000/svg"
            >
        `;

        // Garis dan label sumbu Y
        for (let i = 0; i <= 4; i++) {

            const value = minValue +
                (maxValue - minValue) * i / 4;

            const positionY = y(value);

            svg += `
                <line
                    x1="${margin.left}"
                    y1="${positionY}"
                    x2="${width - margin.right}"
                    y2="${positionY}"
                    stroke="#E8EDF3"
                    stroke-width="1"
                />

                <text
                    x="${margin.left - 12}"
                    y="${positionY + 4}"
                    text-anchor="end"
                    fill="#64748B"
                    font-size="11"
                >
                    ${formatNumber(value / 1000)} rb
                </text>
            `;
        }

        // Label bulan
        data.months.forEach((item, index) => {

            svg += `
                <text
                    x="${x(index)}"
                    y="${height - 22}"
                    text-anchor="middle"
                    fill="#64748B"
                    font-size="11"
                >
                    ${escapeHTML(item.month.substring(0, 3))}
                </text>
            `;
        });

        // Garis data
        series.forEach(item => {

            const points = data.months.map((month, index) => (
                `${x(index)},${y(month[item.key])}`
            )).join(" ");

            svg += `
                <polyline
                    points="${points}"
                    fill="none"
                    stroke="${item.color}"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ${item.dash ? `stroke-dasharray="${item.dash}"` : ""}
                />
            `;

            data.months.forEach((month, index) => {

                svg += `
                    <circle
                        cx="${x(index)}"
                        cy="${y(month[item.key])}"
                        r="4"
                        fill="${item.color}"
                        stroke="#FFFFFF"
                        stroke-width="2"
                    >
                        <title>
                            ${escapeHTML(month.month)}:
                            ${formatKwh(month[item.key])}
                        </title>
                    </circle>
                `;
            });
        });

        svg += "</svg>";

        container.innerHTML = svg;
    }

    // ------------------------------------------------------
    // 6. KETERANGAN GRAFIK
    // ------------------------------------------------------

    function renderDescription(data) {

        const element = document.getElementById(
            "videotron-chart-description"
        );

        if (!element) return;

        element.textContent =
            `Menampilkan ${data.monthCount} bulan data aktual. ` +
            `Pada bulan Agustus dan September, konsumsi kedua skenario ` +
            `sama karena videotron tidak beroperasi pada periode tersebut.`;
    }

})();
