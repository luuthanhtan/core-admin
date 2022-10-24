<?php

use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::group([
    'prefix' => 'admin',
    'middleware' => ['auth'],
], function () {
    Route::resource('user', UserController::class);
    Route::resource('role', RoleController::class);
    Route::resource('setting', SettingController::class);
});

Route::group([
    'middleware' => ['auth'],
], function () {
    Route::get('/admin/role/status/{id}', [RoleController::class, 'setStatus'])->name('role.status');
    Route::get('/admin/user/status/{id}', [UserController::class, 'setStatus'])->name('user.status');
    Route::get('/admin/profile', [UserController::class, 'profileIndex'])->name('user.profile');
});


require __DIR__ . '/auth.php';
