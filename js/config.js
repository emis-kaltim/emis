/* =====================================================
   EMIS WEBSITE CONFIGURATION
===================================================== */

const PAGE_CONFIG = {

    title:"Executive Dashboard"

};

const SITE_CONFIG = {

    /* IDENTITAS WEBSITE */

    portalName: "Pusat Informasi Energi",

    portalSubtitle: "Portal Informasi Manajemen Energi",

    building: "Gedung A Sekretariat Daerah Provinsi Kalimantan Timur",

    institution: "Biro Umum Sekretariat Daerah Provinsi Kalimantan Timur",

    version: "EMIS 2.0",

    /* UPDATE */

    updateMonth: "Juli",

    updateYear: "2026",

    updateDate: "01 Juli 2026",

    /* COPYRIGHT */

    copyright: "© 2026 Biro Umum Sekretariat Daerah Provinsi Kalimantan Timur"

};


/* =====================================================
   DASHBOARD INFORMATION
===================================================== */

const DASHBOARDS = [

    {
        id: "konsumsi",

        title: "Konsumsi Energi",

        icon: "fa-solid fa-bolt",

        image: "img/dashboard/konsumsi-energi.png",

        period: "Juli 2026",

        category: "Energi",

        description: "Dashboard konsumsi energi listrik Gedung A.",

        featured:true,

        link: "pages/energi/index.html#konsumsi"
    },

    {
        id: "ike",

        title: "Intensitas Konsumsi Energi",

        icon: "fa-solid fa-chart-line",

        image: "img/dashboard/ike.png",

        period: "Juli 2026",

        category: "Energi",

        description: "Monitoring nilai IKE Gedung A.",

        featured:false,

        link: "pages/energi/index.html#ike"
    },

    {
        id: "ac",

        title: "Operasional AC",

        icon: "fa-solid fa-snowflake",

        image: "img/dashboard/operasional-ac.png",

        period: "Juli 2026",

        category: "Monitoring",

        description: "Monitoring operasional AC bulanan.",

        featured:true,

        link: "pages/monitoring/index.html#ac"
    },

    {
        id: "cuaca",

        title: "Monitoring Cuaca",

        icon: "fa-solid fa-cloud-sun",

        image: "img/dashboard/monitoring-cuaca.png",

        period: "Juli 2026",

        category: "Monitoring",

        description: "Monitoring kondisi cuaca bulanan.",

        featured:false,

        link: "pages/monitoring/index.html#cuaca"
    }

];

/* =====================================================
   MODUL INFORMATION
===================================================== */
const MODULES = [

    {
        id: "energi",
        title: "Energi",
        icon: "fa-solid fa-bolt",
        color: "#1B8A4B",
        total: 5,
        label: "Dashboard",
        description: "Konsumsi energi, IKE, analisis energi dan implementasi efisiensi.",
        page: "pages/energi/index.html"
    },

    {
        id: "monitoring",
        title: "Monitoring",
        icon: "fa-solid fa-temperature-half",
        color: "#0D6EFD",
        total: 2,
        label: "Dashboard",
        description: "Operasional AC dan monitoring cuaca.",
        page: "pages/monitoring/index.html"
    },

    {
        id: "bangunan",
        title: "Sistem Bangunan",
        icon: "fa-solid fa-building",
        color: "#6C757D",
        total: 5,
        label: "Dashboard",
        description: "Tata cahaya, tata udara, transportasi, peralatan dan pemeliharaan.",
        page: "pages/bangunan/index.html"
    },

    {
        id: "dokumen",
        title: "Dokumen",
        icon: "fa-solid fa-file-lines",
        color: "#FD7E14",
        total: 12,
        label: "Dokumen",
        description: "SK, kebijakan energi, laporan, SOP dan administrasi.",
        page: "pages/dokumen/index.html"
    },

    {
        id: "edukasi",
        title: "Edukasi",
        icon: "fa-solid fa-book-open",
        color: "#7C3AED",
        total: 15,
        label: "Materi",
        description: "Poster, video, panduan dan materi konservasi energi.",
        page: "pages/edukasi/index.html"
    }

];

