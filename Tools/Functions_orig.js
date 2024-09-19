/*function saveData(name, data){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'write_data.php'); // 'write_data.php' is the path to the php file described above.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({filedata: data}));
}*/

function saveData(name, data){
	// MG start change - extracting subject_id from name parameter
	subject_id=name.split("/")[1].split(".")[0] ;
	// MG end change
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'write_data.php'); // 'write_data.php' is the path to the php file described above.
  xhr.setRequestHeader('Content-Type', 'application/json');
  // MG start change - adding subject_id to the data sent to php
  // MG xhr.send(JSON.stringify({filedata: data}));
  xhr.send(JSON.stringify({filedata: data, subject_id: subject_id}));
  // MG end change
}

// call the saveData function after the experiment is over
initJsPsych({
   on_finish: function(){ saveData(jsPsych.data.get().csv()); }
});
