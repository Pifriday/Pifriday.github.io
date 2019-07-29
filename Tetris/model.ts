// Create playfield
const width: number = +document.getElementById('grid_container').offsetWidth;
const height: number = +document.getElementById('grid_container').offsetHeight;
const tenth: number = width/10;
const grid = d3.select('#grid')
    .attr('width', width)
    .attr('height', height);
const g = grid.append('g');
const xScale = d3.scaleLinear()
    .domain([0, width])
    .range([0, width]);
const yScale = d3.scaleBand()
    .domain(height)
    .range([0, height])
    .padding(0.1);
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);
const next = d3.select('#next_svg');
const nextG = next.append('g');
const count: HTMLElement = document.getElementById('count');

// Function to move blocks
function shift(distance: number, axis: 'x' | 'y'): void {
    const actives: HTMLCollectionOf<any> = document.getElementsByClassName('active');
    if (axis === 'x') {
    for (let i: number=0; i < actives.length; i++) {
        const rect = actives[i];
        const x: number = +rect.x.animVal.value;
        rect.setAttribute('x', String(x + distance));
    }} else if (axis === 'y') {
        for (let i: number=0; i < actives.length; i++) {
            const rect = actives[i];
            const y: number = +rect.y.animVal.value;
            rect.setAttribute('y', String(y - distance));
        }
    }
}

// Prevent block shift if other blocks are in the way
function isSafe(distance: number): boolean {
    const actives = document.getElementsByClassName('active');
    let deads = document.getElementsByClassName('dead');
    for (let i: number=0; i < deads.length; i++) {
        for (let a: number=0; a < 4; a++) {
            if (distance === -tenth && actives[a].x.animVal.value + distance === deads[i].x.animVal.value) {
                for (let y: number=0; y < 4; y++) { 
                    if (actives[y].y.animVal.value === deads[i].y.animVal.value) {return false;} }}
            else if (distance === tenth && actives[a].x.animVal.value + distance === deads[i].x.animVal.value) {
                for (let y: number=0; y < 4; y++) {
                    if (actives[y].y.animVal.value === deads[i].y.animVal.value) {return false;} }}
        }} return true;
}

// Arrow Key Events
document.onkeydown = () => {

    const key = event.keyCode;
    if (Number(key) === 39) {
        // Move Right
        if (isSafe(tenth)) {shift(tenth, 'x')}
    }
    else if (Number(key) === 37) { 
        // Move Left
        if (isSafe(-tenth)) {shift(-tenth, 'x');}
    }
    else if (Number(key) === 40) {
        // Move Down
        const actives = document.getElementsByClassName('active');
        for (let i: number=0; i < actives.length; i++) {
            const rect = actives[i];
            const rect_y: number = +rect.y.animVal.value;
            rect.setAttribute('y', String(rect_y + tenth));
        }
    }
    else if(Number(key) === 38) { 
        // Rotate Block
        const actives: HTMLCollectionOf<any> = document.getElementsByClassName('active');
        class position { max(axis: 'x' | 'y'): number {return this[axis].sort()[3]}; constructor() { this['x'] = []; this['y'] = [];}}
        let before: position = new position();
        let after: position = new position();

        for (let i: number=0; i < actives.length; i++) {
            const rect = actives[i];
            const rect_x: number = +rect.x.animVal.value;
            before['x'].push(rect_x);
            const rect_y: number = +rect.y.animVal.value;
            before['y'].push(rect_y);
            let x: number = rect_y;
            after['x'].push(x);
            let y: number = width - rect_x;
            after['y'].push(y);
            rect.setAttribute('x', x);
            rect.setAttribute('y', y);
        }
    
        // If rotatation changes height to much, bring block back up
        if (after.max('y')-before.max('y') > tenth) {
            for(let i: number=0; i < actives.length; i++) {
                actives[i].setAttribute('y', actives[i].y.animVal.value - (after.max('y')-before.max('y') - tenth));
            }
        }
        // Undo increases in height after rotation
        else if (before.max('y') - after.max('y') > tenth) {
            for(let i: number=0; i < actives.length; i++) {
                actives[i].setAttribute('y', actives[i].y.animVal.value + (before.max('y') - after.max('y')));
            }
        }
        // Move block back to the right if it moves too far left
        if (before.max('x') - after.max('x') > tenth) {
            for(let i: number=0; i < actives.length; i++) {
                actives[i].setAttribute('x', actives[i].x.animVal.value + (before.max('x') - after.max('x') ));
            }
        }
        // Move back to the left
        else if (after.max('x') - before.max('x') > tenth) {
            for(let i: number=0; i < actives.length; i++) {
                actives[i].setAttribute('x', actives[i].x.animVal.value - (after.max('x') - before.max('x') ));
            }
        }
    }
};

