<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GalleryController;


route::get('/', [GalleryController::class, 'index'])->name('gallery.index');
route::get('/create', [GalleryController::class, 'create'])->name('gallery.create');
route::post('/store', [GalleryController::class, 'store'])->name('gallery.store');

