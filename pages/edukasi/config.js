/* =====================================================
EMIS
MODUL EDUKASI & BERITA
CONFIGURATION
===================================================== */

/* =====================================================
PAGE CONFIGURATION
===================================================== */

PAGE_CONFIG.title = "Edukasi & Berita";

/* =====================================================
EDUCATION CONFIGURATION
===================================================== */

const EDUCATION_CONFIG = {

/* ==========================================
   IDENTITAS MODUL EDUKASI
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

    icon: "fa-solid fa-folder-open",

    color: "#FD7E14",

    title: "Edukasi",

    value: "5",

    subtitle: "Kategori dokumen"

},


{

    icon: "fa-solid fa-calendar-days",

    color: "#0D6EFD",

    title: "Periode",

    value: "2026",

    subtitle: "Update terbaru"

},


{

    icon: "fa-solid fa-building",

    color: "#198754",

    title: "Dokumen",

    value: "Edukasi",

    subtitle: "Setda Prov. Kaltim"

},


{

    icon: "fa-solid fa-circle-check",

    color: "#20C997",

    title: "Status",

    value: "Aktif",

    subtitle: "Dokumen tersedia"

}

];

/* =====================================================
EDUCATION DASHBOARDS
===================================================== */

const EDUCATION_DASHBOARDS = [

{

    id: "poster",

    type: "poster",

    title: "Poster",

    icon: "fa-solid fa-image",

    color: "#0D6EFD",

    image: "/emis/img/dashboard/poster.png",

    category: "Poster",

    period: "2026",

    resolution: "618x828",

    format: "PNG",

    description:
        "Poster terkait konservasi energi.",

    button: "Buka Dokumen"

},


{

    id: "panduan",

    type: "panduan",

    title: "Panduan",

    icon: "fa-solid fa-book",

    color: "#20C997",

    image: "/emis/img/dashboard/panduan.png",

    category: "Dokumen",

    period: "2026",

    resolution: "PDF",

    format: "Dokumen",

    description:
        "Panduan penerapan efisiensi energi pada bangunan gedung.",

    button: "Buka Dokumen"

},


{

    id: "video",

    type: "video",

    title: "Video",

    icon: "fa-solid fa-video",

    color: "#198754",

    image: "/emis/img/dashboard/video.png",

    category: "Video",

    period: "2026",

    resolution: "MP4",

    format: "MP4",

    description:
        "Video terkait konservasi energi.",

    button: "Buka Video"

},


{

    id: "infografis",

    type: "infografis",

    title: "Infografis",

    icon: "fa-solid fa-file-lines",

    color: "#DC3545",

    image: "/emis/img/dashboard/infografis.png",

    category: "Dokumen",

    period: "2026",

    resolution: "PDF",

    format: "Dokumen",

    description:
        "Infografis terkait konservasi dan efisiensi energi.",

    button: "Buka Dokumen"

},


{

    id: "materi",

    type: "materi",

    title: "Materi",

    icon: "fa-solid fa-folder",

    color: "#6C757D",

    image: "/emis/img/dashboard/materi.png",

    category: "Materi",

    period: "2026",

    resolution: "PDF",

    format: "Dokumen",

    description:
        "Materi edukasi EMIS.",

    button: "Buka Dokumen"

}

];

/* =====================================================
NEWS CONFIGURATION
===================================================== */

const NEWS_CONFIG = {

/* ==========================================
   IDENTITAS BERITA
========================================== */

title: "Berita Terkini",

subtitle:
    "Informasi dan berita terbaru seputar energi dan bangunan gedung.",

totalNews: 0

};

/* =====================================================
NEWS DATA
===================================================== */

const NEWS_DATA = [

/* ==========================================
   BERITA 001
========================================== */

{

    id: "berita-001",

    title:
        "Penerapan Konservasi Energi pada Gedung Sekretariat Daerah",

    date: "01 Juli 2026",

    category: "Konservasi Energi",

    image:
        "/emis/img/berita/berita-001.png",

    excerpt:
        "Informasi mengenai penerapan konservasi energi dan efisiensi penggunaan energi pada Gedung A Sekretariat Daerah Provinsi Kalimantan Timur.",

    content: `

        <p>
            Pengelolaan energi pada bangunan gedung merupakan
            bagian penting dalam mendukung penggunaan energi
            yang efisien dan berkelanjutan.
        </p>

        <p>
            Melalui EMIS, informasi mengenai konsumsi energi,
            pemantauan operasional, serta berbagai kegiatan
            konservasi energi dapat disajikan secara terintegrasi.
        </p>

        <p>
            Informasi lebih lanjut mengenai kegiatan dan penerapan
            konservasi energi akan diperbarui secara berkala
            melalui portal EMIS.
        </p>

    `

},


/* ==========================================
   BERITA 002
========================================== */

{

    id: "berita-002",

    title:
        "Edukasi Efisiensi Energi untuk Mendukung Bangunan Gedung Berkelanjutan",

    date: "05 Juli 2026",

    category: "Edukasi",

    image:
        "/emis/img/berita/berita-002.png",

    excerpt:
        "Edukasi mengenai langkah sederhana dan penerapan efisiensi energi dalam mendukung operasional bangunan gedung yang lebih hemat energi.",

    content: `

        <p>
            Efisiensi energi dapat diterapkan melalui berbagai
            langkah sederhana dalam kegiatan operasional sehari-hari.
        </p>

        <p>
            Penggunaan peralatan secara tepat, pengaturan tata
            udara dan tata cahaya, serta penerapan perilaku hemat
            energi menjadi bagian dari upaya pengelolaan energi
            pada bangunan gedung.
        </p>

        <p>
            Materi edukasi mengenai konservasi dan efisiensi energi
            dapat digunakan sebagai referensi bagi pengguna gedung
            dalam mendukung pengelolaan energi yang berkelanjutan.
        </p>

    `

}

];
