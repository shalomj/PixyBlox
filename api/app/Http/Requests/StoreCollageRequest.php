<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCollageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'bail|required|max:100', 
            'description' => 'max:200', 
            'layout' => 'bail|required|integer|between:1,3', 
            'photos.*.file' => 'bail|file|mimes:jpeg,png|max:5120', 
            'photos.*.config' => 'json', 
        ];
    }

    /**
     * Get custom messages for validator errors.
     * 
     * @return array
     */
    public function messages()
    {
        return [
            'layout.between' => 'Invalid selected layout.', 
        ];
    }
}
