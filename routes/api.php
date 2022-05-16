<?php

use App\Http\Controllers\AuthController;
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

Route::group(['prefix' => 'auth'], function () {
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
    Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth:api')->name('auth.logout');
});

Route::group(['prefix' => 'books'], function () {
    Route::get('/', [BookController::class, 'list'])->name('books.list');
    Route::post('/', [BookController::class, 'create'])->name('books.create')->middleware('auth:api');
    Route::put('/', [BookController::class, 'update'])->name('books.update')->middleware('auth:api');
    Route::delete('/{id}/', [BookController::class, 'delete'])->name('books.delete')->middleware('auth:api');
    Route::post('/image', [BookController::class, 'addImage'])->name('books.addImage')->middleware('auth:api');
    Route::get('/{id}/', [BookController::class, 'get'])->name('books.get');
});

Route::group(['prefix' => 'authors', 'middleware' => ['auth:api', 'role']], function () {
    Route::get('/', [AuthorController::class, 'list'])->name('authors.list')->middleware(['scope:admin,user']);
    Route::get('/{id}/books/', [AuthorController::class, 'books'])->name('authors.books')->middleware(['scope:admin,user']);
    Route::get('/{id}/', [AuthorController::class, 'get'])->name('authors.get')->middleware(['scope:admin']);

});

Route::group(['prefix' => 'sections'], function () {
    Route::get('/', [SectionController::class, 'list'])->name('sections.list');

});
