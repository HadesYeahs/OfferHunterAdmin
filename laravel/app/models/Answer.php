<?php

class Answer extends Eloquent {

	protected $table = 'answer';
	protected $fillable = array('id_field','text');

	public function getAuthIdentifier()
	{
		return $this->getKey();
	}
	
	public function Field()
	{
		return $this->belongsTo("Field", "id");
	}
	
	public static function AddAnswer($input){
	  $answer = Answer::create($input);
	  return $answer;
	}

}