<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Queue\Connectors\NullConnector;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserService
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
        date_default_timezone_set('asia/ho_chi_minh');
    }

    public function getList(array $filter = [])
    {
        return $this->user->filter($filter)->search($filter, ['name', 'email', 'phone', 'id', 'address', 'birthday'])->getWithPaginate($filter);
    }

    public function create($data)
    {
        DB::beginTransaction();
        try {
            $data['password'] = Hash::make($data['password']);
            $user = User::create($data);

            $user->roles()->sync($data['roles']);
            DB::commit();

            return $user;
        } catch (\Exception $e) {
            DB::rollBack();

            Log::error($e->getMessage());

            return null;
        }
    }

    public function update($data, User $user)
    {
        DB::beginTransaction();
        try {
            if ($data['password']) {
                $data['password'] = Hash::make($data['password']);
            } else {
                $data['password'] = $user->password;
            }
            $user->fill($data)->save();
            $user->roles()->sync($data['roles']);
            DB::commit();

            return $user;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return null;
        }
    }

    public function delete(User $user)
    {
        $user->delete();
    }

    public function updateProfile($data, User $user)
    {
        DB::beginTransaction();
        try {
            $user->update([
                "name" => $data['name'],
                "birthday" => $data['birthday'],
                "address" => $data['address'],
                "phone" => $data['phone'],
            ]);
            DB::commit();

            return $user;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return null;
        }
    }

    public function updatePassword($data, User $user)
    {
        DB::beginTransaction();

        try {
            $user->update([
                "password" => Hash::make($data['password']),
            ]);
            DB::commit();

            return $user;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return null;
        }
    }
}
