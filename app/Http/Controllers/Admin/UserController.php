<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Services\UserService;

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

        $filter = $request->query();
        $users = $this->userService->getList($filter);

        return view('admin.user.index', compact(['users']));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->authorize('can_do', ['create user']);

        $roles = Role::all();

        return view('admin.user.create', compact(['roles']));
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
            return back()->with('error', 'Failed create!');
        }

        return redirect()->route('user.index')
            ->with('message', 'Successfully created!');
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
        $roles = Role::all();

        return view('admin.user.edit', compact(['user', 'roles', 'dataRoles']));
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
        $this->userService->update($request->validated(), $user);

        return redirect()->route('user.index')
            ->with('message', 'Successfully updated!');
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

        return redirect()->route('user.index')
            ->with('message', 'Successfully deleted');
    }

    public function profile()
    {
        $user = User::find(auth()->id());
        $dataRoles = $user->roles()->get();
        $roles = Role::all();

        return view('admin.user.profile', compact(['user', 'roles', 'dataRoles']));
    }

    public function profileSave(Request $request)
    {
        $user = User::find(auth()->id());

        $data = $request->validate([
            'name' => 'required',
            'birthday' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'password' => 'required',
        ]);

        if (Hash::check($data['password'], $user->password)) {
            $data['password'] = $user->password;
            $user->fill($data)->save();
            return redirect()->route('profile')
                ->with('message', 'Successfully updated!');
        } else {
            return redirect()->route('profile')
                ->with('error', 'Incorrect password!');
        }
    }

    public function changePassword(Request $request)
    {
        $user = User::find(auth()->id());
        
        $request->validate([
            'current_password' => 'required',
            'new_password' => ['required', 'confirmed'],
            'new_password_confirmation' => 'required',
        ]);

        if (Hash::check($request->current_password, $user->password)) {
            $user->password = Hash::make($request->new_password);
            $user->save();

            return redirect()->route('profile')
                ->with('message_pass', 'Successfully updated!');
        } else {
            return redirect()->route('profile')
                ->with('error_pass', 'Incorrect password!');
        }
    }
}
