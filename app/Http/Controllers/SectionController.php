<?php

namespace App\Http\Controllers;

use App\Http\Requests\Section\SectionCreateRequest;
use App\Http\Requests\Section\SectionUpdateRequest;
use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function list()
    {
        $sections = Section::all()->where('visible', '=', true);
        return response($sections);
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

    public function books($id)
    {
        $section = Section::find($id);

        if (!$section) {
            return response('404', 404);
        }
        if (!$section['visible']) {
            return response('403', 403);
        }
        $books = $section->books()->get()->where('visible', '=', true);


        return response($books);

    }
}
