

// Global variables used to capture data from JSON (doctor_who.json)
var doctor_data  = [];
// This is data from JSON of image names for 10th Doctor (tennant_images.json)
var images_data = []
// This is dictonary (key is Date) and value is episode titles for 10th Doctor
var episodeTitles = {}
// This is dictonary (key is Date) and value is doctor number
var doctorNumbers = {};
// This is array of Doctor Names in order
var doctorNames = ["", "William Hartnell", "Patrick Troughton", "Jon Pertwee", "Tom Baker",
"Peter Davison", "Colin Baker", "Sylvester McCoy", "Paul McGann", "Christopher Eccelston",
"David Tennant", "Matt Smith", "Peter Capaldi", "Jodie Whittaker"];

// Cite: Code from HW to load JSON files
// Some little helpers (from the HW code)
const log = msg => (DEBUG ? console.log(msg) : '');
// Some little helpers (from the HW code)
const select = id => document.getElementById(id);
async function loadJSON(path) {
	let response = await fetch(path);
	let dataset = await response.json(); // Now available in global scope
	return dataset;
}

// Function to call when document loaded
function init() {
	// Ask JSON to be loaded
	doctorPromise = loadJSON('./data/doctor_who.json');
	// When it is loaded then call this function
	doctorPromise.then(function (data) {
		// Store the data in doctor_data gloval variable
		doctor_data = data;
		initializeCloudWords(data);
		initializeSeasons(data);
		initializeDuration(data);
		initializeDoctors(data);
		initializeComparison1(data);
		initializeComparison2(data);
		initializeBestDoctorEpisodes(data);
	}); 

	// Ask load JSON to be loaded
	doctorImages = loadJSON('./data/tennant_images.json');
	// When it is loaded then call this function
	doctorImages.then(function (data) {
		images_data = data["File"];
		initializeTennatImages(images_data);
	}); 
	
	// Timeline can be initialized immediatley as it doesnt need data from JSON
	initializeTimeline();
}



