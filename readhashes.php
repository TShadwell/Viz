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
	$hashes=fopen("hashes","r");
	$d=array();
  	$seenSubjects=array();
	$i=0; //$i counts up to $args["n"]- the number of student records to get.
	while($i<$args["n"]){
		if(($line=fgets($hashes))!==false){
  			$cl=explode(":", $line); //Now [hash, listOfSubjects]
			if($cl[0]==$hash){
	  			//Record hash
        			$subjects=explode(",",str_replace("\n","",$cl[1]));
				if ($subjects!=[""]) {
          				$d[]=$subjects;
        			}
				foreach($subjects as $subject) {
					if (!(in_array($subject, $seenSubjects))) {
						$seenSubjects[]=$subject;
					}
				}
			$i++;
			}
		}
		else{
			//All lines possible to read have been read
			break;
		}	
	}
  echo json_encode([$seenSubjects,$d]);
}

