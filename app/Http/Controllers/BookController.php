<?php

namespace App\Http\Controllers;

use App\Http\Requests\Book\BookCreateRequest;
use App\Http\Requests\Book\BookListRequest;
use App\Http\Requests\Book\ImageUploadRequest;
use App\Models\Book;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Author;
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
        unset($data['author_id']);
        unset($data['section_id']);
        //$data['author']=$book->author();
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

        $author = Author::find($data['author_id']);
        $section = Section::find($data['section_id']);
        if (!$author || !$section) {
            return response('wrong author or section', 404);
        }
        $book = new Book;
        $book->title = $data['title'];
        $book->year = $data['year'];
        $book->description = $data['description'];
        $book->image = "/assets/images/default_book_image.png";
        $book->visible = true;
        $book->author()->associate($author);
        $book->section()->associate($section);
        $book->user()->associate($user);

        $book->save();
        //$data['image'] = "/assets/images/default_book_image.png";
        //$data['user_id'] = $user->toArray()['id'];
        //$data['visible'] = true;


        //$book = Book::create($data);

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
        $requestData = $request->json()->all();
        $id = $requestData['id'];
        $book = Book::find($id);
        $user = Auth::user();
        if ($book) {
            if ($book->toArray()['user_id'] != $user->toArray()['id']) {
                return response('403', 403);
            }
            if (array_key_exists('author_id', $requestData)) {
                $author = Author::find($requestData['author_id']);
                if (!$author) {
                    return response('404', 404);
                }
                $book->author()->associate($author);

            }
            if (array_key_exists('section_id', $requestData)) {
                $section = Section::find($requestData['section_id']);
                if (!$section) {
                    return response('404', 404);
                }
                $book->section()->associate($section);
            }

            if (array_key_exists('title', $requestData)) {
                $book->title = $requestData['title'];
            }
            if (array_key_exists('year', $requestData)) {
                $book->year = $requestData['year'];
            }
            if (array_key_exists('description', $requestData)) {
                $book->description = $requestData['description'];
            }

            $book->save();

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

    public function list(BookListRequest $request)
    {
        if (Auth::check())
        {
            $auth=true;
        }
        else
        {
            $auth=false;
        }
        $requestData = $request->json()->all();
        $count=Book::all()->where('visible', '=', true)->count();
        $offset=$requestData['offset'];
        $take=$requestData['take'];
        $books = Book::all()
            ->where('visible', '=', true)
            ->skip($offset)
            ->take($take);

        $data = array_map(function ($book) {
            if (Storage::exists($book['image'])) {
                $book['image'] = Storage::url($book['image']);
                unset($book['author_id']);
                unset($book['section_id']);
            }
            return $book;
        }, $books->toArray());


        return response(['auth'=>$auth,'count'=>$count,'offset'=>$offset,'take'=>$take,'books'=>array_values($data)]);
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
