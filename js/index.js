let barCountCtx = document.getElementById("block-count-chart").getContext("2d");
let barCountChart = new Chart(barCountCtx, {
  type: "bar",
  data: {
    labels: ["A", "B", "C", "D", "F"],
    datasets: [
      {
        label: "# of Blocks",
        backgroundColor: [
          colorPalette[4],
          colorPalette[3],
          colorPalette[2],
          colorPalette[1],
          colorPalette[0]
        ],
        borderColor: [
          colorPalette[4],
          colorPalette[3],
          colorPalette[2],
          colorPalette[1],
          colorPalette[0]
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    maintainAspectRatio: false,
    labels: {
      fontColor: "#ffffff"
    },
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "# Census Blocks"
          },
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true,
            fontColor: "#fff",
            max: 2500,
            min: 0,
            stepSize: 500,
            drawTicks: false
          }
        }
      ],
      xAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						fontColor: "#fff",
						fontSize: 10,
						lineWidth: 0
					}
				}]
    }
  }
});

let barPopCtx = document.getElementById("pop-sum-chart").getContext("2d");
let barPopChart = new Chart(barPopCtx, {
  type: "bar",
  data: {
    labels: ["A", "B", "C", "D", "F"],
    datasets: [
      {
        label: "Population",
        backgroundColor: [
          colorPalette[4],
          colorPalette[3],
          colorPalette[2],
          colorPalette[1],
          colorPalette[0]
        ],
        borderColor: [
          colorPalette[4],
          colorPalette[3],
          colorPalette[2],
          colorPalette[1],
          colorPalette[0]
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    maintainAspectRatio: false,
    labels: {
      fontColor: "#ffffff"
    },
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Population",
            fontColor: "#fff"
          },
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true,
            fontColor: "#fff",
            max: 200000,
            min: 0,
            stepSize: 50000,
            drawTicks: false
          }
        }
      ],
      xAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						fontColor: "#fff",
						fontSize: 10,
						lineWidth: 0
					}
				}]
    }
  }
});

