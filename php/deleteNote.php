<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "db";
$basedatos = "notas";
$usuario   = "root";
$password  = "";

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

//id a borrar
$id = $_REQUEST["id"];


// Consulta SQL para obtener los datos de los centros.
$sql = "DELETE FROM nota WHERE id=$id";

$resultado = mysqli_query($conexion,$sql);


if ($resultado) {
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "nota borrada"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error : ".mysqli_error($conexion);
}

echo json_encode($respuesta);

mysqli_close($conexion);
?>