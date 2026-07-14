/* =====================================================
   EMIS
   MODUL SISTEM BANGUNAN
   CONFIGURATION
===================================================== */

PAGE_CONFIG.title = "Modul Sistem Bangunan";

const BUILDING_CONFIG = {

    /* ==========================================
       IDENTITAS MODUL SISTEM BANGUNAN
    ========================================== */

    title: "Sistem Bangunan",

    subtitle: "Dashboard Sistem Bangunan",

    period: "Juli 2026",

    totalDashboard: 5

    
};

/* =====================================================
   EXECUTIVE SUMMARY
===================================================== */

const BUILDING_SUMMARY = [

    {
        icon: "fa-solid fa-chart-column",
        color: "#6C757D",
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
        color: "#198754",
        title: "Status",
        value: "Aktif",
        subtitle: "Siap digunakan"
    }

];


/* =====================================================
   DAFTAR DASHBOARD SISTEM BANGUNAN
===================================================== */

const BUILDING_DASHBOARDS = [

{
    id:"cahaya",
    type:"cahaya",
    title:"Tata Cahaya",
    icon:"fa-solid fa-lightbulb",
    color:"#FFC107",
    image:"/img/dashboard/tata-cahaya.png",
    category:"Sistem Bangunan",
    period:"Juli 2026",
    resolution:"1920 × 1080",
    format:"PNG",
    description:"Monitoring sistem pencahayaan Gedung A.",
    button:"Lihat Dashboard"
},

{
    id:"udara",
    type:"udara",
    title:"Tata Udara",
    icon:"fa-solid fa-fan",
    color:"#0DCAF0",
    image:"/img/dashboard/tata-udara.png",
    category:"Sistem Bangunan",
    period:"Juli 2026",
    resolution:"1920 × 1080",
    format:"PNG",
    description:"Monitoring sistem tata udara dan ventilasi.",
    button:"Lihat Dashboard"
},

{
    id:"transportasi",
    type:"transportasi",
    title:"Transportasi Vertikal",
    icon:"fa-solid fa-elevator",
    color:"#6F42C1",
    image:"/img/dashboard/transportasi-vertikal.png",
    category:"Sistem Bangunan",
    period:"Juli 2026",
    resolution:"1920 × 1080",
    format:"PNG",
    description:"Monitoring lift dan sistem transportasi vertikal.",
    button:"Lihat Dashboard"
},

{
    id:"peralatan",
    type:"peralatan",
    title:"Peralatan Pendukung",
    icon:"fa-solid fa-plug",
    color:"#FD7E14",
    image:"/img/dashboard/peralatan.png",
    category:"Sistem Bangunan",
    period:"Juli 2026",
    resolution:"1920 × 1080",
    format:"PNG",
    description:"Monitoring peralatan pendukung bangunan.",
    button:"Lihat Dashboard"
},

{
    id:"pemeliharaan",
    type:"pemeliharaan",
    title:"Pemeliharaan",
    icon:"fa-solid fa-screwdriver-wrench",
    color:"#198754",
    image:"/img/dashboard/pemeliharaan.png",
    category:"Sistem Bangunan",
    period:"Juli 2026",
    resolution:"1920 × 1080",
    format:"PNG",
    description:"Monitoring kegiatan pemeliharaan bangunan.",
    button:"Lihat Dashboard"
}

];