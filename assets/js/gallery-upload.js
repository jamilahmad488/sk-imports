document.addEventListener('DOMContentLoaded', function () {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.id = 'skGalleryInput';
  input.style.display = 'none';
  document.body.appendChild(input);

  document.querySelectorAll('.cms-cam-overlay-btn').forEach(function (camBtn) {
    const card = camBtn.closest('.product-category-card, .shop-card');
    if (!card || card.querySelector('.cms-gallery-overlay-btn')) return;

    const match = camBtn.getAttribute('onclick')?.match(/launchStockCam\('([^']+)'\)/);
    const productId = match ? match[1] : null;
    if (!productId) return;

    const galleryBtn = document.createElement('button');
    galleryBtn.type = 'button';
    galleryBtn.className = 'cms-gallery-overlay-btn';
    galleryBtn.innerHTML = '🖼️';
    galleryBtn.title = 'Update image from gallery';
    galleryBtn.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      window.targetedProductKey = productId;
      input.value = '';
      input.click();
    });
    card.appendChild(galleryBtn);
  });

  input.addEventListener('change', function (event) {
    const file = event.target.files && event.target.files[0];
    const productId = window.targetedProductKey || targetedProductKey;
    if (!file || !productId || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const imageData = e.target.result;
      const target = document.getElementById('thumb-' + productId);
      if (target) target.style.backgroundImage = "url('" + imageData + "')";
      if (typeof saveCapturedAssetLocally === 'function') {
        saveCapturedAssetLocally(productId, imageData);
      }
    };
    reader.readAsDataURL(file);
  });
});

const originalToggleCmsEditIcons = window.toggleCmsEditIcons;
window.toggleCmsEditIcons = function () {
  if (typeof originalToggleCmsEditIcons === 'function') originalToggleCmsEditIcons();
  const isEnabled = document.querySelector('.cms-cam-overlay-btn.show') !== null;
  document.querySelectorAll('.cms-gallery-overlay-btn').forEach(function (btn) {
    btn.classList.toggle('show', isEnabled);
  });
};
