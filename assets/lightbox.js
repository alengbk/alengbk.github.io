document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('lightbox-overlay');
    const content = document.getElementById('lightbox-content');
    const closeBtn = document.getElementById('lightbox-close');

    if (!overlay || !content || !closeBtn) return;

    function openLightbox(url) {
        content.innerHTML = '<p style="color:#9ca3af; padding: 20px;">載入中...</p>';
        overlay.classList.add('visible');
        document.body.classList.add('lightbox-open');

        const lowerUrl = url.toLowerCase();
        let el;
        if (/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/.test(lowerUrl)) {
            el = document.createElement('img');
            el.alt = "放大檢視";
            el.onload = () => { content.innerHTML = ''; content.appendChild(el); };
            el.onerror = () => { content.innerHTML = '<p style="color:#ef4444; padding: 20px;">圖片載入失敗</p>'; };
            el.src = url;
        } else if (/\.(mp4|webm|ogg|mov)$/.test(lowerUrl)) {
            el = document.createElement('video');
            el.controls = true;
            el.autoplay = true;
            el.muted = true;
            el.playsInline = true;
            el.onloadedmetadata = () => { content.innerHTML = ''; content.appendChild(el); };
            el.onerror = () => { content.innerHTML = '<p style="color:#ef4444; padding: 20px;">影片載入失敗</p>'; };
            el.src = url;
        } else {
            content.innerHTML = '<p style="color:#9ca3af; padding: 20px;">不支援的媒體格式</p>';
        }
    }

    function closeLightbox() {
        overlay.classList.remove('visible');
        document.body.classList.remove('lightbox-open');
        const video = content.querySelector('video');
        if (video) { video.pause(); video.removeAttribute('src'); video.load(); }
        content.innerHTML = '';
    }

    document.querySelectorAll('[data-lightbox-src]').forEach(card => {
        card.addEventListener('click', (event) => {
            if (event.target.closest('a.card-link')) return;
            const url = card.dataset.lightboxSrc;
            if (!url) return;
            if (/\.pdf$/i.test(url)) {
                window.open(url, '_blank', 'noopener,noreferrer');
            } else {
                openLightbox(url);
            }
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', (event) => { if (event.target === overlay) closeLightbox(); });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && overlay.classList.contains('visible')) closeLightbox();
    });
});