function initializeTimeline() {

	// Cite: https://www.highcharts.com/docs/chart-and-series-types/timeline-series/
	timeline = Highcharts.chart('timeline', {
	    chart: {
	        zoomType: 'x',
	        type: 'timeline'
		},
		// Dont show menu
		exporting: {
			enabled: false
		},
		credits: {
			enabled: false,
		},
	    xAxis: {
	        type: 'datetime',
	        visible: false
	    },
	    yAxis: {
	        gridLineWidth: 1,
	        title: null,
	        labels: {
	            enabled: false
	        }
	    },
	    legend: {
	        enabled: false
	    },
	    title: {
	        text: 'Timeline of Actors Who Played The Doctor Who'
	    },
	    subtitle: {
	        text: 'Info source: <a href="https://en.wikipedia.org/wiki/The_Doctor_(Doctor_Who)">www.wikipedia.org</a>'
	    },
	    tooltip: {
	        style: {
	            width: 300
			},
			useHTML: true,
			formatter: function() {
				var img = '<img src = "'+this.point.img+'" height="100" width="100"/></br><span>'+
				this.point.description+'</span>'
			  	return img
			}
	    },
	    series: [{
	        dataLabels: {
	            allowOverlap: false,
	            format: '<span style="color:{point.color}">● </span><span style="font-weight: bold;" > ' +
					'{point.x:%d %b %Y}</span><br/>{point.label}   '

	        },
	        marker: {
	            symbol: 'circle'
	        },
	        data: [{
	            x: Date.UTC(1963, 10, 23),
	            name: '',
	            label: 'William Hartnell',
				description: 'First regular appearance: An Unearthly Child (1963) <br> Last regular appearance: The Tenth Planet (1966) <br> Number of series: 4 <br> Episodes: 134',
				img: 'images/d1.jpg',
			}, 
			{
	            x: Date.UTC(1966, 9, 28),
				name: '',
	            label: 'Patrick Troughton',
				description: 'First regular appearance: The Power of the Daleks (1966) <br> Last regular appearance: The War Games (1969) <br> Number of series: 3 <br> Episodes: 119',
				img: 'images/d2.jpg',

			}, 
			{
	            x: Date.UTC(1970, 0, 3),
				name: '',
	            label: 'Jon Pertwee',
				description: 'First regular appearance: Spearhead from Space (1970) <br> Last regular appearance: Planet of the Spiders (1974) <br> Number of series: 5 <br> Episodes: 128',
				img: 'images/d3.jpg',

			}, 
			{
	            x: Date.UTC(1974, 5, 8),
				name: '',
	            label: 'Tom Baker',
				description: 'First regular appearance: Robot (1974) <br> Last regular appearance: Logopolis (1981) <br> Number of series: 7 <br> Episodes: 172',
				img: 'images/d4.jpg',

			}, 
			{
	            x: Date.UTC(1982, 0, 4),
				name: '',
	            label: 'Peter Davison',
				description: 'First regular appearance: Castrovalva (1982) <br> Last regular appearance: The Caves of Androzani (1984) <br> Number of series: 3 <br> Episodes: 69',
				img: 'images/d5.jpg',

			}, 
			{
	            x: Date.UTC(1984, 2, 16),
				name: '',
	            label: 'Colin Baker',
				description: 'First regular appearance: The Twin Dilemma (1984) <br> Last regular appearance: The Trial of a Time Lord (1986) <br> Number of series: 3 <br> Episodes: 31',
				img: 'images/d6.jpg',

			}, 
			{
	            x: Date.UTC(1987, 8, 7),
				name: '',
	            label: 'Sylvester McCoy',
				description: 'First regular appearance: Time and the Rani (1987) <br> Last regular appearance: Doctor Who (1996) <br> Number of series: 3 <br> Episodes: 42',
				img: 'images/d7.jpg',

			}, 
			{
	            x: Date.UTC(1996, 4, 12),
				name: '',
	            label: 'Paul McGann',
				description: 'First regular appearance: Doctor Who (1996) <br> TV Movie <br> Episodes: 2',
				img: 'images/d8.jpg',

			}, 
			{
	            x: Date.UTC(2005, 2, 26),
				name: '',
	            label: 'Christopher Eccelston',
				description: 'First regular appearance: Rose (2005) <br> Last regular appearance: The Parting of the Ways (2005) <br> Number of series: 1 <br> Episodes: 13',
				img: 'images/d9.jpg',

			}, 
			{
	            x: Date.UTC(2005, 11, 25),
				name: '',
	            label: 'David Tennant',
				description: 'First regular appearance: The Christmas Invasion (2005) <br> Last regular appearance: The End of Time (2010) <br> Number of series: 3 <br> Episodes: 47',
				img: 'images/d10.jpg',

			}, 
			{
	            x: Date.UTC(2010, 3, 3),
				name: '',
	            label: 'Matt Smith',
				description: 'First regular appearance: The Eleventh Hour (2010) <br> Last regular appearance: The Time of the Doctor (2013) <br> Number of series: 3 <br> Episodes: 44',
				img: 'images/d11.jpg',

			}, 
			{
	            x: Date.UTC(2014, 7, 23),
				name: '',
	            label: 'Peter Capaldi',
				description: 'First regular appearance: Deep Breath (2014) <br> Last regular appearance: Twice Upon a Time (2017) <br> Number of series: 3 <br> Episodes: 40',
				img: 'images/d12.jpg',

			},
			{
	            x: Date.UTC(2018, 9, 7),
				name: '',
	            label: 'Jodie Whittaker',
				description: 'First regular appearance: The Woman Who Fell to Earth (2018) <br> Current doctor <br> Number of series: 2 <br> Episodes: 21',
				img: 'images/d13.jpg',

			},
		]
	    }]
	});
}

