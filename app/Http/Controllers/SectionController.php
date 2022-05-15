<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function list()
    {
        $sections = Section::all();
        return response($sections);
    }
}
