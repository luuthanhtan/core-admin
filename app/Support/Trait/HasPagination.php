<?php

namespace App\Support\Trait;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;

trait HasPagination
{
    public function scopeGetWithPaginate(Builder $query, array $filter = [])
    {   
        if (Arr::has($filter, 'paginate')) {
           return $query->paginate(Arr::get($filter, 'paginate'))->withQueryString();
        }
        return $query->get();
    }
}