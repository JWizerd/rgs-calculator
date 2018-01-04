<?php 

require_once('simplexlsx.php');

$file = 'exutilityRateData.xlsx';
$xlsx = SimpleXLSX::parse($file);
$json = encodeXlsx(prepareData($xlsx));

function checkXlsx($xlsx) {
	/**
	 * @todo refactor this to encode json if no errors
	 */
	if ( $xlsx ) {
		echo '<pre>';
		print_r( $xlsx->rows() );
		echo '</pre>';
	} else {
		echo SimpleXLSX::parse_error();
	}
}

function prepareData($xlsx) {
	$keys = $xlsx->rows()[0];
	$xlsx_obj = [];
	foreach ($xlsx->rows() as $row => $fields) {
		array_push($xlsx_obj, array_combine($keys,  $fields));
	}
	array_shift($xlsx_obj);
	return $xlsx_obj;
}

function removeInititalKeySet($obj) {

}

/**
 * @param  $xlsx obj
 * @return encoded JSON Object 
 */
function encodeXlsx($xlsx) {
	return json_encode($xlsx);
}

header('Content-Type: application/json');
echo $json;