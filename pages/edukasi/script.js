/* =====================================================
   EMIS
   MODUL EDUKASI & BERITA
===================================================== */


/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener("DOMContentLoaded", init);

let currentView = "gallery";


function init() {

    loadModuleInformation();

    renderSummary();

    renderEducationDashboards();

    renderNews();

    initTabs();

    initViewerMode();

    openNewsFromQuery();

    openDashboardFromHash();

}


/* =====================================================
   RENDER EXECUTIVE SUMMARY
===================================================== */

function renderSummary(){

    const container =
        document.getElementById("summary-grid");

    if(!container) return;


    container.innerHTML =
        EDUCATION_SUMMARY.map(item => `

            <div class="summary-card">

                <div
                    class="summary-icon"
                    style="background:${item.color};">

                    <i class="${item.icon}"></i>

                </div>


                <div class="summary-info">

                    <span>
                        ${item.title}
                    </span>


                    <strong>
                        ${item.value}
                    </strong>


                    <small>
                        ${item.subtitle}
                    </small>

                </div>

            </div>

        `).join("");

}


/* =====================================================
   LOAD MODULE INFORMATION
===================================================== */

function loadModuleInformation() {


    /* PAGE PERIOD */

    const pagePeriod =
        document.getElementById("page-period");


    if(pagePeriod){

        pagePeriod.textContent =
            EDUCATION_CONFIG.period;

    }


    /* HEADER UPDATE PERIOD */

    const updatePeriode =
        document.getElementById("update-periode");


    if(updatePeriode){

        updatePeriode.textContent =
            EDUCATION_CONFIG.period;

    }


    /* EDUCATION COUNT */

    const dashboardCount =
        document.getElementById("dashboard-count");


    if(dashboardCount){

        dashboardCount.textContent =
            `${EDUCATION_CONFIG.totalDashboard} Materi`;

    }


    /* NEWS COUNT */

    const newsCount =
        document.getElementById("news-count");


    if(newsCount){

        newsCount.textContent =
            `${NEWS_DATA.length} Berita`;

    }


    /* PAGE TITLE */

    document.title =
        `${PAGE_CONFIG.title} | EMIS`;

}


/* =====================================================
   RENDER EDUCATION DASHBOARDS
===================================================== */

function renderEducationDashboards(filter="all") {


    const container =
        document.getElementById("education-dashboard");


    if(!container) return;


    container.classList.toggle(
        "focus-mode",
        currentView === "focus"
    );


    container.innerHTML = "";


    const dashboards =
        filter === "all"
        ? EDUCATION_DASHBOARDS
        : EDUCATION_DASHBOARDS.filter(
            item => item.type === filter
        );


    dashboards.forEach(item => {


        container.innerHTML += `

            <article
                class="viewer"
                id="${item.type}-dashboard">


                <!-- =================================
                     VIEWER HEADER
                ================================== -->

                <div class="viewer-header">


                    <div class="viewer-title">


                        <div
                            class="viewer-icon"
                            style="background:${item.color};">

                            <i class="${item.icon}"></i>

                        </div>


                        <div>

                            <h3>
                                ${item.title}
                            </h3>


                            <p>
                                ${item.description}
                            </p>

                        </div>

                    </div>


                    <div class="viewer-period">

                        <span>
                            Periode
                        </span>


                        <strong>
                            ${item.period}
                        </strong>

                    </div>


                </div>


                <!-- =================================
                     VIEWER IMAGE
                ================================== -->

                <div class="viewer-image">

                    <img
                        src="${item.image}"
                        alt="${item.title}">

                </div>


                <!-- =================================
                     VIEWER FOOTER
                ================================== -->

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
   EDUCATION FILTER
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


            renderEducationDashboards(
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


            renderEducationDashboards();


        });

    });

}


/* =====================================================
   RENDER NEWS
===================================================== */

function renderNews(){


    const container =
        document.getElementById("news-container");


    if(!container) return;


    container.innerHTML = "";


    if(!NEWS_DATA || NEWS_DATA.length === 0){

        container.innerHTML = `

            <div class="news-empty">

                <i class="fa-solid fa-newspaper"></i>

                <h3>
                    Belum Ada Berita
                </h3>

                <p>
                    Berita terbaru akan ditampilkan
                    pada bagian ini.
                </p>

            </div>

        `;

        return;

    }


    NEWS_DATA.forEach(news => {


        container.innerHTML += `

            <article
                class="news-card"
                data-news-id="${news.id}">


                <!-- =================================
                     NEWS IMAGE
                ================================== -->

                <div class="news-image">


                    <img
                        src="${news.image}"
                        alt="${news.title}"
                        loading="lazy">


                    <span class="news-category">

                        ${news.category}

                    </span>


                </div>


                <!-- =================================
                     NEWS CONTENT
                ================================== -->

                <div class="news-content">


                    <div class="news-date">

                        <i class="fa-regular fa-calendar"></i>

                        ${news.date}

                    </div>


                    <h3 class="news-title">

                        ${news.title}

                    </h3>


                    <p class="news-excerpt">

                        ${news.excerpt}

                    </p>


                    <a
                        href="?berita=${encodeURIComponent(news.id)}"
                        class="news-button">

                        Baca Selengkapnya

                        <i class="fa-solid fa-arrow-right"></i>

                    </a>


                </div>


            </article>

        `;

    });


    /* UPDATE NEWS COUNT */

    const newsCount =
        document.getElementById("news-count");


    if(newsCount){

        newsCount.textContent =
            `${NEWS_DATA.length} Berita`;

    }

}


/* =====================================================
   OPEN NEWS FROM QUERY
===================================================== */

function openNewsFromQuery(){


    const params =
        new URLSearchParams(
            window.location.search
        );


    const newsId =
        params.get("berita");


    if(!newsId) return;


    const news =
        NEWS_DATA.find(
            item => item.id === newsId
        );


    if(!news){

        return;

    }


    renderNewsDetail(news);


}


/* =====================================================
   RENDER NEWS DETAIL
===================================================== */

function renderNewsDetail(news){


    const newsContainer =
        document.getElementById("news-container");


    if(!newsContainer) return;


    newsContainer.classList.add(
        "news-detail-active"
    );


    newsContainer.innerHTML = `

        <article class="news-detail">


            <!-- =================================
                 BACK BUTTON
            ================================== -->

            <a
                href="index.html"
                class="news-back-button">

                <i class="fa-solid fa-arrow-left"></i>

                Kembali ke Berita

            </a>


            <!-- =================================
                 DETAIL IMAGE
            ================================== -->

            <div class="news-detail-image">

                <img
                    src="${news.image}"
                    alt="${news.title}">

            </div>


            <!-- =================================
                 DETAIL HEADER
            ================================== -->

            <div class="news-detail-header">


                <div class="news-detail-meta">


                    <span class="news-detail-category">

                        ${news.category}

                    </span>


                    <span class="news-detail-date">

                        <i class="fa-regular fa-calendar"></i>

                        ${news.date}

                    </span>


                </div>


                <h1>

                    ${news.title}

                </h1>


            </div>


            <!-- =================================
                 DETAIL CONTENT
            ================================== -->

            <div class="news-detail-content">

                ${news.content}

            </div>


        </article>

    `;


    /* SCROLL TO NEWS */

    setTimeout(() => {

        const section =
            document.querySelector(".news-section");


        if(section){

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }, 100);

}