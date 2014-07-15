<?php

class Fields extends Eloquent {

	protected $table = 'fields';
	protected $fillable = array('survey_id','createdUser','modifiedUser','name', 'helptext', 'type','sortableKey','answers');

	public function getAuthIdentifier()
	{
		return $this->getKey();
	}
	
	public function Survey()
	{
		return $this->belongsTo("Survey", "id");
	}
	public function Answer()
	{
		return $this->hasMany("Answer")->select('id','id_field','text');
	}
	
	public static function AddField($input){
	  $field = Fields::create($input);
	  return $field;
	}

}