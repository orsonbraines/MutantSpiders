function normalize(arr){
	if(arr[0] === 0 && arr[1] === 0) return arr;

	let xx = arr[0]*arr[0];
	let yy = arr[1]*arr[1];
	let dst = Math.sqrt(xx+yy);
	return [
		arr[0]/dst,
		arr[1]/dst
	];
}
