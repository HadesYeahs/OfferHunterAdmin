<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

// Route::get('/', function()
// {
// 	return View::make('hello');
// });

Route::get('/', array('before' => 'auth', function()
{
    // Only authenticated users may enter...
}));

Route::get('login', function(){
	return View::make('login', array('name' => 'Taylor'));
	// $sUser = Input::get("user");
	// $sPassword = Input::get("password");
});

Route::post('authuser', array("as"=>"authuser", function(){
	$sUser = Input::get("user");
	$sPassword = Input::get("password");
	if (true || Auth::attempt(array('email' => $sUser, 'password' => $sPassword)))
	{
	    return Redirect::to('dashboard');
	}
}));

Route::get('dashboard', array("as"=>"dashboard", /*'before' => 'auth',*/ function(){
	View::share("pageName", "Dashboard");
	return View::make('app', array());
}));

Route::controller('users', 'UserController');
Route::controller('survey', 'SurveyController');