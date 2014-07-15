<?php

class Puesto extends Eloquent {

	protected $table = 'puestos';
	protected $fillable = array('name','descripcion');

	public function getAuthIdentifier()
	{
		return $this->getKey();
	}
	/*public function User()
	{
		return $this->belongsToMany("User");
	}*/
	public static function AddPuesto($input){
	  $puesto = Puesto::create($input);
	  return $puesto;
	}

}