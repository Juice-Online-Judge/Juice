<?php

namespace App\Questions;

use File;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class JudgeRepository
{
    /**
     * Http Request.
     *
     * @var Request
     */
    protected $request;

    /**
     * Question input files path.
     *
     * @var array
     */
    private $input;

    /**
     * Question output result files path.
     *
     * @var array
     */
    private $output;

    /**
     * The arguments that should append when execute the program.
     *
     * @var array
     */
    private $argument;

    /**
     * The restrictions of the question.
     *
     * @var array
     */
    private $restriction;

    /**
     * Create a new question repository instance.
     *
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Remove input and output files according to the given question key.
     *
     * @param int $questionKey
     *
     * @return bool
     */
    public static function cleanDirectory($questionKey)
    {
        return File::cleanDirectory(static::basePath($questionKey));
    }

    /**
     * Get judge config from request using given question key.
     *
     * @param $questionKey
     * @param Request|null $request
     *
     * @return mixed
     */
    public static function fromRequest($questionKey, Request $request = null)
    {
        static::basePath($questionKey);

        $judge = new static(is_null($request) ? \Request::instance() : $request);

        return $judge->getJudge();
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
            'argument'    => $this->getArgument(),
            'restriction' => $this->getRestriction(),
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
     *
     * @return array
     */
    private function getIO($type)
    {
        if (! is_null($this->$type)) {
            return $this->$type;
        }

        $this->$type = [
            'basePath' => $this->basePath(),
            'files'    => $this->request->hasFile("{$type}.file")
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
     *
     * @return array
     */
    private function ioUsingFiles($type, array $files)
    {
        return $this->storeIo($type, $files, function (UploadedFile $file, $index) use ($type) {
            if (! $file->isValid()) {
                return false;
            }

            return File::put(
                file_build_path($this->basePath(), "{$type}_{$index}"),
                $this->normalizeNewLine(file_get_contents($file->getRealPath()))
            );
        });
    }

    /**
     * Store input or output from textarea.
     *
     * @param string $type
     * @param array $textarea
     *
     * @return array
     */
    private function ioUsingTextarea($type, array $textarea)
    {
        return $this->storeIo($type, $textarea, function ($text, $index) use ($type) {
            return File::put(
                file_build_path($this->basePath(), "{$type}_{$index}"),
                $this->normalizeNewLine($text)
            );
        });
    }

    /**
     * Store input or output to filesystem.
     *
     * @param string $type
     * @param array $data
     * @param callable $callback
     *
     * @return array
     */
    private function storeIo($type, array $data, callable $callback)
    {
        $index = 0;

        foreach ($data as $datum) {
            if (false !== $callback($datum, $index)) {
                $result[] = "{$type}_{$index}";
            }

            ++$index;
        }

        return isset($result) ? $result : [];
    }

    /**
     * Normalize the new line characters.
     *
     * @param string $text
     *
     * @return string
     */
    protected function normalizeNewLine($text)
    {
        return str_replace(["\r\n", "\r", "\n"], PHP_EOL, $text);
    }

    /**
     * Get the compile argument.
     *
     * @return array
     */
    protected function getArgument()
    {
        if (! is_null($this->argument)) {
            return $this->argument;
        }

        $this->argument = $this->request->input('argument', []);

        return $this->argument;
    }

    /**
     * Get the judge restriction.
     *
     * @return array
     */
    protected function getRestriction()
    {
        if (! is_null($this->restriction)) {
            return $this->restriction;
        }

        $this->restriction = $this->request->input('restriction');

        if (! isset($this->restriction['library'])) {
            $this->restriction['library'] = [];
        }

        return $this->restriction;
    }

    /**
     * Get the base directory path for the question.
     *
     * @param int|null $questionKey
     *
     * @return string
     */
    public static function basePath($questionKey = null)
    {
        static $basePath = null;

        if (! is_null($basePath) && is_null($questionKey)) {
            return $basePath;
        }

        $basePath = file_build_path(
            config('filesystems.disks.local.root'),
            'questions',
            intval(floor($questionKey / 1000)),
            $questionKey
        );

        return static::makeDirectoryIfNotExists($basePath);
    }

    /**
     * Make the target directory recursively if it does not exist.
     *
     * @param string $dir
     *
     * @return string
     */
    protected static function makeDirectoryIfNotExists($dir)
    {
        if (! File::exists($dir)) {
            File::makeDirectory($dir, 493, true);
        }

        return $dir;
    }
}
