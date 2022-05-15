<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Author;

class AuthorController extends Controller
{
    public function list()
    {
        $authors = Author::all();
        return response($authors);
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

        $books = $author->books()->get();


        return response($books);

    }
}
