<?php

namespace App\Http\Requests\Book;

use Illuminate\Foundation\Http\FormRequest;

class BookCreateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:150',
            'year' => 'required|integer',
            'description' => 'required|string|max:2000',
            //'image' => 'required|string|max:500',
            'author_id' => 'required|integer',
            'section_id' => 'required|integer',
        ];
    }
}
