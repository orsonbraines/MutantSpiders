class Gene {
	constructor(name, type, dominant, val) {
		this.name = name;
		this.type = type;
		this.dominant = dominant;
		this.val = val;
	}
}

class GenePair {
	constructor(gene1, gene2) {
		this.gene1 = gene1;
		this.gene2 = gene2;
	}

	flip() {
		const tmp = this.gene1;
		this.gene1 = this.gene2;
		this.gene2 = tmp;
	}

	getEffectiveVal() {
		if(gene1.dominant) {
			return gene1.val;
		}
		else if(gene2.dominant) {
			return gene2.val;
		}
		else if(gene1.type === 'real') {
			return (gene1.val + gene2.val) / 2;
		}
		else {
			return gene1.val;
		}
	}
}

class Genes {
	constructor() {
		this.genes = {};
	}
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function getRandomBool() {
	return getRandomInt(2);
}

function createChildGenes(genes1, genes2){
	let newGenes = new Genes();
	for(const geneName in genes1.genes) {
		const useGene11 = getRandomBool;
		const useGene21 = getRandomBool;
		const genePair = new GenePair(useGene11 ? genes1.genes[geneName].gene1 : genes1.genes[geneName].gene2,
			useGene21 ? genes2.genes[geneName].gene1 : genes2.genes[geneName].gene2);
		if(getRandomBool) {
			genePair.flip();
		}
		newGenes.genes[geneName] = genePair;
	}
	return newGenes;
}

function geneTest(){
	let genes1 = new Genes();
	genes1.genes["eyeColour"] = new GenePair(new Gene("eyeColour", "str", true, "brown"),
		new Gene("eyeColour", "str", false, "blue"));
	let genes2 = new Genes();
	genes2.genes["eyeColour"] = new GenePair(new Gene("eyeColour", "str", false, "green"),
		new Gene("eyeColour", "str", false, "blue"));
	console.log(createChildGenes(genes1, genes2));
}

geneTest();
