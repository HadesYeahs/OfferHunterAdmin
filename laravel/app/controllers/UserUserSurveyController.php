<?php
class UserUserSurveyController extends BaseController {

    public function getIndex()
    {
    }
	public function getSurveys($id){
		//$surveys = DB::select('SELECT * FROM sc_sv_user_survey WHERE user_id = '.$id.' AND username NOT IN (SELECT id_user_respondent FROM sc_sv_surveyresults WHERE id_user = '.$id.')');
		/*$surveys = DB::select('SELECT A.*, B.* FROM sc_sv_user_survey A
		LEFT JOIN sc_sv_surveyresults B ON B.id_survey = A.survey AND B.id_user = '.$id.'
		WHERE A.user_id = '.$id.' AND B.id IS NULL;');*/
		$surveys = DB::select('SELECT A.*, B.* FROM sc_sv_user_survey A
		LEFT JOIN sc_sv_surveyresults B ON B.id_survey = A.survey AND B.id_user =  A.user_id AND B.id_user_respondent = A.username
		WHERE A.user_id = '.$id.' AND B.id IS NULL');
		
		$rel = array();
		foreach($surveys as $key => $eachsurvey)
		{
			$user = User::find($eachsurvey->username);
			
			$survey = Survey::find($eachsurvey->survey);
			
			$url  = "surveys/".urlencode ($survey->name)."/".$survey->id.'/'.$user->id;
			
			$dataSurvey = array(
			"name" => $user->name,
			"puesto" => $user->puesto,
			"surveyName" => $survey->name,
			"url" => $url
			);
			array_push($rel,$dataSurvey);
			
		}
		$response = Response::json($rel);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function getReportSurveys($id){
		$UsersRespond = DB::select('SELECT A.id , B.id AS idSurvey, B.name FROM sc_sv_surveyresults A INNER JOIN sc_sv_surveys B ON B.id = A.id_survey WHERE id_user_respondent ='. $id);
		$surveys = DB::select('SELECT A.survey FROM sc_sv_user_survey A WHERE A.username = '. $id.' GROUP BY A.survey');
		$surveyResult = array();
		foreach($surveys as $eachsurvey)
		{
			$surveyResult["idSurvey"]= $eachsurvey->survey;
			$fieldsValue = DB::select('SELECT A.id AS idRspuestasHeader, C.id_field, SUM(C.size) as sum, B.name
			FROM sc_sv_surveyresults A
			LEFT JOIN sc_sv_surveyanswers C ON C.id_surveyresult = A.id
			INNER JOIN sc_sv_fields B ON B.id = C.id_field
			WHERE id_user_respondent = '. $id.' AND A.id_survey = '.$eachsurvey->survey. ' GROUP BY C.id_field ORDER BY C.id_field');
			$arrayFields= array();
			foreach($fieldsValue as $eachfieldsValue)
			{
				$arrayFields[$eachfieldsValue->id_field]= $eachfieldsValue->sum/count($UsersRespond);
			}
			$surveyResult["fieldValues"] = $arrayFields;
		
			
		}
		var_dump($surveyResult);
		exit();
		/*var_dump($test);
		exit();
		
		$usersurvey = DB::table('user_survey')->where('username', $id)->get();	
		foreach($usersurvey as $keySurvey => $eachSurvey)
		{
			$surveyFinalResults = array();
			$userresults = DB::table('surveyresults')->where('id_survey', $usersurvey[$keySurvey]->survey)->get();
			foreach($userresults as $keyres => $eachresult)
			{
				$fieldsSurvey = DB::table('fields')->where('survey_id', $eachresult->id_survey)->get();
				$sumEachField = array();
				foreach($fieldsSurvey as $keyfield => $eachfield)
				{
					$useranwers = DB::table('surveyanswers')->where('id_field', $eachfield->id)->get();
					$sumField =0;
					foreach($useranwers as $keyAnwer => $eachanwer)
					{
					$sumField = $sumField + $eachanwer->size;
					}
					$sumEachField[$eachfield->id]=($sumField /count($useranwers));
				}
				$surveyFinalResults["sumFields"] = $sumEachField;
				///
				$useranwers = DB::table('surveyanswers')->where('id_survey', $eachresult->id_survey)->get();
				$sumEachField = array();
				foreach($useranwers as $keyAnwer => $eachanwer)
				{
					$sumEncuestador = 0;
					$fieldsSurvey = DB::table('fields')->where('survey_id', $eachanwer->id_survey)->get();
					
					foreach($fieldsSurvey as $keyfield => $eachfield)
					{
						$sumEncuestador = $sumEncuestador + $eachanwer->size;
					}
					$sumEachField[$eachanwer->id]=$sumEncuestador ;
				}
				//$surveyFinalResults["sumEncuestador"] = $sumEachField;
				var_dump($surveyFinalResults);
				//exit();
				///

			}
		}*/
		
	}
	public function getAllSurveys()
    {
        $survey = Survey::All();
		foreach ($survey as $key => $eachSurvey)
		{	
			$survey[$key]->url = "surveys/".urlencode ($survey[$key]->name)."/".$survey[$key]->id;
		}
		$survey->load('Fields');
		$response = Response::json($survey);
		$response->header('Content-Type', 'application/json');
		return $response;
	}  
	public function getSurveyWhitId($id)
    {	
        $survey = Survey::find($id);
		$survey->url = "surveys/".urlencode ($survey->name)."/".$survey->id;
		$survey->load('Fields');
		$response = Response::json($survey);
		$response->header('Content-Type', 'application/json');
		return $response;
    }
	/*public function deleteSurveyWhitId($id)
    {	
		return $this->deleteSurveys(array($id));
    }
	public function deleteSurveys($arrIds = array())
    {	
		if(is_array($arrIds) && count($arrIds))
		{
			$input["ids"] = $arrIds;
		} else 
		{
			$input = Input::all();
		}
		foreach ($input["ids"] as $key =>$eachid)
		{
			$affectedRows = Fields::where('survey_id', '=', $eachid)->delete();
			Survey::destroy($eachid);
		}
		$c = 'true';
		return $c;
    }*/

}
?>