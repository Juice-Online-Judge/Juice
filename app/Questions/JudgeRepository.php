<?php

namespace App\Questions;

use Illuminate\Http\Request;
use Storage;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class JudgeRepository extends Repository
{
    protected $request;

    private $input;

    private $output;

    private $arguments;

    private $restrictions;

    /**
     * Create a new question repository instance.
     *
     * @param Request $request
     * @param int $questionId
     */
    public function __construct(Request $request, $questionId)
    {
        $this->request = $request;

        $this->getBasePath($questionId);
    }

    /**
     * Get judge info.
     *
     * @return array
     */
    public function getJudge()
    {
        return [
            'input'       => $this->getInput(),
            'output'      => $this->getOutput(),
            'arguments'    => $this->getArguments(),
            'restrictions' => $this->getRestrictions(),
        ];
    }

    /**
     * Get the judge input.
     *
     * @return array
     */
    protected function getInput()
    {
        return $this->getIO('input');
    }

    /**
     * Get the judge output.
     *
     * @return array
     */
    protected function getOutput()
    {
        return $this->getIO('output');
    }

    /**
     * Input and output getter.
     *
     * @param string $type
     * @return array
     */
    private function getIO($type)
    {
        if (! is_null($this->$type)) {
            return $this->$type;
        }

        $this->$type = [
            'base'  => $this->getBasePath(),
            'files' => $this->request->hasFile("{$type}.file")
                ? $this->ioUsingFiles($type, $this->request->file("{$type}.file"))
                : $this->ioUsingTextarea($type, $this->request->input("{$type}.textarea")),
        ];

        return $this->$type;
    }

    /**
     * Store input or output from files.
     *
     * @param string $type
     * @param array $files
     * @return array
     */
    private function ioUsingFiles($type, array $files)
    {
        return $this->storeIo($type, $files, function (UploadedFile $file, $index) use ($type) {
            if ($file->isValid()) {
                $file->move($this->getBasePath(), "{$type}_{$index}");
            }

            return $file->isValid();
        });
    }

    /**
     * Store input or output from textarea.
     *
     * @param string $type
     * @param array $textarea
     * @return array
     */
    private function ioUsingTextarea($type, array $textarea)
    {
        return $this->storeIo($type, $textarea, function ($text, $index) use ($type) {
            return Storage::disk()->put(get_target_path($this->getBasePath(), "{$type}_{$index}"), $text);
        });
    }

    /**
     * Store input or output to filesystem.
     *
     * @param string $type
     * @param array $data
     * @param callable $callback
     * @return array
     */
    private function storeIo($type, array $data, callable $callback)
    {
        $index = 0;

        foreach ($data as $datum) {
            if ($callback($datum, $index)) {
                $result[] = "{$type}_{$index}";
            }

            ++$index;
        }

        return isset($result) ? $result : [];
    }

    /**
     * Get the compile arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        if (! is_null($this->arguments)) {
            return $this->arguments;
        }

        $this->arguments = $this->request->input('arguments');

        return $this->arguments;
    }

    /**
     * Get the judge restrictions.
     *
     * @return array
     */
    protected function getRestrictions()
    {
        if (! is_null($this->restrictions)) {
            return $this->restrictions;
        }

        $this->restrictions = $this->request->input('restrictions');

        if (! isset($this->restrictions['library'])) {
            $this->restrictions['library'] = [];
        }

        return $this->restrictions;
    }
}
