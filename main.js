initGame();

function resizeCanvas(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function initGame(){
	resizeCanvas();
	frames = 0;
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
	const delta = [mouse.x - spider.x, mouse.y - spider.y];
	deltaR = Math.sqrt(delta[0] * delta[0] + delta[1] * delta[1]);
	spider.theta = Math.atan2(-delta[1], delta[0]) - Math.PI / 2;
	//console.log(delta[0],delta[1],spider.theta);
	const v = 5;
	if(deltaR >= v) {
		spider.x += delta[0] * v / deltaR;
		spider.y += delta[1] * v / deltaR;
	}
	drawGame();
	frames++;
	requestAnimationFrame(gameLoop);
}
function drawGame(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	if(frames % 10 == 0){
		spider.tick();
	}
	player.tick();
	spider.draw(ctx);
	player.draw(ctx);
}
