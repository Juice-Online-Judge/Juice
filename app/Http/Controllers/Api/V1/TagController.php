<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Api\V1\TagRequest;
use App\Tags\Tag;
use Illuminate\Http\Request;

class TagController extends ApiController
{
    /**
     * Get tags which filtered by the query string.
     *
     * @param Request $request
     *
     * @return \Dingo\Api\Http\Response
     */
    public function index(Request $request)
    {
        $tags = new Tag;

        if ($request->has('filter')) {
            $tags = $tags->whereIn('type', explode(',', $request->input('filter')));
        }

        return $tags->get(['id', 'name']);
    }

    /**
     * Create a new tag.
     *
     * @param TagRequest $request
     *
     * @return \Dingo\Api\Http\Response
     */
    public function store(TagRequest $request)
    {
        $tag = new Tag($request->only(['name']));

        if ($request->has('type')) {
            $tag->setAttribute('type', $request->input('type'));
        }

        if (! $tag->save()) {
            $this->response->errorInternal();
        }

        return $this->response->created(null, $tag);
    }

    /**
     * Get tag data.
     *
     * @param int $id
     *
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model
     */
    public function show($id)
    {
        return Tag::findOrFail($id);
    }

    /**
     * Update tag data.
     *
     * @param TagRequest $request
     * @param int $id
     *
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model
     */
    public function update(TagRequest $request, $id)
    {
        $tag = Tag::findOrFail($id);

        $tag->setAttribute('name', $request->input('name'));

        if ($request->has('type')) {
            $tag->setAttribute('type', $request->input('type'));
        }

        if (! $tag->save()) {
            $this->response->errorInternal();
        }

        return $tag;
    }

    /**
     * Delete the tag.
     *
     * @param int $id
     *
     * @return \Dingo\Api\Http\Response
     */
    public function destroy($id)
    {
        if (! Tag::findOrFail($id)->delete()) {
            $this->response->errorInternal();
        }

        return $this->response->noContent();
    }
}
