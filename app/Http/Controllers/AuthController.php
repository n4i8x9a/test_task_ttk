<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Http\Requests\Auth\AuthLoginRequest;
use App\Http\Requests\Auth\AuthRegisterRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{


    public function register(AuthRegisterRequest $request)
    {
        $data = $request->json()->all();


        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);
        Role::create(['user_id' => $user->toArray()['id'], 'role' => 'user']);
        if ($user) {


            return response($user, 201);
        } else {
            return response(['message' => 'gg'], 400);
        }
    }

    public function login(AuthLoginRequest $request)
    {
        $data = $request->json()->all();

        $user = User::where('email', $data['email'])->first();

        if (!$user) {
            return response(['message' => 'gg'], 403);
        }

        if (!Hash::check($data['password'], $user->password)) {
            return response(['message' => 'wrong'], 403);
        }
        $userRole = $user->role()->first();

        if ($userRole) {
            $this->scope = $userRole->role;
        }

        $accessToken = $user->createToken('authToken', [$this->scope])->accessToken;

        return response(['user' => $user->toArray(), 'access_token' => $accessToken,'role'=>$userRole->role]);

    }

    public function logout()
    {
        if (Auth::check()) {
            Auth::user()->token()->revoke();
        }

        return response(['message' => 'logout']);
    }

    public function checkAuth()
    {
        if (Auth::check()) {

            $user = Auth::user();
            $userRole = $user->role()->first();
            $data = ['auth' => true, 'user_id' => $user['id'], 'role' => $userRole->role];
            return response($data);
        }

    }
}
