<?php

namespace App\Services;

use App\Models\Role;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RoleService
{
    protected $role;

    public function __construct()
    {
        $this->role = new Role();
        date_default_timezone_set('asia/ho_chi_minh');
    }

    public function create($data)
    {
        DB::beginTransaction();
        try {
            $role = Role::create($data);
            $role->permissions()->sync($data['permission']);
            DB::commit();

            return $role;
        } catch (\Exception $e) {
            DB::rollBack();

            Log::error($e->getMessage());

            return null;
        }
    }

    public function update($data, $role)
    {
        DB::beginTransaction();
        try {
            $role->fill($data)->save();
            $role->permissions()->sync($data['permission']);
            DB::commit();

            return $role;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return null;
        }
    }

    public function delete(Role $role)
    {
        $role->permissions()->detach();
        $role->delete();
    }
}
