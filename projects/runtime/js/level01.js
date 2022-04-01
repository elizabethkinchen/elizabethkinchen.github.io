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
                { "type": "sawblade", "x": 400, "y": groundY - 125 },
                { "type": "sawblade", "x": 600, "y": groundY - 10 },
                { "type": "sawblade", "x": 900, "y": groundY - 120 },
                { "type": "sawblade", "x": 1200, "y": groundY - 125 },
                { "type": "sawblade", "x": 1500, "y": groundY - 10 },
                { "type": "sawblade", "x": 2000, "y": groundY - 120 },
                { "type": "sawblade", "x": 2200, "y": groundY - 125 },
                { "type": "sawblade", "x": 2600, "y": groundY - 10 },
                { "type": "sawblade", "x": 2800, "y": groundY - 120 },
                { "type": "sawblade", "x": 3000, "y": groundY - 125 },
                { "type": "sawblade", "x": 3200, "y": groundY - 10 },
                { "type": "sawblade", "x": 3500, "y": groundY - 120 },

                { "type": "enemy", "x": 500, "y": groundY - 20},
                { "type": "enemy", "x": 800, "y": groundY - 20},
                { "type": "enemy", "x": 1800, "y": groundY - 25},
                { "type": "enemy", "x": 2000, "y": groundY - 20},

                { "type": "enemy2", "x": 300, "y": groundY - 20},
                { "type": "enemy2", "x": 1100, "y": groundY - 20},
                { "type": "enemy2", "x": 1300, "y": groundY - 20},
                { "type": "enemy2", "x": 1500, "y": groundY - 20},
                { "type": "enemy2", "x": 2300, "y": groundY - 20},

                { "type": "reward", "x": 700, "y": groundY - 85},
                { "type": "reward", "x": 850, "y": groundY - 85},
                { "type": "reward", "x": 1400, "y": groundY - 10},
                { "type": "reward", "x": 1700, "y": groundY - 10},
                { "type": "reward", "x": 1900, "y": groundY - 85},
                { "type": "reward", "x": 2200, "y": groundY - 85},

                { "type": "end", "x": 3700, "y": groundY - 70},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

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
                obstacleImage.x = -30; //tweaks the image 25 pixels to the left
                obstacleImage.y = -30; //tweaks the image 25 pixels up
                sawBladeHitZone.rotationalVelocity = 3; // yes the bees are intenionally spinning i could have easily commenetd this code out
        }


        function createEnemy(x, y){
            var enemy = game.createGameItem('enemy',25); //creating the game item and storing it in the variable reward 
            //var redSquare = draw.rect(50,50,'red'); //creates rectangle and stores as redSquare
            var dog = draw.bitmap('img/dog.png');
            dog.x = -25;
            dog.y = -25;
            enemy.addChild(dog); // add the dog to the reward game item
            
            enemy.x = x;
            enemy.y = y;

            game.addGameItem(enemy); /// adds reward to the game

            enemy.velocityX = -1; // causes enemy to move 1 pixel to the left on the x position 

            //enemy.rotationalVelocity = 25;

            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-20);
             };
            enemy.onProjectileCollision = function() {
                console.log('The projectile has hit Halle');
                game.changeIntegrity(5);
                game.increaseScore(50);
                enemy.fadeOut();
                
            };
        }

        function createSecondEnemy(x, y){
            var enemy2 = game.createGameItem('enemy2',25); //creating the game item and storing it in the variable reward 
            var pup = draw.bitmap('img/pup.png');
            pup.x = -25;
            pup.y = -25;
            enemy2.addChild(pup); // add the dog to the reward game item
            
            enemy2.x = x;
            enemy2.y = y;

            game.addGameItem(enemy2); /// adds reward to the game

            enemy2.velocityX = -1; // causes enemy to move 1 pixel to the left on the x position 

            //enemy.rotationalVelocity = 25;

            enemy2.onPlayerCollision = function() {
                console.log('The enemy2 has hit Halle');
                game.changeIntegrity(-20);
             };
             enemy2.onProjectileCollision = function() {
                console.log('The projectile has hit Halle');
                game.changeIntegrity(5);
                game.increaseScore(50);
                enemy2.fadeOut();
                
            };
        }
        function createReward(x, y){
            var reward = game.createGameItem('reward',25); //creating the game item and storing it in the variable reward 
            //var blueSquare = draw.rect(50,50,'blue'); //creates rectangle and stores as blueSquare
            var heart = draw.bitmap('img/heart.png');
            heart.x = -20;
            heart.y = -40;
            reward.addChild(heart); // add the blueSquare to the reward game item
            
            reward.x = x;
            reward.y = y;

            game.addGameItem(reward); /// adds reward to the game

            reward.velocityX = -1; // causes reward to move 1 pixel to the left on the x position 

            reward.onPlayerCollision = function() {
                console.log('The reward has hit Halle');
                game.increaseScore(200);
                reward.fadeOut();
             };
             reward.onProjectileCollision = function() {
                console.log('The projectile has hit Halle');
                game.increaseScore(100);
                reward.fadeOut();
                
            };
        }
        function createEnd(x, y){
            var end = game.createGameItem('end',25); //creating the game item and storing it in the variable reward 
            //var blueSquare = draw.rect(50,50,'blue'); //creates rectangle and stores as blueSquare
            var winner = draw.bitmap('img/winner.png');
            winner.x = -250;
            winner.y = -60;
            end.addChild(winner); // add the blueSquare to the end game item
            
            end.x = x;
            end.y = y;

            game.addGameItem(end); /// adds end to the game

            end.velocityX = -1; // causes end to move 1 pixel to the left on the x position 

            end.onPlayerCollision = function() {
                console.log('The end has hit Halle');
                game.changeIntegrity(-1000);
             };
             end.onProjectileCollision = function() {
                console.log('The projectile has hit Halle');
                game.changeIntegrity(-1000);
                
            };
        }
        
        
            for(var i = 0; i < levelData.gameItems.length; i++){
                var gameItem = levelData.gameItems[i];
                
                if(gameItem.type === "sawblade"){
                    createsawBlade(gameItem.x, gameItem.y);
                }
                if(gameItem.type === "enemy"){
                    createEnemy(gameItem.x, gameItem.y);
                }
                if(gameItem.type === "enemy2"){
                    createSecondEnemy(gameItem.x, gameItem.y);
                }
                if(gameItem.type === "reward"){
                    createReward(gameItem.x, gameItem.y);
                }
                if(gameItem.type === "end"){
                    createEnd(gameItem.x, gameItem.y);
                }
            }


        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
