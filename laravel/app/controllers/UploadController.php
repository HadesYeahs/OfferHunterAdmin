<?php
class UploadController extends BaseController {

    public function getIndex()
    {
    }
	public function upload(){
			
		include_once(app_path().'/models/qqFileUploader.class.php');

		ini_set("post_max_size","300M");
		ini_set("upload_max_filesize","300M");
		$allowedExtensions = array();
		// max file size in bytes
		$sizeLimit = 300 * 1024 * 1024;
		$pathName = $_GET['pathname'];
		$path = app_path().'/uploads/'.$pathName.'/';
		$uploader = new qqFileUploader($allowedExtensions, $sizeLimit);

		if(!is_dir($path))	
		{
			mkdir($path, null, true);
		}
		$result = $uploader->handleUpload($path);
		$newPath = $path . $result["filename"];
		
		/*if(getimagesize($newPath) > 0){
		
			include ("class/simpleimage.php");
			
			$image = new SimpleImage(); 
			$image->load($newPath);
			
			// if($image->getWidth() > $image->getHeight() && $image->getWidth()>1000){
			// 			$image->resizeToWidth(1000); 
			// 		} elseif($image->getHeight() > $image->getWidth() && $image->getHeight()>1000){
			// 				$image->resizeToHeight(1000);
			// 			} elseif($image->getWidth() == $image->getHeight() && $image->getHeight() > 1000){
			// 					$image->resize(1000,1000);
			// 				}
			
			$image->save($newPath);
			
		}*/
			$result["path"] = $newPath;
		// to pass data through iframe you will need to encode all html tags
		echo htmlspecialchars(json_encode($result), ENT_NOQUOTES);
	}
		
}
?>