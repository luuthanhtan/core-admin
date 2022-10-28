<?php

namespace App\Services;

use App\Models\Settings;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SettingsService
{
    protected $settings;

    public function __construct(Settings $settings)
    {
        $this->settings = $settings;
    }

    public function create($data)
    {
        DB::beginTransaction();
        try {
            $data['user_id'] = auth()->id();
            $settings = $this->settings->fill($data);

            $settings->save();

            DB::commit();

            return $settings;
        } catch (\Exception $e) {
            DB::rollBack();

            Log::error($e->getMessage());

            return null;
        }
    }

    public function update($data, Settings $settings)
    {
        DB::beginTransaction();
        try {
            $data['user_id'] = auth()->id();
            $settings->fill($data)->save();

            DB::commit();

            return $settings;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return null;
        }
    }

    public function delete(Settings $settings)
    {
        $settings->delete();
    }
}
