<?php

namespace App\Entities\User;

use App\Entities\Core\Entity;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;

class User extends Entity implements AuthenticatableContract
{
    use Authenticatable;
}
