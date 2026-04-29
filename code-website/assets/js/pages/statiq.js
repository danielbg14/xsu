// Lightbox
const galleryImgs = Array.from(document.querySelectorAll('.gallery-item img'))
  .map(i => ({ src: i.src, alt: i.alt }));
let currentIdx = 0;
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbCounter = document.getElementById('lightbox-counter');

window.openLightbox = function (idx) {
  currentIdx = idx;
  lbImg.src = galleryImgs[idx].src;
  lbImg.alt = galleryImgs[idx].alt;
  if (lbCounter) lbCounter.textContent = (idx + 1) + ' / ' + galleryImgs.length;
  lb?.classList.add('open');
  document.body.style.overflow = 'hidden';
};
window.closeLightbox = function () {
  lb?.classList.remove('open');
  document.body.style.overflow = '';
};
window.closeLightboxOutside = function (e) {
  if (e.target === lb) window.closeLightbox();
};
window.shiftLightbox = function (dir) {
  currentIdx = (currentIdx + dir + galleryImgs.length) % galleryImgs.length;
  lbImg.src = galleryImgs[currentIdx].src;
  lbImg.alt = galleryImgs[currentIdx].alt;
  if (lbCounter) lbCounter.textContent = (currentIdx + 1) + ' / ' + galleryImgs.length;
};

document.addEventListener('keydown', e => {
  if (!lb?.classList.contains('open')) return;
  if (e.key === 'ArrowRight') window.shiftLightbox(1);
  if (e.key === 'ArrowLeft') window.shiftLightbox(-1);
  if (e.key === 'Escape') window.closeLightbox();
});

// Copy page link
window.copyLink = function () {
  navigator.clipboard.writeText(window.location.href).then(() => {
    const btn = document.querySelector('.share-copy');
    if (!btn) return;
    const original = btn.innerHTML;
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:13px;height:13px"><polyline points="20 6 9 17 4 12"/></svg> Копирано!';
    setTimeout(() => btn.innerHTML = original, 2000);
  });
};