// Create and manipulate tetris blocks
class Block {
    // Append blocks to canvas
    static square(x: number, y: number, type: string, svg, block_class: string): void {
        svg.append('rect').attr('width', tenth).attr('height', tenth)
        .attr('class', type + ' ' + block_class)
        .attr('x', x)
        .attr('y', y);
    }
    // Stop blocks from leaving the grid and make them inactive when they touch something
    static collison(): Promise<any> {
        let actives: HTMLCollectionOf<any> = document.getElementsByClassName('active');
        let deads: HTMLCollectionOf<any> = document.getElementsByClassName('dead');
        return new Promise(() => {
            setTimeout(() => {
            for (let i: number = 0; i < actives.length; i++) {
                let rect_x: number = +actives[i].x.animVal.value;
                let rect_y: number = +actives[i].y.animVal.value;

                // Check if block is touching the sides
                if (rect_x < 0) { shift(tenth, 'x')} 
                else if (rect_x >= width) {shift(-tenth, 'x')}

                // Make sure the block doesn't fall below the floor
                if (rect_y > height) {shift(rect_y - height, 'y')}

                // Check if block is touching the bottom
                if (rect_y >= height - tenth) {
                    for (let i: number=0; i < 4; i++) {
                        actives[0].setAttribute('filter', 'brightness(50%)');
                        actives[0].setAttribute('class', actives[0].getAttribute('class').replace('active', 'dead'));
                    }
                }

                // Check if block hit dead blocks
                else if (deads.length > 0) {
                    for (let x: number=0; x < deads.length; x++) {
                        for (let y: number=0; y < deads.length; y++) {
                            if (rect_x === deads[x].x.animVal.value && rect_y === deads[y].y.animVal.value - tenth && x === y) {
                                for (let i: number=0; i < 4; i++) {
                                    actives[0].setAttribute('filter', 'brightness(50%)');
                                    actives[0].setAttribute('class', actives[0].getAttribute('class').replace('active', 'dead'));
                                }
                            }
                        }
                    }
                }
                // Check if a row is complete
                if (deads.length >= 8) {

                    let dict: object = {};
                    for (let i: number=0; i < deads.length; i++) {
                        // Get the number of blocks in each row
                        if (typeof dict[deads[i].y.animVal.value] === 'number') {dict[deads[i].y.animVal.value] += 1}
                        else {dict[deads[i].y.animVal.value] = 1}
                        
                        if (deads[i].y.animVal.value <= 0) {
                            alert(`Game Over. You cleared ${count.innerHTML} rows!`);
                            // Refresh upon losing
                            location.reload();
                        }
                    } 
                    let cleared: boolean = false;
                    var cleared_count: number = 0;
                    for (let [key, value] of Object.entries(dict)) {
                        if (value >= 10) {
                            cleared_count += 1;
                            for (let i: number=deads.length-1; i > -1; i--) {
                                if (deads[i].y.animVal.value == key) {
                                deads[i].remove();
                                cleared = true;
                                }
                            }
                        }
                    }
                    // Increment score and lower rows
                    if (cleared) {
                        count.innerHTML = String(Number(count.innerHTML) + cleared_count);
                        for (let i: number=deads.length-1; i > -1; i--) {
                            const y: number = deads[i].y.animVal.value;
                            deads[i].setAttribute('y', y + tenth*cleared_count)
                        }
                    }
                }
            }this.collison() }, 1);
        })
    }
    // Create gravity
    static gravity(): Promise<any> {
        let actives: HTMLCollectionOf<any> = document.getElementsByClassName('active');
        return new Promise(() => {
            if (actives.length > 0) {
            setTimeout(() => {
                for (let i = 0; i < actives.length; i++) {
                    const rect_y = +actives[i].y.animVal.value;
                    actives[i].setAttribute('y', String(rect_y + tenth))}
                    this.gravity()
            }, 250)}
        })
    }
    // Spawn new blocks when previous one hits the ground
    static spawn(num: number): Promise<any> {
        let actives: HTMLCollectionOf<any> = document.getElementsByClassName('active');
        return new Promise((resolve, reject, index: number=num) => {
            let methods = [[Block.nextO, Block.O], [Block.nextI, Block.I], [Block.nextT, Block.T], [Block.nextJ, Block.J], [Block.nextL, Block.L], [Block.nextS, Block.S], [Block.nextZ, Block.Z]];
            setTimeout(() => {
                
                if (actives.length === 0) {
                    methods[index][1]();
                    const next: number = Math.round(Math.random() * 6);

                    // Delete previous preview block
                    let previews: HTMLCollectionOf<any> = document.getElementsByClassName('preview');
                    if (previews.length > 0) {
                        for (let i: number=0; i < 4; i++) {
                            previews[0].parentElement.removeChild(previews[0]);
                        }}
                    methods[next][0]();
                    this.spawn(next);
                }
                else {this.spawn(index)}
            }, 250)
        })
    }

