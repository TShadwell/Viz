//Fires on load
init=function(){
	var resize, 
	d=document, 
	dotRad=20, 
	ca=d.getElementsByTagName("canvas")[0],
	cRed="#a04800",
	cYellow="#bdbc55";
	var c=ca.getContext("2d");
	/*(resize = function() {
		ca.width = d.documentElement.clientWidth;
		ca.height = d.documentElement.clientHeight;
	})();*/
	var point=function(x,y){
		this.x=x;
		this.y=y;
	}
	c.fillStyle = 'rgb(255,255,255)';
	c.fillRect(0, 0, ca.width, ca.height);
	//window.addEventListener('resize', resize, false);
	var dot=function(x,y, colour){
		this.x=x;
		this.y=y;
		this.draw=function(){
			c.arc(this.x, this.y, dotRad,  0, 2*Math.PI, true);
		}
	}
	var line=function(point1, point2, colour){
		this.pt1=point1;
		this.pt2=point2;
		this.colour=colour;
		var a=this;
		this.draw=function(){
			c.beginPath();
			c.strokeStyle=colour;
			c.moveTo(this.pt1.x, this.pt1.y);
			c.lineTo(this.pt2.x, this.pt2.y);
			c.stroke();
			return a;
		}
	}
	var clear=function(callback){
		var fade;
		(fade = function(n){
			if(n<=(50)){
				c.fillStyle="rgba(255,255,255,0.1)";
				c.fillRect(0, 0, ca.width, ca.height);
				n++;
				setTimeout(fade, 1, n);
			}
			else{
				c.fillStyle="rgb(255,255,255)";
				c.fillRect(0, 0, ca.width, ca.height);
				if (typeof callback !== "undefined"){callback()};
			}
		})(0);
	}
	var subjectMap={
		"A Level" : 
		{ 
			"GA_ACCOUNTING" : "Accounting/Finance",
			"GA_AD" : "Art and Design",
			"GA_AD_CRITI" : "Art and Design ",
			"GA_AD_GRAPH" : "Art and Design ",
			"GA_AD_PHOTO" : "Art and Design ",
			"GA_AD_TEXTI" : "Art and Design ",
			"GA_AD_THREE" : "Art and Design ",
			"GA_ANC_HIST" : "Ancient History",
			"GA_ARABIC" : "Arabic",
			"GA_ARCHAE" : "Archaeology",
			"GA_BENGALI" : "Bengali",
			"GA_BIOLOGY" : "A Level",
			"GA_BIOLOGY_HUMAN" : "Biology: Human",
			"GA_BUS" : "Business Studies",
			"GA_BUS_ECON" : "Business Studies and Economics",
			"GA_CHEMISTRY" : "Chemistry",
			"GA_CHINESE" : "Chinese",
			"GA_CLASS_CIV" : "Classical Civilisation",
			"GA_COMMUNICATION" : "Communication Studies",
			"GA_COMP_STU" : "Computer Studies/Computing",
			"GA_CRIT_THINK" : "Critical Thinking",
			"GA_DANCE" : "Dance",
			"GA_DRAMA" : "Drama & Theatre Studies",
			"GA_DT_FOOD" : "Design/Tech & Food Technology",
			"GA_DT_PRODUCTION" : "Design/Tech & Production Design",
			"GA_DT_SYSTEMS" : "Design/Tech & Systems",
			"GA_DUTCH" : "Dutch",
			"GA_ECON" : "Economics",
			"GA_ELECTRONICS" : "Science: Electronics",
			"GA_ENG" : "English",
			"GA_ENG_LANG" : "English Language",
			"GA_ENG_LIT" : "English Literature",
			"GA_ENV_SCI" : "Science: Environmental",
			"GA_EUROPE" : "European Studies",
			"GA_FILM" : "Film Studies",
			"GA_FINE_ART" : "Fine Art",
			"GA_FRENCH" : "French",
			"GA_GEN_STUD" : "General Studies",
			"GA_GEOG" : "Geography",
			"GA_GEOLOGY" : "Science: Geology",
			"GA_GERMAN" : "German",
			"GA_GOV_POLITICS" : "Government & Politics",
			"GA_GREEK" : "Greek",
			"GA_GUJARATI" : "Gujarati",
			"GA_HIST" : "History",
			"GA_HIST_ART" : "History of Art",
			"GA_HOME_EC" : "Home Economics",
			"GA_IT" : "Information Technology",
			"GA_ITALIAN" : "Italian",
			"GA_JAPANESE" : "Japanese",
			"GA_LATIN" : "Latin",
			"GA_LAW" : "Law",
			"GA_LOGIC_PHIL" : "Logic/Philosophy",
			"GA_MATH" : "Mathematics",
			"GA_MATH_ADDI" : "Additional Mathematics",
			"GA_MATH_APPL" : "Mathematics ",
			"GA_MATH_DISC" : "Mathematics ",
			"GA_MATH_FURT" : "Mathematics ",
			"GA_MATH_MECH" : "Mathematics ",
			"GA_MATH_PURE" : "Mathematics ",
			"GA_MATH_STAT" : "Mathematics ",
			"GA_MEDIA_FILM_TV" : "Media/Film/Television Studies",
			"GA_MOD_GREEK" : "Modern Greek",
			"GA_MOD_HEBREW" : "Modern Hebrew",
			"GA_MUSIC" : "Music",
			"GA_MUSIC_TECH" : "Music Technology",
			"GA_OTH_CLASS" : "Other Classical Languages",
			"GA_PANJABI" : "Punjabi",
			"GA_PE" : "Sport/Physical Education Studies",
			"GA_PERFORMING" : "Performing Studies",
			"GA_PERSIAN" : "Persian",
			"GA_PHYSICS" : "Physics",
			"GA_POLISH" : "Polish",
			"GA_PORTUGUESE" : "Portuguese",
			"GA_PSYCH_SCI" : "Psychology JMB/NEA",
			"GA_PSYCH_SOC" : "Psychology",
			"GA_RE" : "Religious Studies",
			"GA_RUSSIAN" : "Russian",
			"GA_SCIENCE" : "Science: Single award",
			"GA_SCI_PUBLIC" : "Science for Public Understanding",
			"GA_SCO_POL" : "Social Policy",
			"GA_SCO_SCI_CIT" : "Social Science Citizenship",
			"GA_SOC" : "Sociology",
			"GA_SPANISH" : "Spanish",
			"GA_TURKISH" : "Turkish",
			"GA_URDU" : "Urdu",
			"GA_WELSH_SECOND" : "Welsh Second Language",
			"GA_WORLD_DEV" : "World Development"
		},
		"AS Level":
		{ 
			"GAS_ACCOUNTING" : "Accounting/Finance",
			"GAS_AD" : "Art and Design",
			"GAS_AD_CRITI" : "Art and Design ",
			"GAS_AD_GRAPH" : "Art and Design ",
			"GAS_AD_PHOTO" : "Art and Design ",
			"GAS_AD_TEXTI" : "Art and Design ",
			"GAS_AD_THREE" : "Art and Design ",
			"GAS_ANC_HIST" : "Ancient History",
			"GAS_ARABIC" : "Arabic",
			"GAS_ARCHAE" : "Archaeology",
			"GAS_BENGALI" : "AS Level",
			"GAS_BIOLOGY" : "Biology",
			"GAS_BIOLOGY_HUMAN" : "Biology: Human",
			"GAS_BUS" : "Business Studies",
			"GAS_BUS_ECON" : "Business Studies and Economics",
			"GAS_CHEMISTRY" : "Chemistry",
			"GAS_CHINESE" : "Chinese",
			"GAS_CLASS_CIV" : "Classical Civilisation",
			"GAS_COMMUNICATION" : "Communication Studies",
			"GAS_COMP_STU" : "Computer Studies/Computing",
			"GAS_CRIT_THINK" : "Critical Thinking",
			"GAS_DANCE" : "Dance",
			"GAS_DRAMA" : "Drama & Theatre Studies",
			"GAS_DT_FOOD" : "Design/Tech & Food Technology",
			"GAS_DT_PRODUCTION" : "Design/Tech & Production Design",
			"GAS_DT_SYSTEMS" : "Design/Tech & Systems",
			"GAS_DUTCH" : "Dutch",
			"GAS_ECON" : "Economics",
			"GAS_ELECTRONICS" : "Science: Electronics",
			"GAS_ENG" : "English",
			"GAS_ENG_LANG" : "English Language",
			"GAS_ENG_LIT" : "English Literature",
			"GAS_ENV_SCI" : "Science: Environmental",
			"GAS_EUROPE" : "European Studies",
			"GAS_FILM" : "Film Studies",
			"GAS_FINE_ART" : "Fine Art",
			"GAS_FRENCH" : "French",
			"GAS_GEN_STUD" : "General Studies",
			"GAS_GEOG" : "Geography",
			"GAS_GEOLOGY" : "Science: Geology",
			"GAS_GERMAN" : "German",
			"GAS_GOV_POLITICS" : "Government & Politics",
			"GAS_GREEK" : "Greek",
			"GAS_GUJARATI" : "Gujarati",
			"GAS_HIST" : "History",
			"GAS_HIST_ART" : "History of Art",
			"GAS_HOME_EC" : "Home Economics",
			"GAS_IT" : "Information Technology",
			"GAS_ITALIAN" : "Italian",
			"GAS_JAPANESE" : "Japanese",
			"GAS_LATIN" : "Latin",
			"GAS_LAW" : "Law",
			"GAS_LOGIC_PHIL" : "Logic/Philosophy",
			"GAS_MATH" : "Mathematics",
			"GAS_MATH_ADDI" : "Additional Mathematics",
			"GAS_MATH_APPL" : "Mathematics ",
			"GAS_MATH_DISC" : "Mathematics ",
			"GAS_MATH_FURT" : "Mathematics ",
			"GAS_MATH_MECH" : "Mathematics ",
			"GAS_MATH_PURE" : "Mathematics ",
			"GAS_MATH_STAT" : "Mathematics ",
			"GAS_MEDIA_FILM_TV" : "Media/Film/Television Studies",
			"GAS_MOD_GREEK" : "Modern Greek",
			"GAS_MOD_HEBREW" : "Modern Hebrew",
			"GAS_MUSIC" : "Music",
			"GAS_MUSIC_TECH" : "Music Technology",
			"GAS_OTH_CLASS" : "Other Classical Languages",
			"GAS_PANJABI" : "Punjabi",
			"GAS_PE" : "Sport/Physical Education Studies",
			"GAS_PERFORMING" : "Performing Studies",
			"GAS_PERSIAN" : "Persian",
			"GAS_PHYSICS" : "Physics",
			"GAS_POLISH" : "Polish",
			"GAS_PORTUGUESE" : "Portuguese",
			"GAS_PSYCH_SCI" : "Psychology JMB/NEA",
			"GAS_PSYCH_SOC" : "Psychology",
			"GAS_RE" : "Religious Studies",
			"GAS_RUSSIAN" : "Russian",
			"GAS_SCIENCE" : "Science: Single award",
			"GAS_SCI_PUBLIC" : "Science for Public Understanding",
			"GAS_SCO_POL" : "Social Policy",
			"GAS_SCO_SCI_CIT" : "Social Science Citizenship",
			"GAS_SOC" : "Sociology",
			"GAS_SPANISH" : "Spanish",
			"GAS_TURKISH" : "Turkish",
			"GAS_URDU" : "Urdu",
			"GAS_WELSH_SECOND" : "Welsh Second Language",
			"GAS_WORLD_DEV" : "World Development"
		},
		"GCSE":
		{ 
			"APARA" : "Arabic",
			"APART" : "Art and Design",
			"APBEN" : "Bengali",
			"APBHEB" : " Biblical Hebrew",
			"APBIO" : "Biological Science",
			"APBUS" : "Business Studies",
			"APCGRK" : " Classical Greek",
			"APCHE" : "Chemistry",
			"APCHI" : "Chinese",
			"APDAN" : "GCSE",
			"APDRA" : "Drama",
			"APDSCI" : "Double Award Science",
			"APDTT" : " Design and Technology: Textiles Technology",
			"APDUT" : "Dutch",
			"APELANG" : "English Language",
			"APELEC" : " Design and Technology: Electronic Products",
			"APELIT" : "English Literature",
			"APENG" : "English",
			"APFINE" : "Fine Art",
			"APFOOD" : " Design and Technology: Food Technology",
			"APFRE" : "French",
			"APGEO" : "Geography",
			"APGER" : "German",
			"APGRA" : " Design and Technology: Graphic Products",
			"APGUJ" : "Gujarati",
			"APHECD" : "Home Economics: Child Development",
			"APHIN" : "Hindi",
			"APHIS" : "History",
			"APIT" : "Information Technology",
			"APITA" : "Italian",
			"APJAP" : "Japanese",
			"APLAT" : " Latin",
			"APMAT" : "Maths",
			"APMFT" : "Media, Film and Television Studies",
			"APMGRK" : "Modern Greek",
			"APMHEB" : "Modern Hebrew",
			"APMUS" : "Music",
			"APOFT" : "Office Technology",
			"APPAN" : "Panjabi",
			"APPE" : "Physical Education",
			"APPER" : "Persian",
			"APPHY" : "Physics",
			"APPOL" : "Polish",
			"APPOR" : "Portuguese",
			"APRES" : " Design and Technology: Resistant Materials Technology",
			"APRS" : "Religious Studies",
			"APRUS" : "Russian",
			"APSPAN" : "Spanish",
			"APSSCI" : "Single Award Science",
			"APSTAT" : "Statistics",
			"APSYS" : " Design and Technology: Systems & Control",
			"APTUR" : "Turkish",
			"APURD" : "Urdu"
		}
	}
	nav=document.getElementsByTagName("nav")[0];
	var displayData=function(){
		var n  = location.hash.slice(1);
		$.ajax({ url: "readhashes.php?n=10&hash=GA_BIOLOGYGA_CHEMISTRYGA_MATHGA_PHYSICS", dataType:"json" }).done(function(d) { 


			//Recieve data
			var subjs=[];
			for (i=0;i< d[0].length; i++){
				subjs.push([d[0][i],new dot((i*7+20),30)]);
			}
			window.g=subjs;
			for(i=0;i<d[1].length;i++){
				//draw lines from dots to center of screen
				for (m=0;m<subjs.length;m++){
					if(subjs[m][0]==d[1][i][0]){
						//draw line to center of screen
						subjs[m][1].draw();
						new line(new point(subjs[m][1].y, subjs[m][1].x), new point(ca.width, ca.height/2), cRed).draw();
						c.fillStyle="black";
						var a;
						if( typeof (a=subjectMap["GCSE"][subjs[m][0]])!== "undefined"){
							c.fillText(a,subjs[m][1].y, subjs[m][1].x);
						}
						else{
							c.fillText(subjs[m][0],subjs[m][1].y, subjs[m][1].x);
						}
						
						//Stop searching!
						break;
					}
				}
			}
		});
	}
	displayData();
}
