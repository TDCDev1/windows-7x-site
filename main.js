// main.js - Windows 7X Resmi Site Mantığı
// Sürüm: 4.0 (AI Fix + Profil/Ayarlar Ayrımı + ISO Upload)

// --- 1. KULLANICI VERİTABANI ---
const adminUser = {
    username: "TDCDev",
    password: "himmlerite123789", 
    role: "Kurucu (Admin)",
    email: "windows7x.contact@gmail.com",
    avatar: "image_12.png", // Senin gönderdiğin resim
    about: "Windows 7X projesinin kurucusu, baş geliştiricisi ve sistem mimarı. Modern ve hızlı sistemler tasarlar."
};

// --- 2. BAŞLANGIÇ AYARLARI ---
document.addEventListener("DOMContentLoaded", () => {
    checkLoginStatus();
    
    // Eğer hesap sayfasındaysak paneli çiz
    if(document.getElementById("account-wrapper")) {
        renderAccountPage();
    }
    
    // Eğer mod detay sayfasındaysak yorumları yükle
    if(document.getElementById("comments-list")) {
        loadComments();
    }
});

// --- 3. GİRİŞ / ÇIKIŞ İŞLEMLERİ ---
function login(username, password) {
    if (username === adminUser.username && password === adminUser.password) {
        localStorage.setItem("currentUser", JSON.stringify(adminUser));
        window.location.href = "index.html";
        return true;
    } else {
        alert("Hatalı Kullanıcı Adı veya Şifre!");
        return false;
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const navAuth = document.getElementById("nav-auth");

    if (user) {
        // Kullanıcı Giriş Yapmışsa -> Profile Git
        if(navAuth) {
            navAuth.innerHTML = `
                <div style="display:flex; align-items:center; gap:10px;">
                    <a href="account.html" style="text-decoration:none; display:flex; align-items:center; gap:10px; color:inherit;" title="Profili Görüntüle">
                        <img src="${user.avatar}" style="width:32px; height:32px; border-radius:50%; object-fit:cover; border:2px solid #0067b8;">
                        <div style="line-height:1.2;">
                            <span style="font-weight:bold; display:block; font-size:13px;">${user.username}</span>
                            <span style="font-size:10px; background:#28a745; color:white; padding:1px 6px; border-radius:10px;">${user.role}</span>
                        </div>
                    </a>
                </div>
            `;
        }
        
        // Admin Yetkileri (İndirme Butonları Altı)
        if (user.username === "TDCDev") {
            const adminControls = document.querySelectorAll(".admin-only");
            adminControls.forEach(el => el.style.display = "block");
        }
        
        // Workshop Upload Butonu
        const uploadBtn = document.getElementById("upload-btn-link");
        if(uploadBtn) uploadBtn.style.display = "inline-flex";

    } else {
        // Giriş Yapılmamışsa
        if(navAuth) {
            navAuth.innerHTML = `<a href="login.html" style="background:#0067b8; color:white; padding:8px 20px; text-decoration:none; border-radius:4px; font-weight:bold; font-size:14px;">Giriş Yap</a>`;
        }
        const uploadBtn = document.getElementById("upload-btn-link");
        if(uploadBtn) uploadBtn.style.display = "none";
    }
}

// --- 4. HESAP SAYFASI (DİNAMİK RENDER) ---
function renderAccountPage() {
    const wrapper = document.getElementById("account-wrapper");
    if (!wrapper) return;

    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // Menü Butonlarını Hazırla
    // 1. Herkes Profilini Görebilir (Görünüm Modu)
    let sidebarHTML = `<button onclick="switchTab('profile_view')" id="btn-profile_view" class="active">👤 Profilim</button>`;
    
    // 2. Kendi Profilindeyse AYARLAR sekmesi görünür
    // (Burada currentUser zaten giriş yapan kişi olduğu için her zaman görünür, 
    // ama mantık olarak "kendi profili" kontrolü burasıdır)
    sidebarHTML += `<button onclick="switchTab('settings')" id="btn-settings">⚙️ Hesabı Düzenle</button>`;

    // 3. Admin ise ISO Paneli görünür
    if (user.role === "Kurucu (Admin)") {
        sidebarHTML += `<button onclick="switchTab('admin')" id="btn-admin">👑 Yönetici Paneli (ISO)</button>`;
    }

    // 4. Çıkış Butonu
    sidebarHTML += `<div style="border-top:1px solid #eee; margin-top:10px; padding-top:10px;">
                        <button onclick="logout()" style="color:red;">🚪 Çıkış Yap</button>
                    </div>`;

    wrapper.innerHTML = `
        <div class="sidebar">
            ${sidebarHTML}
        </div>
        <div class="content-area" id="tab-content">
            </div>
    `;
    
    // Sayfa ilk açıldığında "Profil Görünümü" (View Mode) açılır. Ayarlar açılmaz.
    switchTab('profile_view');
}

// --- 5. SEKME DEĞİŞTİRME MANTIĞI ---
function switchTab(tabName) {
    const content = document.getElementById("tab-content");
    const user = JSON.parse(localStorage.getItem("currentUser"));
    
    // Buton stillerini güncelle
    document.querySelectorAll(".sidebar button").forEach(b => b.classList.remove("active"));
    const activeBtn = document.getElementById(`btn-${tabName}`);
    if(activeBtn) activeBtn.classList.add("active");

    // --- SEKME 1: PROFİL GÖRÜNÜMÜ (SADECE OKUMA) ---
    if (tabName === 'profile_view') {
        content.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <img src="${user.avatar}" style="width:150px; height:150px; border-radius:50%; border:5px solid #0067b8; object-fit:cover; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
                <h1 style="margin:10px 0 5px 0;">${user.username}</h1>
                <span style="background:#28a745; color:white; padding:5px 15px; border-radius:20px; font-size:14px; font-weight:bold;">${user.role}</span>
                
                <div style="margin-top:30px; text-align:left; background:#f9f9f9; padding:20px; border-radius:8px;">
                    <h3 style="border-bottom:1px solid #ddd; padding-bottom:10px;">Hakkında</h3>
                    <p style="color:#555; line-height:1.6;">${user.about}</p>
                    
                    <h3 style="border-bottom:1px solid #ddd; padding-bottom:10px; margin-top:20px;">İletişim</h3>
                    <p style="color:#555;">📧 ${user.email}</p>
                </div>
            </div>
        `;
    } 
    // --- SEKME 2: AYARLAR (DÜZENLEME MODU) ---
    else if (tabName === 'settings') {
        content.innerHTML = `
            <h2>Hesabı Düzenle</h2>
            <div style="display:flex; align-items:center; gap:20px; margin-bottom:20px;">
                <img src="${user.avatar}" style="width:80px; height:80px; border-radius:50%; border:3px solid #eee; object-fit:cover;">
                <div>
                    <button style="background:#eee; border:none; padding:8px 15px; border-radius:4px; cursor:pointer;">Fotoğraf Yükle</button>
                    <p style="font-size:12px; color:#666; margin-top:5px;">Sadece .png, .jpg</p>
                </div>
            </div>

            <label>Kullanıcı Adı (Değiştirilemez)</label>
            <input type="text" value="${user.username}" disabled style="background:#f9f9f9; cursor:not-allowed;">
            
            <label>Hakkında Yazısı</label>
            <textarea rows="3">${user.about}</textarea>
            
            <label>Yeni Şifre</label>
            <input type="password" placeholder="Değiştirmek istemiyorsanız boş bırakın">
            
            <button class="btn-save" onclick="alert('Ayarlar başarıyla kaydedildi!')">Kaydet</button>

            <div style="margin-top:40px; padding-top:20px; border-top:1px solid #eee;">
                <h4 style="color:#dc3545;">Tehlikeli Bölge</h4>
                <button class="btn-danger">Hesabı Sil</button>
            </div>
        `;
    }
    // --- SEKME 3: ADMİN PANELİ (ISO) ---
    else if (tabName === 'admin' && user.role === "Kurucu (Admin)") {
        content.innerHTML = `
            <h2 style="color:#0067b8;">👑 Yönetici Paneli - ISO Yönetimi</h2>
            <p>Buradan yeni bir Windows 7X sürümünü sunucuya yükleyebilirsiniz.</p>
            
            <label>ISO Sürüm Adı</label>
            <input type="text" placeholder="Örn: Windows 7X Ultimate v2.0">
            
            <label>Yayın Notları</label>
            <textarea placeholder="Bu sürümde neler değişti?"></textarea>

            <div class="upload-zone">
                <p style="font-size:40px; margin:0;">💿</p>
                <p>Yeni .iso dosyasını buraya sürükleyin veya seçin</p>
                
                <input type="file" id="isoInput" accept=".iso" style="display:none;" onchange="handleFileSelect(this)">
                
                <button onclick="document.getElementById('isoInput').click()" style="background:#0067b8; color:white; padding:10px 20px; border:none; border-radius:4px; cursor:pointer;">Dosya Seç (.iso)</button>
            </div>

            <div id="file-info-area" class="file-info">
                <div style="display:flex; justify-content:space-between;">
                    <strong id="file-name">dosya.iso</strong>
                    <span id="file-size">0 MB</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill"></div>
                </div>
                <div id="upload-status" style="margin-top:5px; font-size:12px; color:#0067b8;"></div>
            </div>

            <button class="btn-save" id="publish-btn" onclick="startUploadSimulation()" style="display:none; width:100%;">Sürümü Yayınla</button>
        `;
    }
}

// --- 6. ISO YÜKLEME SİMÜLASYONU ---
let selectedFile = null;

function handleFileSelect(input) {
    if (input.files && input.files[0]) {
        selectedFile = input.files[0];
        
        if (!selectedFile.name.toLowerCase().endsWith(".iso")) {
            alert("Hata: Sadece .iso uzantılı dosyalar yüklenebilir!");
            return;
        }

        document.getElementById("file-info-area").style.display = "block";
        document.getElementById("file-name").innerText = selectedFile.name;
        document.getElementById("file-size").innerText = (selectedFile.size / (1024*1024)).toFixed(2) + " MB";
        document.getElementById("publish-btn").style.display = "block";
        document.getElementById("progress-fill").style.width = "0%";
        document.getElementById("upload-status").innerText = "Yüklemeye hazır.";
    }
}

function startUploadSimulation() {
    if (!selectedFile) return;

    const progressBar = document.getElementById("progress-fill");
    const statusText = document.getElementById("upload-status");
    const btn = document.getElementById("publish-btn");
    
    btn.disabled = true;
    btn.innerText = "Yükleniyor...";
    
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            statusText.innerText = "Yükleme Tamamlandı! Dosya sunucuda işleniyor...";
            statusText.style.color = "green";
            btn.innerText = "Başarıyla Yayınlandı ✓";
            alert(`"${selectedFile.name}" başarıyla sisteme yüklendi ve yayınlandı!`);
        } else {
            width++;
            progressBar.style.width = width + "%";
            statusText.innerText = `Yükleniyor... %${width}`;
        }
    }, 50);
}

// --- 7. YORUM SİSTEMİ (DEMO) ---
function postComment() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        alert("Yorum yapmak için lütfen önce giriş yapın.");
        window.location.href = "login.html";
        return;
    }

    const commentInput = document.getElementById("comment-input");
    const commentText = commentInput.value;
    if (commentText.trim() === "") return;

    const commentSection = document.getElementById("comments-list");
    const newComment = document.createElement("div");
    newComment.className = "comment-item";
    newComment.innerHTML = `
        <div class="comment-user">
            <img src="${user.avatar}">
            <div>
                <strong>${user.username}</strong>
                ${user.role === 'Kurucu (Admin)' ? '<span class="admin-badge">KURUCU</span>' : ''}
            </div>
        </div>
        <div class="comment-text">${commentText}</div>
    `;
    
    commentSection.prepend(newComment);
    commentInput.value = "";
}

function loadComments() {
    const commentSection = document.getElementById("comments-list");
    if (!commentSection.innerHTML.trim()) {
        commentSection.innerHTML = `
            <div class="comment-item">
                <div class="comment-user">
                    <img src="https://ui-avatars.com/api/?name=User&background=random">
                    <div><strong>Ziyaretçi</strong></div>
                </div>
                <div class="comment-text">Elinize sağlık, çok güzel bir çalışma olmuş.</div>
            </div>
        `;
    }
}

// --- 8. SYS7XAI CHATBOT SİSTEMİ (GERİ EKLENDİ!) ---
function toggleChat() {
    const chatWindow = document.getElementById("chat-window");
    const toggleBtn = document.getElementById("chat-toggle-btn");
    
    if (chatWindow.style.display === "none") {
        chatWindow.style.display = "flex";
        toggleBtn.style.display = "none";
    } else {
        chatWindow.style.display = "none";
        toggleBtn.style.display = "flex";
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function sendMessage() {
    const inputField = document.getElementById("user-input");
    const message = inputField.value.trim();
    const chatMessages = document.getElementById("chat-messages");

    if (message === "") return;

    appendMessage("user", message);
    inputField.value = "";

    const loadingId = "loading-" + Date.now();
    const loadingHtml = `
        <div id="${loadingId}" style="margin-bottom: 15px; display: flex; gap: 10px;">
            <img src="Gemini_Generated_Image_jd1g27jd1g27jd1g.png" style="width: 24px; height: 24px; border-radius: 50%;">
            <div style="background: white; padding: 10px; border-radius: 0 10px 10px 10px; color: #888; font-style: italic;">
                Sys7xai yazıyor...
            </div>
        </div>`;
    chatMessages.insertAdjacentHTML('beforeend', loadingHtml);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        document.getElementById(loadingId).remove();
        const reply = generateAIResponse(message.toLowerCase());
        appendMessage("ai", reply);
        speak(reply); // Sesli okuma
    }, 1500);
}

function appendMessage(sender, text) {
    const chatMessages = document.getElementById("chat-messages");
    let html = "";

    if (sender === "user") {
        html = `
        <div style="margin-bottom: 15px; display: flex; justify-content: flex-end;">
            <div style="background: #0067b8; color: white; padding: 10px; border-radius: 10px 0 10px 10px; max-width: 80%;">
                ${text}
            </div>
        </div>`;
    } else {
        html = `
        <div style="margin-bottom: 15px; display: flex; gap: 10px;">
            <img src="Gemini_Generated_Image_jd1g27jd1g27jd1g.png" style="width: 24px; height: 24px; border-radius: 50%;">
            <div style="background: white; padding: 10px; border-radius: 0 10px 10px 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 80%;">
                ${text}
            </div>
        </div>`;
    }

    chatMessages.insertAdjacentHTML('beforeend', html);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(msg) {
    // Kurucu ve Site Bilgileri
    if (msg.includes("kimsin") || msg.includes("nedir")) return "Ben Sys7xai. Windows 7X projesi için geliştirilmiş, Gemini tabanlı bir yapay zeka asistanıyım.";
    if (msg.includes("kurucu") || msg.includes("yapımcı") || msg.includes("sahibi")) return "Windows 7X projesinin kurucusu ve baş geliştiricisi TDCDev'dir.";
    
    // İndirme ve Kurulum
    if (msg.includes("indir") || msg.includes("link") || msg.includes("iso")) return "Windows 7X'in en güncel ISO dosyasını 'İndirme Merkezi' bölümünden indirebilirsin.";
    if (msg.includes("kurulur") || msg.includes("nasıl") || msg.includes("format")) return "Kurulum için: 1. ISO dosyasını indir. 2. Rufus programı ile USB'ye yazdır. 3. USB'den boot ederek standart kurulum yap.";
    
    // Teknik
    if (msg.includes("ram") || msg.includes("sistem") || msg.includes("gereksinim")) return "Windows 7X çok hafiftir. Minimum 1GB RAM ve 20GB depolama ile çalışır.";
    if (msg.includes("driver") || msg.includes("sürücü") || msg.includes("usb")) return "Endişelenme! Windows 7X ISO dosyası içinde NVMe SSD ve USB 3.0 sürücüleri entegre edilmiştir.";
    
    // Hesap ve Sohbet
    if (msg.includes("hesap") || msg.includes("kayıt")) return "Şu an sadece Kurucu girişi aktiftir. Kayıt sistemi yakında açılacak.";
    if (msg.includes("merhaba") || msg.includes("selam")) return "Merhaba! Windows 7X dünyasına hoş geldin. Sana nasıl yardımcı olabilirim?";
    if (msg.includes("teşekkür")) return "Rica ederim! Her zaman buradayım.";

    return "Bunu tam anlayamadım ama sürekli öğreniyorum. 'İndirme linki', 'Sistem gereksinimleri' veya 'Kurulum nasıl yapılır' gibi sorular sorabilirsin.";
}

// --- 9. SESLİ OKUMA (TTS) ---
let isVoiceEnabled = false;

function toggleVoice() {
    isVoiceEnabled = !isVoiceEnabled;
    const btn = document.getElementById("voice-btn");
    
    if (isVoiceEnabled) {
        btn.innerHTML = "🔊";
        btn.style.background = "rgba(255,255,255,0.5)";
        speak("Sesli asistan aktif edildi.");
    } else {
        btn.innerHTML = "🔇";
        btn.style.background = "rgba(255,255,255,0.2)";
        window.speechSynthesis.cancel();
    }
}

function speak(text) {
    if (!isVoiceEnabled) return;
    const cleanText = text.replace(/<[^>]*>?/gm, ''); // HTML etiketlerini temizle
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'tr-TR';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
}