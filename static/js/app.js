var sampleData = './samples.json';



// Use D3 to select the dropdown menu
var dropdownMenu = d3.select("#selDataset");

// read in file w/d3 pause to load (then) loop through and get a list of the subject number id
d3.json("samples.json").then((importedData) => {
    var subjects = importedData.names;
  
    console.log("Subjects")
    console.log(subjects)
    
    // add list to drop down menu
    subjects.forEach((id) => {
        dropdownMenu
        .append("option")
        .property("value", id)
        .text(id);
    });
  
    // displays first item in the list in html on loading page
    optionChanged(subjects[0]);
  });
  
// us function call in the html to append page for the selection in the dropdown
function optionChanged(id_selected) {
    console.log('id_selected')
    console.log(id_selected)
    
    //Barchart
    //read in data from the samples key
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        //filter data to return the data seleceted in the dropdown menu under the samples key
        var results = samples.filter(sampleObj => sampleObj.id == id_selected);
        
        //this removes the [] so you can access the dict
        result= results[0]
        console.log('result')
        console.log(result)
        //assign each key to a variable
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        // set the ylables and convert them into string while adding otu in front of the subject id# and grab only the first 10 in the list and reverse the order
        var y_label = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        console.log("y_label: ");
        console.log(y_label);
        //grab the first ten in the sample_values key and reverse the order
        console.log("sample_values: ");
        console.log(sample_values.slice(0, 10).reverse());
        //make plotly trace for ploting a horizantal bar chart
        var bar_trace = {
        y: y_label,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
        };
        // assign trace to variable
        var data = [bar_trace];
        //add title and margins to the layout
        var bar_layout = {
        title: "Top 10 OTUs",
        margin: { t: 30, l: 150 }
        };
        //plot
        Plotly.newPlot("bar", data, bar_layout);

        // Bubble Graph
        var trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,
            marker: {
              size: sample_values,
            //   sizeref = 1,
              color:otu_ids,
            }
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'OTU ID',
            xanchor: 'bottom',
            showlegend: false,
            height: 500,
            width: 1200
          };
          
        Plotly.newPlot('bubble', data, layout);
        
        
    });

    var m_loc_html = d3.select("#sample-metadata");
    //demograph info
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        //filter data to return the data seleceted in the dropdown menu under the samples key
        var result_meta = metadata.filter(sampleObj => sampleObj.id == id_selected); 
            
        meta_result= metadata[0]
        
        console.log('meta_result')
        console.log(meta_result)
        // add metadata dict to html
        Object.entries(meta_result).map(([key,value]) =>{
            m_loc_html.append('p').text(`${key}: ${value}`)

        });
        // meta_result
        //     .append("option")
        //     .property("value", met)
        //     .text(met);
        
        // 
    });  
};


