<?php

namespace App\Http\Controllers;

use App\Http\Requests\Book\BookCreateRequest;
use App\Http\Requests\Book\ImageUploadRequest;
use App\Models\Book;
use Illuminate\Http\Request;
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

        $data = $request->json()->all();
        $data['image'] = "/assets/images/default_book_image.png";

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
        if ($book) {
            $book->update($request->json()->all());
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
        if ($book) {
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
        if ($book) {
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
        $books = Book::all();

        $data = array_map(function ($book) {
            if (Storage::exists($book['image'])) {
                $book['image'] = Storage::url($book['image']);
            }
            return $book;
        }, $books->toArray());

        return response($data);
    }
}
