// Create playfield
var width = +document.getElementById('grid_container').offsetWidth;
var height = +document.getElementById('grid_container').offsetHeight;
var tenth = width / 10;
var grid = d3.select('#grid')
    .attr('width', width)
    .attr('height', height);
var g = grid.append('g');
var xScale = d3.scaleLinear()
    .domain([0, width])
    .range([0, width]);
var yScale = d3.scaleBand()
    .domain(height)
    .range([0, height])
    .padding(0.1);
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);
var next = d3.select('#next_svg');
var nextG = next.append('g');
var count = document.getElementById('count');
// Function to move blocks
function shift(distance, axis) {
    var actives = document.getElementsByClassName('active');
    if (axis === 'x') {
        for (var i = 0; i < actives.length; i++) {
            var rect = actives[i];
            var x = +rect.x.animVal.value;
            rect.setAttribute('x', String(x + distance));
        }
    }
    else if (axis === 'y') {
        for (var i = 0; i < actives.length; i++) {
            var rect = actives[i];
            var y = +rect.y.animVal.value;
            rect.setAttribute('y', String(y - distance));
        }
    }
}
// Prevent block shift if other blocks are in the way
function isSafe(distance) {
    var actives = document.getElementsByClassName('active');
    var deads = document.getElementsByClassName('dead');
    for (var i = 0; i < deads.length; i++) {
        for (var a = 0; a < 4; a++) {
            if (distance === -tenth && actives[a].x.animVal.value + distance === deads[i].x.animVal.value) {
                for (var y = 0; y < 4; y++) {
                    if (actives[y].y.animVal.value === deads[i].y.animVal.value) {
                        return false;
                    }
                }
            }
            else if (distance === tenth && actives[a].x.animVal.value + distance === deads[i].x.animVal.value) {
                for (var y = 0; y < 4; y++) {
                    if (actives[y].y.animVal.value === deads[i].y.animVal.value) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}
// Arrow Key Events
document.onkeydown = function () {
    var key = event.keyCode;
    if (Number(key) === 39) {
        // Move Right
        if (isSafe(tenth)) {
            shift(tenth, 'x');
        }
    }
    else if (Number(key) === 37) {
        // Move Left
        if (isSafe(-tenth)) {
            shift(-tenth, 'x');
        }
    }
    else if (Number(key) === 40) {
        // Move Down
        var actives = document.getElementsByClassName('active');
        for (var i = 0; i < actives.length; i++) {
            var rect = actives[i];
            var rect_y = +rect.y.animVal.value;
            rect.setAttribute('y', String(rect_y + tenth));
        }
    }
    else if (Number(key) === 38) {
        // Rotate Block
        var actives = document.getElementsByClassName('active');
        var position = /** @class */ (function () {
            function position() {
                this['x'] = [];
                this['y'] = [];
            }
            position.prototype.max = function (axis) { return this[axis].sort()[3]; };
            ;
            return position;
        }());
        var before = new position();
        var after = new position();
        for (var i = 0; i < actives.length; i++) {
            var rect = actives[i];
            var rect_x = +rect.x.animVal.value;
            before['x'].push(rect_x);
            var rect_y = +rect.y.animVal.value;
            before['y'].push(rect_y);
            var x = rect_y;
            after['x'].push(x);
            var y = width - rect_x;
            after['y'].push(y);
            rect.setAttribute('x', x);
            rect.setAttribute('y', y);
        }
        // If rotatation changes height to much, bring block back up
        if (after.max('y') - before.max('y') > tenth) {
            for (var i = 0; i < actives.length; i++) {
                actives[i].setAttribute('y', actives[i].y.animVal.value - (after.max('y') - before.max('y') - tenth));
            }
        }
        // Undo increases in height after rotation
        else if (before.max('y') - after.max('y') > tenth) {
            for (var i = 0; i < actives.length; i++) {
                actives[i].setAttribute('y', actives[i].y.animVal.value + (before.max('y') - after.max('y')));
            }
        }
        // Move block back to the right if it moves too far left
        if (before.max('x') - after.max('x') > tenth) {
            for (var i = 0; i < actives.length; i++) {
                actives[i].setAttribute('x', actives[i].x.animVal.value + (before.max('x') - after.max('x')));
            }
        }
        // Move back to the left
        else if (after.max('x') - before.max('x') > tenth) {
            for (var i = 0; i < actives.length; i++) {
                actives[i].setAttribute('x', actives[i].x.animVal.value - (after.max('x') - before.max('x')));
            }
        }
    }
};
// Create and manipulate tetris blocks
var Block = /** @class */ (function () {
    function Block() {
    }
    // Append blocks to canvas
    Block.square = function (x, y, type, svg, block_class) {
        svg.append('rect').attr('width', tenth).attr('height', tenth)
            .attr('class', type + ' ' + block_class)
            .attr('x', x)
            .attr('y', y);
    };
    // Stop blocks from leaving the grid and make them inactive when they touch something
    Block.collison = function () {
        var _this = this;
        var actives = document.getElementsByClassName('active');
        var deads = document.getElementsByClassName('dead');
        return new Promise(function () {
            setTimeout(function () {
                for (var i = 0; i < actives.length; i++) {
                    var rect_x = +actives[i].x.animVal.value;
                    var rect_y = +actives[i].y.animVal.value;
                    // Check if block is touching the sides
                    if (rect_x < 0) {
                        shift(tenth, 'x');
                    }
                    else if (rect_x >= width) {
                        shift(-tenth, 'x');
                    }
                    // Make sure the block doesn't fall below the floor
                    if (rect_y > height) {
                        shift(rect_y - height, 'y');
                    }
                    // Check if block is touching the bottom
                    if (rect_y >= height - tenth) {
                        for (var i_1 = 0; i_1 < 4; i_1++) {
                            actives[0].setAttribute('filter', 'brightness(50%)');
                            actives[0].setAttribute('class', actives[0].getAttribute('class').replace('active', 'dead'));
                        }
                    }
                    // Check if block hit dead blocks
                    else if (deads.length > 0) {
                        for (var x = 0; x < deads.length; x++) {
                            for (var y = 0; y < deads.length; y++) {
                                if (rect_x === deads[x].x.animVal.value && rect_y === deads[y].y.animVal.value - tenth && x === y) {
                                    for (var i_2 = 0; i_2 < 4; i_2++) {
                                        actives[0].setAttribute('filter', 'brightness(50%)');
                                        actives[0].setAttribute('class', actives[0].getAttribute('class').replace('active', 'dead'));
                                    }
                                }
                            }
                        }
                    }
                    // Check if a row is complete
                    if (deads.length >= 8) {
                        var dict = {};
                        for (var i_3 = 0; i_3 < deads.length; i_3++) {
                            // Get the number of blocks in each row
                            if (typeof dict[deads[i_3].y.animVal.value] === 'number') {
                                dict[deads[i_3].y.animVal.value] += 1;
                            }
                            else {
                                dict[deads[i_3].y.animVal.value] = 1;
                            }
                            if (deads[i_3].y.animVal.value <= 0) {
                                alert("Game Over. You cleared " + count.innerHTML + " rows!");
                                // Refresh upon losing
                                location.reload();
                            }
                        }
                        var cleared = false;
                        var cleared_count = 0;
                        for (var _i = 0, _a = Object.entries(dict); _i < _a.length; _i++) {
                            var _b = _a[_i], key = _b[0], value = _b[1];
                            if (value >= 10) {
                                cleared_count += 1;
                                for (var i_4 = deads.length - 1; i_4 > -1; i_4--) {
                                    if (deads[i_4].y.animVal.value == key) {
                                        deads[i_4].remove();
                                        cleared = true;
                                    }
                                }
                            }
                        }
                        // Increment score and lower rows
                        if (cleared) {
                            count.innerHTML = String(Number(count.innerHTML) + cleared_count);
                            for (var i_5 = deads.length - 1; i_5 > -1; i_5--) {
                                var y = deads[i_5].y.animVal.value;
                                deads[i_5].setAttribute('y', y + tenth * cleared_count);
                            }
                        }
                    }
                }
                _this.collison();
            }, 1);
        });
    };
    // Create gravity
    Block.gravity = function () {
        var _this = this;
        var actives = document.getElementsByClassName('active');
        return new Promise(function () {
            if (actives.length > 0) {
                setTimeout(function () {
                    for (var i = 0; i < actives.length; i++) {
                        var rect_y = +actives[i].y.animVal.value;
                        actives[i].setAttribute('y', String(rect_y + tenth));
                    }
                    _this.gravity();
                }, 250);
            }
        });
    };
    // Spawn new blocks when previous one hits the ground
    Block.spawn = function (num) {
        var _this = this;
        var actives = document.getElementsByClassName('active');
        return new Promise(function (resolve, reject, index) {
            if (index === void 0) { index = num; }
            var methods = [[Block.nextO, Block.O], [Block.nextI, Block.I], [Block.nextT, Block.T], [Block.nextJ, Block.J], [Block.nextL, Block.L], [Block.nextS, Block.S], [Block.nextZ, Block.Z]];
            setTimeout(function () {
                if (actives.length === 0) {
                    methods[index][1]();
                    var next_1 = Math.round(Math.random() * 6);
                    // Delete previous preview block
                    var previews = document.getElementsByClassName('preview');
                    if (previews.length > 0) {
                        for (var i = 0; i < 4; i++) {
                            previews[0].parentElement.removeChild(previews[0]);
                        }
                    }
                    methods[next_1][0]();
                    _this.spawn(next_1);
                }
                else {
                    _this.spawn(index);
                }
            }, 250);
        });
    };
    // Create blocks
    Block.create = function (num, type, svg, block_class) {
        this.square(tenth * num[0], tenth * num[1], type, svg, block_class);
        this.square(tenth * num[2], tenth * num[3], type, svg, block_class);
        this.square(tenth * num[4], tenth * num[5], type, svg, block_class);
        this.square(tenth * num[6], tenth * num[7], type, svg, block_class);
    };
    // Create preview blocks
    Block.nextO = function () { Block.create([3, 1, 2, 1, 3, 2, 2, 2], 'O', nextG, 'preview'); };
    Block.nextI = function () { Block.create([1, 1, 2, 1, 3, 1, 4, 1], 'I', nextG, 'preview'); };
    Block.nextT = function () { Block.create([1, 1, 2, 1, 3, 1, 2, 2], 'T', nextG, 'preview'); };
    Block.nextJ = function () { Block.create([1, 1, 2, 1, 3, 1, 3, 2], 'J', nextG, 'preview'); };
    Block.nextL = function () { Block.create([1, 1, 2, 1, 3, 1, 1, 2], 'L', nextG, 'preview'); };
    Block.nextS = function () { Block.create([1, 2, 2, 2, 2, 1, 3, 1], 'S', nextG, 'preview'); };
    Block.nextZ = function () { Block.create([1, 1, 2, 1, 2, 2, 3, 2], 'Z', nextG, 'preview'); };
    // Define block types
    Block.O = function () { Block.create([4, -1, 4, 0, 5, -1, 5, 0], 'O', g, 'active'); };
    Block.I = function () { Block.create([3, -1, 4, -1, 5, -1, 6, -1], 'I', g, 'active'); };
    Block.T = function () { Block.create([4, -1, 5, -1, 5, 0, 6, -1], 'T', g, 'active'); };
    Block.J = function () { Block.create([3, -1, 4, -1, 5, -1, 5, 0], 'J', g, 'active'); };
    Block.L = function () { Block.create([3, -1, 3, 0, 4, -1, 5, -1], 'L', g, 'active'); };
    Block.S = function () { Block.create([4, 0, 3, 0, 4, -1, 5, -1], 'S', g, 'active'); };
    Block.Z = function () { Block.create([3, -1, 4, -1, 4, 0, 5, 0], 'Z', g, 'active'); };
    return Block;
}());
// Initial Spawn
Block.spawn(Math.floor(Math.random() * 6));
// Start gravity
setTimeout(function () { Block.gravity(); }, 250);
// Begin collision detection
Block.collison();
