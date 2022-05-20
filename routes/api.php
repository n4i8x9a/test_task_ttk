<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\UserController;
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
    Route::get('/check', [AuthController::class, 'checkAuth'])->middleware(['auth:api'])->name('auth.check');
});

Route::group(['prefix' => 'books'], function () {
    Route::get('/', [BookController::class, 'list'])->name('books.list');
    Route::post('/', [BookController::class, 'create'])->name('books.create')->middleware('auth:api');
    Route::put('/', [BookController::class, 'update'])->name('books.update')->middleware('auth:api');
    Route::delete('/{id}/', [BookController::class, 'delete'])->name('books.delete')->middleware(['auth:api', 'role', 'scope:admin']);
    Route::post('/image', [BookController::class, 'addImage'])->name('books.addImage')->middleware('auth:api');
    Route::get('/{id}/', [BookController::class, 'get'])->name('books.get');
    Route::get('/{id}/hide', [BookController::class, 'hide'])->name('books.hide')->middleware(['auth:api', 'role', 'scope:admin']);
    Route::get('/{id}/visible', [BookController::class, 'makeVisible'])->name('books.visible')->middleware(['auth:api', 'role', 'scope:admin']);
});

Route::group(['prefix' => 'authors'], function () {
    Route::get('/', [AuthorController::class, 'list'])->name('authors.list');
    Route::get('/{id}/books/', [AuthorController::class, 'books'])->name('authors.books');
    Route::get('/{id}/', [AuthorController::class, 'get'])->name('authors.get');
    Route::post('/', [AuthorController::class, 'create'])->name('authors.create')->middleware(['auth:api', 'role', 'scope:admin']);
    Route::put('/', [AuthorController::class, 'update'])->name('authors.update')->middleware(['auth:api', 'role', 'scope:admin']);
    Route::delete('/{id}/', [AuthorController::class, 'delete'])->name('authors.delete')->middleware(['auth:api', 'role', 'scope:admin']);
});

Route::group(['prefix' => 'sections'], function () {
    Route::get('/', [SectionController::class, 'list'])->name('sections.list');
    Route::post('/', [SectionController::class, 'create'])->name('sections.create')->middleware(['auth:api', 'role', 'scope:admin']);
    Route::put('/', [SectionController::class, 'update'])->name('sections.update')->middleware(['auth:api', 'role', 'scope:admin']);
    Route::delete('/{id}/', [SectionController::class, 'delete'])->name('sections.delete')->middleware(['auth:api', 'role', 'scope:admin']);
    Route::get('/{id}/books/', [SectionController::class, 'books'])->name('sections.books');
    Route::get('/{id}/', [SectionController::class, 'get'])->name('sections.get');
});

Route::group(['prefix' => 'user'], function () {
    Route::get('/', [UserController::class, 'get'])->name('user.get')->middleware(['auth:api']);;

});
