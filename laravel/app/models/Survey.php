<?php

class Survey extends Eloquent {

	protected $table = 'surveys';
	protected $fillable = array('name','description','active','createdUser','modifiedUser', 'instructions', 'comments');
	
	public function getAuthIdentifier()
	{
		return $this->getKey();
	}
	
	public function Fields()
	{
		return $this->hasMany("Fields")->select('survey_id','id','createdUser','modifiedUser','name', 'helptext', 'type','sortableKey','answers');
	}
	
	/*public function cliente()
	{
		return $this->hasOne("Cliente" ,"id")->select("id", "nombre");
	}*/
	
	/*public function puesto()
	{
		return $this->hasOne("Puesto", "id")->select("id","name");
	}*/
	public static function AddSurvey($input){
	  $survey = Survey::create($input);
	  return $survey;
	}
}