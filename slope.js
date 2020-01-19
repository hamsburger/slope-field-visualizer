var random = true; // variables in canvasStart on not visible in plotDots
var xCoordinate;
var yCoordinate;
var angle;

function promptForFxn(){
  // var input = prompt("Enter a slope field function (in the form of (expression 1, expression 2) in terms of x and y): ", "Enter Here");
  //
  // if (input != null || input.contains(",")){
  //   // global variables automatic
  //   expression1 = input.split(',')[0];
  //   expression2 = input.split(',')[1];
  // }
  //
  // var operation = new RegExp("[-+*/]"); // Put - in front to avoid it begin read as a range function
  // if(expression1.match(operation) != null){
  //   alert("Operation Found");
  //   console.log(expression1.match(operation));
  // } else {
  //   console.log("How many characters does the expression have?" + expression1.length)
  //   if (expression1.length > 1){
  //     alert("Multiplication Found");
  //   }
  // }

  canvasStart();
}

function canvasStart(){
  var canvas = document.querySelector("#canvas");

  drawCanvasBorder(canvas);
  deleteExtra();

  var counter = 0;
  for (var i = 0; i < window.innerHeight - 110; i += 110){
    for (var j = 0; j < window.innerWidth - 110; j += 110){
        plotDots(j, i, counter);
    } // for

    random = true;
    counter += 1;
  } // for

  $('.triangle').hover(function(){
    console.log($(this).val());
    document.getElementById("positionDisplay").innerHTML = $(this).attr("value");
  }, function(){
    document.getElementById("positionDisplay").innerHTML = "The Vector of an Arrow Will be Displayed Here.";
  });

}


function drawCanvasBorder(canvas){
  // Inserting a n-pixel border increases the dimensions of your box model by 2*n pixels
  canvas.style.border = "3px solid black"; // border cannot be read from the css, so css must be loaded after javascript?
  let width = canvas.style.borderWidth;
  let number = width.split("px");
  console.log(number[0]);

  canvas.style.height = window.innerHeight - 2*(number[0]) + "px";
  canvas.style.width = window.innerWidth - 2*(number[0]) + "px";

  console.log("Height: " + canvas.style.height + "\nWidth: " + canvas.style.width);
  //  ctx.beginPath() -- Begins a line
  // ctx.moveTo(x, y) -- Moves beginning of path to initial x and y position
  // ctx.lineTo(x, y) -- Draws line from initial position.
}

/* Description: Deletes Dots and Triangle Drawn Outside of the Current Window */
function deleteExtra(){
  $('div .triangle,.dots').toArray().forEach(function(element){
    if (document.body.contains(element)){
      console.log(((element.style.left).split("px"))[0] + 80);
      if(((element.style.left).split("px"))[0] + 40 > window.innerWidth || ((element.style.top).split("px"))[0] + 40 > window.innerHeight){
        element.remove();
        console.log("detected");
      } // if
    } else {
      alert("oof");
    }
  });
}

/* Description: Draw a bunch of dots and rectangles */
function plotDots(dotRow, dotCol, counter){


  // Clear up some memory so that CPU doesn't burn
  if($('div').hasClass('dots ' + counter + (dotRow + dotCol))){
    $('.dots.' + counter + (dotRow + dotCol)).remove();
  }

  if($('div').hasClass('triangle ' + counter + (dotRow + dotCol))){
    $('.triangle.' + counter + (dotRow + dotCol)).remove();
  }

  // Add dots and triangles
  $('#canvas').append('<div class="dots ' + counter + (dotRow + dotCol) + '"></div>');
  $('.dots.' + counter + (dotRow + dotCol)).css('left', dotRow + 'px');
  $('.dots.' + counter + (dotRow + dotCol)).css('top', dotCol + 'px');

  $('#canvas').append('<div class="triangle ' + counter + (dotRow + dotCol) + '"></div>');
  var triangleWidth = (document.querySelector('.triangle').style.width).split("px")[0];
  xCoordinate = dotRow + triangleWidth - window.innerWidth/2;
  yCoordinate = window.innerHeight/2 - dotCol + triangleWidth;
  angle = -Math.atan2(yCoordinate, xCoordinate)*180/Math.PI;
  console.log("THe Angle: " + angle);

  $('.triangle.' + counter + (dotRow + dotCol)).css('left', dotRow + 'px');
  $('.triangle.' + counter + (dotRow + dotCol)).css('top', dotCol + 'px');
  $('.triangle.' + counter + (dotRow + dotCol)).css('transform', 'rotate(' + angle + 'deg)');


  $('.triangle.' + counter + (dotRow + dotCol)).attr('value', "X: " + xCoordinate + " Y: " + yCoordinate);
  // console.log("random" + random);
  // if (random == true){
  //   console.log($('div').hasClass('dots ' + counter + (dotRow + dotCol)) + ' dots ' + counter + (dotRow + dotCol));
  //   random = false;
  // }
} // plotDots




window.onload = promptForFxn;
window.onresize = canvasStart;
