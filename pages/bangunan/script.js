/* =====================================================
   EMIS
   MODUL SISTEM BANGUNAN
===================================================== */

document.addEventListener("DOMContentLoaded", init);
let currentView = "gallery";

/* =====================================================
   INITIALIZATION
===================================================== */

function init() {

    loadModuleInformation();

    renderSummary();

    renderBuildingDashboards();

    initTabs();

    initViewerMode();

    openDashboardFromHash();


}


/* =====================================================
   RENDER EXECUTIVE SUMMARY
===================================================== */

function renderSummary(){

    const container =
        document.getElementById("summary-grid");

    if(!container) return;

    container.innerHTML = BUILDING_SUMMARY.map(item => `

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
   LOAD MODULE INFORMATION
===================================================== */

function loadModuleInformation() {

    // Header Periode
    const pagePeriod =
        document.getElementById("page-period");

    if (pagePeriod) {

        pagePeriod.textContent =
            BUILDING_CONFIG.period;

    }

    // Header Website
    const updatePeriode =
        document.getElementById("update-periode");

    if (updatePeriode) {

        updatePeriode.textContent =
            BUILDING_CONFIG.period;

    }

    // Total Dashboard
    const dashboardCount =
        document.getElementById("dashboard-count");

    if (dashboardCount) {

        dashboardCount.textContent =
            `${BUILDING_CONFIG.totalDashboard} Dashboard`;

    }

    // Judul Browser
    document.title =
        `${BUILDING_CONFIG.title} | EMIS`;

}


/* =====================================================
   RENDER DASHBOARD
===================================================== */

function renderBuildingDashboards(filter="all") {

    const container =
        document.getElementById("building-dashboard");

    if (!container) return;
    /* Mode Galeri / Fokus*/
    
    container.classList.toggle(
        "focus-mode",
        currentView==="focus"
    );

    container.innerHTML = "";

    const dashboards =
        filter === "all"
        ? BUILDING_DASHBOARDS
        : BUILDING_DASHBOARDS.filter(item => item.type === filter);

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

            <div class="viewer-image">

                <img
                    src="${item.image}"
                    alt="${item.title}">

            </div>

            <div class="viewer-footer">

                <div class="viewer-meta">

                    <span>

                        <i class="fa-solid fa-folder"></i>

                        ${item.category}

                    </span>

                    <span>

                        <i class="fa-solid fa-image"></i>

                        ${item.format}

                    </span>

                    <span>

                        <i class="fa-solid fa-expand"></i>

                        ${item.resolution}

                    </span>

                </div>

                <a
                    href="${item.image}"
                    target="_blank"
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

function initTabs(){

    const tabs =
        document.querySelectorAll(".tab");

    tabs.forEach(tab=>{

        tab.addEventListener("click",()=>{

            tabs.forEach(t=>t.classList.remove("active"));

            tab.classList.add("active");

            renderBuildingDashboards(tab.dataset.filter);

        });

    });

}

/* =====================================================
VIEW MODE
===================================================== */

function initViewerMode(){

    const buttons =
        document.querySelectorAll(".mode-btn");

    buttons.forEach(btn=>{

        btn.addEventListener("click",()=>{

            buttons.forEach(b=>b.classList.remove("active"));

            btn.classList.add("active");

            currentView = btn.dataset.mode;

            renderBuildingDashboards();

        });

    });

}

