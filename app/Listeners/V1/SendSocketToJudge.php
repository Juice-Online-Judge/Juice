<?php

namespace App\Listeners\V1;

use App\Events\V1\CodeSubmitted;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendSocketToJudge implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  CodeSubmitted  $event
     * @return void
     */
    public function handle(CodeSubmitted $event)
    {
        $path = config('judge.judge.socket');

        if (! is_null($path)) {
            $socket = stream_socket_client($path);

            fwrite($socket, 'ping');

            fclose($socket);
        }
    }
}
