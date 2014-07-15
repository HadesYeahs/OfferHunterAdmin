<?php

class Oferta extends Eloquent {

	protected $table = 'oferta';
	protected $fillable = array('id_cliente','descripcion','vigencia_app','vigencia_cer','imagportada','imagofer');
	
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
	public static function AddOferta($input){
	  $oferta = Oferta::create($input);
	  return $oferta;
	}
}