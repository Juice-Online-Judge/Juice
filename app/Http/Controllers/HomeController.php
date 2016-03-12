<?php

namespace App\Http\Controllers;

class HomeController extends Controller
{
    /**
     * Website home page.
     *
     * @return \Illuminate\View\View
     */
    public function home()
    {
        return view('welcome');
    }
}
