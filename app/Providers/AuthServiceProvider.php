<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::before(function ($user) {
            if ($user->is_admin) {
                return true;
            }
        });

        Gate::define('can_do', function(User $user, $permissionName) {
            return $user->hasPermission($permissionName);
        });

        Passport::tokensCan([
            'read-user' => 'read-user',
            'read-role' => 'read-role',
            'create-user' => 'create-user',
            'create-role' => 'create-role',
            'edit-user' => 'edit-user',
            'edit-role' => 'edit-role',
            'delete-user' => 'delete-user',
            'delete-role' => 'delete-role',
        ]);
        Passport::ignoreRoutes();
        Passport::tokensExpireIn(now()->addHours(15));
        Passport::refreshTokensExpireIn(now()->addHours(30));
        Passport::personalAccessTokensExpireIn(now()->addMonths(6));
    }
}
