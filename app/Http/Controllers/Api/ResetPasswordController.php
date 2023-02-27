<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PasswordReset;
use App\Models\User;
use App\Notifications\ResetPasswordRequest;
use App\Services\UserService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function sendMail(Request $request)
    {
        $user = User::where('email', $request->email)->firstOrFail();
        if ($user) {
            PasswordReset::updateOrInsert(
                [
                    'email' => $user->email,
                ],
                [
                    'token' => Str::random(60),
                ]
            );
            $passwordReset = PasswordReset::where('email', $request->email)->first();

            if ($passwordReset) {
                $user->notify(new ResetPasswordRequest($passwordReset->token, $request->email));
            }

            return response()->json([
                'status_code' => Response::HTTP_OK,
                'message' => 'We have e-mailed your password reset link!'
            ]);
        }

        return response()->json([
            'status_code' => Response::HTTP_NOT_FOUND,
            'error' => 'Not found email in database'
        ], Response::HTTP_NOT_FOUND);
    }
    public function reset(Request $request, $token)
    {
        $passwordResetQuery = PasswordReset::where('token', $token);
        $passwordReset = $passwordResetQuery->first();

        if ($passwordReset){
            if (Carbon::parse($passwordReset->updated_at ?? '')->addMinutes(60)->isPast()) {
                $passwordResetQuery->delete();

                return response()->json([
                    'status_code' =>  Response::HTTP_UNPROCESSABLE_ENTITY,
                    'error' => 'This password reset token is invalid.',
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
            
            $user = User::where('email', $passwordReset->email)->first();
            $updatePasswordUser = $this->userService->updatePassword($request->only('password'), $user);
            $passwordResetQuery->delete();

            return response()->json([
                'status_code' => Response::HTTP_OK,
                'success' => $updatePasswordUser,
            ]);
        }

        return response()->json([
            'status_code' => Response::HTTP_UNPROCESSABLE_ENTITY,
            'error' => 'This password reset token is invalid.',
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
