<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangeSettingsRequest;
use App\Models\Settings;
use App\Services\SettingsService;
use App\Services\TimezoneService;
use DateTimeZone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SettingController extends Controller
{
    protected $timezoneService;
    protected $settingsService;

    public function __construct(TimezoneService  $timezoneService, SettingsService $settingsService)
    {
        $this->timezoneService = $timezoneService;
        $this->settingsService = $settingsService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $timezones = $this->timezoneService->getList(DateTimeZone::ALL);
        $settings = Settings::where('user_id', auth()->id())->first();
        return Inertia::render('Admin/Setting/index', [
            'timezones' => $timezones,
            'settings' => $settings,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ChangeSettingsRequest $request)
    {
        $settings_user = Settings::where('user_id', auth()->id())->first();

        if ($settings_user) {
            $settingsService = $this->settingsService->update($request->validated(), $settings_user);
        } else {
            $settingsService = $this->settingsService->create($request->validated());
        }

        if (is_null($settingsService)) {
            return Redirect::route('setting.index', [
                'message' => 'Failed'
            ]);
        }

        return Redirect::route('setting.index', [
            'message' => 'Success'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Settings::where('user_id', auth()->id())->first();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
 
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
