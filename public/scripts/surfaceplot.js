// return: datapoints for random surface
function getRandSurfaceData() {
    var arr = [];
    for(let i=0;i<10;i++) {
        arr.push(Array(10).fill().map(() => Math.random()));
    }
    return arr;
}

// create surface var
var surface = {
    z: getRandSurfaceData(),
    type: 'surface'
};

function getSurface() {
    return surface
}

function getScaleLayout() {
    var layout = {
        scene: {
            xaxis: {range: [0, 5]},
            yaxis: {range: [0, 5]},
            zaxis: {range: [0, 2]},
            aspectratio: { x: 1, y: 1, z: 1 },
            aspectmode: 'manual',
            dragmode: 'turntable'
        }
    }
    return layout
}

// new stuff

var x = [1, 2, 3];
var y = [1, 2, 3];
var z = [1, 2, 3];

var point = {
    x: [x[0]],
    y: [y[0]],
    z: [z[0]],
    type: 'scatter3d',
    marker: {color: 'lime'}
};

function getNewData() {
    var data = [surface, point];
    return data;
}

function getLayout() {
    var layout = {
        scene: {
            xaxis: {range: [0, 5]},
            yaxis: {range: [0, 5]},
            zaxis: {range: [0, 5]},
        },
        updatemenus: [{
            type: 'buttons',
            showactive: false,
            buttons: [{
                label: 'Play',
                method: 'animate',
                args: [null, {
                    fromcurrent: true,
                    transition: {duration: 300},
                    frame: {duration: 300, redraw: false}
                }]
            }, {
                label: 'Pause',
                method: 'animate',
                args: [[null], {
                    mode: 'immediate',
                    transition: {duration: 0},
                    frame: {duration: 0, redraw: false}
                }]
            }]
        }],
        sliders: [{
            currentvalue: {
                visible: true,
                prefix: 'Frame:',
                xanchor: 'right',
                font: {size: 20, color: '#666'}
            },
            steps: [{
                method: 'animate',
                args: [['frame'], {
                    mode: 'immediate',
                    transition: {duration: 300},
                    frame: {duration: 300, redraw: false}
                }],
                label: '1'
            }]
        }]
    };
    return layout
}

//console.log(getData());
