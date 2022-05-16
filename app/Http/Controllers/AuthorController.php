<?php

namespace App\Http\Controllers;

use App\Http\Requests\Author\AuthorCreateRequest;
use App\Http\Requests\Author\AuthorUpdateRequest;
use Illuminate\Http\Request;
use App\Models\Author;

class AuthorController extends Controller
{
    public function list()
    {
        $authors = Author::all();
        return response($authors);
    }

    public function create(AuthorCreateRequest $request)
    {
        $data = $request->json()->all();
        $author = Author::create($data);
        if ($author) {


            return response($author);
        } else {
            return response('bb', 400);
        }
    }

    public function update(AuthorUpdateRequest $request)
    {
        $data = $request->json()->all();
        $author = Author::find($data['id']);
        if ($author) {

            $author->update($data);
            return response($author);
        } else {
            return response('404', 404);
        }
    }

    public function delete($id)
    {
        $author = Author::find($id);
        if ($author) {

            $author->delete();
            return response('deleted');
        } else {
            return response('404', 404);
        }
    }

    public function get($id)
    {
        $author = Author::find((int)$id);
        if (!$author) {
            return response('404', 404);
        }
        return response($author);
    }

    public function books($id)
    {
        $author = Author::find($id);

        if (!$author) {
            return response('404', 404);
        }

        $books = $author->books()->get()->where('visible', '=', true);


        return response($books);

    }
}
