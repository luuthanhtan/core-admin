<?php

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

Route::post('/login', [UserController::class, 'login']);
Route::post('/refresh-token', [UserController::class, 'refreshToken']);

Route::group([
    'prefix' => 'v1/user',
    'middleware' => 'auth:api',
], function () {
    Route::get('/', [UserController::class, 'index'])->middleware(['scopes:read-user']);
    Route::get('/{id}', [UserController::class, 'show'])->middleware(['scopes:read-user']);
    Route::post('/create', [UserController::class, 'store'])->middleware(['scopes:create-user']);
    Route::put('/edit/{id}', [UserController::class, 'update'])->middleware(['scopes:edit-user']);
    Route::delete('/delete/{id}', [UserController::class, 'destroy'])->middleware(['scopes:detele-user']);
});
