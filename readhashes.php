<?PHP
//Reads a given number of hashes and stuff, returns JSON.
//GET Arguments
$args=array(
	"n",
	"hash"
);
//
$errors = array(
	0=>"A required parameter was not provided.",
	1=>"The action specified does not exist.",
	2=>"No action was provided",
	3=>"The appropriate information does not exist"
);
function display_error($err){
	echo json_encode(
		array(
		"result"=>"error",
		"code"=>$err,
		"message"=>$GLOBALS["errors"][$err] 
		)
	);
	exit;
}
function getSet(&$arr){
	$out=array();
	foreach ($arr as $arg){
		if(!isset($_GET[$arg])){
			return false;
		}
		else{
			$out[$arg]=$_GET[$arg];
		}
	}
	$arr=$out;
	return true;
}
if(!getSet($args)){
	display_error(0);
}
else{
	$hash=md5($args["hash"]);
	$hashes=fopen("hashes.example");
	$d=array();
	$i=0;
	while($i<$args["n"]){
		if(($line=fgets($hashes)!==false)){
			if($line[0]!=="#" ){
				$cl=explode(":",$line);
				if($cl[0]==$hash){
				//Record hash
					$d[]=explode(",",$cl[1]);
					$i++;
				}
			}
		}
		else{
			//All lines possible to read have been read
			break;
		}	
	}
	echo json_encode($d);
}

