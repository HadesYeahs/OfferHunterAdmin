<?php

class SurveyResults extends Eloquent {

	protected $table = 'surveyresults';
	protected $fillable = array('id_survey','id_user','comments','id_user_respondent');
	
	public function getAuthIdentifier()
	{
		return $this->getKey();
	}
	public function SurveyAnswers()
	{
		return $this->hasMany("SurveyAnswers")->select('id_survey','id_field','size');
	}
	public static function AddSurveyResults($input){
	  $surveyresults = SurveyResults::create($input);
	  return $surveyresults;
	}
}