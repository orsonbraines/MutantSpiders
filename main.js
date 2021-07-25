initGame();

function resizeCanvas(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function initGame(){
	resizeCanvas();
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 2;
	ctx.lineCap = 'round';
	spider = new Spider();
	player = new Player();
	gameLoop();
}

window.addEventListener('resize',e => {
	resizeCanvas();
});

function gameLoop(){
	drawGame();
	requestAnimationFrame(gameLoop);
}

function tickAll(){
	spider.tick();
	player.tick();
}

function drawGame(){
	ctx.resetTransform();
	ctx.clearRect(0,0,canvas.width, canvas.height);
	// cameraTransform = viewMatrix(player.x, 1500,canvas.width, player.y, 1500.0 * canvas.height / canvas.width, canvas.height);
	const gameWidth = 1500;
	const gameHeight = 1500 * (canvas.height / canvas.width);
	const cameraPull = 1.0 / 9.2;
	cameraTransform = viewMatrix(player.x + (mouse.x-canvas.width/2)*(gameWidth/canvas.width)*cameraPull,
			gameWidth,canvas.width,
			player.y + (mouse.y - canvas.height/2)*(gameHeight/canvas.height) * cameraPull, gameHeight, canvas.height);
	cameraTransform.setToCtx(ctx);
	ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(tree_5, 0, 0, canvas.width/9, canvas.height/6);
	ctx.drawImage(tree_5, 700, 20, canvas.width/9, canvas.height/6);
	ctx.drawImage(tree_5, 250, 450, canvas.width/9, canvas.height/6);
	ctx.drawImage(tree_5, 250, 45, canvas.width/9, canvas.height/6);
	ctx.drawImage(tree_5, 0, 500, canvas.width/9, canvas.height/6);
	ctx.drawImage(rock_1, 300, 300, canvas.width/19, canvas.height/15);
	// ctx.drawImage(river_2, 300, 350, canvas.width/24, canvas.height/15);
	// ctx.drawImage(river_2, 300, 360, canvas.width/24, canvas.height/15);
	// ctx.drawImage(river_2, 300, 370, canvas.width/24, canvas.height/15);
	// ctx.drawImage(river_2, 300, 380, canvas.width/24, canvas.height/15);
	// ctx.drawImage(river_2, 300, 390, canvas.width/24, canvas.height/15);
	//ctx.drawImage(river_2, 300, 400, canvas.width/24, canvas.height/15);
	var c = 100;
	for(i = 0; i < gameHeight; ++i){
		c = c + 0.3;
		c = Math.random() * 1500;
		ctx.drawImage(river_2, c, i, canvas.width/19, canvas.height/15);
	}

	spider.draw(ctx);
	player.draw(ctx);
}

setInterval(tickAll, 16);

//setInterval(()=>{player.startRoundhouseKick();},2000);
