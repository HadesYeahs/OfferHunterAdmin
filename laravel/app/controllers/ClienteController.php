<?php
class ClienteController extends BaseController {

    public function getIndex()
    {
    }
	public function createCliente(){
		$input = Input::all();
		reset($input["tipo"]);
		$input["tipo"] = key($input["tipo"]);
		$dataSurvey = array(
			"nombre" => $input["nombre"],
			"mail" => $input["mail"],
			"telefono" => $input["telefono"],
			"tipo" => $input["tipo"],
			"resena" => $input["resena"],
			"horario_apert" => $input["horario_apert"],
			"horario_cierre" => $input["horario_cierre"],
			"logo" => $input["logo"],
			"eslogan" => $input["eslogan"],
			"cont_nombre" => $input["cont_nombre"],
			"cont_tel" => $input["cont_tel"],
			"cont_mail" => $input["cont_mail"],
			"direccion" => $input["direccion"]
		);
        $cliente = Cliente::AddCliente($dataSurvey);
		$response = Response::json($cliente);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function changeCliente($id){
		$input = Input::all();		
		$cliente = Cliente::find($id);
		$cliente->nombre = $input["nombre"];
		$cliente->mail = $input["mail"];
		$cliente->telefono = $input["telefono"];
		reset($input["tipo"]);
		$input["tipo"] = key($input["tipo"]);
		$cliente->tipo = $input["tipo"];
		$cliente->resena = $input["resena"];
		$cliente->horario_apert = $input["horario_apert"];
		$cliente->horario_cierre = $input["horario_cierre"];
		$cliente->logo = $input["logo"];
		$cliente->eslogan = $input["eslogan"];
		$cliente->cont_nombre = $input["cont_nombre"];
		$cliente->cont_tel = $input["cont_tel"];
		$cliente->cont_mail = $input["cont_mail"];
		$cliente->direccion = $input["direccion"];
        $cliente->save();
		$response = Response::json($cliente);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function getAllCliente()
    {
		$cliente = Cliente::All();
		foreach ($cliente as $key => $eachCliente)
		{	
			$cliente[$key]->url = "cliente/".urlencode ($cliente[$key]->nombre)."/".$cliente[$key]->id_cliente;
		}
		if(isset($_GET['callback'])){ // Si es una petición cross-domain
			$array = array("data" => json_decode($cliente)); //Por ejemplo
			echo $_GET['callback'].'('.json_encode($array).')';
		}
		else
		{
			$response = Response::json($cliente);
			$response->header('Content-Type', 'application/json');
			return $response;
		}
		   
		/**/
	}  
	public function getClienteWhitId($id)
    {	
		$cliente = Cliente::find($id);
		$cliente->url =  "cliente/".urlencode ($cliente->nombre)."/".$cliente->id_cliente;
		
		if(isset($_GET['callback'])){ // Si es una petición cross-domain
			$sucursal = Sucursal::where('id_cliente', '=', $cliente->id)->get();
			$direcciones = Array ();
			foreach ($sucursal as $key => $eachsucursal)
			{	
				
				$direcciones[$key]["direccion"] =$sucursal[$key]->direccion;
				$direcciones[$key]["ubicacion"] =$sucursal[$key]->ubicacion;
			}
			$cliente["sucursales"] = $direcciones;
			$array = array("data" => json_decode($cliente)); //Por ejemplo
			echo $_GET['callback'].'('.json_encode($array).')';
		}
		else
		{
			$response = Response::json($cliente);
			$response->header('Content-Type', 'application/json');
			return $response;
		}
    }
	public function deleteClienteWhitId($id)
    {	
		return $this->deleteCliente(array($id));
    }
	public function deleteCliente($arrIds = array())
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
			$affectedRows = Cliente::where('id', '=', $eachid)->delete();
			Cliente::destroy($eachid);
		}
		$c = 'true';
		return $c;
    }
	public function getClienteWhitType($id){
		$cliente = Cliente::where('tipo', '=', $id)->get();
		if(isset($_GET['callback'])){ // Si es una petición cross-domain
			$array = array("data" => json_decode($cliente)); //Por ejemplo
			echo $_GET['callback'].'('.json_encode($array).')';
		}
		else
		{
			$response = Response::json($cliente);
			$response->header('Content-Type', 'application/json');
			return $response;
		}
	}

}
?>