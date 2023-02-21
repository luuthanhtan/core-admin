<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::check('can_do', ['create-user']);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required'],
            'email' => ['required'],
            'password' => ['required', 'confirmed'],
            'status' => ['required'],
            'roles' => ['required', 'array'],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Name is required',
            'email.required'  => 'Email is required',
            'password.required' => 'Password is required',
            'roles.required'  => 'Roles are required',
            'password.confirmed' => 'Password confirmation does not match'
        ];
    }
}
