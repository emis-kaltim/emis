/* =====================================================
   EMIS
   MODUL EDUKASI
   CONFIGURATION
===================================================== */

PAGE_CONFIG.title = "Modul Edukasi";

const EDUCATION_CONFIG = {

    /* ==========================================
       IDENTITAS MODUL DOKUMEN
    ========================================== */

    title: "Edukasi",

    subtitle: "Edukasi",

    period: "2026",

    totalDashboard: 5

};

/* =====================================================
   EXECUTIVE SUMMARY
===================================================== */

const EDUCATION_SUMMARY = [

    {
        icon:"fa-solid fa-folder-open",
        color:"#FD7E14",
        title:"Edukasi",
        value:"5",
        subtitle:"Kategori dokumen"
    },

    {
        icon:"fa-solid fa-calendar-days",
        color:"#0D6EFD",
        title:"Periode",
        value:"2026",
        subtitle:"Update terbaru"
    },

    {
        icon:"fa-solid fa-building",
        color:"#198754",
        title:"Dokumen",
        value:"Edukasi",
        subtitle:"Setda Prov. Kaltim"
    },

    {
        icon:"fa-solid fa-circle-check",
        color:"#20C997",
        title:"Status",
        value:"Aktif",
        subtitle:"Dokumen tersedia"
    }

];


/* =====================================================
   DAFTAR DASHBOARD DOKUMEN
===================================================== */

const EDUCATION_DASHBOARDS = [

{
id:"poster",
type:"poster",
title:"poster",
icon:"fa-solid fa-gavel",
color:"#0D6EFD",
image:"/img/dashboard/poster.png",
category:"Poster",
period:"Juli 2026",
resolution:"618x828",
format:"png",
description:"Poster terkait konservasi energi.",
button:"Buka Dokumen"
},

{
id:"panduan",
type:"panduan",
title:"Panduan",
icon:"fa-solid fa-book",
color:"#20C997",
image:"/img/dashboard/panduan.png",
category:"Dokumen",
period:"Juli 2026",
resolution:"PDF",
format:"Dokumen",
description:"Panduan penerapan efisiensi energi pada bangunan gedung.",
button:"Buka Dokumen"
},

{
id:"video",
type:"video",
title:"Video",
icon:"fa-solid fa-scale-balanced",
color:"#198754",
image:"/img/dashboard/video.png",
category:"Dokumen",
period:"Juli 2026",
resolution:"mp4",
format:"mp4",
description:"Video terkait konservasi energi.",
button:"Buka Video"
},

{
id:"infografis",
type:"infografis",
title:"Infografis",
icon:"fa-solid fa-file-pdf",
color:"#DC3545",
image:"/img/dashboard/infografis.png",
category:"Dokumen",
period:"Juli 2026",
resolution:"PDF",
format:"Dokumen",
description:"Infografis.",
button:"Buka Dokumen"
},

{
id:"materi",
type:"materi",
title:"Materi",
icon:"fa-solid fa-folder",
color:"#6C757D",
image:"/img/dashboard/materi.png",
category:"Dokumen",
period:"Juli 2026",
resolution:"PDF",
format:"Dokumen",
description:"Materi EMIS.",
button:"Buka Dokumen"
}

];