function initializeCloudWords(data) {
	// Cite: https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/wordcloud/
	var text = ""

	// Get the doctor from the menu
	var doctor_cloud_id = document.getElementById("doctor_cloud_id");
	var doctorNum = parseInt(doctor_cloud_id.options[doctor_cloud_id.selectedIndex].value);

	// Add words for this doctor into text variable
	for (datum of data) {
		// Filter out doctors not the one in selected menu
		if(datum['Doctor']!=doctorNum)
			continue;
		// Split title into words
		words = datum['Episode'].toLowerCase().split(' ');
		// Check each word
		for(i=0; i<words.length; ++i) {
			word = words[i];
			// Remove common words
			if(word == 'the' || word == 'of' || word == 'and' || word == 'episode'|| word == 'part' || word == 'in')
				continue;
			// Add word
			text += word;
			text += " "
		}
	}

	var lines = text.split(/[,\. ]+/g),
    data = Highcharts.reduce(lines, function (arr, word) {
        var obj = Highcharts.find(arr, function (obj) {
            return obj.name === word;
        });
        if (obj) {
            obj.weight += 1;
        } else {
            obj = {
                name: word,
                weight: 1
            };
            arr.push(obj);
        }
        return arr;
    }, []);

	Highcharts.chart('word_cloud', {
		// Dont show menu
		exporting: {
			enabled: false
		},
		credits: {
			enabled: false,
		},
		accessibility: {
			screenReaderSection: {
				beforeChartFormat: '<h5>{chartTitle}</h5>' +
					'<div>{chartSubtitle}</div>' +
					'<div>{chartLongdesc}</div>' +
					'<div>{viewTableButton}</div>'
			}
		},
		series: [{
			type: 'wordcloud',
			data: data,
			name: 'Occurrences'
		}],
		title: {
			text: ''
		}
	});
}



function initializeSeasons(data) {
	// Cite: https://www.highcharts.com/demo/line-basic
	seasons = Highcharts.chart('seasons', {
		title: {
		  text: 'Historical Ratings'
		},
		credits: {
     		enabled: false,
		},
		plotOptions : {
            series  : {
				// cite: https://www.highcharts.com/forum/viewtopic.php?t=19347
                pointInterval   : 24 * 3600 * 1000*30
            }
        },
		xAxis: {
			type: 'datetime',
        	dateTimeLabelFormats: {
            	day: '%b'
        	},
			title: {
				text: 'Date'
			},
			// cite: https://www.highcharts.com/forum/viewtopic.php?t=19347
			tickInterval   : 24 * 3600 * 1000*30, //one day
            
		},
		yAxis: {
		  title: {
			text: 'Audience Viewership (Millions)'
		  },
		  lineWidth : 1,
		},
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			floating: true,
			borderWidth: 1,
			backgroundColor: '#FFFFFF',
			shadow: true
		},
		series: [
			{
				name: "Classic",
				color: 'rgba(223, 83, 83, 1)',
				type: 'spline',
				data: [],
				tooltip: {
					useHTML:true,
					width:100,
					pointFormatter: function() {
						var point = this;
						return '<b>' + episodeTitles[point.x] + '<br>' + 
							'<br>' + doctorNames[doctorNumbers[point.x]] + 
							'<br>' + point.y + ' Million</b>';
					}
           		}
			}, 
			{
				name: "New",
				color : 'rgba(119, 152, 191, 1.0)', 
				type: 'spline',
				data: [],
				tooltip: {
						useHTML:true,
						width:100,
						pointFormatter: function() {
							var point = this;
							return '<b>' + episodeTitles[point.x] + '<br>' + 
							'<br>' + doctorNames[doctorNumbers[point.x]] + 
							'<br>' + point.y + ' Million</b>';						}
				}
			},

			{
				name: "Film",
				color : 'purple', 
				data: [],
				marker: {
					radius: 10,
				},
				tooltip: {
						useHTML:true,
						width:100,
						pointFormatter: function() {
							var point = this;
							return '<b>' + episodeTitles[point.x] + '<br>' + 
							'<br>' + doctorNames[doctorNumbers[point.x]] + 
							'<br>' + point.y + ' Million</b>';						
						}
				}
			},

		],
	  });


	// This code collects the data for the series: classic, new and film using the data from JSON

	let classic = [];
	let newEpisodes = [];
	episodeTitles = {}
	doctorNumbers = {}
	for (datum of data) {
		episode_date = Date.parse(datum['Date'])
		if (episode_date < Date.parse("1991/1/1"))
			classic.push([episode_date, datum['Rating']/1000000]);
		if (episode_date > Date.parse("2004/1/1"))
			newEpisodes.push([episode_date, datum['Rating']/1000000]);
		episodeTitles[episode_date] = datum['Episode'];
		doctorNumbers[episode_date] = datum['Doctor']
	}
	seasons.series[0].setData(classic);
	seasons.series[1].setData(newEpisodes);

	film = [];
	episode_date = Date.parse("1996/5/27");
	film.push([episode_date, 9080000/1000000]);
	episodeTitles[episode_date] = 'Doctor Who The Movie';
	doctorNumbers[episode_date] = 8;
	seasons.series[2].setData(film);
}

