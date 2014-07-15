<?php
class PuestoController extends BaseController {

    public function getIndex()
    {
        
		$puesto = Puesto::All();
		foreach( $puesto as $eachpuesto){
		echo "\n".$eachuser->email;
		}
    }
	public function createPuesto(){
		$data = array(
			"name" => "see@mail.com",
			"descripcion" => "1234"
		);
        $puesto = Puesto::AddPuesto($data);
		$response = Response::json($puesto);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function changePuesto(){
	
		$puesto = Puesto::find(4);
			$puesto->name = "see@mail.com";
			$puesto->descripcion = "1234";
        $puesto->save();
		$response = Response::json($puesto);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function getAllPuesto()
    {
		$puesto = Puesto::All();
		$response = Response::json($puesto);
		$response->header('Content-Type', 'application/json');
		return $response;
	}  
	public function getPuestoWhitId($id)
    {
        $puesto = Puesto::find($id);
		$response = Response::json($puesto);
		$response->header('Content-Type', 'application/json');
		return $response;
    }

	

}
?>