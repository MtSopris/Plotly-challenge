var sampleData = './samples.json';


d3.json(sampleData).then(fullfilled=>{
    var samples_10=fullfilled['samples']['sample_values'].map(one_sample=>one_sample(0,10))
    var otu_10 = fullfilled['samples']['otu_ids'].map(one_otu=>one_otu(0,10))

    trace={
        type:'bar',
        'x':samples_10,
        'y':otu_10,
        orientation: 'h'
    }
    Plotly.newPlot('bar', trace);
});



// var trace1 = {
//     type: 'bar',
//     'x': data.sample_values,
//     'y': data.otu_ids,
// };




