document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const imageUploadInput = document.getElementById('imageUpload');
    const previewContainer = document.getElementById('imagePreviewContainer');
    const fileInfo = document.getElementById('fileInfo');
    const resetBtn = document.getElementById('resetBtn');
    const form = document.getElementById('galleryForm');

    // Handle file input click
    uploadArea.addEventListener('click', () => {
        imageUploadInput.click();
    });

    // Handle file selection
    imageUploadInput.addEventListener('change', handleFiles);

    // Drag and drop events
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.add('active');
    }

    function unhighlight(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('active');
    }

    uploadArea.addEventListener('drop', function(e) {
        const dt = e.dataTransfer;
        imageUploadInput.files = dt.files;
        handleFiles({ target: imageUploadInput });
    });

    // Handle file processing
    function handleFiles(e) {
        const files = e.target.files;
        previewContainer.innerHTML = '';

        if (files.length > 0) {
            fileInfo.textContent = `${files.length} file(s) selected`;

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (!file.type.startsWith('image/')) continue;

                const reader = new FileReader();
                reader.onload = function(e) {
                    createPreview(e.target.result, i);
                };
                reader.readAsDataURL(file);
            }
        } else {
            fileInfo.textContent = '';
        }
    }

    // Create image preview
    function createPreview(src, index) {
        const wrapper = document.createElement('div');
        wrapper.className = 'image-preview-wrapper';

        const img = document.createElement('img');
        img.src = src;
        img.className = 'image-preview';
        img.alt = 'Preview';

        const checkbox = document.createElement('input');
        checkbox.type = 'radio';
        checkbox.name = 'thumbnail_index';
        checkbox.value = index;
        checkbox.className = 'thumbnail-selector';
        checkbox.id = `thumb-${index}`;

        const label = document.createElement('label');
        label.htmlFor = `thumb-${index}`;
        label.className = 'thumbnail-label';

        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);
        wrapper.appendChild(img);
        previewContainer.appendChild(wrapper);
    }

    // Reset form
    resetBtn.addEventListener('click', function() {
        previewContainer.innerHTML = '';
        fileInfo.textContent = '';
    });

    // Form validation
    form.addEventListener('submit', function(e) {
        const galleryName = document.getElementById('galleryName').value.trim();
        const files = imageUploadInput.files;

        if (!galleryName) {
            e.preventDefault();
            alert('Please enter a gallery name');
            return;
        }

        if (!files || files.length === 0) {
            e.preventDefault();
            alert('Please upload at least one image');
            return;
        }

        // Check if thumbnail is selected
        const thumbSelected = document.querySelector('input[name="thumbnail_index"]:checked');
        if (!thumbSelected) {
            e.preventDefault();
            alert('Please select a thumbnail image');
            return;
        }
    });
});

// for home page
 // Initialize Swiper variables
 let gallerySwiper;
 let thumbsSwiper;

 // Gallery navigation functionality
 const galleriesScroll = document.getElementById('galleriesScroll');
 const prevBtn = document.querySelector('.nav-arrow.prev');
 const nextBtn = document.querySelector('.nav-arrow.next');

 function updateNavButtons() {
     const scrollLeft = galleriesScroll.scrollLeft;
     const maxScroll = galleriesScroll.scrollWidth - galleriesScroll.clientWidth;

     prevBtn.classList.toggle('disabled', scrollLeft === 0);
     nextBtn.classList.toggle('disabled', scrollLeft >= maxScroll - 1);
 }

 prevBtn.addEventListener('click', () => {
     galleriesScroll.scrollBy({
         left: -300,
         behavior: 'smooth'
     });
 });

 nextBtn.addEventListener('click', () => {
     galleriesScroll.scrollBy({
         left: 300,
         behavior: 'smooth'
     });
 });

 galleriesScroll.addEventListener('scroll', updateNavButtons);
 window.addEventListener('resize', updateNavButtons);
 updateNavButtons();

 // Swiper Gallery functions
 function openSwiperGallery(title, images) {
     const modal = document.getElementById('swiperGalleryModal');
     const titleElement = document.getElementById('swiperGalleryTitle');
     const galleryWrapper = document.getElementById('swiperGalleryWrapper');
     const thumbsWrapper = document.getElementById('swiperThumbsWrapper');

     // Set title
     titleElement.textContent = title;

     // Clear previous slides
     galleryWrapper.innerHTML = '';
     thumbsWrapper.innerHTML = '';

     // Add images to swiper
     images.forEach(imageUrl => {
         galleryWrapper.innerHTML += `
             <div class="swiper-slide">
                 <img src="${imageUrl}" alt="${title}">
             </div>
         `;

         thumbsWrapper.innerHTML += `
             <div class="swiper-slide">
                 <img src="${imageUrl}" alt="${title}">
             </div>
         `;
     });

     // Show modal
     modal.style.display = 'block';
     document.body.style.overflow = 'hidden';

     // Initialize Swipers after DOM update
     setTimeout(() => {
         // Destroy existing Swiper instances if they exist
         if (thumbsSwiper) thumbsSwiper.destroy(true, true);
         if (gallerySwiper) gallerySwiper.destroy(true, true);

         // Initialize Thumbs Swiper first
         thumbsSwiper = new Swiper('.swiper-gallery-thumbs', {
             spaceBetween: 10,
             slidesPerView: 'auto',
             freeMode: true,
             watchSlidesProgress: true,
         });

         // Initialize Main Swiper with thumbs control
         gallerySwiper = new Swiper('.swiper-gallery', {
             spaceBetween: 10,
             navigation: {
                 nextEl: '.swiper-button-next',
                 prevEl: '.swiper-button-prev',
             },
             thumbs: {
                 swiper: thumbsSwiper,
             },
         });
     }, 50);
 }

 function closeSwiperGallery() {
     const modal = document.getElementById('swiperGalleryModal');
     modal.style.display = 'none';
     document.body.style.overflow = 'auto';

     // Destroy Swiper instances when closing
     if (gallerySwiper) gallerySwiper.destroy(true, true);
     if (thumbsSwiper) thumbsSwiper.destroy(true, true);
 }

 // Close modal when clicking outside content
 document.getElementById('swiperGalleryModal').addEventListener('click', function(e) {
     if (e.target === this) {
         closeSwiperGallery();
     }
 });

 // Gallery creation and image upload functionality
 document.getElementById('nextToUploadBtn').addEventListener('click', function() {
     const galleryName = document.getElementById('galleryName').value;
     if (!galleryName) {
         alert('Please enter a gallery name');
         return;
     }

     document.getElementById('currentGalleryName').textContent = galleryName;

     // Close the first modal and open the upload modal
     var addGalleryModal = bootstrap.Modal.getInstance(document.getElementById('addGalleryModal'));
     addGalleryModal.hide();

     var uploadModal = new bootstrap.Modal(document.getElementById('uploadImagesModal'));
     uploadModal.show();
 });

