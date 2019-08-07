initializeItems();

function initializeItems() {

  //Give option bar event listener

  //All the boxes on the page
  const boxes = document.getElementsByClassName('box');
  console.log(boxes);

  for (let i = 0; i < boxes.length; i++) {

    //Give each box an event listener
    boxes[i].addEventListener("mouseover", function () {
      escapeFunction(boxes[i], i);
    })
  }

  const themes = document.getElementsByClassName('themes');
  for(let i = 0; i < themes.length; i++){
    themes[i].addEventListener("click", () => {
      changeThemes(themes[i]);
    })
  }
}

//Controls the movement of the "escaping" elements
function escapeFunction(box, i) {

  //get the dimensions of the surrounding container and the current element
  var containerRect = document.getElementById('container').getBoundingClientRect();
  var elementRect = box.getBoundingClientRect();

  //Create measurements object to store the distances from the current element to the surrounding container
  var measurements = {}
  measurements.distanceTop = elementRect.top - containerRect.top;
  measurements.distanceBot = elementRect.bottom - containerRect.bottom;
  measurements.distanceRight = elementRect.right - containerRect.right;
  measurements.distanceLeft = elementRect.left - containerRect.left;

  //The farthest the box can move on the x axis is determined by the shortest distance to the left or to the right
  var xCord = Math.floor(Math.random() * 400) + 1;
  xCord *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

  var yCord = Math.floor(Math.random() * 400) + 1;
  yCord *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

  //Information about each box sent to the console
  console.log("####################");
  console.log("Box Number: " + i);
  console.log("INFO:")

  console.log("Body: " + containerRect.top, containerRect.right, containerRect.bottom, containerRect.left);
  console.log("Element: " + elementRect.top, elementRect.right, elementRect.bottom, elementRect.left);

  console.log("INITIAL DISTANCE REPORT: \n");
  console.log("Top: " + measurements.distanceTop);
  console.log("Right: " + measurements.distanceRight);
  console.log("Bot: " + measurements.distanceBot);
  console.log("Left: " + measurements.distanceLeft);

  console.log("calculated xCord: " + xCord);
  console.log("calculated yCord: " + yCord);

  //This detects the boundaries, gives them "padding", then reverses the movement direction if they meet the condition
  if (xCord < 0) {
    if ((Math.abs(xCord) > measurements.distanceLeft )) {
      console.log("LEFT VECTOR REVERSED");
      xCord *= -1;
    }
  } else if (xCord >  Math.abs(measurements.distanceRight) - 500) {
    console.log("RIGHT VECTOR REVERSED");
    xCord *= -1;
  }

  if (yCord < 0) {
    if (Math.abs(yCord) > measurements.distanceTop - 400) {
      console.log("TOP VECTOR REVERSED");
      yCord *= -1;
    }
  } else if (yCord > (Math.abs(measurements.distanceBot) + 400)) {
    console.log("BOT VECTOR REVERSED");
    yCord *= -1;
  }

  console.log(xCord);
  console.log(yCord);

  //Actual box animation
  anime({
    targets: box,
    translateX: (xCord),
    translateY: (yCord),
    easing: "spring",
    duration: 400,
  })  
}

var activeBar = false;

function openBar() {
  console.log(activeBar);
  if(activeBar == false){
    anime({
      targets: '#optionButton',
      translateX: -310,
      easing: "easeInOutCubic",
      duration: 500,
    })
    document.getElementById("optionBar").style.width = "350px";
    activeBar = true;
  } else {
    document.getElementById("optionBar").style.width = "0px";
    anime({
      targets: '#optionButton',
      translateX: 0,
      easing: "easeInOutCubic",
      duration: 500,
    })
    activeBar = false;
  } 
}

function changeThemes(theme) {
  var containerImage = document.getElementById('container');
  console.log("GOT HERE")
  console.log(theme.id);
  switch(theme.id){

    case 'themeOcean': 
      containerImage.setAttribute("style", 
      "background-image: url(https://66.media.tumblr.com/9f6c16cfc8e6015e04ecbedca9038757/tumblr_ojp6auodWy1ufw8o4o1_400.gif)"
      );
    break;

    case 'themeRain':
    containerImage.setAttribute("style", 
      "background-image: url(http://giphygifs.s3.amazonaws.com/media/NnMH7LDpZTPZS/giphy.gif)"
      );
    break;

    case 'themeStream':
    containerImage.setAttribute("style",
    "background-image: url(https://66.media.tumblr.com/4db5be7085f4d3b06abbc636192b59f4/tumblr_n9823d42by1qk9powo1_500.gif)"
    ) 
    break;

    case 'themeCitySunset':
    containerImage.setAttribute("style",
    "background-image: url(https://media.giphy.com/media/V5qXaUBISlbTa/giphy.gif)"
    )
    break;
  }
}
