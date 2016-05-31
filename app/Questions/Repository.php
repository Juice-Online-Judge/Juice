<?php

namespace App\Questions;

use App\Core\BaseRepository;

class Repository extends BaseRepository
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

        $this->basePath = file_build_path($this->diskPath, 'questions', intval(floor($questionId / 1000)), $questionId);

        $this->makeDirectoryIfNotExists($this->basePath);

        return $this->basePath;
    }
}
