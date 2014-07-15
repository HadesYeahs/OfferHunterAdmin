<?php

class UserSurvey extends Eloquent  {

	protected $table = 'user_survey';
	protected $fillable = array('user_id','username','survey');

	public function getAuthIdentifier()
	{
		return $this->getKey();
	}
	
	public function User()
	{
		return $this->belongsTo("User", "id");
	}
	public static function AddUserSurvey($input){
	  $rel = UserSurvey::create($input);
	  return $rel;
	}


}