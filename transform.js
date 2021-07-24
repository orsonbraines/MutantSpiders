class Transform {
	constructor(xx, xy, xt, yx, yy, yt) {
		this.xx = xx;
		this.xy = xy;
		this.xt = xt;
		this.yx = yx;
		this.yy = yy;
		this.yt = yt;
	}

	apply(vec) {
		return [vec[0] * this.xx + vec[1] * this.xy + this.xt, vec[0] * this.yx + vec[1] * this.yy + this.yt];
	}

	setToCtx(ctx) {
		ctx.setTransform(this.xx, this.xy, this.yx, this.yy, this.xt, this.yt);
	}

	applyToCtx(ctx) {
		ctx.transform(this.xx, this.xy, this.yx, this.yy, this.xt, this.yt);
	}

	multiply(s) {
		this.xx *= s;
		this.xy *= s;
		this.xt *= s;
		this.yx *= s;
		this.yy *= s;
		this.yt *= s;
	}

	inverse() {
		let t = new Transform(this.yy, -this.xy, this.xy * this.yt - this.xt * this.yy,
							-this.yx, this.xx, this.xt * this.yx - this.xx * this.yt);
		t.multiply(1.0 / (this.xx * this.yy - this.xy * this.yx));
		return t;
	}
}

function combineTransforms(t1, t2) {
	return new Transform(t1.xx * t2.xx + t1.xy * t2.yx, t1.xx * t2.xy + t1.xy * t2.yy, t1.xx * t2.xt + t1.xy * t2.yt + t1.xt,
						t1.yx * t2.xx + t1.yy * t2.yx, t1.yx * t2.xy + t1.yy * t2.yy, t1.yx * t2.xt + t1.yy * t2.yt + t1.yt);
}

function modelMatrix(pos, theta, flipY = true) {
	let xx = Math.cos(theta);
	let xy = -Math.sin(theta);
	let xt = pos[0];
	let yx = Math.sin(theta);
	let yy = Math.cos(theta);
	if(flipY) {
		yx *= -1;
		yy *= -1;
	}
	yt = pos[1];
	return new Transform(xx,xy,xt,yx,yy,yt);
}

function viewMatrix(cx,gw,sw,cy,gh,sh) {
	const xx = sw / gw;
	const xt = sw / 2.0 - cx * sw / gw;
	const yy = sh / gh;
	const yt = sh / 2.0 - cy * sh / gh;
	return new Transform(xx,0,xt,0,yy,yt);
}
