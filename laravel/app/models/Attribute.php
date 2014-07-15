<?php

class Attribute extends Eloquent {

	protected $table = 'puestos';

	public function getAuthIdentifier()
	{
		return $this->getKey();
	}

	public function getName()
	{
		return $this->name;
	}

	public function getDescripcion()
	{
		return $this->descripcion;
	}
	
	public function User()
	{
		return $this->belongsTo("User", "id");
	}

}