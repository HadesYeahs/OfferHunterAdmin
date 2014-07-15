<?php
class SurveyAnswersController extends BaseController {

    public function getIndex()
    {
        
    }
	public function createSurveyAnswers(){
		$input = Input::all();
		$data = array(
			"id_survey" => $input["id_survey"],
			"id_field" => $input["id_field"],
			"size" => $input["size"]
		);
        $SurveyAnswers = SurveyAnswers::AddSurveyAnswers($data);
		$response = Response::json($SurveyAnswers);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function changeSurveyAnswers($id){
		$input = Input::all();
		$SurveyAnswers = SurveyAnswers::find($id);
			$SurveyAnswers->id_survey = $input["id_survey"];
			$SurveyAnswers->id_field = $input["id_field"];
			$SurveyAnswers->size = $input["size"];
        $SurveyAnswers->save();
		$response = Response::json($SurveyAnswers);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function getAllSurveyAnswers()
    {
		$SurveyAnswers = SurveyAnswers::All();

		$response = Response::json($SurveyAnswers);
		$response->header('Content-Type', 'application/json');
		return $response;
	}  
	public function getSurveyAnswersWhitId($id)
    {
        $SurveyAnswers = SurveyAnswers::find($id);
		$response = Response::json($SurveyAnswers);
		$response->header('Content-Type', 'application/json');
		return $response;
    }
    public function postProfile()
    {
    }
	

}
?>