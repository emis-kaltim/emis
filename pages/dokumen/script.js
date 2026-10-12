
/* =====================================================
   EMIS
   MODUL DOKUMEN
===================================================== */

document.addEventListener("DOMContentLoaded", init);

let currentView = "gallery";

/* =====================================================
   INITIALIZATION
===================================================== */

function init() {
    loadModuleInformation();
    renderSummary();
    renderDocumentDashboards();
    initTabs();
    initViewerMode();
    openDashboardFromHash();
}

/* =====================================================
   RENDER EXECUTIVE SUMMARY
===================================================== */

function renderSummary() {
    const container = document.getElementById("summary-grid");

    if (!container) return;

    container.innerHTML = DOCUMENT_SUMMARY.map(item => `
        <div class="summary-card">
            <div
                class="summary-icon"
                style="background:${item.color};"
            >
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
    const pagePeriod = document.getElementById("page-period");

    if (pagePeriod) {
        pagePeriod.textContent = DOCUMENT_CONFIG.period;
    }

    const updatePeriode = document.getElementById("update-periode");

    if (updatePeriode) {
        updatePeriode.textContent = DOCUMENT_CONFIG.period;
    }

    const dashboardCount = document.getElementById("dashboard-count");

    if (dashboardCount) {
        dashboardCount.textContent =
            `${DOCUMENT_CONFIG.totalDashboard} Dokumen`;
    }

    document.title = `${DOCUMENT_CONFIG.title} | EMIS`;
}

/* =====================================================
   RENDER PDF DOCUMENTS
===================================================== */

function renderDocumentDashboards(filter = "all") {
    const container = document.getElementById("document-dashboard");

    if (!container) return;

    container.classList.toggle(
        "focus-mode",
        currentView === "focus"
    );

    const dashboards = filter === "all"
        ? DOCUMENT_DASHBOARDS
        : DOCUMENT_DASHBOARDS.filter(item => item.type === filter);

    container.innerHTML = dashboards.map(item => `
        <article
            class="viewer"
            id="${item.type}-dashboard"
        >
            <div class="viewer-header">
                <div class="viewer-title">
                    <div
                        class="viewer-icon"
                        style="background:${item.color};"
                    >
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

            <div class="viewer-image pdf-preview">
                <iframe
                    src="${item.pdf}#toolbar=0&navpanes=0&view=FitH"
                    title="Preview ${item.title}"
                    loading="lazy"
                ></iframe>
            </div>

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
                        <i class="fa-solid fa-calendar"></i>
                        ${item.period}
                    </span>
                </div>

                <a
                    href="${item.pdf}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="viewer-button"
                >
                    ${item.button}
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </div>
        </article>
    `).join("");
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

            renderDocumentDashboards(tab.dataset.filter);
        });
    });
}

/* =====================================================
   VIEW MODE: GALLERY / FOCUS
===================================================== */

function initViewerMode() {
    const buttons = document.querySelectorAll(".mode-btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(item => item.classList.remove("active"));
            button.classList.add("active");

            currentView = button.dataset.mode;

            const activeTab = document.querySelector(".tab.active");
            const filter = activeTab ? activeTab.dataset.filter : "all";

            renderDocumentDashboards(filter);
        });
    });
}