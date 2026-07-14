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

        image: "/img/dashboard/konsumsi-energi.png",

        category: "Energi",

        period: "Juli 2026",

        resolution: "1920 × 1080",

        format: "PNG",

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

        image: "/img/dashboard/ike.png",

        category: "Energi",

        period: "Juli 2026",

        resolution: "1920 × 1080",

        format: "PNG",

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

        image: "/img/dashboard/implementasi-efisiensi.png",

        category: "Konservasi Energi",

        period: "Juli 2026",

        resolution: "1920 × 1080",

        format: "PNG",

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

        image: "/img/dashboard/analisis-energi.png",

        category: "Analisis",

        period: "Juli 2026",

        resolution: "1920 × 1080",

        format: "PNG",

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

        image: "/img/dashboard/laporan-energi.png",

        category: "Laporan",

        period: "Juli 2026",

        format: "Dokumen",

        description:
        "Ringkasan laporan konsumsi energi, analisis, dan implementasi konservasi energi setiap bulan.",

        button: "Lihat Laporan"

    }

];