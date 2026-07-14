/* =====================================================
   EMIS
   MODUL MONITORING
   CONFIGURATION
===================================================== */

PAGE_CONFIG.title = "Modul Monitoring";

const MONITORING_CONFIG = {

    /* ==========================================
       IDENTITAS MODUL
    ========================================== */

    title: "Monitoring",

    subtitle: "Monitoring Operasional Gedung",

    period: "Juli 2026",

    totalDashboard: 2

};

/* =====================================================
   EXECUTIVE SUMMARY
===================================================== */

const MONITORING_SUMMARY = [

    {
        icon: "fa-solid fa-chart-column",
        color: "#0D6EFD",
        title: "Dashboard",
        value: "2",
        subtitle: "Dashboard tersedia"
    },

    {
        icon: "fa-solid fa-calendar-days",
        color: "#20C997",
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
        color: "#198754",
        title: "Status",
        value: "Aktif",
        subtitle: "Monitoring berjalan"
    }

];


/* =====================================================
   DAFTAR DASHBOARD MONITORING
===================================================== */

const MONITORING_DASHBOARDS = [

    {
        id:"ac",

        type:"ac",

        title:"Operasional AC",

        icon:"fa-solid fa-snowflake",

        color:"#0D6EFD",

        image:"/img/dashboard/operasional-ac.png",

        category:"Monitoring",

        period:"Juli 2026",

        resolution:"1920 × 1080",

        format:"PNG",

        description:
        "Monitoring operasional AC Gedung A.",

        button:"Lihat Dashboard"

    },

    {
        id:"cuaca",

        type:"cuaca",

        title:"Monitoring Cuaca",

        icon:"fa-solid fa-cloud-sun",

        color:"#20C997",

        image:"/img/dashboard/monitoring-cuaca.png",

        category:"Monitoring",

        period:"Juli 2026",

        resolution:"1920 × 1080",

        format:"PNG",

        description:
        "Monitoring suhu, kelembaban, dan kondisi lingkungan Gedung A.",

        button:"Lihat Dashboard"

    }

];