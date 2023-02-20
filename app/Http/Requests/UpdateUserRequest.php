<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::check('can_do', ['edit user']);
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
            'password' => ['nullable'],
            'status'=> ['nullable'],
            'roles' => ['required', 'array'],
            'birthday' => ['nullable'],
            'phone' => ['nullable'],
            'address' => ['nullable'],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Name is required',
            'roles.required'  => 'Roles are required',
        ];
    }
}
