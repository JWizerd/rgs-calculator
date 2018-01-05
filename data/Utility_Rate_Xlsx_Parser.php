<?php 

require_once('simplexlsx.php');

$file = 'exutilityRateData.xlsx';
$xlsx = SimpleXLSX::parse($file);

function createJSON($xlsx) {
	if ( $xlsx ) {
		echo encodeXlsx(prepareData($xlsx));
	} else {
		echo SimpleXLSX::parse_error();
	}
}

/**
 * [get SimpleXLSX obj combine the keys from the first index with the rest of the object, remove the first index and then return an array]
 * @param  [object] $xlsx
 * @return array
 */
function prepareData($xlsx) {
	$keys = $xlsx->rows()[0];
	$xlsx_obj = [];
	foreach ($xlsx->rows() as $row => $fields) {
		array_push($xlsx_obj, array_combine($keys,  $fields));
	}
	array_shift($xlsx_obj);
	return $xlsx_obj;
}

/**
 * @param  $xlsx obj
 * @return encoded JSON Object 
 */
function encodeXlsx($xlsx) {
	return json_encode($xlsx);
}

header('Content-Type: application/json');
createJSON($xlsx);