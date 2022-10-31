<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Models\Permission;
use App\Models\Role;
use App\Services\RoleService;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class RoleController extends Controller
{
    protected $roleService;

    public function __construct()
    {
        $this->roleService = new RoleService();
        date_default_timezone_set('asia/ho_chi_minh');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('can_do', ['read role']);
        $can_create = Gate::check('can_do', ['create role']);
        $can_delete = Gate::check('can_do', ['delete role']);
        $can_edit = Gate::check('can_do', ['edit role']);

        $roles = Role::get();

        return Inertia::render('Admin/Role/index', [
            'roles' => $roles,
            'can_create' => $can_create,
            'can_delete' => $can_delete,
            'can_edit' => $can_edit,
        ]);
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->authorize('can_do', ['create role']);

        $permissions = Permission::all();
        
        return Inertia::render('Admin/Role/create', [
            'permissions' => $permissions,
        ]);
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreRoleRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRoleRequest $request)
    {
        $role = $this->roleService->create($request->validated());

        if (is_null($role)) {
            return response()->json([
                'message' => 'Failed create',
            ]);
        }

        return Redirect::route('role.index');
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
        $this->authorize('can_do', ['edit role']);
        
        $role = Role::find($id);
        $dataPermissions = $role->permissions->pluck('id')->toArray();
        $permissions = Permission::all();
        
        return Inertia::render('Admin/Role/edit', [
            'role' => $role,
            'dataPermissions' => $dataPermissions,
            'permissions' => $permissions,
        ]);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateRoleRequest $request
     * @param  \App\Models\Role $role
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        $updateSuccess = $this->roleService->update($request->validated(), $role);

        if (is_null($updateSuccess)) {
            return response()->json([
                'message' => 'Failed create',
            ]);
        }
        
        return Redirect::route('role.index');
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Role $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        $this->authorize('can_do', ['delete role']);

        $this->roleService->delete($role);
        
        return Redirect::route('role.index');
    }
    
    /**
     * Disable/Enable role status
     * 
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function setStatus($id)
    {
        $this->authorize('can_do', ['enable role']);
        
        $role = Role::find($id);
        $role->status = !($role->status);
        $role->save();

        return Redirect::route('role.index');
    }
}
