/* =====================================================
   EMIS
   MODUL DOKUMEN
   CONFIGURATION
===================================================== */

PAGE_CONFIG.title = "Modul Dokumen";

const DOCUMENT_CONFIG = {

    /* ==========================================
       IDENTITAS MODUL DOKUMEN
    ========================================== */

    title: "Dokumen",

    subtitle: "Dokumen dan Administrasi",

    period: "Juli 2026",

    totalDashboard: 5

};

/* =====================================================
   EXECUTIVE SUMMARY
===================================================== */

const DOCUMENT_SUMMARY = [

    {
        icon:"fa-solid fa-folder-open",
        color:"#FD7E14",
        title:"Dokumen",
        value:"5",
        subtitle:"Kategori dokumen"
    },

    {
        icon:"fa-solid fa-calendar-days",
        color:"#0D6EFD",
        title:"Periode",
        value:"Juli 2026",
        subtitle:"Update terbaru"
    },

    {
        icon:"fa-solid fa-building",
        color:"#198754",
        title:"Gedung",
        value:"Gedung A",
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

const DOCUMENT_DASHBOARDS = [

{
id:"sk",
type:"sk",
title:"Surat Keputusan",
icon:"fa-solid fa-gavel",
color:"#0D6EFD",
image:"/img/dashboard/sk.png",
category:"Dokumen",
period:"Juli 2026",
resolution:"PDF",
format:"Dokumen",
description:"Kumpulan Surat Keputusan terkait konservasi energi.",
button:"Buka Dokumen"
},

{
id:"kebijakan",
type:"kebijakan",
title:"Kebijakan Energi",
icon:"fa-solid fa-scale-balanced",
color:"#198754",
image:"/img/dashboard/kebijakan.png",
category:"Dokumen",
period:"Juli 2026",
resolution:"PDF",
format:"Dokumen",
description:"Dokumen kebijakan konservasi energi.",
button:"Buka Dokumen"
},

{
id:"sop",
type:"sop",
title:"SOP",
icon:"fa-solid fa-book",
color:"#20C997",
image:"/img/dashboard/sop.png",
category:"Dokumen",
period:"Juli 2026",
resolution:"PDF",
format:"Dokumen",
description:"Standar Operasional Prosedur pengelolaan energi.",
button:"Buka Dokumen"
},

{
id:"laporan",
type:"laporan",
title:"Laporan Bulanan",
icon:"fa-solid fa-file-pdf",
color:"#DC3545",
image:"/img/dashboard/laporan.png",
category:"Dokumen",
period:"Juli 2026",
resolution:"PDF",
format:"Dokumen",
description:"Laporan konsumsi energi bulanan.",
button:"Buka Dokumen"
},

{
id:"administrasi",
type:"administrasi",
title:"Administrasi",
icon:"fa-solid fa-folder",
color:"#6C757D",
image:"/img/dashboard/administrasi.png",
category:"Dokumen",
period:"Juli 2026",
resolution:"PDF",
format:"Dokumen",
description:"Dokumen administrasi EMIS.",
button:"Buka Dokumen"
}

];