    // Create blocks
    static create(num: Array<any>, type: string, svg, block_class: 'preview' | 'active'): void {
        this.square(tenth*num[0], tenth*num[1], type, svg, block_class);
        this.square(tenth*num[2], tenth*num[3], type, svg, block_class);
        this.square(tenth*num[4], tenth*num[5], type, svg, block_class);
        this.square(tenth*num[6], tenth*num[7], type, svg, block_class);
    }
    // Create preview blocks
    static nextO(): void {Block.create([3, 1, 2, 1, 3, 2, 2, 2], 'O', nextG, 'preview');}
    static nextI(): void {Block.create([1, 1, 2, 1, 3, 1, 4, 1], 'I', nextG, 'preview');}
    static nextT(): void {Block.create([1, 1, 2, 1, 3, 1, 2, 2], 'T', nextG, 'preview');}
    static nextJ(): void {Block.create([1, 1, 2, 1, 3, 1, 3, 2], 'J', nextG, 'preview');}
    static nextL(): void {Block.create([1, 1, 2, 1, 3, 1, 1, 2], 'L', nextG, 'preview');}
    static nextS(): void {Block.create([1, 2, 2, 2, 2, 1, 3, 1], 'S', nextG, 'preview');}
    static nextZ(): void {Block.create([1, 1, 2, 1, 2, 2, 3, 2], 'Z', nextG, 'preview');}

    // Define block types
    static O(): void {Block.create([4, -1, 4, 0, 5, -1, 5, 0], 'O', g, 'active');}
    static I(): void {Block.create([3, -1, 4, -1, 5, -1, 6, -1], 'I', g, 'active');}
    static T(): void {Block.create([4, -1, 5, -1, 5, 0, 6, -1], 'T', g, 'active');}
    static J(): void {Block.create([3, -1, 4, -1, 5, -1, 5, 0], 'J', g, 'active');}
    static L(): void {Block.create([3, -1, 3, 0, 4, -1, 5, -1], 'L', g, 'active');}
    static S(): void {Block.create([4, 0, 3, 0, 4, -1, 5, -1], 'S', g, 'active');}
    static Z(): void {Block.create([3, -1, 4, -1, 4, 0, 5, 0], 'Z', g, 'active');}
}

// Initial Spawn
Block.spawn( Math.floor(Math.random() * 6 ));
// Start gravity
setTimeout(() => {Block.gravity()}, 250)
// Begin collision detection
Block.collison();

