<?php
class SurveyResultsController extends BaseController {

    public function getIndex()
    {
        
    }
	public function createSurveyResults(){
		$input = Input::all();
		if(!isset($input["comments"]))
			$input["comments"] = "";
		$data = array(
			"id_survey" => $input["id_survey"],
			"id_user" => $input["id_user"],
			"comments" => $input["comments"],
			"id_user_respondent" => $input["id_user_respondent"]
		);
		$SurveyResults = SurveyResults::AddSurveyResults($data);
		$sRows = Fields::where('survey_id', '=', $input["id_survey"])->get();
		foreach($sRows as $eachField)
		{
			$num = "FIELD_".$eachField->id;
			if(!isset($input[$num]))
				continue;
			$data = array(
			"id_survey" => $input["id_survey"],
			"id_field" => $eachField->id,
			"size" => $input[$num],
			"id_surveyresult" => $SurveyResults->id
			);
			$SurveyAnswers = SurveyAnswers::AddSurveyAnswers($data);
		}
		$response = Response::json($SurveyResults);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function changeSurveyResults($id){
		$input = Input::all();
		$SurveyResults = SurveyResults::find($id);
			$SurveyResults->id_survey = $input["id_survey"];
			$SurveyResults->id_user = $input["id_user"];
			$SurveyResults->comments = $input["comments"];
        $SurveyResults->save();
		foreach ($input["fields"] as $eachField)
		{	
			$data = array(
			"id_survey" => $input["id_survey"],
			"id_field" => $input["id_field"],
			"size" => $input["size"]
			);
			$SurveyAnswers = SurveyAnswers::AddSurveyAnswers($data);

		}
		$response = Response::json($SurveyResults);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function getAllSurveyResults()
    {
		$SurveyResults = SurveyResults::All();

		$response = Response::json($SurveyResults);
		$response->header('Content-Type', 'application/json');
		return $response;
	}  
	public function getSurveyResultsWhitId($id)
    {
        $SurveyResults = SurveyResults::find($id);
		$response = Response::json($SurveyResults);
		$response->header('Content-Type', 'application/json');
		return $response;
    }
    public function postProfile()
    {
    }
	

}
?>