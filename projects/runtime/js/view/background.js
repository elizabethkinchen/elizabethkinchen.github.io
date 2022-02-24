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

     
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'lightBlue');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield

            //everytime the loop runs it creates a circle with a random x and y respective to the canvas and added to the canavs
                for(var i = 0; i <= 160 ; i++){
                var circle = draw.circle(3,'white','LightGray',2); // creates a variable called circle thaty holds each circle
                circle.x = canvasWidth*Math.random(); //multiplies canvas width times random decimal between .1 and .99 and assigns it to circle.x
                circle.y = groundY*Math.random(); //multiplies canvas width times random decimal between .1 and .99 and assigns it to circle.y
                background.addChild(circle);// adds the circle to the background
            }

            var moon = draw.bitmap('img/moon.png'); // created variable called moon, draw.bitmap draws the image abd stores it in the variable 
            moon.x = canvasWidth - 350; //controls the x cordinate of the moon
            moon.y = groundY - 450; //controls the y cordinate of the moon
            moon.scaleX = .5; //controls the scale of the moon on the x axis
            moon.scaleY = .5; //controls the scale of the moon on the y axis
            background.addChild(moon); // adds the moon to the background

            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png'); // reassigns the drawn image tree to varible tree
            tree.x = 500; // assigns x value to the tree
            tree.y = groundY - 215; //assigns a y to the tree
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
