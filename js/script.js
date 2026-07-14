/* =====================================================
   EMIS WEBSITE
   Main JavaScript
===================================================== */


/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener("DOMContentLoaded", init);


/* =====================================================
   INIT WEBSITE
===================================================== */

function init() {

    loadSiteConfig();
    renderExecutiveKPI();
    renderFeaturedDashboards();
    renderExecutiveStatistics();
    renderModules();
    renderQuickAccess();
    renderDashboards();
    initDashboardSearch();
}

/* =====================================================
   LOAD WEBSITE CONFIGURATION
===================================================== */

function loadSiteConfig() {

    /* ==========================================
       TOTAL MODUL
    ========================================== */

    const moduleCount =
        document.getElementById("module-count");

    if (moduleCount) {

        moduleCount.textContent =
            `${MODULES.length} Modul`;

    }

    /* ==========================================
       HERO STATUS - TOTAL MODUL
    ========================================== */

    const heroModuleCount =
        document.getElementById("hero-module-count");

    if (heroModuleCount) {

        heroModuleCount.textContent =
            MODULES.length;

    }

    /* ==========================================
       UPDATE PERIODE
    ========================================== */

    const updateElement =
        document.getElementById("update-periode");

    if (updateElement) {

        updateElement.textContent =
            `${SITE_CONFIG.updateMonth} ${SITE_CONFIG.updateYear}`;

    }

    /* ==========================================
       QUICK ACCESS
    ========================================== */

    const quickCount =
        document.getElementById("quick-count");

    if (quickCount) {

        quickCount.textContent =
            `${QUICK_ACCESS.length} Shortcut`;

    }

    /* ==========================================
       TOTAL DASHBOARD
    ========================================== */

    const dashboardCount =
        document.getElementById("dashboard-count");

    if (dashboardCount) {

        dashboardCount.textContent =
            `${DASHBOARDS.length} Dashboard`;

    }

    /* ==========================================
       HERO STATUS - TOTAL DASHBOARD
    ========================================== */

    const heroDashboardCount =
        document.getElementById("hero-dashboard-count");

    if (heroDashboardCount) {

        heroDashboardCount.textContent =
            DASHBOARDS.length;

    }

}

/* =====================================================
   RENDER DASHBOARD CARD
===================================================== */

function renderDashboards(keyword = "") {
    console.log("renderDashboards dipanggil");
    console.log("keyword =", keyword);
    const container =
        document.getElementById("dashboard-grid");

    if (!container) return;

    const key =
        keyword.trim().toLowerCase();

    const filtered =
        DASHBOARDS.filter(item => {

            return (

                item.title.toLowerCase().includes(key) ||

                item.category.toLowerCase().includes(key) ||

                item.description.toLowerCase().includes(key)

            );

        });

    /* ==========================================
       EMPTY STATE
    ========================================== */

    if (filtered.length === 0) {

        container.innerHTML = `

            <div class="empty-dashboard">

                <i class="fa-solid fa-folder-open"></i>

                <h3>Dashboard tidak ditemukan</h3>

                <p>Silakan gunakan kata kunci lain.</p>

            </div>

        `;

        return;

    }

    /* ==========================================
       RENDER DASHBOARD
    ========================================== */

    container.innerHTML = "";

    filtered.forEach(item => {

        container.innerHTML += `

        <div class="dashboard-card">

            <div class="dashboard-image">

                <img
                    src="${item.image}"
                    alt="${item.title}">

            </div>

            <div class="dashboard-content">

                <div class="dashboard-title">

                    <i class="${item.icon}"></i>

                    ${item.title}

                </div>

                <div class="dashboard-meta">

                    <span>${item.category}</span>

                    <span>${item.period}</span>

                </div>

                <div class="dashboard-description">

                    ${item.description}

                </div>

                <a
                    href="${item.link}"
                    class="card-button">

                    Buka Dashboard

                    <i class="fa-solid fa-arrow-right"></i>

                </a>

            </div>

        </div>

        `;

    });

}



/* ========RENDER EMIS MODULES========= */

function renderModules() {

    const container = document.getElementById("module-grid");

    if (!container) return;

    const cards = MODULES.map(module => `

        <div class="module-card">

             <div class="module-icon"
                style="background:${module.color};">

                <i class="${module.icon}"></i>

            </div>

            <div class="module-body">

                 <h3>${module.title}</h3>

                <span class="module-total">

                    ${module.total}
                    ${module.label}

                </span>

                <p>

                    ${module.description}

                </p>

                <a href="${module.page}" class="module-link">

                    Lihat Modul

                    <i class="fa-solid fa-arrow-right"></i>

                </a>

            </div>

        </div>

    `).join("");

    container.innerHTML = cards;

}

/* =====================================================
RENDER QUICK ACCESS
===================================================== */

function renderQuickAccess() {

    const container =
        document.getElementById("quick-grid");

    if (!container) return;

    container.innerHTML = QUICK_ACCESS.map(item => `

        <a
            href="${item.page}"
            class="quick-card">

            <div
                class="quick-icon"
                style="background:${item.color};">

                <i class="${item.icon}"></i>

            </div>

            <div>

                <h3>${item.title}</h3>

                <p>

                    ${item.description ?? ""}

                </p>

            </div>

            <div class="quick-footer">

                <span>Buka</span>

                <i class="fa-solid fa-arrow-right"></i>

            </div>

        </a>

    `).join("");

}

/* =====================================================
   RENDER EXECUTIVE KPI
===================================================== */

function renderExecutiveKPI() {

    const container =
        document.getElementById("executive-grid");

    if (!container) return;

    container.innerHTML =
        EXECUTIVE_KPI.map(item => `

        <div class="summary-card">

            <div
                class="summary-icon"
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
   RENDER FEATURED DASHBOARD
===================================================== */

function renderFeaturedDashboards() {

    const container =
        document.getElementById("featured-dashboard");

    if (!container) return;

    const dashboards =
        DASHBOARDS.filter(item => item.featured);

    container.innerHTML =
        dashboards.map(item => `

        <article class="latest-card">

            <img
                src="${item.image}"
                alt="${item.title}">

            <div class="latest-content">

                <span>

                    ${item.category}

                </span>

                <h3>

                    ${item.title}

                </h3>

                <p>

                    ${item.description}

                </p>

                <a
                    href="${item.link}">

                    Buka Dashboard

                    <i class="fa-solid fa-arrow-right"></i>

                </a>

            </div>

        </article>

    `).join("");

}

/* =====================================================
   RENDER EXECUTIVE STATISTICS
===================================================== */

function renderExecutiveStatistics() {

    const container =
        document.getElementById("statistics-grid");

    if (!container) return;

    container.innerHTML =
        EXECUTIVE_STATS.map(item => `

        <article class="stat-card">

            <div
                class="stat-icon"
                style="background:${item.color};">

                <i class="${item.icon}"></i>

            </div>

            <div class="stat-info">

                <span>

                    ${item.title}

                </span>

                <strong>

                    ${item.value}

                </strong>

                <small>

                    ${item.unit}

                </small>

            </div>

        </article>

    `).join("");

}

/* =====================================================
SEARCH DASHBOARD
===================================================== */

function initDashboardSearch() {

    console.log("Search initialized");

    const input =
        document.getElementById("dashboard-search");

    console.log(input);

    if (!input) return;

    input.addEventListener("input", function () {

        console.log("Searching:", input.value);

        renderDashboards(input.value);

    });

}