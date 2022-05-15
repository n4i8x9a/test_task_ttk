<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\SectionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'books'], function () {
    Route::get('/', [BookController::class, 'list'])->name('books.list');

});

Route::group(['prefix' => 'authors'], function () {
    Route::get('/', [AuthorController::class, 'list'])->name('authors.list');
    Route::get('/{id}/books/', [AuthorController::class, 'books'])->name('authors.books');
    Route::get('/{id}/', [AuthorController::class, 'get'])->name('authors.get');

});

Route::group(['prefix' => 'sections'], function () {
    Route::get('/', [SectionController::class, 'list'])->name('sections.list');

});
