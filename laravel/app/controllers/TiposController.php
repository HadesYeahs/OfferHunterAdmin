<?php
class TiposController extends BaseController {

    public function getIndex()
    {
    }
	public function getAll()
    {
		$tipos = Tipos::All();
		if(isset($_GET['callback'])){ // Si es una petición cross-domain
			$array = array("data" => json_decode($tipos)); //Por ejemplo
			echo $_GET['callback'].'('.json_encode($array).')';
		}
		else
		{
			$response = Response::json($tipos);
			$response->header('Content-Type', 'application/json');
			return $response;
		}
	}  

}
?>