<?php
class AnswerController extends BaseController {

    public function getIndex()
    {
    }
	public function createAnswer(){
		$data = array(
			"id_field" => $input["id_field"],
			"text" => $input["text"],
		);
        $answer = Answer::AddAnswer($data);
		$response = Response::json($answer);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function changeAnswer(){
		$input = Input::all();
		$answer = Answer::find(4);
			$answer->id_field = "1";
			$answer->text = "ES UN TEST";
        $answer->save();
		$response = Response::json($answer);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function getAllAnswer()
    {
        $answer = Answer::All();
		$answer->load('Field');
		$response = Response::json($answer);
		$response->header('Content-Type', 'application/json');
		return $response;
	}  
	public function getAnswerWhitId($id)
    {	
        $answer = Answer::find($id);
		$response = Response::json($answer);
		$response->header('Content-Type', 'application/json');
		return $response;
    }
	public function deleteAnswerWhitId($id)
    {	
        $answer = Answer::find($id);
		$v->delete();
		//$survey->load('Field');
		$response = Response::json($answer);
		$response->header('Content-Type', 'application/json');
		return $response;
    }

}
?>