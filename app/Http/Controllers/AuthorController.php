<?php

namespace App\Http\Controllers;

use App\Http\Requests\Author\AuthorCreateRequest;
use App\Http\Requests\Author\AuthorUpdateRequest;
use App\Http\Requests\Book\BookListRequest;
use Illuminate\Http\Request;
use App\Models\Author;
use Illuminate\Support\Facades\Auth;

class AuthorController extends Controller
{
    public function list(BookListRequest $request)
    {
        if (Auth::check()) {
            $auth = true;
        } else {
            $auth = false;
        }
        $requestData = $request->json()->all();
        $count = Author::all()->count();
        $offset = $requestData['offset'];
        $take = $requestData['take'];
        $authors = Author::all()
            ->skip($offset)
            ->take($take)->toArray();

        return response(['auth' => $auth, 'count' => $count,
            'offset' => $offset, 'take' => $take, 'authors' => array_values($authors)]);
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

    public function books(BookListRequest $request,$id)
    {
        $author = Author::find($id);
        if (Auth::check())
        {
            $auth=true;
        }
        else
        {
            $auth=false;
        }
        if (!$author) {
            return response('404', 404);
        }

        $requestData = $request->json()->all();
        $count=$author->books()->get()->where('visible', '=', true)->count();
        $offset=$requestData['offset'];
        $take=$requestData['take'];
        $books = $author->books()
            ->where('visible', '=', true)
            ->skip($offset)
            ->take($take)
            ->get()
            ->toArray();


        return response(['auth'=>$auth,
            'author'=>$author->toArray(),
            'count'=>$count,'offset'=>$offset,'take'=>$take,'books'=>array_values($books)]);;

    }
}
