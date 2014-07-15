<?php
class SurveyController extends BaseController {

    public function getIndex()
    {
    }
	public function createSurvey(){
		$input = Input::all();
		$input["active"] = array_keys($input["active"]);
		$input["active"] = end($input["active"]);
		$input["comments"] = array_keys($input["comments"]);
		$input["comments"] = end($input["comments"]);
		$dataSurvey = array(
			"name" => $input["name"],
			"description" => $input["description"],
			"active" => $input["active"],
			"createdUser" => "1",
			"modifiedUser" => "1",
			"instructions" => $input["instructions"],
			"comments" => $input["comments"]
		);
        $survey = Survey::AddSurvey($dataSurvey);
		foreach ($input["fields"] as $eachField)
		{	
			//$eachField["answers"] = explode("\n", $eachField["answers"]);
			$eachField["type"] = array_keys($eachField["type"]);
			$eachField["type"] = end($eachField["type"]);
			$dataField = array(
				"survey_id" => $survey->id,
				"createdUser" => "1",
				"modifiedUser" => "1",
				"name" => $eachField["name"],
				"helptext" => "TEST",
				"type" =>  $eachField["type"],
				"sortableKey" =>$eachField["sortableKey"],
				"answers" => $eachField["answers"]
			);
			$field = Field::AddField($dataField);

		}
		$survey->load('Fields');
		$response = Response::json($survey);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function changeSurvey($id){
		$input = Input::all();
		$input["active"] = array_keys($input["active"]);
		$input["active"] = end($input["active"]);
		$input["comments"] = array_keys($input["comments"]);
		$input["comments"] = end($input["comments"]);
		
		$survey = Survey::find($id);
		$survey->name = $input["name"];
		$survey->description = $input["description"];
		$survey->active = $input["active"];
		$survey->createdUser = "1";
		$survey->modifiedUser = "1";
		$survey->instructions = $input["instructions"];
		$survey->comments = $input["comments"];
		if(isset($input["fields"]))
		{
			foreach ($input["fields"] as $key =>$eachField)
			{	
				$eachField["type"] = array_keys($eachField["type"]);
				$eachField["type"] = end($eachField["type"]);
				$field = Field::find($key);
				$field->createdUser = "1";
				$field->modifiedUser = "1";
				$field->name = $eachField["name"];
				$field->helptext = "NINGUNA";
				$field->type = $eachField["type"];
				$field->sortableKey = $eachField["sortableKey"];
				$field->answers = $eachField["answers"];
				$field->save();
			}
		}
        $survey->save();
		$survey->load('Fields');
		$response = Response::json($survey);
		$response->header('Content-Type', 'application/json');
		return $response;
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
	public function deleteSurveyWhitId($id)
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
    }

}
?>