<?php

namespace App\Core;

use File;

class BaseRepository
{
    /**
     * @var string
     */
    protected $diskPath;

    /**
     * BaseRepository constructor.
     */
    public function __construct()
    {
        $this->diskPath = config('filesystems.disks.local.root');
    }

    /**
     * Make the target directory if it does not exist.
     *
     * @param string $dir
     */
    protected function makeDirectoryIfNotExists($dir)
    {
        if (! File::exists($dir)) {
            File::makeDirectory($dir, 493, true);
        }
    }
}
