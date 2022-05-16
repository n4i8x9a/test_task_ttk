<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Http\Requests\Auth\AuthLoginRequest;
use App\Http\Requests\Auth\AuthRegisterRequest;
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


        $accessToken = $user->createToken('authToken')->accessToken;

        return response(['user' => $user->toArray(), 'access_token' => $accessToken]);

    }

    public function logout()
    {
        if (Auth::check()) {
            Auth::user()->token()->revoke();
        }

        return response(['message' => 'logout']);
    }
}