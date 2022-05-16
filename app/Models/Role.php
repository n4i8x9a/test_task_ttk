<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $primaryKey = ['user_id', 'role'];
    public $incrementing = false;
    protected $table = 'user_roles';
    protected $fillable = ['user_id', 'role'];
}
