<?php

class Area extends Eloquent {

	protected $table = 'areas';
	protected $fillable = array('name','descripcion');

	public function getAuthIdentifier()
	{
		return $this->getKey();
	}
	/*public function User()
	{
		return $this->belongsToMany("User");
	}*/
	public static function AddArea($input){
	  $area = Area::create($input);
	  return $area;
	}


}