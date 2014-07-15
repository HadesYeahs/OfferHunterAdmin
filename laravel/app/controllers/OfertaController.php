<?php
class OfertaController extends BaseController {

    public function getIndex()
    {
    }
	public function createOferta(){
		$input = Input::all();
		$dataoferta = array(
			"id_cliente" => $input["id_cliente"],
			"descripcion" => $input["descripcion"],
			"vigencia_app" => $input["vigencia_app"],
			"vigencia_cer" => $input["vigencia_cer"],
			"imagportada" => $input["imagportada"],
			"imagofer" => $input["imagofer"]
			
		);
        $oferta = Oferta::AddOferta($dataoferta);
		$response = Response::json($oferta);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function changeOferta($id){
		$input = Input::all();
		$oferta = Oferta::find($id);
		$oferta->descripcion = $input["descripcion"];
		$oferta->vigencia_app = $input["vigencia_app"];
		$oferta->vigencia_cer = $input["vigencia_cer"];
		$oferta->imagportada = $input["imagportada"];
		$oferta->imagofer = $input["imagofer"];
        $oferta->save();
		$response = Response::json($oferta);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function getAllOferta()
    {
		$oferta = Oferta::All();
		foreach ($oferta as $key => $eachCliente)
		{	
			$oferta[$key]->url = "oferta/".urlencode ($oferta[$key]->descripcion)."/".$oferta[$key]->id;
			if(isset($_GET['callback'])){
				$cliente = Cliente::find($oferta[$key]->id_cliente);
				$oferta[$key]["nomCliente"] = $cliente->nombre;
			}
		}
		if(isset($_GET['callback'])){ // Si es una petición cross-domain
			$array = array("data" => json_decode($oferta)); 
			echo $_GET['callback'].'('.json_encode($array).')';
		}
		else
		{
			$response = Response::json($oferta);
			$response->header('Content-Type', 'application/json');
			return $response;
		}
		
	}
	public function getAllOfertaCliente($id)
    {
		$oferta = Oferta::All();
		$oferta = Oferta::where('id_cliente', '=', $id)->get();
		foreach ($oferta as $key => $eachCliente)
		{	
			$oferta[$key]->url = "oferta/".urlencode ($oferta[$key]->descripcion)."/".$oferta[$key]->id;
		}
		$response = Response::json($oferta);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function getOfertaWhitId($id)
    {	
		$Oferta = Oferta::find($id);
		$Oferta->url =  "oferta/".urlencode ($Oferta->descripcion)."/".$Oferta->id;
		
		if(isset($_GET['callback'])){ // Si es una petición cross-domain
			$cliente = Cliente::where('id', '=', $Oferta->id_cliente)->get();
			foreach ($cliente as $key => $eachcliente)
			{	
				$Oferta->horario = $cliente[$key]->horario_apert." a ".$cliente[$key]->horario_cierre;
			}
			$array = array("data" => json_decode($Oferta)); //Por ejemplo
			echo $_GET['callback'].'('.json_encode($array).')';
		}
		else
		{
			$response = Response::json($cliente);
			$response->header('Content-Type', 'application/json');
			return $response;
		}
    }
	public function deleteOfertaWhitId($id)
    {	
		return $this->deleteOferta(array($id));
    }
	public function deleteOferta($arrIds = array())
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
			$affectedRows = Oferta::where('id', '=', $eachid)->delete();
			Oferta::destroy($eachid);
		}
		$c = 'true';
		return $c;
    }

}
?>