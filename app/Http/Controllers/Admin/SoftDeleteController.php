<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\SoftDeleteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SoftDeleteController extends Controller
{

    protected $softDeleteService;

    public function __construct(SoftDeleteService $softDeleteService)
    {
        $this->softDeleteService = $softDeleteService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('can_do', ['manage soft delete']);

        $filter = [
            'paginate' => 10,
        ];
        $users_deleted = $this->softDeleteService->getList($filter);

        return Inertia::render('Admin/Deleted/index', [
            'users_deleted' => $users_deleted
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id)
    {
        $this->authorize('can_do', ['manage soft delete']);

        User::withTrashed()
        ->where('id', $id)
        ->restore();

        return Redirect::route('deleted.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->authorize('can_do', ['manage soft delete']);

        User::withTrashed()
        ->where('id', $id)
        ->forceDelete();

        return Redirect::route('deleted.index');
    }
}
