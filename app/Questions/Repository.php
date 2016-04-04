<?php

namespace App\Questions;

use Storage;

class Repository
{
    /**
     * @var string
     */
    protected $basePath;

    /**
     * Get the base directory path of the specific question.
     *
     * @param int|null $questionId
     * @return string
     */
    public function getBasePath($questionId = null)
    {
        if (is_null($questionId) || ! is_null($this->basePath)) {
            return $this->basePath;
        }

        $dir = get_target_path('questions', intval(floor($questionId / 1000)), $questionId);

        $this->makeDirectoryIfNotExists($dir);

        $this->basePath = get_target_path(config('filesystems.disks.local.root'), $dir);

        return $this->basePath;
    }

    /**
     * Make the target directory if it does not exist.
     *
     * @param string $dir
     */
    protected function makeDirectoryIfNotExists($dir)
    {
        if (! Storage::disk()->exists($dir)) {
            Storage::disk()->makeDirectory($dir);
        }
    }
}