/* =====================================================
   DASHBOARD QUICK ACCES INFORMATION
===================================================== */

const QUICK_ACCESS = [

{
    title:"Dashboard Energi",
    icon:"fa-solid fa-chart-line",
    color:"#198754",
    page:"pages/energi/index.html#konsumsi",
    description:"Dashboard konsumsi energi dan IKE."
},

{
    title:"Operasional AC",
    icon:"fa-solid fa-snowflake",
    color:"#0D6EFD",
    page:"pages/monitoring/index.html#ac",
    description:"Monitoring operasional AC bulanan."
},

{
    title:"Monitoring Cuaca",
    icon:"fa-solid fa-cloud-sun",
    color:"#20C997",
    page:"pages/monitoring/index.html#cuaca",
    description:"Data cuaca dan analisis lingkungan."
},

{
    title:"Laporan Bulanan",
    icon:"fa-solid fa-file-pdf",
    color:"#DC3545",
    page:"pages/dokumen/index.html#laporan",
    description:"Laporan konservasi energi bulanan."
},

{
    title:"Dokumen",
    icon:"fa-solid fa-folder-open",
    color:"#FD7E14",
    page:"pages/dokumen/index.html",
    description:"SK, SOP, kebijakan dan administrasi."
},

{
    title:"Sistem Bangunan",
    icon:"fa-solid fa-building",
    color:"#6C757D",
    page:"pages/bangunan/index.html",
    description:"Tata udara, tata cahaya dan peralatan."
}

];

/* =====================================================
   EXECUTIVE KPI
===================================================== */

const EXECUTIVE_KPI = [

{
    title:"Modul",
    value:MODULES.length,
    subtitle:"Modul EMIS",
    icon:"fa-solid fa-layer-group",
    color:"#198754"
},

{
    title:"Dashboard",
    value:DASHBOARDS.length,
    subtitle:"Executive Dashboard",
    icon:"fa-solid fa-chart-column",
    color:"#0D6EFD"
},

{
    title:"Update",
    value:`${SITE_CONFIG.updateMonth} ${SITE_CONFIG.updateYear}`,
    subtitle:"Periode Data",
    icon:"fa-solid fa-calendar-days",
    color:"#20C997"
},

{
    title:"Versi",
    value:SITE_CONFIG.version,
    subtitle:"Portal EMIS",
    icon:"fa-solid fa-code-branch",
    color:"#7C3AED"
},

{
    title:"Gedung",
    value:"Gedung A",
    subtitle:"Objek Monitoring",
    icon:"fa-solid fa-building",
    color:"#FD7E14"
},

{
    title:"Status",
    value:"Aktif",
    subtitle:"Sistem Online",
    icon:"fa-solid fa-circle-check",
    color:"#198754"
}

];

/* =====================================================
   EXECUTIVE STATISTICS
===================================================== */

const EXECUTIVE_STATS = [

    {
        title:"Konsumsi Energi",
        value:"128.540",
        unit:"kWh",
        icon:"fa-solid fa-bolt",
        color:"#198754"
    },

    {
        title:"IKE",
        value:"7,84",
        unit:"kWh/m²",
        icon:"fa-solid fa-chart-line",
        color:"#0D6EFD"
    },

    {
        title:"Penghematan",
        value:"8,2",
        unit:"%",
        icon:"fa-solid fa-leaf",
        color:"#20C997"
    },

    {
        title:"Operasional AC",
        value:"1.482",
        unit:"Jam",
        icon:"fa-solid fa-snowflake",
        color:"#0D6EFD"
    },

    {
        title:"Temperatur",
        value:"31,5",
        unit:"°C",
        icon:"fa-solid fa-temperature-half",
        color:"#FD7E14"
    },

    {
        title:"Dashboard",
        value:DASHBOARDS.length,
        unit:"Aktif",
        icon:"fa-solid fa-chart-column",
        color:"#6C757D"
    }

];