document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ Script.js berhasil dimuat!");

    const navLinks = document.querySelectorAll('.nav-link');
    const contentArea = document.getElementById('content-area');

    console.log(`🔍 Ditemukan ${navLinks.length} elemen nav-link.`);

    if (!contentArea) {
        console.error("❌ FATAL: Elemen dengan ID 'content-area' tidak ditemukan!");
        return;
    }

    async function loadPage(pageId) {
        console.log(`🚀 Memulai pemanggilan untuk halaman: ${pageId}`);
        contentArea.classList.add('fade-out');

        try {
            const filePath = `pages/${pageId}.html`;
            const response = await fetch(filePath);

            if (!response.ok) {
                throw new Error(`Server merespon dengan status ${response.status}`);
            }

            const content = await response.text();

            console.log(`✔️ Konten untuk '${pageId}' berhasil diambil.`);

            setTimeout(() => {
                contentArea.innerHTML = content;
                contentArea.classList.remove('fade-out');
            }, 300);

        } catch (error) {
            console.error(`❌ Gagal mengambil konten dari 'pages/${pageId}.html'. Error:`, error);
            contentArea.innerHTML = `<p style="color: red;">Gagal memuat halaman. Cek nama file dan folder, dan pastikan live-server berjalan.</p>`;
            contentArea.classList.remove('fade-out');
        }
    }

    function setActiveLink(pageId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.dataset.page;

            console.log(`🖱️ Klik terdeteksi pada tab: ${pageId}`);

            if (document.querySelector(`.nav-link[data-page="${pageId}"]`).classList.contains('active')) {
                console.log(" Halaman sudah aktif, tidak perlu memuat ulang.");
                return;
            }

            setActiveLink(pageId);
            loadPage(pageId);
        });
    });

    if (navLinks.length > 0) {
        loadPage('home');
    }
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggleButton.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('dark-mode');

        if (isDarkMode) {
            applyTheme('light');
            localStorage.setItem('theme', 'light');
        } else {
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

});