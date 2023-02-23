<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();
        
        if (Hash::check($request->password, $user->password)) {
            if ($user->is_admin) {
                return response()->json([
                    'status_code' => Response::HTTP_OK,
                    'message' => __('messages.login_successful'),
                    'token' => $user->createToken('core-admin-token')->plainTextToken,
                ]);
            }
            $permissions = $user->roles()
            ->with(['permissions'])
            ->get()
            ->map(function ($role) {
                return $role->permissions->pluck('name')->all();
            })
            ->collapse()
            ->toArray();

            return response()->json([
                'status_code' => Response::HTTP_OK,
                'message' => __('messages.login_successful'),
                'token' => $user->createToken('core-admin-token', $permissions)->plainTextToken,
            ]);
        }

        return response()->json([
            'status_code' => Response::HTTP_UNAUTHORIZED,
            'message' => __('messages.login_failed'),
        ], Response::HTTP_UNAUTHORIZED);
    }
}
