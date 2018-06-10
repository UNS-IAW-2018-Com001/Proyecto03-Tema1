<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Grupo;
use App\Rama;

class ramasController extends Controller
{
    const columnas = array(
    		0 => array(
    			'size'=>"col-md-3",
    			'name'=>"Nombre",
    			'id'=>0
    		),
    		1 =>array(
    			'size'=>"col-md-1",
    			'name'=>"Edad Mínima",
    			'id'=>1
    		),
    		2 =>array(
    			'size'=>"col-md-1",
    			'name'=>"Edad Maxima",
    			'id'=>2
    		),
    		3 =>array(
    			'size'=>"col-md-2",
    			'name'=>"Fecha de Inicio de Inscripcion",
    			'id'=>3
    		),
    		4 =>array(
    			'size'=>"col-md-2",
    			'name'=>"Fecha de Fin de Inscripcion",
    			'id'=>4
    		),
    		5 =>array(
    			'size'=>"col-md-2",
    			'name'=>"Tipo",
    			'id'=>5
    		),
    		6 =>array(
    			'size'=>"col-md-2",
    			'name'=>"",
    			'id'=>7
    		),
		);
    const fotos="<a><span>Ver Fotos</span></a>";
	const edit='<a href="#editRamaModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a><a href="#deleteRamaModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>';

	public function index(Grupo $grupo){
    	return view('ramas', [
    		'title' => "Administrar Ramas del Grupo ".$grupo->nombre,
    		'titleTable'=> 'Ramas del Grupo '.$grupo->nombre,
    		'addLabel'=>'Rama',
    		'modalDeleteTitle'=>" Eliminar Rama",
    		'columnas'=>self::columnas,
            'idGrupo'=>$grupo->_id,
		]);
    }
    public function consultar(Grupo $grupo){
        return Rama::all()->where('GrupoPerteneciente', $grupo->_id);
    }

    public function crear(Request $request){
        $data = json_decode($request->getContent(), true);
        Rama::create($data);
        return response()->json(($data), 200);
    }
    public function eliminar(Rama $rama){
        $rama->delete();
        return response()->json(($rama), 200);
    }
    public function actualizar(Rama $rama,Request $request){
        $data = json_decode($request->getContent(), true);
        $rama->update($data);
        return response()->json(($data), 200);
    }
}
