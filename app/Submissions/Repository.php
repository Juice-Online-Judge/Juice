<?php

namespace App\Submissions;

use App\Core\BaseRepository;
use File;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class Repository extends BaseRepository
{
    /**
     * @var Submission
     */
    private $submission;

    /**
     * Repository constructor.
     *
     * @param Submission $submission
     */
    public function __construct($submission)
    {
        parent::__construct();

        $this->submission = $submission;
    }

    /**
     * Save the code that user submitted to filesystem.
     *
     * @param UploadedFile|string $code
     * @return bool
     */
    public function save($code)
    {
        if ($code instanceof UploadedFile) {
            try {
                $code->move($this->getBasePath(), $this->getFileName());
            } catch (FileException $e) {
                return false;
            }

            return true;
        }

        return File::put($this->getPath(), $code) > 0;
    }

    /**
     * Get the submission code path.
     *
     * @return string
     */
    public function getPath()
    {
        return file_build_path($this->getBasePath(), $this->getFileName());
    }

    /**
     * Get the submission code base dir path.
     *
     * @return string
     */
    protected function getBasePath()
    {
        $dir = file_build_path(
            $this->diskPath,
            'submissions',
            intval(floor($this->submission->getAttribute('id') / 1000))
        );

        $this->makeDirectoryIfNotExists($dir);

        return $dir;
    }

    /**
     * Get the submission code file name.
     *
     * @return string
     */
    protected function getFileName()
    {
        return implode('_', [
            $this->submission->getAttribute('id'),
            $this->submission->getAttribute('question_id'),
            $this->submission->getAttribute('user_id'),
        ]);
    }
}
