var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        
        var tree;
        var buildings = [];
     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'#ffdae9');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield

            //everytime the loop runs it creates a circle with a random x and y respective to the canvas and added to the canavs
                for(var i = 0; i <= 160 ; i++){
                var star = draw.bitmap('img/star.png');
                // var circle = draw.circle(3,'white','LightGray',2); // creates a variable called circle thaty holds each circle
                star.x = canvasWidth*Math.random(); //multiplies canvas width times random decimal between .1 and .99 and assigns it to circle.x
                star.y = groundY*Math.random(); //multiplies canvas width times random decimal between .1 and .99 and assigns it to circle.y
                background.addChild(star);// adds the circle to the background
            }

            var moon = draw.bitmap('img/moon.png'); // created variable called moon, draw.bitmap draws the image abd stores it in the variable 
            moon.x = canvasWidth - 350; //controls the x cordinate of the moon
            moon.y = groundY - 450; //controls the y cordinate of the moon
            moon.scaleX = .5; //controls the scale of the moon on the x axis
            moon.scaleY = .5; //controls the scale of the moon on the y axis
            background.addChild(moon); // adds the moon to the background

            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            for(var i=0 ; i < 5; i++) {
                var buildingHeight = 350*Math.random(); // creates varible called buildinHeight that holds the heights of the building
                var building = draw.rect(75, buildingHeight,'#f9fcff'); // creates a varible called building that holds the data for the drawn buildings
                building.x = 200*i; // postions postion of each building 200 pixels from the next building
                building.y = groundY-buildingHeight; //sets the y of the building off of groundY - buildingHeight
                background.addChild(building); // adds buildings to the backgrounf so it can be seen
                buildings.push(building); // pushes each indivdual building to the buildings array
            }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png'); // reassigns the drawn image tree to varible tree
            tree.x = 500; // assigns x value to the tree
            tree.y = groundY - 195; //assigns a y to the tree
            tree.scaleX = 1; //controls the scale of the tree on the x axis
            tree.scaleY = 1; //controls the scale of the tree on the y axis
            background.addChild(tree); //adds tree to background
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!

            tree.x = tree.x - 3; //  taking the value of tree.x (x postion) and decreasing it by 1 pixel every time the update function runs

            if(tree.x < -200) {
                tree.x = canvasWidth;
            }
            
            // TODO 5: Part 2 - Parallax

            //loops the buldings and moves them to the left by 0.5 pixels
            for (var i = 0; i < buildings.length; i++){
                buildings[i].x = buildings[i].x - 0.5; // moves the building's x postion by .5 pixeles
                if(buildings[i].x < -85) { //checks to see if the buildings x postion is in the left side it resets the x postiion to the right
                    buildings[i].x = canvasWidth;
                }
            }

        } // end of update function - DO NOT DELETE

        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
