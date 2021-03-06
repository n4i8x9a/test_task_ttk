<?php


namespace App\Http\Requests\Book;


use Illuminate\Foundation\Http\FormRequest;

class BookUpdateRequest extends FormRequest
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
            'title' => 'string|max:150',
            'year' => 'integer',
            'description' => 'string|max:2000',
            //'image' => 'required|string|max:500',
            'author_id' => 'integer',
            'section_id' => 'integer',
        ];
    }
}
