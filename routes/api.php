<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
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
Route::post('/login', [AuthController::class, 'login']);

Route::group([
    'prefix' => 'v1/user',
], function () {
    Route::get('/', [UserController::class, 'index'])->middleware(['auth:sanctum', 'abilities:read user']);
    Route::get('/{id}', [UserController::class, 'show'])->middleware(['auth:sanctum', 'abilities:read role']);
    Route::post('/create', [UserController::class, 'store'])->middleware(['auth:sanctum', 'abilities:create user']);
    Route::put('/edit/{id}', [UserController::class, 'update'])->middleware(['auth:sanctum', 'abilities:edit user']);
    Route::delete('/delete/{id}', [UserController::class, 'destroy'])->middleware(['auth:sanctum', 'abilities:delete user']);
});
