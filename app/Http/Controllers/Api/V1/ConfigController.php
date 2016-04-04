<?php

namespace App\Http\Controllers\Api\V1;

use App\Configs\Config;
use App\Http\Requests\Api\V1\ConfigRequest;

class ConfigController extends ApiController
{
    /**
     * ConfigController constructor.
     */
    public function __construct()
    {
        $this->middleware('role:admin', ['except' => ['show']]);
    }

    /**
     * Get all configs.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $configs = Config::all();

        return $this->setData($configs)->responseOk();
    }

    /**
     * Get config info.
     *
     * @param string $key
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($key)
    {
        $config = Config::where('public', true)->find($key, ['value']);

        if (is_null($config)) {
            return $this->responseNotFound();
        }

        return $this->setData($config->getAttribute('value'))->responseOk();
    }

    /**
     * Update config info.
     *
     * @param ConfigRequest $request
     * @param string $key
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(ConfigRequest $request, $key)
    {
        $config = Config::find($key);

        if (is_null($config)) {
            return $this->responseNotFound();
        }

        if (! $config->update($request->only(['value', 'public']))) {
            return $this->responseUnknownError();
        }

        return $this->setData($config->fresh())->responseOk();
    }
}
