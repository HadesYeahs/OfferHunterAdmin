<?php
class UserController extends BaseController {

    public function getIndex()
    {
	/*$user = User::find(1);
		$user->password = Hash::make('1234');
		$user->save();
		$response = Response::json($user);
		$response->header('Content-Type', 'application/json');
		return $response;*/

    }
	public function createUser(){
		$input = Input::all();
		$input["type"] = array_keys($input["type"]);
		$input["type"] = end($input["type"]);
		$data = array(
			"email" => $input["email"],
			"password" => Hash::make($input["password"]),
			"name" => $input["name"],
			"type" => $input["type"]
		);
        $user = User::AddUser($data);
		$response = Response::json($user);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function changeUser($id){
		$input = Input::all();
		$input["type"] = array_keys($input["type"]);
		$input["type"] = end($input["type"]);
		$user = User::find($id);
		$user->email = $input["email"];
		$user->password = Hash::make($input["password"]);
		$user->name = $input["name"];
		$user->type = $input["type"];
        $user->save();
		$response = Response::json($user);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function getAllUsers()
    {
        $user = User::All();
		$response = Response::json($user);
		$response->header('Content-Type', 'application/json');
		return $response;
	}  
	public function getUserWhitId($id)
    {	
        $user = User::find($id);
		$user->load('UserSurvey');
		foreach($user as $key => $eachUser)
		{
			foreach($user[$key]->UserSurvey as $key2 => $eachUserSurvey)
			{
				$user2 = User::find($eachUserSurvey->username);
				$username = array($eachUserSurvey->username  =>  $user2->name);
				$survey1 = Survey::find($eachUserSurvey->survey);
				$survey = array($eachUserSurvey->survey  =>  $survey1->name);
				//$user[$key]->UserSurvey[$key2]
				$user[$key]->UserSurvey[$key2]->username = $username;
				$user[$key]->UserSurvey[$key2]->survey = $survey;
				/*var_dump($user[$key]->UserSurvey[$key2]->username);
				var_dump($username);
				var_dump($survey);
				exit();*/
			}
		}
		$response = Response::json($user);
		$response->header('Content-Type', 'application/json');
		return $response;
    }
	public function deleteUserWhitId($id)
    {	
		return $this->deleteUser(array($id));
    }
	public function deleteUser($arrIds = array())
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
			$affectedRows = User::where('id', '=', $eachid)->delete();
			/*$user = User::find($eachid);
			$user->delete();
			/*var_dump($user);
			exit();*/
			$user = User::destroy($eachid);
			
		}
		$c = 'true';
		return $c;
    }
}
?>