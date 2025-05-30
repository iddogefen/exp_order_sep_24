/*function saveData(name, data){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'write_data.php'); // 'write_data.php' is the path to the php file described above.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({filedata: data}));
}*/

// VERSION const vrs = "D05-13,T23:00"

function saveData(name, data){
	// MG start change - extracting subject_id from name parameter
	last_slash=name.lastIndexOf('/');
	folder=name.slice(0, last_slash);
	subject_id=name.slice(last_slash+1).replace(".csv","");
	// MG end change
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/write_data.php'); // 'write_data.php' is the path to the php file described above.
  xhr.setRequestHeader('Content-Type', 'application/json');
  // MG start change - adding subject_id to the data sent to php
  // MG xhr.send(JSON.stringify({filedata: data}));
  xhr.send(JSON.stringify({filedata: data, subject_id: subject_id, folder:folder }));
  // MG end change
}
function saveText(name, seqs){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/write_text.php'); // 'write_text.php' is the path to the php file described above.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({filedata: JSON.stringify(seqs), fname: name }));
}
function getText(name) {
  	var xhr = new XMLHttpRequest();
    xhr.open('GET', '/read_text.php?fname='+encodeURIComponent(name), false); // false makes the request synchronous
    xhr.send();
    if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
		//alert(JSON.parse(data));
        return JSON.parse(data);
    } else {
        console.error('Error:', xhr.statusText);
        return null;
    }
}
function retrieveImageNames(folder) {
	// get all images in the system
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'retrieve_images.php?folder='+encodeURIComponent(folder), false); // false makes the request synchronous
    xhr.send();

    if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        return data;
    } else {
        console.error('Error:', xhr.statusText);
        return null;
    }
}

// These are the size parameters.
const width_title			= 600;
const height_title			= 600;
const width_image			= 300;
const height_image			= 300;


function getRandomValues(arr, n) {
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Return the first n elements
    return arr.slice(0, n);
}


function getAllSequences(groups) {
//function getAllSequences(n_celeb,n_scheme_n_story) {
	//alert(groups[0].name);
	// look for all sequences of the 3 categories and retrive a random number of each group
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_sequences.php', false); // false makes the request synchronous
    xhr.send();
    if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
		let seqs=[];

		for (let igroup=0;igroup<groups.length;igroup++){
			//alert(groups[igroup].name);
			for (let idata=0;idata<data.length;idata++) {
				if(data[idata].length == 0)
					continue;
				if (data[idata][0].indexOf(groups[igroup].name)!== -1) {
					n_scrambled = 0
            		ns=Math.min(groups[igroup].n, data[idata].length);
				rval=getRandomValues(data[idata],ns);
					var last_random_exists = false;
					var last_scrambled = false;
					for (let val=0;val<rval.length;val++){
						rval_array=[];
						if 	  (groups[igroup].random == "all" )
							scrambled = true;
						else {
							console.log("half section");
							if (groups[igroup].random == "half" )  {
								if (last_random_exists)	{
									scrambled=!last_scrambled;

								}
								else {
									rn1=Math.random();
									console.log("RANDOM=",rn1);
									scrambled = (rn1>0.5) ;
							                	
									last_random_exists = true;
								}
								last_scrambled=scrambled;
							}
							else {
								 n_scrambled=n_scrambled+1;
							//	console.log(igroup,n_scrambled);
								if (n_scrambled<=groups[igroup].random)
									 scrambled = true;
								 else
									 scrambled = false;
							}
						}
						rval_array.push(rval[val]);
						rval_array.push(scrambled);
						seqs.push(rval_array);
					}
					break;
				}
			}
		}
		for (i =0;i<seqs.length;i++){
			seqs[i][0]=seqs[i][0].replace("images/","");
		}
		// Now randommize also the order
		randomValues=getRandomValues(seqs,seqs.length);
        return randomValues;

    } else {
        console.error('Error:', xhr.statusText);
        return null;
    }
}


function getTimeline(seq,p1,p2,choices,num,part,slow) {
	if (slow==false) {
		duration_title			= 200;
		duration_image			= 200;
		duration_question		= 50;
		duration_response		= 50;
	}
	else {
	 	duration_title			= 6000;
	 	duration_image			= 4500;
	 	duration_question		= 4000;
	 	duration_response		= 1800;
	}

	// create a "trial_10" timeline
    var images = retrieveImageNames('images/' + seq[0]);

    // Ensure num does not exceed the number of available images
    num = Math.min(num, images.length - 1);

    // Create timeline_variables dynamically based on num
    var timelineVariables = [];
    for (var i = 1; i <= num; i++) {
        timelineVariables.push({ face: images[i].replace(/\\/g, "/") });
    }

	var tl = {
	  timeline: [
		{
		  type: jsPsychImageButtonResponse,
		  stimulus: images[0].replace(/\\/g,"/"),
		  stimulus_width: width_title,
		  stimulus_height: height_title,
		  choices: [],
		  prompt: "",
		  trial_duration: duration_title
		},
		{
		  timeline: [
			{
			  type: jsPsychImageButtonResponse,
			  stimulus: jsPsych.timelineVariable('face'),
			  stimulus_width: width_image,
			  stimulus_height: height_image,
			  choices: [],
			  prompt: "",
			  trial_duration: duration_image
			},
			{
			  type: jsPsychImageButtonResponse,
			  prompt: p1,
			  stimulus: jsPsych.timelineVariable('face'),
			  stimulus_width: width_image,
			  stimulus_height: height_image,
			  trial_duration: duration_question,
			  choices: choices,
			  prompt: p2
			},
			{
			  type: jsPsychImageButtonResponse,
			  stimulus: [],
			  choices: [],
			  prompt: "",
			  trial_duration: duration_response
			}
		  ],
		  timeline_variables: timelineVariables,
		  randomize_order: seq[1]
		}
	  ]
	}
	if (part==1)
		return(tl);
	else
		var tl2 = {
	  timeline: [
		{
		  type: jsPsychImageButtonResponse,
		  stimulus: images[0].replace(/\\/g,"/"),
		  stimulus_width: width_title,
		  stimulus_height: height_title,
		  choices: [],
		  prompt: "",
		  trial_duration: duration_title
		}
	  ]
	}
	  return(tl2);
}


// The following functions are for the ORDER experiment
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
	}
    return array;
}


    function getTimeline_Order(seq,num,slow) {
    var images = retrieveImageNames('images/' + seq[0]);
	//randomize
	if (seq[1]==true) images=shuffle(images.slice(1));

    // Ensure num does not exceed the number of available images
    num = Math.min(num, images.length - 1);

    // Create timeline_variables dynamically based on num
    var timelineVariables = [];
    for (var i = 0; i <= num; i++) {
		img= images[i].replace(/\\/g, "/");
		img=img.replace(/images\//g, "");
		img=img.replace(".png","");
		img=img.replace(".png","");
		//img=img.replace(/^.*?\//,"");
        timelineVariables.push(img);
    }
	  return(timelineVariables);
}



// MG deleted call to init");
