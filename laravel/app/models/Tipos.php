<?php

class Tipos extends Eloquent {

	protected $table = 'tipos';
	protected $fillable = array('nombre,img');
	
	public function getAuthIdentifier()
	{
		return $this->getKey();
	}
}