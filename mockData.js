// mockData.js - Sahte Veritabanı
// Bu dosya modları, mesajları ve bildirimleri tutar.

const MODS_DB = [
    {
        id: 1,
        title: "Dark Aero Theme v3",
        author: "User123",
        category: "Görünüm",
        version: "3.1",
        size: "12 MB",
        desc: "Windows 7X için tam karanlık mod desteği. Göz yormayan renkler.",
        thumb: "Gemini_Generated_Image_bu2201bu2201bu22.png",
        downloads: 1250,
        likes: 340,
        date: "2026-01-15",
        comments: [
            { user: "Ali", text: "Mükemmel çalışıyor!" },
            { user: "Veli", text: "Eline sağlık." }
        ]
    },
    {
        id: 2,
        title: "Legacy Driver Pack",
        author: "TDCDev",
        category: "Sistem",
        version: "1.0",
        size: "450 MB",
        desc: "Eski yazıcılar ve tarayıcılar için gerekli sürücü paketi.",
        thumb: "Gemini_Generated_Image_rlpu1wrlpu1wrlpu.png",
        downloads: 5000,
        likes: 890,
        date: "2026-01-10",
        comments: []
    },
    {
        id: 3,
        title: "Win7X Start Orb Collection",
        author: "DesignerX",
        category: "Görünüm",
        version: "2.0",
        size: "5 MB",
        desc: "20 farklı başlat menüsü ikonu.",
        thumb: "Gemini_Generated_Image_x62xdwx62xdwx62x.png",
        downloads: 800,
        likes: 120,
        date: "2026-01-18",
        comments: []
    }
];

const USER_MESSAGES = [
    {
        id: 1,
        sender: "Windows 7X Team",
        subject: "Hesabınız Oluşturuldu",
        date: "2026-01-20",
        content: "Aramıza hoş geldin! Hesabını doğrulamak için ayarlara git.",
        read: false
    },
    {
        id: 2,
        sender: "NexusMods Bot",
        subject: "Modunuz Onaylandı",
        date: "2026-01-19",
        content: "Yüklediğiniz 'Legacy Driver Pack' başarıyla yayınlandı.",
        read: true
    }
];

const NOTIFICATIONS = [
    { text: "Yeni güncelleme (7X v2) yayınlandı!", type: "info" },
    { text: "Biri moduna yorum yaptı.", type: "success" }
];