<?php

namespace App\Http\Controllers;

use App\Http\Requests\Section\SectionCreateRequest;
use App\Http\Requests\Section\SectionUpdateRequest;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{


    public function get()
    {
        if (Auth::check()) {

            $user = Auth::user();
            $userRole = $user->role()->first();
            $data = ['user' => $user->toArray(), 'role' => $userRole->role];
            return response($data);
        }
    }


}
