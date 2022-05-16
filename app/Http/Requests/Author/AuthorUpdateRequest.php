<?php

namespace App\Http\Requests\Author;

use Illuminate\Foundation\Http\FormRequest;

class AuthorUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id' => 'required|integer',
            'name' => 'string|max:150',
            'country' => 'string|max:100',
            'comment' => 'string|max:500',
        ];
    }
}
