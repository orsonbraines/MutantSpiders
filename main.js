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
function drawGame(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	spider.tick();
	player.tick();
	spider.draw(ctx);
	player.draw(ctx);
}
setInterval(()=>{player.startRoundhouseKick();},2000);
