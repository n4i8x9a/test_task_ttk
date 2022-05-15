<?php


namespace App\Http\Requests\Book;


use Illuminate\Foundation\Http\FormRequest;

class ImageUploadRequest extends FormRequest
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

            'image' => 'required|max:500|mimes:jpg,jpeg,png'

        ];
    }
}
