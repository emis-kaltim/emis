/* =====================================================
   EMIS
   MODUL ENERGI
   CONFIGURATION
===================================================== */

PAGE_CONFIG.title = "Modul Energi";

const ENERGY_CONFIG = {

    /* ==========================================
       IDENTITAS MODUL
    ========================================== */

    title: "Energi",

    subtitle: "Dashboard dan Analisis Energi",

    period: "Juli 2026",

    totalDashboard: 5

};


/* =====================================================
   EXECUTIVE SUMMARY
===================================================== */

const ENERGY_SUMMARY = [

    {
        icon: "fa-solid fa-chart-column",
        color: "#198754",
        title: "Dashboard",
        value: "5",
        subtitle: "Dashboard tersedia"
    },

    {
        icon: "fa-solid fa-calendar-days",
        color: "#0D6EFD",
        title: "Periode",
        value: "Juli 2026",
        subtitle: "Data terbaru"
    },

    {
        icon: "fa-solid fa-building",
        color: "#FD7E14",
        title: "Gedung",
        value: "Gedung A",
        subtitle: "Setda Prov. Kaltim"
    },

    {
        icon: "fa-solid fa-circle-check",
        color: "#20C997",
        title: "Status",
        value: "Aktif",
        subtitle: "Siap digunakan"
    }

];


/* =====================================================
   DAFTAR DASHBOARD
===================================================== */

const ENERGY_DASHBOARDS = [

    {

        id: "konsumsi",

        type: "konsumsi",

        title: "Konsumsi Energi",

        icon: "fa-solid fa-bolt",

        color: "#198754",

        pdf: "/emis/pdf/dashboard/konsumsi-energi.pdf",

        category: "Energi",

        period: "Juli 2026",

        pageSize: "Letter",

        orientation: "Portrait",

        format: "PDF",

        description:
        "Dashboard konsumsi energi listrik Gedung A Sekretariat Daerah Provinsi Kalimantan Timur.",

        button: "Lihat Dashboard"

    },

    {

        id: "ike",

        type: "ike",

        title: "Intensitas Konsumsi Energi (IKE)",

        icon: "fa-solid fa-chart-line",

        color: "#0D6EFD",

        pdf: "/emis/pdf/dashboard/ike.pdf",

        category: "Energi",

        period: "Juli 2026",

        pageSize: "Letter",

        orientation: "Portrait",

        format: "PDF",

        description:
        "Monitoring nilai Intensitas Konsumsi Energi (IKE) sebagai indikator efisiensi penggunaan energi listrik.",

        button: "Lihat Dashboard"

    },

    {

        id: "efisiensi",

        type: "efisiensi",

        title: "Implementasi Efisiensi Energi",

        icon: "fa-solid fa-leaf",

        color: "#20C997",

        pdf: "/emis/pdf/dashboard/implementasi-efisiensi.pdf",

        category: "Konservasi Energi",

        period: "Juli 2026",

        pageSize: "Letter",

        orientation: "Portrait",

        format: "PDF",

        description:
        "Dokumentasi implementasi program konservasi dan efisiensi energi pada Gedung A.",

        button: "Lihat Dashboard"

    },

    {

        id: "analisis",

        type: "analisis",

        title: "Analisis Konsumsi Energi",

        icon: "fa-solid fa-chart-column",

        color: "#FD7E14",

        pdf: "/emis/pdf/dashboard/analisis-energi.pdf",

        category: "Analisis",

        period: "Juli 2026",

        pageSize: "Letter",

        orientation: "Portrait",

        format: "PDF",

        description:
        "Analisis bulanan terhadap pola konsumsi energi sebagai dasar pengambilan keputusan manajemen energi.",

        button: "Lihat Dashboard"

    },

    {

        id: "laporan",

        type: "laporan",

        title: "Laporan Energi Bulanan",

        icon: "fa-solid fa-file-pdf",

        color: "#DC3545",

        pdf: "/emis/pdf/dashboard/laporan-energi.pdf",

        category: "Laporan",

        period: "Juli 2026",

        pageSize: "Letter",

        orientation: "Portrait",

        format: "PDF",

        description:
        "Ringkasan laporan konsumsi energi, analisis, dan implementasi konservasi energi setiap bulan.",

        button: "Lihat Laporan"

    }

];