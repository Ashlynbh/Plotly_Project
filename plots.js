// Use D3 fetch to read the JSON file


d3.json("samples.json").then(function(data){
  // for (var i = 0; i < dataset.length; i++)
  var sample_data = data.samples[0].sample_values;
  var otu_ids = data.samples[0].otu_ids;
  var otu_label = data.samples[0].otu_labels;
  var washfrq = data.metadata[0].wfreq;
  var metadata = data.metadata[0];

////BAR CHART 
  var bar_chart = [{

    x: sample_data.slice(0, 10).reverse(),

    y: otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse(),

    text: otu_label.slice(0, 10).reverse(),
    type: 'bar',
    orientation: 'h',
    marker: {
    color: 'rgb(242, 113, 102'
          },
  }]

  var bar_layout = {
    title: "Top 10 Microbial Species in Belly Buttons",
    xaxis: { title: "Bacteria Sample Values" },
    yaxis: { title: "OTU IDs" }
        };


  Plotly.newPlot('bar', bar_chart, bar_layout);

//TABLE
  Object.entries(metadata).forEach(function([key,value]) {
    var table = d3.select("#sample-metadata"); 
    table.append("p").text(`${key}: ${value}`)
  });

///BUBBLE CHART 
  var trace1 = {
    x: otu_ids,
    y: sample_data,
    text: otu_label,
    mode: 'markers',
    marker: {
      color: otu_ids,
      size: sample_data
    }
  };

  var data = [trace1];

  var layout = {
    title: 'Sample Bubble Chart',
    showlegend: false,
    height: 600,
    width: 1200
  };

  Plotly.newPlot('bubble', data, layout);

//WASHING FREQUENCY 
  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: washfrq,
      title: { text: "Belly Button Washing Frequency"},
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        bar: {color: 'white'},
        axis: { range: [null, 9] },
        steps: [
            { range: [0, 3], color: 'rgb(253, 162, 73)' },
            { range: [3, 6], color: 'rgb(242, 113, 102)' },
            { range: [6, 9], color: 'rgb(166, 77, 104)' },
        ],
      }
    }
  ];
  
  var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', data, layout);

});
///NAME SELECTOR
function dropdown() {
  d3.selectAll("#selDataset").on("change", dropdown);
  var dropdown = d3.select("#selDataset")
  d3.json("samples.json").then(function(data){
      var names = data.names;
      names.forEach(name => {
          dropdown.append("option").text(name).property("value", name)
      })
  });
};

dropdown();
