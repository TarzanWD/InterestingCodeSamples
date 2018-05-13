'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}
class Gene {
    constructor (geneName, healthValue) {
        this.gene = geneName
        this.healthVal = [healthValue] 
    }
}
function arrangeGenes(n, genes, health) {
    let arrangedGenes = []
    for (let i = 0; i < n; i++) {
        arrangedGenes.push(new Gene(genes[i], health[i]))
    }
    return arrangedGenes
}
function getUsableGenes(genes, first, last) {
    let usableGenes = []
    for (let i = first; i <= last; i++) {
        usableGenes.push(genes[i])
    }
    return usableGenes
}
function parseD(d, usableGenes) {
    let totalVal = 0
    for(let i = 0; i < d.length; i++) {
        for(let j = 0; j < usableGenes.length; j++) {
            let character = d.substring(i, i+usableGenes[j].gene.length)
            if( usableGenes[j].gene == character) {
                totalVal += Number(usableGenes[j].healthVal[0])
            }
        }
    }
    return totalVal
}
function getValue (d, first, last, genes) {
    let usableGenes = getUsableGenes(genes,first,last);
    let value = parseD(d, usableGenes)
    return value
}
function main() {
    const n = parseInt(readLine(), 10);

    const genes = readLine().split(' ');

    const health = readLine().split(' ').map(healthTemp => parseInt(healthTemp, 10));

    const s = parseInt(readLine(), 10);
    
    const arrangedGenes = arrangeGenes(n,genes, health)
    let values = []
    for (let sItr = 0; sItr < s; sItr++) {
        const firstLastd = readLine().split(' ');

        const first = parseInt(firstLastd[0], 10);

        const last = parseInt(firstLastd[1], 10);

        const d = firstLastd[2];
        
        values.push(getValue(d, first, last, arrangedGenes))
        
    }
    console.log(Math.min(...values), Math.max(...values))
}
