<?php
class SucursalController extends BaseController {

    public function getIndex()
    {
    }
	public function createSucursal(){
		$input = Input::all();
		$datasucursal = array(
			"id_cliente" => $input["id_cliente"],
			"nombre" => $input["nombre"],
			"direccion" => $input["direccion"],
			"ubicacion" => $input["ubicacion"]
		);
        $sucursal = Sucursal::AddSucursal($datasucursal);
		$response = Response::json($sucursal);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function changeSucursal($id){
		$input = Input::all();
		$sucursal = Sucursal::find($id);
		$sucursal->nombre = $input["nombre"];
		$sucursal->direccion = $input["direccion"];
		$sucursal->ubicacion = $input["ubicacion"];
        $sucursal->save();
		$response = Response::json($sucursal);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function getAllSucursal()
    {
		$sucursal = Sucursal::All();
		foreach ($sucursal as $key => $eachCliente)
		{	
			$sucursal[$key]->url = "sucursal/".urlencode ($sucursal[$key]->nombre)."/".$sucursal[$key]->id;
		}
		$response = Response::json($sucursal);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function getAllSucursalCliente($id)
    {
		$sucursal = Sucursal::All();
		$sucursal = Sucursal::where('id_cliente', '=', $id)->get();
		foreach ($sucursal as $key => $eachCliente)
		{	
			$sucursal[$key]->url = "sucursal/".urlencode ($sucursal[$key]->nombre)."/".$sucursal[$key]->id;
		}
		$response = Response::json($sucursal);
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
	public function deleteSucursalWhitId($id)
    {	
		return $this->deleteSucursal(array($id));
    }
	public function deleteSucursal($arrIds = array())
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
			$affectedRows = Sucursal::where('id', '=', $eachid)->delete();
			Sucursal::destroy($eachid);
		}
		$c = 'true';
		return $c;
    }

}
?>