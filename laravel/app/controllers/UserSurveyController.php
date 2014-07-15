<?php
class UserSurveyController extends BaseController {

    public function getIndex()
    {

    }
	public function createUserSurvey(){

		$input = Input::all();
		$input["username"] = array_keys($input["username"]);
		$input["username"] = end($input["username"]);
		$input["survey"] = array_keys($input["survey"]);
		$input["survey"] = end($input["survey"]);
		$data = array(
			"user_id" => $input["id_user"],
			"username" => $input["username"],
			"survey" => $input["survey"]
		);
        $rel = UserSurvey::AddUserSurvey($data);
		$user2 = User::find($input["username"]);
		$username = array($input["username"]  =>  $user2->name);
		$survey1 = Survey::find($input["survey"]);
		$survey = array($input["username"]  =>  $survey1->name);
		$rel->username = $username;
		$rel->survey = $survey;
		$response = Response::json($rel);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function changeUserSurvey($id){
		$input = Input::All();
		$input["username"] = array_keys($input["username"]);
		$input["username"] = end($input["username"]);
		$input["survey"] = array_keys($input["survey"]);
		$input["survey"] = end($input["survey"]);
		$rel = UserSurvey::find($id);
			$rel->user_id = $input["id_user"];
			$rel->username = $input["username"];
			$rel->survey = $input["survey"];
        $rel->save();
		$user2 = User::find($input["username"]);
		if(isset($user2))
			$username = array($input["username"]  =>  $user2->name);
		$survey1 = Survey::find($input["survey"]);
		if(isset($survey1))
			$survey = array($input["survey"]  =>  $survey1->name);
		if(isset($username) && isset($survey))
		{
			$rel->username = $username;
			$rel->survey = $survey;
		}
		$response = Response::json($rel);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function deleteUserSurveyWhitId($id)
    {	
		return $this->deleteUserSurvey(array($id));
    }
	public function deleteUserSurvey($arrIds = array())
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
			$affectedRows = UserSurvey::where('id', '=', $eachid)->delete();
			//Survey::destroy($eachid);
		}
		$c = 'true';
		return $c;
    }
	/*
	public function getAllUserSurveys()
    {
		$rel = UserSurvey::All();
		$response = Response::json($rel);
		$response->header('Content-Type', 'application/json');
		return $response;
	}  
	public function getUserSurveyWhitId($id)
    {
        $rel = UserSurvey::find($id);
		$response = Response::json($rel);
		$response->header('Content-Type', 'application/json');
		return $response;
    }
	public function deleteUserWhitId($id)
    {	
        $survey = UserSurvey::find($id);
		$survey->delete();
		//$survey->load('Field');
		$response = Response::json($user);
		$response->header('Content-Type', 'application/json');
		return $response;
    }
	public function deleteUserSurveys()
    {	
        $input = Input::all();
		foreach ($input["fields"] as $key =>$eachField)
		{
			$survey = UserSurvey::find($id);
			$survey->delete();
		}
		$response = Response::json($survey);
		$response->header('Content-Type', 'application/json');
		return $response;
    }
    public function postProfile()
    {
    }*/
	

}
?>