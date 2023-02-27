<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Services\UserService;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;

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
        $filter = [
            ...$request->query(),
            'filter' => [
                ...$request->query('filter', []),
                'is_admin' => 0,
            ],
            'search' => $request->query('search', ''),
        ];
        $users = $this->userService->getList($filter);

        return response()->json([
            'status_code' => Response::HTTP_OK,
            'message' => __('messages.get_users_successful'),
            'data' => $users,
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
     * @param  \App\Http\Requests\StoreUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $user = $this->userService->create($request->validated());

        if (is_null($user)) {
            return response()->json([
                'status_code' => Response::HTTP_CONFLICT,
                'message' => 'Create failed',
            ], Response::HTTP_CONFLICT);
        }

        return response()->json([
            'status_code' => Response::HTTP_CREATED,
            'message' => 'Created',
            'data' => $user
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        
        return response()->json([
            'status_code' => Response::HTTP_OK,
            'message' => __('messages.get_users_successful'),
            'data' => [
                'user' => $user,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserRequest $request
     * @param  \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, $id)
    {
        $user = User::find($id);

        $updateSuccess = $this->userService->update($request->validated(), $user);

        if (is_null($updateSuccess)) {
            return response()->json([
                'status_code' => Response::HTTP_CONFLICT,
                'message' => 'Update failed',
            ], Response::HTTP_CONFLICT);
        }

        return response()->json([
            'status_code' => Response::HTTP_CREATED,
            'message' => 'Update successful',
            'data' => $user
        ], Response::HTTP_CREATED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    { 
        $user = User::find($id);

        $this->userService->delete($user);

        return response()->json([
            'status_code' => Response::HTTP_NO_CONTENT,
            'message' => 'Delete successful',
        ], Response::HTTP_NO_CONTENT);
    }

    public function login(LoginRequest $request)
    {
        $baseUrl = url('/');
        $user = User::where('email', $request->email)->first();
        
        if ($user) {
            if ($user->is_admin) {
                $permissions = "*";
            } else {
                $permissions = $user->roles()
                ->with(['permissions'])
                ->get()
                ->map(function ($role) {
                    return $role->permissions->pluck('name')->all();
                })
                ->collapse()
                ->toArray();
            }

            $response = Http::asForm()->post("{$baseUrl}:812/oauth/token", [
                'grant_type'    => 'password',
                'client_id'     => config('passport.password_grant_client.id'),
                'client_secret' => config('passport.password_grant_client.secret'),
                'username'      => $request->email,
                'password'      => $request->password,
                'scope'         => implode(" ",$permissions),
            ]);

            $result = json_decode($response->getBody(), true);
            if (!$response->ok()) {
                return response()->json(['error' => $result['error_description']], 401);
            }

            return response()->json([
                'status_code' => Response::HTTP_OK,
                'message' => __('messages.login_successful'),
                'scope'         => implode(" ",$permissions),
                'token' => $result,
            ]);
        }

        return response()->json([
            'status_code' => Response::HTTP_UNAUTHORIZED,
            'message' => __('messages.login_failed') . " Email not found",
        ], Response::HTTP_UNAUTHORIZED);
    }

    public function refreshToken(Request $request)
    {
        $request->validate([
            'refresh_token' => 'required'
        ]);
        
        $baseUrl = url('/');
        $response = Http::post("{$baseUrl}:812/oauth/token", [
            'refresh_token' => $request->refresh_token,
            'client_id' => config('passport.password_grant_client.id'),
            'client_secret' => config('passport.password_grant_client.secret'),
            'grant_type' => 'refresh_token'
        ]);

        $result = json_decode($response->getBody(), true);
        if (!$response->ok()) {
            return response()->json(['error' => $result['error_description']], 401);
        }

        return response()->json([
            'status_code' => Response::HTTP_OK,
            'message' => __('messages.login_successful'),
            'token' => $result,
        ]);;
    }
}
