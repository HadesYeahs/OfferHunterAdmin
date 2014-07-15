<?php
class AttributeController extends BaseController {

    public function getIndex()
    {
        $res = array();
		$users = User::with("Area","Cliente")->get();
		foreach($users as $eachUser)
		{
			$res[] = array(
				"id" => $eachUser->id,
				"email" => $eachUser->email,
				"password" => $eachUser->password,
				"name" => $eachUser->name,
				"puesto" => $eachUser->Puesto->name,
				"area" => $eachUser->Area->name,
				"type" => $eachUser->type,
				"cliente" => $eachUser->Cliente->nombre
			);
		}
		return $res;
        return $users->toJson();
    }

    public function postProfile()
    {
        //
    }

}
?>