<?php

namespace App\Http\Controllers;

use App\Http\Requests\Book\BookListRequest;
use App\Http\Requests\Section\SectionCreateRequest;
use App\Http\Requests\Section\SectionUpdateRequest;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class SectionController extends Controller
{
    public function list(BookListRequest $request)
    {
        if (Auth::check()) {
            $auth = true;
        } else {
            $auth = false;
        }
        $requestData = $request->json()->all();
        $count = Section::all()->where('visible', '=', true)->count();
        $offset = $requestData['offset'];
        $take = $requestData['take'];
        if ($take=-1)
        {
            $take=$count;
        }
        $sections = Section::all()
            ->where('visible', '=', true)
            ->skip($offset)
            ->take($take)->toArray();

        return response(['auth' => $auth, 'count' => $count,
            'offset' => $offset, 'take' => $take, 'sections' => array_values($sections)]);
    }

    public function create(SectionCreateRequest $request)
    {
        $data = $request->json()->all();
        $section = Section::create($data);
        if ($section) {


            return response($section);
        } else {
            return response('bb', 400);
        }
    }

    public function update(SectionUpdateRequest $request)
    {
        $data = $request->json()->all();
        $section = Section::find($data['id']);
        if ($section) {

            $section->update($data);
            return response($section);
        } else {
            return response('404', 404);
        }
    }

    public function delete($id)
    {
        $section = Section::find($id);
        if ($section) {

            $section->delete();
            return response('deleted');
        } else {
            return response('404', 404);
        }
    }

    public function get($id)
    {
        $section = Section::find((int)$id);
        if (!$section) {
            return response('404', 404);
        }
        if (!$section['visible']) {
            return response('403', 403);
        }
        return response($section);
    }

    public function books(BookListRequest $request,$id)
    {
        $section = Section::find($id);
        if (Auth::check())
        {
            $auth=true;
        }
        else
        {
            $auth=false;
        }
        if (!$section) {
            return response('404', 404);
        }
        if (!$section['visible']) {
            return response('403', 403);
        }
        $requestData = $request->json()->all();
        $count=$section->books()->get()->where('visible', '=', true)->count();
        $offset=$requestData['offset'];
        $take=$requestData['take'];
        $books = $section->books()

            ->where('visible', '=', true)

            ->skip($offset)
            ->take($take)
            ->get()
            ->toArray();

        $books = array_map(function ($book) {
            if (Storage::exists($book['image'])) {
                $book['image'] = Storage::url($book['image']);
                unset($book['author_id']);
                unset($book['section_id']);
            }
            return $book;
        }, $books);
        return response(['auth'=>$auth,
            'section'=>$section->toArray(),
            'count'=>$count,'offset'=>$offset,'take'=>$take,'books'=>array_values($books)]);;

    }
}
