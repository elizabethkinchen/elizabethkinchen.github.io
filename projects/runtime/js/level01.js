var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        function createsawBlade(x, y){
                    var hitZoneSize = 25; //creates tye size of the hitzone 
                var damageFromObstacle = 10; //sets the damage of the obstacle 
                var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates the hitzone and stores it in this variable
                sawBladeHitZone.x = x; // the x postion of the hitzone 
                sawBladeHitZone.y = y; // the y postion of the hitzone
                game.addGameItem(sawBladeHitZone); // add hitzone to the game

                var obstacleImage = draw.bitmap('img/sawblade.png'); // drawing image and storing in variable
                sawBladeHitZone.addChild(obstacleImage); //add the image to the hitzone
                obstacleImage.x = -25; //tweaks the image 25 pixels to the left
                obstacleImage.y = -25; //tweaks the image 25 pixels up
        }

       
       createsawBlade(400, 370)
       createsawBlade(800, 485)
       createsawBlade(1200, 370)
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
