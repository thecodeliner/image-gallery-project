@extends('layout.layout')
@section('content')
<h1 class="gallery-title">Photo Galleries</h1>

<div class="container mt-5">
    <div class="gallery-container">
        <button class="nav-arrow prev"><i class="fas fa-chevron-left"></i></button>

        <div class="galleries-scroll" id="galleriesScroll">
            @foreach($galleries as $gallery)
                @php
    $jsImages = $gallery->images->map(function ($img) {
        return asset($img->image_path);
    })->toJson();
@endphp

<div class="gallery-card"
onclick='openSwiperGallery({{ json_encode($gallery->name) }}, {!! $jsImages !!})'>
<img src="{{ asset($gallery->thumbnail) }}" alt="{{ $gallery->name }}">
<div class="gallery-overlay">
   <span class="name">{{ $gallery->name }}</span>
   <span class="items">{{ $gallery->images->count() }} photos</span>
</div>
</div>
            @endforeach
        </div>

        <button class="nav-arrow next"><i class="fas fa-chevron-right"></i></button>

        <div class="text-center mt-4">
            <a class="btn btn-primary" href="{{ route('gallery.create') }}">
                <i class="fas fa-plus me-2"></i> Create New Gallery
            </a>
        </div>
    </div>
</div>


  {{-- Swiper Gallery Modal (unchanged) --}}
  <!-- Swiper Gallery Modal -->
  <div class="swiper-gallery-modal" id="swiperGalleryModal">
    <div class="swiper-gallery-container">
        <div class="swiper-gallery-header">
            <div class="swiper-gallery-title" id="swiperGalleryTitle"></div>
            <button class="swiper-gallery-close" onclick="closeSwiperGallery()">&times;</button>
        </div>
        <div class="swiper-gallery-main">
            <div class="swiper swiper-gallery">
                <div class="swiper-wrapper" id="swiperGalleryWrapper"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
        </div>
        <div class="swiper swiper-gallery-thumbs">
            <div class="swiper-wrapper" id="swiperThumbsWrapper"></div>
        </div>
    </div>
</div>

    {{-- ... --}}
  </div>




 @endsection
