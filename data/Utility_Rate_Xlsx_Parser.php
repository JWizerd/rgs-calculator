<?php 

require_once('simplexlsx.php');

$file = 'exutilityRateData.xlsx';
$xlsx = SimpleXLSX::parse($file);
$json = encodeXlsx($xlsx);

function checkXlsx($xlsx) {
	if ( $xlsx ) {
		echo '<pre>';
		print_r( $xlsx->rows() );
		echo '</pre>';
	} else {
		echo SimpleXLSX::parse_error();
	}
}

function setKeys($xlsx) {
	$keys = $xlsx->rows()[0];
	foreach ($xlsx->rows() as $row => $field) {
		print_r($field);
	}
}

/**
 * @param  $xlsx obj
 * @return encoded JSON Object 
 */
function encodeXlsx($xlsx) {
	return $json = json_encode($xlsx->rows());
}

// encodeXlsx($xlsx);

// echo '<pre>';
// print_r($json);
// echo '</pre>';

echo '<pre>';
setKeys($xlsx);
echo '</pre>';

// checkXlsx($xlsx);