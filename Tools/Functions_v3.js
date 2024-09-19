/*function saveData(name, data){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'write_data.php'); // 'write_data.php' is the path to the php file described above.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({filedata: data}));
}*/

 alert(1);
function saveData(name, data){
	alert("saveData");
	// MG start change - extracting subject_id from name parameter
	last_slash=name.lastIndexOf('/');
	folder=name.slice(0, last_slash);
	subject_id=name.slice(last_slash+1).replace(".csv","_");
	// MG end change
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'write_data_v2.php'); // 'write_data.php' is the path to the php file described above.
  xhr.setRequestHeader('Content-Type', 'application/json');
  // MG start change - adding subject_id to the data sent to php
  // MG xhr.send(JSON.stringify({filedata: data}));
  xhr.send(JSON.stringify({filedata: data, subject_id: subject_id, folder:folder }));
  // MG end change
}

function retrieveImageNames(folder) {
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

//timeline_a_r=getTimeline("celebs/timeline_a", true, 600,600,60,300,300,45,40,18,'<p></p>',"<p>Is the year of birth odd or even?</p>",['odd', 'even']);

function getTimeline(seq,randomize,w1,h1,t1,w2,h2,t2,t3,t4,p1,p2,choices,num,part) {
    var images = retrieveImageNames('images/' + seq);

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
		  stimulus_width: w1,
		  stimulus_height: h1,
		  choices: [],
		  prompt: "",
		  trial_duration: t1
		},
		{
		  timeline: [
			{
			  type: jsPsychImageButtonResponse,
			  stimulus: jsPsych.timelineVariable('face'),
			  stimulus_width: w2,
			  stimulus_height: h2,
			  choices: [],
			  prompt: "",
			  trial_duration: t2
			},
			{
			  type: jsPsychImageButtonResponse,
			  prompt: p1,
			  stimulus: jsPsych.timelineVariable('face'),
			  stimulus_width: w2,
			  stimulus_height: h2,
			  trial_duration: t3,
			  choices: choices,
			  prompt: p2
			},
			{
			  type: jsPsychImageButtonResponse,
			  stimulus: [],
			  choices: [],
			  prompt: "",
			  trial_duration: t4
			}
		  ],
		  timeline_variables: timelineVariables,
		  randomize_order: randomize
		}
	  ]
	}
	if (part=='part_1')
		return(tl);
	else
		return(tl.timeline[0]);
}




// call the saveData function after the experiment is over
initJsPsych({
   on_finish: function(){ saveData(jsPsych.data.get().csv()); }
});

alert("f2");