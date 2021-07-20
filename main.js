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
	ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(tree_5, 0, 0, canvas.width/9, canvas.height/6);
	ctx.drawImage(tree_5, 700, 20, canvas.width/9, canvas.height/6);
	ctx.drawImage(tree_5, 250, 450, canvas.width/9, canvas.height/6);
	ctx.drawImage(tree_5, 250, 45, canvas.width/9, canvas.height/6);
	ctx.drawImage(tree_5, 0, 500, canvas.width/9, canvas.height/6);
	ctx.drawImage(Rock_1, 0, 200, canvas.width/19, canvas.height/15);

	spider.draw(ctx);
	player.draw(ctx);
}

setInterval(tickAll, 16);

//setInterval(()=>{player.startRoundhouseKick();},2000);