let donutPopCtx = document.getElementById("pop-donut-chart").getContext("2d");
let donutPopChart = new Chart(donutPopCtx, {
  type: "doughnut",
  data: {
    labels: ["A", "B", "C", "D", "F"],
    datasets: [
      {
        label: "Population",
        backgroundColor: [
          colorPalette[4],
          colorPalette[3],
          colorPalette[2],
          colorPalette[1],
          colorPalette[0]
        ],
        borderColor: [
          colorPalette[4],
          colorPalette[3],
          colorPalette[2],
          colorPalette[1],
          colorPalette[0]
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    maintainAspectRatio: false,
    labels: {
      fontColor: "#ffffff"
    },
    legend: {
      display: false
    }
  }
});

require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/layers/VectorTileLayer",
  "esri/widgets/Legend",
  "esri/widgets/Expand",
  "esri/core/watchUtils",
  "dojo/query",
  "dojo/aspect",
  "dojo/on",
  "dojo/domReady!"
], function(
  Map,
  MapView,
  FeatureLayer,
  VectorTileLayer,
  Legend,
  Expand,
  watchUtils,
  query,
  aspect,
  on
) {
  const map = new Map();

  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: mapConfig.zoom,
    center: mapConfig.center,
    highlightOptions: {
      fillOpacity: 0,
      color: [50, 50, 50]
    },
    popup: {
      dockEnabled: true,
      dockOptions: {
        position: "top-right",
        breakpoint: false
      }
    },
    constraints: {
      minScale: 577791
    }
  });

  //---------------------------------
  // CREATE LAYERS
  //---------------------------------

  // Basemap
  //// Vector Tile Layer
  let baseLayer = new VectorTileLayer({
    url: layerUrls.base
  });
  map.add(baseLayer);

  // Census Blocks
  //// Renderer
  const blockRenderer = {
    type: "class-breaks",
    field: "los_closest_park_dist",
    defaultSymbol: {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "black",
      style: "backward-diagonal",
      outline: {
        width: 0.5,
        color: [50, 50, 50, 0.6]
      }
    },
    defaultLabel: "no data",
    classBreakInfos: classBreakInfos.quantile
  };

  //// Feature Layer
  let blockLayer = new FeatureLayer({
    url: layerUrls.blocks,
    title: "Raleigh ETJ Census Block",
    outFields: [
      "geoid10",
      "los_closest_park_dist",
      "la_closest_park_dist",
      "pop_2018"
    ],
    minScale: 577791,
    renderer: blockRenderer,
    popupTemplate: {
      title: "Census Block {geoid10}",
      content: [
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "expression/los-mileage-arcade"
            },
            {
              fieldName: "expression/la-mileage-arcade"
            }
          ]
        }
      ],
      expressionInfos: arcadeExpressionInfos
    }
  });
  map.add(blockLayer);

  //// Post-Initialization Actions
  blockLayer
    // Zoom to extent of Block Layer
    .when(() => {
      return blockLayer.queryExtent();
    })
    .then(response => {
      view.goTo(response.extent);
    })
    // Update Charts
    .then(() => {
      let queryUrls = [];
      let starterBins = [
        { min: 0, max: 0.34808452120741512 },
        { min: 0.34808452120741513, max: 0.69358269292405539 },
        { min: 0.6935826929240554, max: 1.073097773703062 },
        { min: 1.073097773703063, max: 1.5664402798982171 },
        { min: 1.5664402798982171, max: 10000 }
      ];
      starterBins.forEach((bin, index) => {
        queryUrls.push(
          `${layerUrls.blocks}/query?f=json&where=${
            blockRenderer.field
          }+between+${bin.min}+and+${
            bin.max
          }&returnGeometry=false&outStatistics=[{"statisticType":"count","onStatisticField":"OBJECTID","outStatisticFieldName":"count"},{"statisticType":"sum","onStatisticField":"pop_2018","outStatisticFieldName":"pop"}]`
        );
      });
      queryBlockStatistics(queryUrls).then(results => {
        console.log(results);
        updateChartValues(barCountChart, results.map(x => x.count));
        updateChartValues(barPopChart, results.map(x => x.pop));
        updateChartValues(donutPopChart, results.map(x => x.pop));
      });
    });

  // Raleigh Parks
  //// Feature Layer
  let ralParksLayer = new FeatureLayer({
    url: layerUrls.ralParks,
    outFields: ["PARKID", "NAME", "LEVEL_OF_SERVICE", "LAND_ACQUISITION"],
    definitionExpression: "LEVEL_OF_SERVICE=1",
    popupTemplate: {
      title: "{NAME}"
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: "black",
        style: "diagonal-cross",
        outline: {
          width: 0
        }
      }
    }
  });
  map.add(ralParksLayer);

  // County/State Parks
  //// Feature Layer
  let otherParksLayer = new FeatureLayer({
    url: layerUrls.otherParks,
    outFields: ["PARKID", "NAME"],
    popupTemplate: {
      title: "{NAME}"
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: "black",
        style: "diagonal-cross",
        outline: {
          width: 0
        }
      }
    }
  });
  map.add(otherParksLayer);

  // Labels
  ///// Vector Tile Layer
  let labelsLayer = new VectorTileLayer({
    url: layerUrls.labels
  });
  map.add(labelsLayer);

  //------------------------------
  // ADD LEGEND
  //------------------------------

  // Legend
  const legend = new Legend({
    view: view,
    layerInfos: [
      {
        layer: blockLayer
      }
    ],
    container: document.createElement("div")
  });

  // Remove field name from legend
  // See: https://community.esri.com/thread/210905-changingremoving-legend-headings-in-javascript-api-4x
  watchUtils.when(legend, "container", () => {
    aspect.after(legend, "scheduleRender", response => {
      if (query(".esri-legend__layer-caption")[0]) {
        query(".esri-legend__layer-caption")[0].style.display = "none";
      }
    });
  });

  // Add Legend to Expand widget
  let legendExpand = new Expand({
    view: view,
    content: legend,
    expanded: true
  });
  view.ui.add(legendExpand, "bottom-left");

  //------------------------------
  // UPDATE MAP
  //--------------------------------

  // Form Elements
  const analysisTypeOptions = document.getElementsByName("analysis-type");
  const binningOptions = document.getElementsByName("binning-method");


  //==============================================
  // Test out adding event listeners to inputs.
  // Perhaps this will make responding to changes
  // a little bit easier
  //==============================================

  for (let i = 0; i < analysisTypeOptions.length; i++) {
    analysisTypeOptions[i].addEventListener('change', () => {
      // Get the data attributes for the checked value from both input forms
      let checkedAnalysisTypeData = getCheckedOptionData(analysisTypeOptions)
      let checkedBinningData = getCheckedOptionData(binningOptions)
      // Update Blocks Layer
      updateBlockRenderer(blockLayer, blockRenderer, checkedAnalysisTypeData.analysisField, classBreakInfos[checkedBinningData.binningMethod])
      // Update Parks Layer
      ralParksLayer.definitionExpression = `${checkedAnalysisTypeData.analysisType}=1`

      
      let classBreakBins = classBreakInfos[checkedBinningData.binningMethod].map(bin => {
        return {
          min: bin.minValue,
          max: bin.maxValue
        };
      });

      console.log(classBreakBins)

      // Get Chart Statistics
      let queryUrlStrings = [];
      classBreakBins.forEach((bin) => {
        queryUrlStrings.push(
          `${layerUrls.blocks}/query?f=json&where=${
            checkedAnalysisTypeData.analysisField
          }+between+${bin.min}+and+${
            bin.max
          }&returnGeometry=false&outStatistics=[{"statisticType":"count","onStatisticField":"OBJECTID","outStatisticFieldName":"count"},{"statisticType":"sum","onStatisticField":"pop_2018","outStatisticFieldName":"pop"}]`
        );
      });

      console.log(queryUrlStrings)
      // Update Charts
      queryBlockStatistics(queryUrlStrings).then(results => {
        updateChartValues(barCountChart, results.map(x => x.count));
        updateChartValues(barPopChart, results.map(x => x.pop));
        updateChartValues(donutPopChart, results.map(x => x.pop));
      });

    })
  }

  //-----------------------------
  // CHANGE BINNGING METHOD
  //-----------------------------
  for (let i = 0; i < binningOptions.length; i++) {
    binningOptions[i].onchange = function() {
      let selectedClassBreakInfos = classBreakInfos[this.value];
      blockRenderer.classBreakInfos = selectedClassBreakInfos;
      blockLayer.renderer = blockRenderer;

      let queryParameterObject = generateSummaryStatQueryParameters(
        classBreakInfos,
        "analysis-type",
        "binning-method"
      );
      let queryUrls = [];
      queryParameterObject.bins.forEach((bin, index) => {
        queryUrls.push(
          `${layerUrls.blocks}/query?f=json&where=${
            blockRenderer.field
          }+between+${bin.min}+and+${
            bin.max
          }&returnGeometry=false&outStatistics=[{"statisticType":"count","onStatisticField":"OBJECTID","outStatisticFieldName":"count"},{"statisticType":"sum","onStatisticField":"pop_2018","outStatisticFieldName":"pop"}]`
        );
      });
      queryBlockStatistics(queryUrls).then(results => {
        updateChartValues(barCountChart, results.map(x => x.count));
        updateChartValues(barPopChart, results.map(x => x.pop));
        updateChartValues(donutPopChart, results.map(x => x.pop));
      });
    };
  }

  function generateSummaryStatQueryParameters(
    classBreakInfos,
    analysisElName,
    binningElName
  ) {
    let analysisInfos, binningInfos;
    let queryObject = {};

    // Get analysis infos
    let analysisOptions = document.getElementsByName(analysisElName);
    for (let i = 0; i < analysisOptions.length; i++) {
      if (analysisOptions[i].checked) {
        analysisInfos = analysisOptions[i].value;
        break;
      }
    }
    if (analysisInfos == "LEVEL_OF_SERVICE") {
      queryObject.analysis = "los_closest_park_dist";
    } else if (analysisInfos == "LAND_ACQUISITION") {
      queryObject.analysis = "la_closest_park_dist";
    }

    // Get binning infos
    let binningOptions = document.getElementsByName(binningElName);
    for (let i = 0; i < binningOptions.length; i++) {
      if (binningOptions[i].checked) {
        binningInfos = classBreakInfos[binningOptions[i].value];
        break;
      }
    }

    queryObject.bins = binningInfos.map(bin => {
      return {
        min: bin.minValue,
        max: bin.maxValue
      };
    });

    return queryObject;
  }

  
});

