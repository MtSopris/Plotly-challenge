var sampleData = './samples.json';


data = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16] }];

Plotly.newPlot("bar", data);



d3.json(sampleData).then(fullfilled=>{
    
    samples=fullfilled['samples']
    // console.log(samples)
    // ids=fullfilled['names']
    // id10 = ids.splice(0,10)
    // console.log(id10)
    
    ids1=fullfilled['samples'][0]
    console.log(ids1)

    d3.selectAll("#selDataset").on("change", updatePlotly);

    function updatePlotly() {
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");
        //  console.log(dataset)//returns value selected in dropdown
        
        //  console.log(ids1.id)
        if (dataset === ids1.id){
            // console.log(ids1.id)//+test
            sample_values=ids1['sample_values']
            sv10= sample_values.splice(0,10)
            sv10=sv10.reverse()
            // console.log(sv10)
            otu=ids1['otu_ids']
            // console.log(otu)//+test
            otu10= otu.splice(0,10).map(x=>`OTU ${x}`)
            otu10=otu10.reverse()
            // console.log(otu10)
            otu_labels=ids1['otu_labels']
            // console.log(otu_labels)//+test
            labels10= otu_labels.splice(0,10)
            otuL10=labels10.reverse()
            console.log(labels10)
        }
        // console.log(sv10)
        // console.log(otu10)
       var trace1 = [{
                type: 'bar',
                x: sv10,
                y: otu10,
                orientation:'h',
                text: labels10
       }]

       var barLayout = {
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", trace1, barLayout);
    };

});

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

