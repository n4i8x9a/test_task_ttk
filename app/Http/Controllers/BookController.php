<?php

namespace App\Http\Controllers;

use App\Http\Requests\Book\BookCreateRequest;
use App\Http\Requests\Book\ImageUploadRequest;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\Mime\Part\Multipart\FormDataPart;

class BookController extends Controller
{

    public function get(int $id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response('not found', 404);
        }
        $data = $book->toArray();
        if (Storage::exists($data['image'])) {
            $data['image'] = Storage::url($data['image']);
        }
        return response($data);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @param BookCreateRequest $request
     * @return \Illuminate\Http\Response
     */
    public function create(BookCreateRequest $request)
    {
        $user = Auth::user();
        $data = $request->json()->all();
        $data['image'] = "/assets/images/default_book_image.png";
        $data['user_id'] = $user->toArray()['id'];
        $data['visible'] = true;
        $book = Book::create($data);

        if ($book) {


            return response($book);
        } else {
            return response('bb', 400);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $id = $request->json('id');
        $book = Book::find($id);
        $user = Auth::user();
        if ($book) {
            if ($book->toArray()['user_id'] != $user->toArray()['id']) {
                return response('403', 403);
            }
            $requestData = $request->json()->all();
            unset($requestData['visible']);
            $book->update($requestData);
            $data = $book->toArray();
            if (Storage::exists($book['image'])) {
                $data['image'] = Storage::url($book['image']);
            }
            return response($data);
        } else {
            return response('404', 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function delete(int $id)
    {
        $book = Book::find($id);
        $user = Auth::user();
        if ($book) {
            if ($book->toArray()['user_id'] != $user->toArray()['id']) {
                return response('403', 403);
            }
            if (Storage::exists($book['image'])) {
                Storage::delete($book['image']);
            }
            $book->delete();
            return response("{$id} deleted", 200);
        } else {
            return response("404", 404);
        }
    }

    public function addImage(ImageUploadRequest $request)
    {

        $id = (int)$request->get('id');
        $book = Book::find($id);
        $user = Auth::user();
        if ($book) {
            if ($book->toArray()['user_id'] != $user->toArray()['id']) {
                return response('403', 403);
            }
            if ($request->file('image')) {
                $path = $request->file('image')->store('public/images');
                $oldPath = $book['image'];
                if (Storage::exists($oldPath)) {
                    Storage::delete($oldPath);
                }

                $book->update(['image' => $path]);
                return response(Storage::url($path));
            } else {
                return response('image absent in request', 400);
            }
        } else {
            return response('book_not_found', 404);
        }


    }

    public function list()
    {
        $books = Book::all()->where('visible', '=', true);

        $data = array_map(function ($book) {
            if (Storage::exists($book['image'])) {
                $book['image'] = Storage::url($book['image']);
            }
            return $book;
        }, $books->toArray());

        return response($data);
    }

    public function hide($id)
    {
        $book = Book::find($id);
        if ($book) {
            $book->update(['visible' => false]);
            return response('hide');
        } else {
            return response('not found', 404);
        }
    }

    public function makeVisible($id)
    {
        $book = Book::find($id);
        if ($book) {
            $book->update(['visible' => true]);
            return response('visible');
        } else {
            return response('not found', 404);
        }
    }
}
