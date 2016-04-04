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
