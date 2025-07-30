@extends('layout.layout')
@section('content')


<div class="container">
    <div class="section">
        <h2 class="section-title">Create New Gallery</h2>
        <form id="galleryForm" method="post" action="{{ route('gallery.store') }}" enctype="multipart/form-data">
            @csrf
            <div class="mb-4">
                <label for="galleryName" class="form-label">Gallery Name *</label>
                <input name="name" type="text" class="form-control" id="galleryName" required placeholder="Enter gallery name">
                @error('name')
                    <div class="error-message">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label class="form-label">Gallery Images *</label>
                <div class="upload-area" id="uploadArea">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Click to upload or drag & drop</p>
                    <div class="file-info" id="fileInfo"></div>
                    <input type="file" name="images[]" id="imageUpload" multiple accept="image/*" style="display: none;">
                </div>
                <small class="text-muted">Select one image as thumbnail by checking the box</small>
                @error('images')
                    <div class="error-message">{{ $message }}</div>
                @enderror
                @error('thumbnail_index')
                    <div class="error-message">{{ $message }}</div>
                @enderror
                <div class="image-preview-container" id="imagePreviewContainer"></div>
            </div>

            <div class="action-buttons">
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save me-2"></i>Create Gallery
                </button>
                <button type="reset" class="btn btn-secondary" id="resetBtn">
                    <i class="fas fa-times me-2"></i>Cancel
                </button>
            </div>
        </form>
    </div>
</div>




@endsection
