<?php
class AreaController extends BaseController {

    public function getIndex()
    {
        
		$area = Area::All();
		foreach( $area as $eacharea){
		echo "\n".$eachuser->email;
		}
    }
	public function createArea(){
		$data = array(
			"name" => "see@mail.com",
			"descripcion" => "1234"
		);
        $area = Area::AddArea($data);
		$response = Response::json($area);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function changeArea(){
	
		$area = Area::find(4);
			$area->name = "see@mail.com";
			$area->descripcion = "1234";
        $area->save();
		$response = Response::json($area);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function getAllArea()
    {
		$area = Area::All();
		$response = Response::json($area);
		$response->header('Content-Type', 'application/json');
		return $response;
	}  
	public function getAreaWhitId($id)
    {
        $area = Area::find($id);
		$response = Response::json($area);
		$response->header('Content-Type', 'application/json');
		return $response;
    }

	

}
?>