function initializeDuration(data) {
	// Cite: https://www.highcharts.com/demo/scatter
	scatterplot = Highcharts.chart('duration', {
		chart: {
			type: 'scatter',
			zoomType: 'xy'
		},
		// Dont show menu
		exporting: {
			enabled: false
		},
		credits: {
			enabled: false,
		},
		title: {
		text: 'Popularity vs Episode Duration'
		},
		
		xAxis: {
		title: {
			enabled: true,
			text: 'Episode Duration (min)'
		},
		startOnTick: true,
		endOnTick: true,
		showLastLabel: true
		},
		yAxis: {
		title: {
			text: 'Audience Viewership (millions)'
		}
		},
		legend: {
		layout: 'vertical',
		align: 'left',
		verticalAlign: 'top',
		x: 100,
		y: 70,
		floating: true,
		backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
		borderWidth: 1
		},
		plotOptions: {
		scatter: {
			marker: {
			radius: 5,
			states: {
				hover: {
				enabled: true,
				lineColor: 'rgb(100,100,100)'
				}
			}
			},
			states: {
			hover: {
				marker: {
				enabled: false
				}
			}
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br>',
				pointFormat: 'Duration: {point.x} mins,<br> Viewers: {point.y} Million'
			}
		}
		},
		series: [{
		name: 'Classic',
		color: 'rgba(223, 83, 83, .5)',
		data: []

		}, {
		name: 'New',
		color: 'rgba(119, 152, 191, .5)',
		data: []
		}]
	});

	// Populate the data for the series
	let classic = [];
	for (datum of data) {
		if(datum['Era']=='Classic')
		classic.push([Math.round(datum['Minutes']), datum['Rating']/1000000 ]);

	}
	scatterplot.series[0].setData(classic)

	let newEpisodes = [];
	for (datum of data) {
		if(datum['Era']=='New')
		newEpisodes.push([Math.round(datum['Minutes']), datum['Rating']/1000000 ]);


	}
	scatterplot.series[1].setData(newEpisodes)
}

var scatter2;
var doctors_details;
var doctors_summary;
var show_details = false;

