<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permission::insert([
            [
                'name' => 'read user',
            ],
            [
                'name' => 'read role',
            ],
            [
                'name' => 'create user',
            ],
            [
                'name' => 'create role',
            ],
            [
                'name' => 'edit user',
            ],
            [
                'name' => 'edit role',
            ],
            [
                'name' => 'delete user',
            ],
            [
                'name' => 'delete role',
            ],
            [
                'name' => 'enable role'
            ],
            [
                'name' => 'manage soft delete'
            ],
        ]);
        Role::insert([
            'name' => 'Guest',
            'status' => true,
        ]);
    }
}
