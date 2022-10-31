<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use App\Services\UserService;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
        date_default_timezone_set('asia/ho_chi_minh');
    }

    /**
     * Display a listing of the resource.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->authorize('can_do', ['read user']);
        $can_create = Gate::check('can_do', ['create user']);
        $can_delete = Gate::check('can_do', ['delete user']);
        $can_edit = Gate::check('can_do', ['edit user']);

        $filter = [
            ...$request->query(),
            'filter' => [
                ...$request->query('filter', []),
                'is_admin' => 0,
            ],
            'paginate' => 10,
        ];
        $users = $this->userService->getList($filter);

        return Inertia::render('Admin/User/index', [
            'users' => $users,
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
        $ENABLE = 1;
        $DISABLE = 0;
        $this->authorize('can_do', ['create user']);

        $roles = Role::where('status', $ENABLE)->get();

        return Inertia::render('Admin/User/create', [
            'roles' => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $user = $this->userService->create($request->validated());

        if (is_null($user)) {
            return response()->json([
                'message' => 'Failed create',
            ]);
        }

        return Redirect::route('user.index');
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
        $this->authorize('can_do', ['edit user']);

        $user = User::find($id);
        $dataRoles = $user->roles->pluck('id')->toArray();
        $roles = Role::where('status', 1)->get();

        return Inertia::render('Admin/User/edit', [
            'roles' => $roles,
            'dataRoles' => $dataRoles,
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserRequest $request
     * @param  \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        dd($request);
        $updateSuccess = $this->userService->update($request->validated(), $user);

        if (is_null($updateSuccess)) {
            return response()->json([
                'message' => 'Failed update',
            ]);
        }

        return Redirect::route('user.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $this->authorize('can_do', ['delete user']);

        $this->userService->delete($user);

        return Redirect::route('user.index');
    }

    public function profileIndex()
    {
        $user = auth()->user();

        $dataRoles = $user->roles->pluck('id')->toArray();

        if ($user->is_admin) {
            $roles = Role::where('status', 1)->get();
        } else {
            $roles = Role::where('status', 1)->get();
        }

        return Inertia::render('Admin/User/profile', [
            'roles' => $roles,
            'dataRoles' => $dataRoles,
            'user' => $user,
        ]);
    }

    public function profileUpdate(UpdateProfileRequest $request)
    {
        $user = $this->userService->updateProfile($request->validated(), auth()->user());

        if (is_null($user)) {
            return Redirect::route('user.profile');
        }

        return Redirect::route('user.profile');
    }

    public function passwordIndex()
    {
        $id = auth()->id();

        return Inertia::render('Admin/User/password', [
            'id' => $id,
        ]);
    }

    public function passwordUpdate(UpdatePasswordRequest $request)
    {
        $user = $this->userService->updatePassword($request->validated(), auth()->user());

        if (is_null($user)) {
            return $user;
        }

        return Redirect::route('user.index');
    }
}
