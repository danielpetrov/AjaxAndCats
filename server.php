<?php
header('Content-Type: application/json');

require_once 'data.php';

if($_GET){
	foreach($data as $key => $value){
		if($value['name'] == $_GET["name"])
		{
			echo json_encode($data[$key]);
		}
	}
} else {
	$getOnHome = [];
	foreach($data as $key => $value){
		$personNameAndImage = [ 
		'name' => $value['name'],
		'imageUrl' => $value['imageUrl'],
		];
		array_push($getOnHome, $personNameAndImage);
	}
	echo json_encode($getOnHome);
}
?>