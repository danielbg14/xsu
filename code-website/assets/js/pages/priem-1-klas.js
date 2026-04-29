// Image switcher (brochure)
const img1 = document.getElementById('brochureImg1');
const img2 = document.getElementById('brochureImg2');
if (img1 && img2) {
  let showingFirst = true;
  setInterval(() => {
    if (showingFirst) {
      img1.classList.add('hidden');
      img2.classList.remove('hidden');
    } else {
      img2.classList.add('hidden');
      img1.classList.remove('hidden');
    }
    showingFirst = !showingFirst;
  }, 3000);
}

// Modal
window.openBrochure = function () {
  document.getElementById('brochureModal')?.classList.add('open');
};
window.closeBrochure = function () {
  document.getElementById('brochureModal')?.classList.remove('open');
};