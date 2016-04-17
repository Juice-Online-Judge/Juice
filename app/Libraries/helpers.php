<?php

if (! function_exists('get_target_path')) {
    /**
     * Get the correct directory separator for target path.
     *
     * @param array|mixed $path
     * @return string
     */
    function get_target_path($path)
    {
        $path = is_array($path) ? $path : func_get_args();

        return implode(DIRECTORY_SEPARATOR, $path);
    }
}

if (! function_exists('pluck_relation_field')) {
    /**
     * Pluck relation filed.
     *
     * @param array|\Illuminate\Database\Eloquent\Model $models
     * @param string $relation
     * @param string $value
     * @param string|null $key
     * @return void
     */
    function pluck_relation_field($models, $relation, $value, $key = null)
    {
        $models = is_array($models) ? $models : [$models];

        foreach ($models as $model) {
            $model->setRelation($relation, $model->getRelation($relation)->pluck($value, $key));
        }
    }
}

if (! function_exists('move_up_pivot_attributes')) {
    /**
     * Get pivot attributes to parent model.
     *
     * @param \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model $models
     * @param array $attributes
     * @param bool $removePivot
     * @param callable $callable
     * @return void
     */
    function move_up_pivot_attributes($models, array $attributes, $removePivot = true, callable $callable = null)
    {
        $models = ($models instanceof \Illuminate\Database\Eloquent\Collection) ? $models->all() : [$models];

        foreach ($models as $model) {
            $pivot = $model->getRelation('pivot');

            foreach ($attributes as $pivotKey => $newKey) {
                $pivotKey = is_int($pivotKey) ? $newKey : $pivotKey;

                $model->setAttribute($newKey, $pivot->getAttribute($pivotKey));
            }

            if (! is_null($callable)) {
                $callable($model);
            }

            if ($removePivot) {
                remove_pivot($model);
            }
        }
    }
}

if (! function_exists('remove_pivot')) {
    /**
     * Remove the pivot relation in many to many relationship.
     *
     * @param \Illuminate\Database\Eloquent\Model $model
     */
    function remove_pivot($model)
    {
        $model->offsetUnset('pivot');
    }
}

if (! function_exists('request_user')) {
    /**
     * Get the request user.
     *
     * @return \App\Accounts\User
     */
    function request_user()
    {
        return JWTAuth::toUser(JWTAuth::getToken());
    }
}
