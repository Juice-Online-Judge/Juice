<?php

if (! function_exists('get_target_path')) {
    /**
     * Get the correct directory separator for target path.
     *
     * @param array|mixed $path
     * @return string
     */
    function get_target_path($path) {
        $path = is_array($path) ? $path : func_get_args();

        return implode(DIRECTORY_SEPARATOR, $path);
    }
}
