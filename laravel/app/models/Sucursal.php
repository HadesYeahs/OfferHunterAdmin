<?php

class Sucursal extends Eloquent {

	protected $table = 'sucursal';
	protected $fillable = array('id_cliente','nombre','direccion','ubicacion');
	
	public function getAuthIdentifier()
	{
		return $this->getKey();
	}
	
	/*public function Fields()
	{
		return $this->hasMany("Fields")->select('survey_id','id','createdUser','modifiedUser','name', 'helptext', 'type','sortableKey','answers');
	}*/
	
	/*public function cliente()
	{
		return $this->hasOne("Cliente" ,"id")->select("id", "nombre");
	}*/
	
	/*public function puesto()
	{
		return $this->hasOne("Puesto", "id")->select("id","name");
	}*/
	public static function AddSucursal($input){
	  $sucursal = Sucursal::create($input);
	  return $sucursal;
	}
}