<?php

class Cliente extends Eloquent {

	protected $table = 'cliente';
	protected $fillable = array('nombre','mail','telefono','tipo','resena', 'horario_apert', 'horario_cierre','logo','eslogan','cont_nombre','cont_tel','cont_mail','direccion');
	
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
	public static function AddCliente($input){
	  $cliente = Cliente::create($input);
	  return $cliente;
	}
}