function initializeDoctors(data) {
	// Cite: https://www.highcharts.com/demo/scatter
	scatter2 = Highcharts.chart('doctors', {
		chart: {
			type: 'scatter',
			zoomType: 'xy'
		},
		// Dont show menu
		exporting: {
			enabled: false
		},
		credits: {
			enabled: false,
		},
		title: {
			text: 'Doctor Popularity and Average Episode Duration'
		},
		subtitle: {
			text: ''
		},
		xAxis: {
			title: {
				enabled: true,
				text: 'Episode Duration (mins)'
			},
			startOnTick: true,
			endOnTick: true,
			showLastLabel: true
		},
		yAxis: {
			title: {
				text: 'Audience Viewership (millions)'
			}
		},
		legend: {
			layout: 'bottom',
			align: 'right',
			verticalAlign: 'top',
			floating: true,
			backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
			borderWidth: 1
		},
		plotOptions: {
		scatter: {
			marker: {
				radius: 5,
				states: {
					hover: {
						enabled: true,
						lineColor: 'rgb(100,100,100)'
					}
				}
				},
				states: {
				hover: {
					marker: {
					enabled: false
					}
				}
				},
				tooltip: {
					headerFormat: '<b>{series.name}</b><br>',
					pointFormat: 'Duration: {point.x} mins,<br> Viewers: {point.y} Million'
				}
		}
		},
		series: [{
			name: '1. William Hartnell',
			data: [],
		}, 
		{
			name: '2. Patrick Troughton',
			data: []
		},
		{
			name: '3. Jon Pertwee',
			data: []
		},
		{
			name: '4. Tom Baker',
			data: [],
			color: 'red'
		},
		{
			name: '5. Peter Davison',
			data: []
		},
		{
			name: '6. Colin Baker',
			data: []
		},

		{
			name: '7. Sylvester McCoy',
			data: []
		},
		{
			name: '8. Paul McGann',
			data: []
		},

		{
			name: '9. Christopher Eccelston',
			data: []
		},
		{
			name: '10. David Tennant',
			data: [],
			color: 'blue'
		},

		{
			name: '11. Matt Smith',
			data: []
		},
		{
			name: '12. Peter Capaldi',
			data: []
		},

		{
			name: '13. Jodie Whittaker',
			data: []
		},

		// Put Thumbnails for Doctor 4 and 10
		{
			name: '',
			// Only Show this in summary mode
			data: show_details ? [[26,10]] : [],
			showInLegend : false, // Dont show in Legend
			enableMouseTracking : false, // Dont show Tooltip
			marker: {
				symbol: show_details ? 'url(images/s4.jpg)' : '',
			}
		},
		{
			name: '',
			// Only Show this in summary mode
			data: show_details ? [[51,9]] : [],
			showInLegend : false, // Dont show in Legend
			enableMouseTracking : false, // Dont show Tooltip
			marker: {
				symbol: show_details ? 'url(images/s10.jpg)' : '',
			}
		},

		]
	});

	// Create Data for two cases: Details vs Summary
	doctors_summary = {1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[],13:[]};
	var mins = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	var ratings = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	var total = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

	// Summary : Find the totals
	for (datum of data) {
		mins[datum['Doctor']] += datum['Minutes'];
		ratings[datum['Doctor']] += datum['Rating'];
		total[datum['Doctor']] += 1; 
	}
	// Summary : Now find averages
	for(i=1; i<=13; ++i) {
		avg_min = (mins[i]/total[i]).toFixed(2);
		avg_rating = (ratings[i]/(total[i]*1000000)).toFixed(2);
		doctors_summary[i].push([parseFloat(avg_min), parseFloat(avg_rating)]);
	}

	// Details, for each item in JSON
	doctors_details = {1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],11:[],12:[],13:[]};
	for (datum of data) {
		doctors_details[datum['Doctor']].push([Math.round(datum['Minutes']), datum['Rating']/1000000 ]);
	}

	// Toggle the show details 
	show_details = !show_details;	
	// If its not show details then set the data in the series from summary
	if(!show_details) 
	{
		for(i=1; i<=13; ++i) {
			scatter2.series[i-1].setData(doctors_summary[i])
		}
	}
	else {
		// If it is show details then set the data in the series from details
		for(i=1; i<=13; ++i) {
			scatter2.series[i-1].setData(doctors_details[i])
		}
	}

}

// This gets called when checkbox is changed
function showHideDetails() {
	initializeDoctors(doctor_data);
}

