<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\V1\TagRequest;
use App\Tags\Tag;
use Illuminate\Http\Request;

class TagController extends ApiController
{
    /**
     * Get tags. Use filter query string to filter tags.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $tags = new Tag;

        if ($request->has('filter')) {
            $tags = $tags->whereIn('type', explode(',', $request->input('filter')));
        }

        $tags = $tags->get(['id', 'name']);

        return $this->setData($tags)->responseOk();
    }

    /**
     * Create a new tag.
     *
     * @param TagRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(TagRequest $request)
    {
        $tag = new Tag($request->only(['name']));

        if ($request->has('type')) {
            $tag->setAttribute('type', $request->input('type'));
        }

        if (! $tag->save()) {
            return $this->responseUnknownError();
        }

        return $this->setData($tag->fresh())->responseCreated();
    }

    /**
     * Get tag info.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $tag = Tag::find($id);

        if (is_null($tag)) {
            return $this->responseNotFound();
        }

        return $this->setData($tag)->responseOk();
    }
    
    /**
     * Update tag info.
     *
     * @param TagRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(TagRequest $request, $id)
    {
        $tag = Tag::find($id);

        if (is_null($tag)) {
            return $this->responseNotFound();
        }

        $tag->setAttribute('name', $request->input('name'));

        if ($request->has('type')) {
            $tag->setAttribute('type', $request->input('type'));
        }

        if (! $tag->save()) {
            return $this->responseUnknownError();
        }

        return $this->setData($tag->fresh())->responseOk();
    }
    
    /**
     * Delete the tag.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy($id)
    {
        $tag = Tag::find($id);

        if (is_null($tag)) {
            return $this->responseNotFound();
        }

        if (! $tag->delete()) {
            return $this->responseUnknownError();
        }

        return $this->responseOk();
    }
}
