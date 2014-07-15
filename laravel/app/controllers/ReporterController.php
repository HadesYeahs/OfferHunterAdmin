<?php
class ReporterController extends BaseController {

    public function getIndex()
    {
    }
	
	public function getReportSurveys($id){
		$UsersRespond = DB::select('SELECT A.id AS idRspuestasHeader, B.id AS idEncuesta, B.name AS name, COUNT(A.id) AS nCount FROM sc_sv_surveyresults A
		INNER JOIN sc_sv_surveys B ON B.id = A.id_survey
		WHERE id_user_respondent = '. $id .'
		GROUP BY B.id
		ORDER BY B.id');
		$surveyResult = array();
		$Suveyseach = array();
		foreach($UsersRespond as $eachsurvey)
		{
			$fieldsValue = DB::select('SELECT A.id AS idRspuestasHeader, C.id_field, SUM(C.size) as sum, B.name
			FROM sc_sv_surveyresults A
			LEFT JOIN sc_sv_surveyanswers C ON C.id_surveyresult = A.id
			INNER JOIN sc_sv_fields B ON B.id = C.id_field
			WHERE id_user_respondent = '. $id.' AND A.id_survey = '.$eachsurvey->idEncuesta. ' GROUP BY C.id_field ORDER BY C.id_field');
			$arrayFields = array();			
			foreach($fieldsValue as $eachfieldsValue)
			{
				$arrayFields[] = array("label" => $eachfieldsValue->name, "value" => $eachfieldsValue->sum/$eachsurvey->nCount);
			}
			$arrSurver = array('name' => $eachsurvey->name, 'fields' => $arrayFields);
			array_push($surveyResult,$arrSurver);
		}
		$response = Response::json($surveyResult);
		$response->header('Content-Type', 'application/json');
		return $response;
		
    }
	public function getReportSurveysForSurvey($cliente,$encuesta){
		//cada usuario al cual le respondieron la encuesta seleccionada.
		$Pregunta = DB::select('SELECT answers FROM sc_sv_fields WHERE survey_id = '.$encuesta.' LIMIT 1');
		$pesoMaxPesoPreguntas = count(explode("\n",$Pregunta[0]->answers));
		if($pesoMaxPesoPreguntas == 6)
		{
			$pesoMaxPesoPreguntas = 5;
		}
		$NumPreg = DB::select('SELECT COUNT(*) AS "cuenta" FROM sc_sv_fields WHERE survey_id = '.$encuesta.' AND TYPE = 0');
		$NumPreg = $NumPreg[0]->cuenta;
		$clifMax = $pesoMaxPesoPreguntas * $NumPreg;
		//var_dump($NumPreg);
		//exit();
		$usuarios = DB::select('SELECT DISTINCT A.username AS "Cusuario",B.name,A.survey AS "cada usuario que respondio", C.name AS "EnNom" FROM sc_sv_user_survey A
		INNER JOIN sc_sv_users B ON B.id = A.username
		INNER JOIN sc_sv_surveys C ON C.id = A.survey 
		WHERE B.cliente = "'.$cliente.'" AND A.survey = '. $encuesta);
		/*var_dump('SELECT DISTINCT A.username AS "Cusuario",B.name,A.survey AS "cada usuario que respondio", C.name AS "EnNom" FROM sc_sv_user_survey A
		INNER JOIN sc_sv_users B ON B.id = A.username
		INNER JOIN sc_sv_surveys C ON C.id = A.survey 
		WHERE B.cliente = "'.$cliente.'" AND A.survey = '. $encuesta);*/
		$UsuarioRespondido = array();
		$cadaPunto = array();
		foreach($usuarios as $usuario)
		{
			$usuariosQueRespondieron = DB::select('SELECT * FROM sc_sv_surveyresults WHERE id_survey = '.$encuesta.' AND id_user_respondent = '.$usuario->Cusuario);
			//var_dump('SELECT * FROM sc_sv_surveyresults WHERE id_survey = '.$encuesta.' AND id_user_respondent = '.$usuario->Cusuario);
			$totalUsuarioRespondieron = 0;
			$sumaRes = 0;
			foreach($usuariosQueRespondieron as $usuarioQueRespondio)
			{
				$sumRespuestas = DB::select('SELECT SUM(size) AS "suma" FROM sc_sv_surveyanswers WHERE id_survey = '.$encuesta.' AND id_surveyresult = '.$usuarioQueRespondio->id);
				//var_dump('SELECT SUM(size) AS "suma" FROM sc_sv_surveyanswers WHERE id_survey = '.$encuesta.' AND id_surveyresult = '.$usuarioQueRespondio->id);
				$totalUsuarioRespondieron++;
				$sumaRes += $sumRespuestas[0]->suma;
			}
			$sumaRes = $sumaRes/$totalUsuarioRespondieron;
			$porcentaje = ($sumaRes*100)/$clifMax;
			$arrpoints = array('label' => $usuario->name, 'value' => $porcentaje);
			array_push($cadaPunto,$arrpoints);
		}
		if(count($cadaPunto) == 1)
		{
			array_unshift($cadaPunto,array('label' => "", 'value' => 0));
			array_push($cadaPunto,array('label' => "", 'value' => 0));
		}
		$UsuarioRespondido = array('name' => $usuario->EnNom, 'fields' => $cadaPunto);
		$response = Response::json($UsuarioRespondido);
		$response->header('Content-Type', 'application/json');
		return $response;
    }

	

}
?>