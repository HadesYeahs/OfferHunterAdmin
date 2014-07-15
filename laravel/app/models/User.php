<?php

use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableInterface;

class User extends Eloquent implements UserInterface, RemindableInterface {

	protected $table = 'users';
	protected $fillable = array('email','password','name', 'type');
	protected $hidden = array('password');


	public function getAuthIdentifier()
	{
		return $this->getKey();
	}

	/**
	 * Get the password for the user.
	 *
	 * @return string
	 */
	public function getAuthPassword()
	{
		return $this->password;
	}

	/**
	 * Get the e-mail address where password reminders are sent.
	 *
	 * @return string
	 */
	public function getReminderEmail()
	{
		return $this->email;
	}
	/*public function Puesto()
	{
		return $this->belongsToMany("Puesto")->select('name','descripcion');
	}
	public function Cliente()
	{
		return $this->belongsToMany("Cliente")->select('email','nombre','telefono','direccion','cp');
	}
	public function Area()
	{	
		return $this->belongsToMany("Area")->select('name','descripcion');
	}*/
	
	/*public function UserSurvey()
	{
		return $this->hasMany("UserSurvey")->select('id','user_id','username','survey');
	}*/
	public static function AddUser($input){
	  $User = User::create($input);
	  return $User;
	}
	/*public static function randomPassword() 
	{
		$alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
		$pass = array(); //remember to declare $pass as an array
		$alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
		for ($i = 0; $i < 8; $i++) {
			$n = rand(0, $alphaLength);
			$pass[] = $alphabet[$n];
		}
		return implode($pass); //turn the array into a string
		
	}*/


}