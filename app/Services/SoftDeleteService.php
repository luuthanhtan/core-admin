<?php

namespace App\Services;

use App\Models\User;

class SoftDeleteService
{
    protected $user;

    public function __construct()
    {
        $this->user = new User();
    }

    public function getList(array $filter = [])
    {
        return User::onlyTrashed()->getWithPaginate($filter);
    }

    public function restore(User $user)
    {
        //
    }

    public function delete(User $user)
    {
        $user->delete();
    }
}
