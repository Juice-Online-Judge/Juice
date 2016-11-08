<?php

namespace App\Http\Controllers\Api\V1;

use App\Configs\Config;
use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Api\V1\ConfigRequest;

class ConfigController extends ApiController
{
    /**
     * Get all configs.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index()
    {
        return Config::all();
    }

    /**
     * Get config data.
     *
     * @param string $key
     *
     * @return \Dingo\Api\Http\Response
     */
    public function show($key)
    {
        $config = Config::where('public', true)->findOrFail($key, ['value']);

        return $config->getAttribute('value');
    }

    /**
     * Update config data.
     *
     * @param ConfigRequest $request
     * @param string $key
     *
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model
     */
    public function update(ConfigRequest $request, $key)
    {
        $config = Config::findOrFail($key);

        if (! $config->update($request->only(['value', 'public']))) {
            $this->response->errorInternal();
        }

        return $config;
    }
}
