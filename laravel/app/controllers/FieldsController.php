<?php
class FieldsController extends BaseController {

    public function getIndex()
    {
    }
	public function createField(){
		$input = Input::all();

		$input["type"] = array_keys($input["type"]);
		$input["type"] = end($input["type"]);
		$dataField = array(
				"survey_id" => $input["id_survey"],
				"createdUser" => "1",
				"modifiedUser" => "1",
				"name" => $input["name"],
				"helptext" => "TEST",
				"type" =>  $input["type"],
				"sortableKey" =>$input["sortableKey"],
				"answers" => $input["answers"]
			);
		$field = Fields::AddField($dataField);
		$response = Response::json($field);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function changeField(){
		$input = Input::all();
		$input["type"] = array_keys($input["type"]);
		$input["type"] = end($input["type"]);
		$field = Fields::find($input["id"]);
			$field->survey_id = $input["id_survey"];
			$field->createdUser = "1";
			$field->modifiedUser = "1";
			$field->name = $input["name"];
			$field->helptext = "NINGUNA";
			$field->type = $input["type"];
			$field->sortableKey =$input["sortableKey"];
			$field->answers =$input["answers"];
        $field->save();
		$response = Response::json($field);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function getAllFields()
    {
        $fields = Fields::All();
		$response = Response::json($fields);
		$response->header('Content-Type', 'application/json');
		return $response;
	}  
	public function getFieldWhitId($id)
    {
        $field = Fields::find($id);
		$response = Response::json($field);
		$response->header('Content-Type', 'application/json');
		return $response;
    }
	public function deleteFieldWhitId($id)
    {	
		return $this->deleteField(array($id));
    }
	public function deleteField($arrIds = array())
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
			$affectedRows = Fields::where('id', '=', $eachid)->delete();
			//Fields::destroy($eachid);
		}
		$c = 'true';
		return $c;
    }
	

}
?>