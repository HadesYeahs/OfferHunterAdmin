<?php
class ReporterControllerTwo extends BaseController {

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
			$fieldsValue = DB::select('SELECT A.id AS idRspuestasHeader, C.id_field, SUM(C.size) as sum, B.name,B.answers
			FROM sc_sv_surveyresults A
			LEFT JOIN sc_sv_surveyanswers C ON C.id_surveyresult = A.id
			INNER JOIN sc_sv_fields B ON B.id = C.id_field
			WHERE id_user_respondent = '. $id.' AND A.id_survey = '.$eachsurvey->idEncuesta. ' GROUP BY C.id_field ORDER BY C.id_field');
			$arrayFields = array();			
			foreach($fieldsValue as $eachfieldsValue)
			{
				$answers = explode("\n",$eachfieldsValue->answers);
				$spValue = $eachfieldsValue->sum/$eachsurvey->nCount;
				$op = false;
				switch ($eachsurvey->idEncuesta) {
					case 1:
						$nOp = 3;
						break;
					case 4:
						$nOp = 3;
						break;
					case 3:
						$nOp = 3.75;
						break;
					case 5:
						$nOp = 3.75;
						break;
				}
				if($spValue <= $nOp)
				{
					$op = true;
				}
				$arrayFields[$eachfieldsValue->id_field] = array("label" => $eachfieldsValue->name,"aOpor"=>$op,"answers"=>$answers,"prom"=>round($spValue, 2));
			}
			$fieldHeaders = DB::select('SELECT name , id FROM sc_sv_fields WHERE survey_id = '.$eachsurvey->idEncuesta. ' AND TYPE = 1 ORDER BY id');
			foreach($fieldHeaders as $eachfieldHeader)
			{
				$arrayFields[$eachfieldHeader->id] = array("label" => $eachfieldHeader->name,"aOpor"=>"header");
			}
			ksort($arrayFields);
			$arrSurver = array('name' => $eachsurvey->name, 'fields' => $arrayFields);
			array_push($surveyResult,$arrSurver);
		}
		
		$response = Response::json($surveyResult);
		$response->header('Content-Type', 'application/json');
		return $response;
		
		
    }
	public function getClientes(){
		$clientes = DB::select('SELECT DISTINCT cliente FROM sc_sv_users');
		$clientes2 = array();	

		foreach($clientes as $eachclientes)
		{	
			array_push($clientes2,$eachclientes->cliente);
		}
		$response = Response::json($clientes2);
		$response->header('Content-Type', 'application/json');
		return $response;
	}
	public function getComentarios($doomie,$id){
		$Surveys = DB::select("SELECT B.id AS idEncuesta, B.name AS name FROM sc_sv_surveyresults A
		INNER JOIN sc_sv_surveys B ON B.id = A.id_survey
		WHERE id_user_respondent = ". $id ."
		GROUP BY B.id ORDER BY B.id ");
		$ComentariosResult = array();
		foreach($Surveys as $eachSurveys)
		{
			$idDeEncuesta = $eachSurveys->idEncuesta;
			$commentsSurvey = DB::select('SELECT A.id AS idRspuestasHeader,A.comments as comentarios FROM sc_sv_surveyresults A
			INNER JOIN sc_sv_surveys B ON B.id = A.id_survey
			WHERE id_user_respondent = '. $id .' AND B.id = '. $idDeEncuesta .'
			ORDER BY B.id');
			$arrayComentario = array();
			foreach($commentsSurvey as $eachComments)
			{
				$comentario = $eachComments->comentarios;
				array_push($arrayComentario,$comentario);
			}
			$ComentariosResult[$idDeEncuesta] = array("nombre"=>$eachSurveys->name,"comentarios"=>$arrayComentario);
		}
		$response = Response::json($ComentariosResult);
		$response->header('Content-Type', 'application/json');
		return $response;
		
		
    }

}
?>