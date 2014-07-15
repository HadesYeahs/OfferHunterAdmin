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

Route::get('/index.php',  function()
{
    return Redirect::to('dashboard#dashboard');
});
Route::get('login', function(){
	return View::make('login', array('name' => 'Taylor'));
	// $sUser = Input::get("user");
	// $sPassword = Input::get("password");
});

Route::post('authuser', array("as"=>"authuser", function(){
	$sUser = Input::get("user");
	$sPassword = Input::get("password");

	if(Auth::attempt(array('email' => $sUser, 'password' => $sPassword)))
	{
		return Auth::user();
		//return Redirect::to('dashboard');
	}
	return "false";
	
}));

Route::get('dashboard', array("as"=>"dashboard", /*'before' => 'auth',*/ function(){
	View::share("pageName", "Dashboard");
	return View::make('app', array());
}));

//Usuarios
Route::get('users', 'UserController@getAllUsers');
Route::get('users/{id}', 'UserController@getUserWhitId');
Route::post('users', 'UserController@createUser');
Route::PUT('users/{id}', 'UserController@changeUser');
Route::DELETE('users/{id}', 'UserController@deleteUserWhitId');
Route::DELETE('users', 'UserController@deleteUsers');

//Clientes
Route::get('cliente', 'ClienteController@getAllCliente');
Route::get('cliente/t/{id}', 'ClienteController@getClienteWhitType');
Route::get('cliente/{id}', 'ClienteController@getClienteWhitId');
Route::post('cliente', 'ClienteController@createCliente');
Route::PUT('cliente/{id}', 'ClienteController@changeCliente');
Route::DELETE('cliente/{id}', 'ClienteController@deleteClienteWhitId');
//Route::DELETE('survey', 'SurveyController@deleteSurveys');


//Sucursal
Route::get('sucursal', 'SucursalController@getAllSucursal');
Route::get('sucursalcliente/{id}', 'SucursalController@getAllSucursalCliente');
//Route::get('survey/{id}', 'SurveyController@getSurveyWhitId');
Route::post('sucursal', 'SucursalController@createSucursal');
Route::PUT('sucursal/{id}', 'SucursalController@changeSucursal');
Route::DELETE('sucursal/{id}', 'SucursalController@deleteSucursalWhitId');

//Ofetas
Route::get('oferta', 'OfertaController@getAllOferta');
Route::get('oferta/{id}', 'OfertaController@getOfertaWhitId');
Route::get('ofertacliente/{id}', 'OfertaController@getAllOfertaCliente');
//Route::get('survey/{id}', 'SurveyController@getSurveyWhitId');
Route::post('oferta', 'OfertaController@createOferta');
Route::PUT('oferta/{id}', 'OfertaController@changeOferta');
Route::DELETE('oferta/{id}', 'OfertaController@deleteOfertaWhitId');

//Tipos
Route::get('tipos', 'TiposController@getAll');

Route::post('upload', 'UploadController@upload');

