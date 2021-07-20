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
	ctx.drawImage(tree_4, 0, 0, canvas.width/6.5, canvas.height/5);
	ctx.drawImage(tree_4, 250, 30, canvas.width/6.5, canvas.height/5);
	spider.draw(ctx);
	player.draw(ctx);
}

setInterval(tickAll, 16);

//setInterval(()=>{player.startRoundhouseKick();},2000);
