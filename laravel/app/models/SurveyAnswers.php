<?php

class SurveyAnswers extends Eloquent {

	protected $table = 'surveyanswers';
	protected $fillable = array('id_survey','id_field','size','id_surveyresult');
	
	public function getAuthIdentifier()
	{
		return $this->getKey();
	}
	public function SurveyResults()
	{
		return $this->belongsTo("SurveyResults", "id");
	}
	public static function AddSurveyAnswers($input){
	  $surveyanswers = SurveyAnswers::create($input);
	  return $surveyanswers;
	}
}