function initializeComparison1(data) {
	// Bar Chart
	// Cite: https://www.highcharts.com/demo/column-drilldown
	Highcharts.chart('comparison1', {
	  chart: {
	    plotBackgroundColor: null,
	    plotBorderWidth: 0,
	    plotShadow: false
	  },
	// Dont show menu
	exporting: {
		enabled: false
	},
	credits: {
		enabled: false,
	},
	title: {
		text: 'Number of Episodes',
	},
	legend: {
		enabled:true,
	},
	tooltip: {
		useHTML: true,
		width:100,
		pointFormatter: function() {
			var point = this;
			if(point.name == "David Tennant")
				return '<img src = "images/d10.jpg" height="100" width="100"/><br>Episodes : <b>' + point.y + '</b><br/>';
			else
				return '<img src = "images/d4.jpg" height="100" width="100"/><br>Episodes : <b>' + point.y + '</b><br/>';
		}
	},
	yAxis: {
		title: {
		  text: 'Number of Episodes'
		},
		lineWidth : 1,
	  },
	

	series: [
		{
			type: 'column',
			name: 'Tom Baker',
			innerSize: '50%',
			data: [
				['Tom Baker', 69],
			],
			color : 'rgba(223, 83, 83, 1)'
		},
		{
			type: 'column',
			name: 'David Tennant',
			innerSize: '50%',
			data: [
				['David Tennant', 47],
			],
			color : 'rgba(119, 152, 191, 1.0)'
		}
]
});

}


function initializeComparison2(data) {
	// Pie Chart
	// Cite: https://www.highcharts.com/demo/pie-semi-circle
	Highcharts.chart('comparison2', {
	  chart: {
	    plotBackgroundColor: null,
	    plotBorderWidth: 0,
	    plotShadow: false
	  },
	// Dont show menu
	exporting: {
		enabled: false
	},
	credits: {
		enabled: false,
	},
	title: {
		text: 'Fan Rating',
	},
	subtitle: {
		text: 'Info source: <a href="https://www.digitalspy.com/tv/cult/a852277/doctor-who-ranked-actors-doctors/">www.digitalspy.com</a>'
	},

	tooltip: {
		useHTML: true,
		width:100,
		pointFormatter: function() {
			var point = this;
			if(point.name == "David Tennant")
				return '<img src = "images/d10.jpg" height="100" width="100"/><br>Popularity : <b>' + point.y + '</b><br/>';
			else
				return '<img src = "images/d4.jpg" height="100" width="100"/><br>Popularity : <b>' + point.y + '</b><br/>';
		}
	},

	plotOptions: {
		pie: {
			dataLabels: {
			enabled: true,
			distance: -50,
			style: {
				fontWeight: 'bold',
				color: 'white'
			}
			},
			startAngle: -90,
			endAngle: 90,
			center: ['50%', '75%'],
			size: '110%',
			colors : ['rgba(223, 83, 83, 1)', 'rgba(119, 152, 191, 1.0)']
		}
	},
	series: [{
		type: 'pie',
		name: 'Fan Rating',
		innerSize: '50%',
		data: [
			['Tom Baker', 7.7],
			['David Tennant', 8.2],
		]
	}]
	});

}


