   var grupos;
   var ubicacionGrupoActual;
    $(document).ready(function(){
        $("#addGrupoSubmit").click(function(e) {
            e.preventDefault();
            realizarAgregado();
        });
        $("#editGrupoSubmit").click(function(e) {
            e.preventDefault();
            realizarEdicion();
        });
         $("#eliminarSubmit").click(function(e) {
            e.preventDefault();
            realizarEliminado();
        });
        $("#ubicacionSubmit").click(function(e) {
            e.preventDefault();
            getDireccion();
            $("#ubicacionModal").modal("hide");
        });
        $("#ubicacionAcept").click(function() {
            $("#ubicacionViewModal").modal("hide");
        });

    update();
    });

    const bodyTemplate = Twig.twig({
        href: "shared/renderGrupoBody.twig",async:false
    });

    function update(){
        $.get("./api/grupos", function(data, status) {
            grupos=ordenByName(data);
            $("#tableBody").empty();
            $("#tableBody").append($(bodyTemplate.render({"grupos":data})));
        });
    }

    function ordenByName(data){
        data.sort(function (a, b) {
            if (a.nombre > b.nombre) 
                return 1;
            else  if (a.nombre < a.nombre) 
                return -1;
            return 0;
        });
        return data;
    }
    update();

    function realizarAgregado(){
        var mensaje={
            'nombre':addNombreGrupo.value,
            'codigo':parseInt(addCodigoGrupo.value),
            'fecha_Creacion':addFechaGrupo.value,
            'horario_Inicio':addInicioGrupo.value,
            'horario_fin':addFinGrupo.value,
            'religion':addReligionGrupo.value,
            'ubicacion':ubicacionGrupoActual
        };
        if(addWebGrupo.value!="")
            mensaje['sitio_web']=addWebGrupo.value;
        if(addTelefonoGrupo.value!="")
            mensaje['telefono']=addTelefonoGrupo.value;
        if(addEmailGrupo.value!="")
            mensaje['email']=addEmailGrupo.value;
        
        postTest('/api/grupos/crear',JSON.stringify(mensaje));
        $("#addModal input").each(function(){$(this).val("");});
        addReligionGrupo.value="Religión Heterogenea";
        addUbicacionGrupo.value= "";
        addGrupoSubmit.disabled=true;
        $("#addModal").modal("hide");
    }
    function realizarEdicion(){        
        var grupo=grupos[editIndex];
        grupo.nombre=editNombre.value;
        grupo.codigo=parseInt(editCodigo.value);
        grupo.fecha_Creacion=editFecha.value;
        grupo.horario_Inicio=editHsInicio.value;
        grupo.horario_fin=editHsFin.value;
        grupo.religion=editReligionGrupo.value;
        grupo.ubicacion=ubicacionGrupoActual;

        grupo['sitio_web']=editWeb.value;
        grupo['telefono']=editTelefono.value;
        grupo['email']=editEmail.value;
        
        var id= grupo._id;
        ruta='/api/grupos/'+id;
        putTest(ruta,JSON.stringify(grupo));
        $("#editGrupoModal").modal("hide");
        $("#ubicacionModal input").each(function(){$(this).val("");});
    }
    function realizarEliminado(){
        var id= grupos[elimIndex]._id;
        ruta='/api/grupos/'+id;
        removeTest(ruta);
        $("#deleteModal").modal("hide");
    }
    function editarGrupo(index){
        var grupo=grupos[index];
        editIndex=index;
        editNombre.value=grupo.nombre;
        editCodigo.value=grupo.codigo;
        editFecha.value=grupo.fecha_Creacion;
        editHsInicio.value=grupo.horario_Inicio;
        editHsFin.value=grupo.horario_fin;
        editUbicacionGrupo.value=getDireccionString(grupo.ubicacion);
        ubicacionGrupoActual=grupo.ubicacion;
        if(grupo.sitio_web)
            editWeb.value=grupo.sitio_web;
        if(grupo.telefono)
            editTelefono.value=grupo.telefono;
        if(grupo.email)
            editEmail.value=grupo.email;
        
        $('#editReligionGrupo').selectpicker('val', grupo.religion);
        $('#editRamasHref').attr('href','/ramas/'+grupo._id);
    }
    function viewUbicacion(index){
        var grupo=grupos[index];
        UbicacionView.value="Direccion:"+getDireccionString(grupo.ubicacion);
    }

    function getDireccion(){
        var key='AIzaSyD6w7d-gbnFx2SZPOW_zTiUByMekCvTPuE';
        var address=calleInput.value+" "+numeroInput.value+", "+ciudadInput.value+", "+provinciaInput.value+", Argentina";
        console.log(address);
        $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key="+key, function (data) {
                var latitud,longitud,address;
                if(data.status=="OK"){
                    datos=data.results[0];
                    ubicacionGrupoActual={
                        "address":datos.formatted_address,
                        "coords": [
                            datos.geometry.location.lat,
                            datos.geometry.location.lng,
                        ]};
                        editUbicacionGrupo.value=getDireccionString(ubicacionGrupoActual);
                        addUbicacionGrupo.value= getDireccionString(ubicacionGrupoActual);               
                        addGrupoSubmit.disabled=false;
                }else
                    addUbicacionGrupo.value="Error Cargando la direccion\n Intentelo Nuevamente";
                
        });
    }
    function getDireccionString(ubicacion){
        return ubicacion.address+"\nLatitud:"+ubicacion.coords[0]+"\nLongitud:"+ubicacion.coords[1];

    }
