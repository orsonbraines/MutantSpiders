function normalize(vec){
	if(vec[0] === 0 && vec[1] === 0) return vec;
	let dst = dist(vec);
	return [
		vec[0]/dst,
		vec[1]/dst
	];
}

function dist(vec){
	if(vec[0] === 0 && vec[1] === 0) return 0;
	return Math.sqrt(distSq(vec));
}

function distSq(vec){
	if(vec[0] === 0 && vec[1] === 0) return 0;
	return vec[0]*vec[0]+vec[1]*vec[1];
}

function mult(vec,c){
	let nv = [vec[0],vec[1]];
	for(let i = 1; i < arguments.length; i++){
		nv[0] *= arguments[i];
		nv[1] *= arguments[i];
	}
	return nv;
}

function add(vec,vec2){
	return [vec[0]*vec2[0],vec[1]*vec2[1]];
}
