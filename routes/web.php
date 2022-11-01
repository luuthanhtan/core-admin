<?php

use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SoftDeleteController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
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
})->middleware(['auth'])->name('dashboard');

Route::group([
    'prefix' => 'admin',
    'middleware' => ['auth'],
], function () {
    Route::resource('user', UserController::class);
    Route::resource('role', RoleController::class);
    Route::resource('setting', SettingController::class);
    Route::resource('deleted', SoftDeleteController::class);
});

Route::group([
    'middleware' => ['auth'],
], function () {
    Route::get('/admin/role/status/{id}', [RoleController::class, 'setStatus'])->name('role.status');
    Route::get('/admin/user/status/{id}', [UserController::class, 'setStatus'])->name('user.status');
    Route::get('/admin/profile', [UserController::class, 'profileIndex'])->name('user.profile');
    Route::put('/admin/profile/{id}', [UserController::class, 'profileUpdate'])->name('user.profile-update');
    Route::get('/admin/password', [UserController::class, 'passwordIndex'])->name('user.password');
    Route::put('/admin/password', [UserController::class, 'passwordUpdate'])->name('user.password-update');

});

// Route::get('/email/verify', function () {
//     return view('verify-email');
// })->middleware('auth')->name('verification.notice');

// Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
//     $request->fulfill();
 
//     return redirect('/dashboard');
// })->middleware(['auth', 'signed'])->name('verification.verify');
 
// Route::post('/email/verification-notification', function (Request $request) {
//     $request->user()->sendEmailVerificationNotification();
 
//     return back()->with('message', 'Verification link sent!');
// })->middleware(['auth', 'throttle:6,1'])->name('verification.send');

require __DIR__ . '/auth.php';