//------------------------
// FUNCTIONS
//------------------------
async function queryBlockStatistics(array) {
  let results = [];
  for (const item of array) {
    await $.getJSON(item, data => {
      try {
        results.push(data.features[0].attributes);
      } catch (err) {
        console.log(err)
        console.log(item)
        results.push({count: null, pop: null})
      }
    });
  }
  return results;
}

function updateChartValues(chart, valsArray) {
  chart.data.datasets[0].data = valsArray;
  chart.update();
}

function getCheckedOptionData(inputOptions) {
  let checkedOptionData;
  for (let i = 0; i < inputOptions.length; i++) {
    if (inputOptions[i].checked) {
      checkedOptionData = inputOptions[i].dataset
      break;
    }
  }
  return checkedOptionData
}

function updateBlockRenderer(blockLayer, blockRenderer, analysisField, binningMethod) {
  blockRenderer.field =analysisField
  blockRenderer.classBreakInfos = binningMethod
  blockLayer.renderer = blockRenderer
}


function createSummaryStatQueryParameters(
  classBreakInfos,
  analysisElName,
  binningElName
) {
  let analysisInfos, binningInfos;
  let queryObject = {};






  // Get analysis infos
  let analysisOptions = document.getElementsByName(analysisElName);
  for (let i = 0; i < analysisOptions.length; i++) {
    if (analysisOptions[i].checked) {
      analysisInfos = analysisOptions[i].value;
      break;
    }
  }
  if (analysisInfos == "LEVEL_OF_SERVICE") {
    queryObject.analysis = "los_closest_park_dist";
  } else if (analysisInfos == "LAND_ACQUISITION") {
    queryObject.analysis = "la_closest_park_dist";
  }

  // Get binning infos
  let binningOptions = document.getElementsByName(binningElName);
  for (let i = 0; i < binningOptions.length; i++) {
    if (binningOptions[i].checked) {
      binningInfos = classBreakInfos[binningOptions[i].value];
      break;
    }
  }

  queryObject.bins = binningInfos.map(bin => {
    return {
      min: bin.minValue,
      max: bin.maxValue
    };
  });

  return queryObject;
}