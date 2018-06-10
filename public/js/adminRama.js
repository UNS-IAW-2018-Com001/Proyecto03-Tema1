	var ramas;
	var idGrupo;
    $(document).ready(function(){
    	idGrupo=idGrupoLabel.value;
	    update();
        $("#addRamaSubmit").click(function(e) {
            e.preventDefault();
            realizarAgregado();
        });
        $("#editRamaSubmit  ").click(function(e) {
            e.preventDefault();
            realizarEdicion();
        });
        $("#eliminarSubmit").click(function(e) {
            e.preventDefault();
            realizarEliminado();
        });
    });
    const bodyTemplate = Twig.twig({
        href: "/shared/renderRamaBody.twig",async:false
    });
    function update(){
        $.get("/api/ramas/"+idGrupo, function(data, status) {
            ramas=Object.values(data);
            $("#tableBody").empty();
            $("#tableBody").append($(bodyTemplate.render({"ramas":data})));
        });
    }
    function realizarAgregado(){
        var mensaje={
            'nombre':addNombreRama.value,
            'GrupoPerteneciente':idGrupo,
            'edad_minima':parseInt(addEdadMinima.value),
            'edad_maxima':parseInt(addEdadMaxima.value),
            'fechaInscripcion_inicio':addFechaInicio.value,
            'fechaIscripcion_fin':addFechaFin.value,
            'tipo': addTipo.value
        };
        postTest('/api/ramas/crear',JSON.stringify(mensaje));
        $("#addModal input").each(function(){$(this).val("");});
        addTipo.value="Rama Femenina";
        $("#addModal").modal("hide");
    }
    function realizarEdicion(){        
        var rama=ramas[editIndex];
        rama.nombre=editNombre.value;
        rama.edad_minima=parseInt(editEdadMinima.value);
        rama.edad_maxima=parseInt(editEdadMaxima.value);
        rama.fechaInscripcion_inicio=editFechaInicio.value;
        rama.fechaIscripcion_fin=editFechaFin.value;
        rama.tipo=editTipo.value;

        var id= rama._id;
        ruta='/api/ramas/'+id;
        putTest(ruta,JSON.stringify(rama));
        $("#editRamaModal").modal("hide"); 
    }
    function realizarEliminado(){
        var id= ramas[elimIndex]._id;
        ruta='/api/ramas/'+id;
        removeTest(ruta);
        $("#deleteModal").modal("hide");
    }
    
    function editarRama(index){
        var rama=ramas[index];
        editIndex=index;
        editNombre.value=rama.nombre;
        editFechaInicio.value=rama.fechaInscripcion_inicio;
        editFechaFin.value=rama.fechaIscripcion_fin;

        $('#editEdadMinima').selectpicker('val', rama.edad_minima);
        $('#editEdadMaxima').selectpicker('val', rama.edad_maxima);
        $('#editTipo').selectpicker('val', rama.tipo);
    }