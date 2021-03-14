<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "db";
$basedatos = "notas";
$usuario   = "root";
$password  = "";

$titulo=$_REQUEST["titulo"];
$contenido=$_REQUEST["contenido"];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "INSERT INTO nota (titulo,contenido) VALUES ('$titulo','$contenido')";
$resultado = mysqli_query($conexion,$sql);


if ($resultado) {
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "nota agregada"; 
    $respuesta["id"] = mysqli_insert_id($conexion);
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error : ".mysqli_error($conexion);
}

echo json_encode($respuesta);

mysqli_close($conexion);
?>