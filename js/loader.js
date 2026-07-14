/* ===========================================
   EMIS COMPONENT LOADER
=========================================== */

async function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) return;

    try {

        const response = await fetch(file);

        element.innerHTML = await response.text();

        /* ===============================
           SIDEBAR
        ================================ */

        if(id === "sidebar"){

            loadSidebarInformation();

            setActiveMenu();

        }

        if(id === "header"){

            loadHeaderInformation();

        }

        if(id==="footer"){

            loadFooterInformation();

        }
    }

    catch(error){

        console.error(
            "Gagal memuat : " + file
        );

    }

}

/* ===========================================
   LOAD COMPONENT
=========================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadComponent(

        "sidebar",

        INCLUDE_PATH + "sidebar.html"

    );

    loadComponent(

        "header",

        INCLUDE_PATH + "header.html"

    );

    loadComponent(

        "footer",

     INCLUDE_PATH + "footer.html"

    );

});

/* ===========================================
   LOAD HEADER
=========================================== */
function loadHeaderInformation(){

    const title =
        document.getElementById("page-title");

    if(title && typeof PAGE_CONFIG !== "undefined"){

        title.textContent =
            PAGE_CONFIG.title;

    }

}

/* ===========================================
   LOAD SIDEBAR
=========================================== */
function loadSidebarInformation(){

    const title =
        document.getElementById("sidebar-title");

    if(title){

        title.textContent = "EMIS";

    }

    const version =
        document.getElementById("sidebar-version");

    if(version){

        version.textContent =
            SITE_CONFIG.version;

    }

    const subtitle =
        document.getElementById("sidebar-subtitle");

    if(subtitle){

        subtitle.textContent =
            SITE_CONFIG.portalSubtitle;

    }

}

/* =====================================================
   ACTIVE SIDEBAR MENU
===================================================== */

function setActiveMenu(){

    const path =
        window.location.pathname.toLowerCase();

    let activeMenu = "dashboard";

    if(path.includes("/energi")){

        activeMenu = "energi";

    }

    else if(path.includes("/monitoring")){

        activeMenu = "monitoring";

    }

    else if(path.includes("/bangunan")){

        activeMenu = "bangunan";

    }

    else if(path.includes("/dokumen")){

        activeMenu = "dokumen";

    }

    else if(path.includes("/edukasi")){

        activeMenu = "edukasi";

    }

    else if(path.includes("/tentang")){

        activeMenu = "tentang";

    }

    document
        .querySelectorAll(".sidebar li")
        .forEach(item=>{

            item.classList.remove("active");

            if(item.dataset.menu===activeMenu){

                item.classList.add("active");

            }

        });

}

/* =====================================================
   LOAD FOOTER INFORMATION
===================================================== */

function loadFooterInformation(){

    const title =
        document.getElementById("footer-title");

    if(title){

        title.textContent =
            SITE_CONFIG.portalName;

    }

    const institution =
        document.getElementById("footer-institution");

    if(institution){

        institution.textContent =
            SITE_CONFIG.institution;

    }

    const version =
        document.getElementById("footer-version");

    if(version){

        version.textContent =
            SITE_CONFIG.version;

    }

    const update =
        document.getElementById("footer-update");

    if(update){

        update.textContent =
            `Update ${SITE_CONFIG.updateMonth} ${SITE_CONFIG.updateYear}`;

    }

}