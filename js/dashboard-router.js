/* =====================================================
   EMIS DASHBOARD ROUTER
===================================================== */

function openDashboardFromHash() {

    console.log("HASH =", window.location.hash);

    const hash = window.location.hash.replace("#", "");

    if (!hash) return;

    /* Aktifkan tab */

    const tab = document.querySelector(
        `.tab[data-filter="${hash}"]`
    );

    if (tab) {

        tab.click();

    }

    /* Scroll ke dashboard */

    const dashboard = document.getElementById(
        hash + "-dashboard"
    );

    if (dashboard) {

        setTimeout(() => {

            dashboard.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }, 300);

    }

}