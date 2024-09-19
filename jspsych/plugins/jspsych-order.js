/*
 * Example plugin template
 */


jsPsych.plugins["order"] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('free-sort', 'stimuli', 'image');


  plugin.info = {
    name: "order",
    parameters: {
      key: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        default: 32 // spacebar
      },

      stimuli: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Stimuli',
        default: undefined,
        array: true,
        description: 'items to be displayed.'
      },

      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'The text that appears on the button to continue to the next trial.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {


var button = document.createElement("button");
button.innerHTML = "Click when done";


// 2. Append somewhere
var body = document.getElementsByTagName("body")[0];
body.appendChild(button);
button.id = "btn1"
var finalImagePositions = [];
// 3. Add event handler
button.addEventListener ("click", function() {
  const end_time = performance.now();
  const rt = Math.round(end_time - stars_times);
  console.log("end_time:", end_time);
  end_times.push(end_time);
  let final_locations = [];
  
  const images = document.querySelectorAll('#board img');
  finalImagePositions = [];

  images.forEach(image => {
    const rect = image.getBoundingClientRect();
    finalImagePositions.push({
      src: image.src,
      x: Math.round(rect.x),
      y: Math.round(rect.y)
    });
  });

  
  for (let i = moves.length - 1; i >= 0 && final_locations.length < 4; i--) {
    const newObj = moves[i];
    
    if (newObj.y > 300 && ! final_locations.some(obj => obj.src === newObj.src && i >= 0 && final_locations.length < 4)) {
      final_locations.push(newObj);
      console.log("New object added:", newObj);
    
    }
  }

  finalImagePositions.sort((a, b) => a.x - b.x);
  const trial_data = {
    initial_locations: JSON.stringify(tiles_id),
    moves: JSON.stringify(moves),
    //stars_time: JSON.stringify(stars_times),
  //end_time: JSON.stringify(end_times),
  final_locations_3: JSON.stringify(finalImagePositions),
  number_of_moves: JSON.stringify(turns),

  rt: JSON.stringify(rt)};


  jsPsych.finishTrial(trial_data);
  body.removeChild(button);
});

    //window.addEventListener("DOMContentLoaded", (event) => {
      //const button = document.createElement('button')
      //button.addEventListener('click', function(){
        //console.log("hi");
        //display_element.innerHTML = '';
        //jsPsych.finishTrial(trial_data);
    //  });
  
 // });
    // data saving
    var current_order = 0;
    var rows = 1;
    var columns = 4;
    var  currTile;
    var otherTile;
    var turns = 0;
    var rts = [];
    var tiles_id = [];
    var tiles_id_2 = [];
    var a =[1,2];
    let stars_times = [];
    let final_locations_2 = [];
    let move_time_1 = 0;
    let move_time_2 = 0;
    let move_time_3 = 0;
    let end_times = [];
    var actions = []; // Array to store user actions
    //let init_locations = [];
    let moves = [];
    


    //const button = document.createElement('button')
      //button.innerText = 'Can you click me?'
      //'jspsych-free-sort-done-btn'


    function show_stimulus(order){
//      display_element.innerHTML = "<p style='font-family: monospace; font-size: 66px;'>" + create_moving_window(trial.words, position) + "</p>" 
      var start_time = performance.now();
       move_time_1 = start_time;
      stars_times.push(start_time);
      console.log('start time:', start_time);

      display_element.innerHTML = '<h2>Scrambled Order</h2>' +'<div id="pieces"></div>' +  '<h2>Correct Order</h2>' + 
      '<div id="board"></div>' +'<b> 1 &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 2 &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp 3 &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 4 </b>'
      + '<div id= "btn1"></div>'; 
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // <img>
            let tile = document.createElement("img");
            tile.src = "images/blank.jpg";
            tile.addEventListener("dragstart", dragStart);

        }
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // <img>
            let tile = document.createElement("img");
            tile.src = "./images/blank.jpg";

            // DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
        
    }

    // pieces
    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString());
    }
    pieces.reverse();
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        // swap
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }
        a =[];
        
    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./images/" + trial.stimuli[i] + ".jpg";

        console.log(tile.src);
        tile.id = trial.stimuli[i];
        console.log(tile.id)
        tiles_id.push(tile.id);
        console.log(tiles_id);
        // Log the x and y positions of the current tile
            
    
    


        


        // DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        document.getElementById("pieces").append(tile);

        const rect = tile.getBoundingClientRect();
        //init_locations.push({
    //src: tile.id,
    //x: Math.round(rect.x),
    //y: Math.round(rect.y),
      //  });
        

    }

    }

    function dragStart() {
      currTile = this;
  }
  
  function dragOver(e) {
      e.preventDefault();
  }
  
  function dragEnter(e) {
      e.preventDefault();
  }
  
  function dragLeave() {

  
    
  
  }
  
  function dragDrop() {
      otherTile = this;
      console.log(tile.id);
  }


  function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;
    
    const rect_2 = otherTile.getBoundingClientRect();
    var move_time_2 = performance.now();
    var move_time_3 = Math.round(move_time_2 - move_time_1);
    moves.push({
      src: otherTile.src,
      x: Math.round(rect_2.x),
      y: Math.round(rect_2.y),
      move_time : move_time_3
    });
          
    console.log("Image:", otherTile,"Top Location (Y):", rect_2.top,  "Bottem Location(Y):", rect_2.bottom, "Left Location(X):", rect_2.left, "Right Location(X):", rect_2.right,"Turns:",turns+1);
    move_time_1 = move_time_2;
    move_time_3
    turns += 1;
    document.getElementById("turns").innerText = turns;


    // Save action
    actions.push({
        from: currTile.src,
        to: otherTile.src
    });

}

function displayActions() {
  let actionsContainer = document.getElementById("actions");
  for (let i = 0; i < actions.length; i++) {
      let action = actions[i];
      let actionText = document.createElement("p");
      actionText.textContent = "Move from: " + action.from + " to: " + action.to;
      actionsContainer.append(actionText);
  }
}



    //function after_response(response_info){
      //rt.push(response_info.rt);
    //}

    //function end_trial(){
      //trial_data.rt = JSON.stringify(rt);

      // clear the display
      //display_element.innerHTML = '';

      // end trial
      //jsPsych.finishTrial(trial_data);
   // }


  

    show_stimulus(current_order);    
  }

  return plugin;
})();
