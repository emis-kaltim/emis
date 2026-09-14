/* =====================================================
   EMIS
   MODUL ENERGI
===================================================== */

document.addEventListener("DOMContentLoaded", init);

let currentView = "gallery";

/* =====================================================
   DEVICE DETECTION
===================================================== */

function isMobileDevice(){

    return (
        window.matchMedia("(pointer: coarse)").matches ||
        navigator.maxTouchPoints > 1
    );

}

/* =====================================================
   PDF PREVIEW
===================================================== */

function renderPDFPreview(item){

    /* ==========================================
       MOBILE / TABLET
    ========================================== */

    if(isMobileDevice()){

        return `

            <div class="viewer-pdf viewer-pdf-mobile">

                <div class="pdf-mobile-content">

                    <div class="pdf-mobile-icon">

                        <i class="fa-solid fa-file-pdf"></i>

                    </div>

                    <h4>PDF Dashboard</h4>

                    <p>
                        ${item.title}
                    </p>

                    <span>
                        ${item.pageSize} ${item.orientation}
                    </span>

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


    /* ==========================================
       DESKTOP
    ========================================== */

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
   INITIALIZATION
===================================================== */

function init() {

    loadModuleInformation();

    renderSummary();

    renderEnergyDashboards();

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

    container.innerHTML = ENERGY_SUMMARY.map(item => `

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
            ENERGY_CONFIG.period;

    }


    // Header Website
    const updatePeriode =
        document.getElementById("update-periode");

    if (updatePeriode) {

        updatePeriode.textContent =
            ENERGY_CONFIG.period;

    }


    // Total Dashboard
    const dashboardCount =
        document.getElementById("dashboard-count");

    if (dashboardCount) {

        dashboardCount.textContent =
            `${ENERGY_CONFIG.totalDashboard} Dashboard`;

    }


    // Judul Browser
    document.title =
        `${ENERGY_CONFIG.title} | EMIS`;

}


/* =====================================================
   RENDER DASHBOARD
===================================================== */

function renderEnergyDashboards(filter="all") {

    const container =
        document.getElementById("energy-dashboard");

    if (!container) return;


    /* ==========================================
       MODE GALERI / FOKUS
    ========================================== */

    container.classList.toggle(
        "focus-mode",
        currentView === "focus"
    );


    container.innerHTML = "";


    /* ==========================================
       FILTER DASHBOARD
    ========================================== */

    const dashboards =
        filter === "all"
        ? ENERGY_DASHBOARDS
        : ENERGY_DASHBOARDS.filter(
            item => item.type === filter
        );


    /* ==========================================
       RENDER SETIAP DASHBOARD
    ========================================== */

    dashboards.forEach(item => {

        container.innerHTML += `

        <article
            class="viewer"
            id="${item.type}-dashboard">


            <!-- ==================================
                 HEADER
            ================================== -->

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


            <!-- ==================================
                 PDF PREVIEW
            ================================== -->

            ${renderPDFPreview(item)}


            <!-- ==================================
                 FOOTER
            ================================== -->

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

function initTabs(){

    const tabs =
        document.querySelectorAll(".tab");


    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            tabs.forEach(t =>
                t.classList.remove("active")
            );


            tab.classList.add("active");


            renderEnergyDashboards(
                tab.dataset.filter
            );

        });

    });

}


/* =====================================================
   VIEW MODE
===================================================== */

function initViewerMode(){

    const buttons =
        document.querySelectorAll(".mode-btn");


    buttons.forEach(btn => {

        btn.addEventListener("click", () => {

            buttons.forEach(b =>
                b.classList.remove("active")
            );


            btn.classList.add("active");


            currentView =
                btn.dataset.mode;


            renderEnergyDashboards();

        });

    });

}