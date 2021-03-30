var sampleData = './samples.json';


// data = [{
//     x: [1, 2, 3, 4, 5],
//     y: [1, 2, 4, 8, 16] }];

// Plotly.newPlot("bar", data);



// d3.json(sampleData).then(fullfilled=>{
    
//     samples=fullfilled['samples']
//     // console.log(samples)

    
//     ids1=fullfilled['samples'][0]
//     console.log(ids1)
// Use D3 to select the dropdown menu
var dropdownMenu = d3.select("#selDataset");

d3.json("samples.json").then((importedData) => {
    var subject_ids = importedData.names;
  
    console.log("Subject_ids")
    console.log(subject_ids)
  
    subject_ids.forEach((id) => {
        dropdownMenu
        .append("option")
        .property("value", id)
        .text(id);
    });
  
    // index.html is loaded with the dashboard of 940 for the initial page load
    optionChanged(subject_ids[0]);
  });
  

function optionChanged(id_selected) {
    console.log('id_selected')
    console.log(id_selected)
    
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var results = samples.filter(sampleObj => sampleObj.id == id_selected);
        
        result= results[0]
        console.log('result')
        console.log(result)

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var y_label = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        console.log("y_label: ");
        console.log(y_label);

        console.log("sample_valuese: ");
        console.log(sample_values.slice(0, 10).reverse());

        var bar_trace = {
        y: y_label,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
        };

        var data = [bar_trace];

        var bar_layout = {
        title: "Top 10 OTUs",
        margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", data, bar_layout);

    });
};




    // //  console.log(ids1.id)
    // if (dataset === ids1.id){
    //     // console.log(ids1.id)//+test
    //     sample_values=ids1['sample_values']
    //     sv10= sample_values.splice(0,10)
    //     sv10=sv10.reverse()
    //     // console.log(sv10)
    //     otu=ids1['otu_ids']
    //     // console.log(otu)//+test
    //     otu10= otu.splice(0,10).map(x=>`OTU ${x}`)
    //     otu10=otu10.reverse()
    //     // console.log(otu10)
    //     otu_labels=ids1['otu_labels']
    //     // console.log(otu_labels)//+test
    //     labels10= otu_labels.splice(0,10)
    //     otuL10=labels10.reverse()
    //     console.log(labels10)
    // }
    // // console.log(sv10)
    // // console.log(otu10)
    // var trace1 = [{
    //         type: 'bar',
    //         x: sv10,
    //         y: otu10,
    //         orientation:'h',
    //         text: labels10
    // }]

    // var barLayout = {
    //     margin: { t: 30, l: 150 }
    // };

    // Plotly.newPlot("bar", trace1, barLayout);
// };

// });

// //test code for slpicing to ten values
// sample_values=fullfilled['samples'][0]['sample_values']
// // console.log(sample_values)
// sv10= sample_values.splice(0,10)
// console.log(sv10)
// otu=fullfilled['samples'][0]['otu_ids']
// // console.log(otu)//+test
// otu10= otu.splice(0,10)
// console.log(otu10)
// otu_labels=fullfilled['samples'][0]['otu_labels']
// // console.log(otu_labels)//+test
// otuL10= otu_labels.splice(0,10)
// console.log(otuL10)

// var trace1 = {
//     type: 'bar',
//     'x': data.sample_values,
//     'y': data.otu_ids,
// };

