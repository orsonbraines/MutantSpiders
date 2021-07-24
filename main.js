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
	cameraTransform = viewMatrix(player.x, 1500,canvas.width, player.y, 1500.0 * canvas.height / canvas.width, canvas.height);
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
	var c = 100
	for(i = 100; i<400; i++){
		c = c +.3
		ctx.drawImage(river_2, c, i, canvas.width/19, canvas.height/15);
	}
	var c = 100

	spider.draw(ctx);
	player.draw(ctx);
}

setInterval(tickAll, 16);

//setInterval(()=>{player.startRoundhouseKick();},2000);