function initializeTennatImages(images_data) {
	// Cite: https://www.highcharts.com/docs/chart-and-series-types/timeline-series/
	timeline2 = Highcharts.chart('tennatEpisodes', {
	    chart: {
	        zoomType: 'x',
	        type: 'timeline'
		},
		// Dont show menu
		exporting: {
			enabled: false
		},
		credits: {
			enabled: false,
		},
	    xAxis: {
	        type: 'datetime',
	        visible: false
	    },
	    yAxis: {
	        gridLineWidth: 1,
	        title: null,
	        labels: {
	            enabled: false
	        }
	    },
	    legend: {
	        enabled: false
	    },
	    title: {
	        text: "David Tennant's Episodes"
	    },
	    subtitle: {
	        text: 'Info source: <a href="https://en.wikipedia.org/wiki/The_Doctor_(Doctor_Who)">www.wikipedia.org</a>'
	    },
	    tooltip: {
	        style: {
	            width: 300
			},
			useHTML: true,
			formatter: function() {
				var img = '<img src = "'+this.point.img+'" height="100" width="100"/></br><span>'+
				this.point.description+'</span> <br>' + this.point.date
			  	return img //
			}
	    },
	    series: [{
	        dataLabels: {
	            allowOverlap: false,
	            format: '<span style="color:{point.color}">● </span><span " > ' +
					'</span>{point.label}   '

	        },
	        marker: {
	            symbol: 'circle'
	        },
	        data: []
	    }]
	});

	episode_data = []

	// Collect the data for the series
	let bestDoctorShows = [];
	for (datum of doctor_data) {
		// Only care about 10th doctor
		if (datum['Doctor']==10) 
		{
			// Add data which is : Date, episode, image etc
			episode_data.push({
				x: Date.parse(datum['Date']),
				name: '',
				label: datum['Episode'],
				description: datum['Episode'],
				img: images_data[datum['Date']],
				date:datum['Date']
			})

			bestDoctorShows.push([datum['Episode'], datum['Rating']/1000000]);
		}
	}

	
	// Set the data for series
	timeline2.series[0].setData(episode_data)
	
}

function initializeBestDoctorEpisodes(data) {

	// Get all episodes of Doctor 10 into array
	let bestDoctorShows = [];
	for (datum of data) {
		if (datum['Doctor']==10) {
			bestDoctorShows.push([datum['Episode'], datum['Rating']/1000000]);
		}
	}

	// Sort episodes based on ratings
	bestDoctorShows.sort(function(a, b) {
		if (a[1] < b[1])
		  return 1;
		if (a[1] > b[1])
		  return -1;
		return 0;
	}); 

	// Titles of the shows put into titles array
	let titles = [];
	for(i=0; i<bestDoctorShows.length; ++i) {
		titles.push(bestDoctorShows[i][0]);
	}
	
	// Cite: https://www.highcharts.com/demo/column-basic
	bestDoctor = Highcharts.chart('bestDoctorEpisodes', {
		chart: {
			type: 'column'
		},
		title: {
		  text: "David Tennant's Episode Ratings"
		},
		credits: {
     		enabled: false,
		},
		// Dont show menu
		exporting: {
			enabled: false
		},

		xAxis: {
			title: {
			  text: 'Episodes'
			},
			categories : titles,
			lineWidth : 1,
		},

		yAxis: {
		  title: {
			text: 'Audience Viewership (Millions)'
		  },
		  lineWidth : 1,
		},
		legend: {
			enable:false,
		},
		series: [
			{
				showInLegend: false,   
				name: "David Tennant",
				color: 'gray',
				data: [],
				tooltip: {
					useHTML:true,
					width:100,
					pointFormatter: function() {
						var point = this;
						return '<b>' + 
							'<br>' + point.y + ' Million</b>';
					}
           		}
			}, 

			
		],
	  });


	// Set the data (sorted shows)
	bestDoctor.series[0].setData(bestDoctorShows);

	// Add the top 5 episodes - these are added are gold (done manually)
	bestDoctor.series[0].addPoint({ color: "gold", x:0, y: 13.31, name:"Voyage of the Damned"});
	bestDoctor.series[0].addPoint({ color: "gold", x:1, y: 13.1,  name:"The Next Doctor"});
	bestDoctor.series[0].addPoint({ color: "gold", x:2, y: 12.27, name:"The End of Time : Part Two"});
	bestDoctor.series[0].addPoint({ color: "gold", x:3, y: 12.04, name:"The End of Time : Part One"});
	bestDoctor.series[0].addPoint({ color: "gold", x:4, y: 10.57, name:"Journeys End"});
	
}

// This plays/stops the audio
function playAudio() {
	// Find the DIV audio_clip, and then play
	audio = document.getElementById("audio_clip");
	audio.play();
}

function stopAudio() {
	// Find the DIV audio_clip, and then pause
	audio = document.getElementById("audio_clip");
	audio.pause();
}

// Once the document is loaded then call init
document.addEventListener('DOMContentLoaded', init, false);
