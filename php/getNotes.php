<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "db";
$basedatos = "notas";
$usuario   = "root";
$password  = "";

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "SELECT * FROM nota";

$resultados = mysqli_query($conexion,$sql);

$arrayADevolver=array();

while($fila=mysqli_fetch_assoc($resultados)){

$arrayADevolver[]=$fila;

}



echo json_encode($arrayADevolver);

mysqli_close($conexion);
?>