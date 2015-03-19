var ROOT_PATH = "";
var range = 0;
var range_dealer = 0; //dealer
var global_model_valuation_data;
var global_similar_models_valuation_data;
var depretiation_this_model;
var minimum_of_valuation;
var maximum_of_valuation;
var mean_of_valuation;
var minimum_of_valuation_dealer; //dealer
var maximum_of_valuation_dealer; //dealer
var mean_of_valuation_dealer; //dealer
var priceSeriesArray;
var car_make="Your Car";
var car_model="";
var car_year="";
var car_engine="";
var car_make_from_valuation="Your Car";
var car_model_from_valuation="";
var car_year_from_valuation="";
var car_engine_from_valuation="";
var reportPage;
var report_image_button_enabled = false;
var mode_switch = "valuation";
var svg1;
var MOT_sub_categories_this;
var MOT_sub_categories_color = 1;
var chart_height = '40vw';
var options1;
var ch_car1;
var ch_car2;
var ch_car3;
var ch_car4;
var ch_var_valuation = [ch_car1, ch_car2, ch_car3, ch_car4];
var ch_conts = ['chart_container1', 'chart_container2', 'chart_container3','chart_container4'];
var miniCharts_form_data;
var chart_cells;
var cell0;
var cell1;
var main_chart_container_width;
var main_chart_container_heigth;
var budget_active = 0;
var on_budget_mode = 0;
var this_year = 2015;
var reset_switch = 1;
var cell_00;
var cell_01;
var cell_02;
var cell_10;
var cell_11;
var cell_12;
var cell_000;
var cell_001;
var cell_100;
var mot_passes_per_year;
var mot_fails_per_year;
var comp_categories =[];
var comp_categories_full_label =[];
var comp_MOT_Passes =[];
var comp_MOT_Fails =[];
var com_Deps = [];
var com_Deps_colors =['#00AADD', '#404040', '#AA4444', '#78AD9D'];
var comp_online_prices = [];
var comp_dealers_prices = [];
var current_mot_passes = 0;
var current_mot_fails = 0;
var current_mot_fail_categories = [0,0,0,0,0,0,0,0,0,0];
var current_years_results = [];
var current_mot_fail_categories_stack = [];
var current_years_results_years = [];
var current_years_results_fails = [];
var mot_data_points_pass;
var mot_data_points_fail;
var cel_1000;
var cel_1001;
var cel_1010;
var cel_1011;
var depretiation_sample_data = [[[2006,15000],[2007,12900],[2008,10900],[2009,9800],[2010,7000],[2011,6600],[2012,6450],[2013,6100],[2014,5900]],
[[2006,12900],[2007,11300],[2008,9000],[2009,8000],[2010,6500],[2011,5600],[2012,5450],[2013,5000],[2014,3900]],
[[2006,10900],[2007,10300],[2008,9000],[2009,8000],[2010,7500],[2011,6600],[2012,5450],[2013,4900],[2014,4600]],
[[2006,15900],[2007,14300],[2008,12500],[2009,11000],[2010,9500],[2011,9600],[2012,8450],[2013,8000],[2014,6900]]];


var comp_table_cells =[cel_1000, cel_1001, cel_1010, cel_1011];

// In received items :    ['Body, Structure and General Items', 'Brakes', 'Drivers View of the Road', 'Driving Controls and Speed Limiters','Exhaust, Fuel and Emissions', 'Items Not Tested', 'Lamps, Reflectors and Electrical Equipment', 'Registration Plates and VIN', 'Road Wheels', 'Seat Belts and Supplementary Restraint Systems', 'Steering', 'Suspension', 'Towbars', 'Tyres']
//                          [0, 1, 2, 9, 4, 6, 10, 11, 8, 3+5+7+12+13] mapping to                   
var MOT_main_categories = ["Body","Brakes","Driver's view","Seat belts/restraints","Fuel, exhaust/emission","Electrical","Steering","Suspension","Wheels","Others"];
var pie_colors = ["#a61616","#2f2f2f","#4d5e65","#593636","#7bc0ce","#387a87","#7d968d","#71a174","#97ab82","#4c0099"];

var MOT_sub_categories = [["Body condition","Body security","Doors","Engine mountings","Load security","Seats","Spare wheel","Speedometer","Steps and stairs","Vehicle structure"],
["ABS","Additional braking devices","Air and vacuum systems","Brake performance","Electronic braking system","Electronic stability system","Full power hydraulic systems","Hand operated control valves","Hub components","Hydraulic systems","Locking devices","Mechanical components","Parking brake","Prescribed areas","Restricted movement","Service brake control components"],
["Bonnet","Drivers view","Glazing","Indirect vision devices","Mirrors","Washers","Windscreen","Windscreen (old)","Wipers"],["Seat belts","Supplementary restraint systems"],["Compression ignition","Exhaust system","Fuel system","Spark ignition"],
["Battery","Direction indicators","Electrical wiring","Hazard warning","Headlamp aim","Headlamp aim (old)","Headlamps","Horn","Outline marker lamps","Position lamps","Rear fog lamp","Rear reflectors","Registration plate lamp","Stop lamp","Trailer electrical socket"],
["Locking devices","Power steering","Prescribed areas","Rear wheel steering","Steering control","Steering operation","Steering system"],
["Air susp.","Anti roll bars","Axles","Bonded susp.","Coil springs","Drive shafts","Drive shafts (old)","Fluid susp.","Front susp joints",
"Front susp. locking devices","Gas susp.","General cond.","Leaf springs","Mac pherson strut","Panhard rods","Presc. areas","Radius arms","Shock absorbs","Sub frames","Susp. arms","Tie bars rods","Torque react. arms","Torsion bars","Trailing arms","Wheel bearing"],
["Attachment","Condition","Halfshafts","Hubs"],["Others"]];
/* var MOT_data =[[25,36,18,46,22,54,76,29,39,100],[53,42,41,11,24,19,34,97,113,54,87,110,19,51,21,102],[29,41,32,17,52,83,26,97,19],
				[78,109],[21,53,87,109],[53,11,42,41,11,24,19,134,97,113,54,87,110,19,51],[56,21,46,90,29,39,80],
				[53,18,42,27,41,29,11,24,19,34,91,97,78,113,17,54,87,110,91,29,19,51,80,21,102],[54,76,29,39],[276]]; */

var MOT_data =[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
				[0,0],[0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0],[0]];
                
                
function ajax_request(form_name, params, which_chart, which_model, request_from) {
	if (document.getElementById("btn_submit").value == 'Evaluate'){
		which_chart.showLoading('Loading ...');
		document.getElementById("btn_submit").disabled = true;
                var form_data = form_name != '' ? $(form_name).serialize(true) : params;
                car_make = form_name != '' ? form_data.make : params.make;
                car_model = form_name != '' ? form_data.model : params.model;
                car_year = form_name != '' ? form_data.year : params.year;
                car_engine = form_name != '' ? form_data.engine_size : params.engine_size;
          
            new Ajax.Request('wp-content/themes/twentythirteen/tools/data_selection.php', {
			method:'POST',
			parameters: Object.extend( form_data, params ),
			onSuccess: function(data) {
                //... returned data structure: price_mean_private, price_min_private, price_max_private, dist_all_private, dist_maker_private
                //... price_mean_dealer, price_min_dealer, price_max_dealer, dist_all_dealer, dist_maker_dealer, mot_data
                //alert(data.responseText);
                var json_data = data.responseText.evalJSON();
                //alert(json_data.mot_vehicles_tested);
				var e = document.getElementById("chart_explanation");
				//e.style.display = 'block';
				//e.style.visibility = 'visible';
				var data_all = eval(json_data.dist_all_private);
				var data_all_dealer = eval(json_data.dist_all_dealer); //dealer
				var data_this_model = eval(json_data.dist_maker_private); 	   
				var data_this_model_dealer = eval(json_data.dist_maker_dealer); //dealer 
                
				var data_all_normalized = new Array();	
				var data_all_normalized_dealer = new Array(); //dealer
				var data_all_normalized_for_histogram = new Array();
				var data_all_normalized_for_histogram_dealer = new Array(); //dealer
                //... MOT data structure: [pass_rates, failure_rates, failure_frequency]
                //... Mileage ranges: 0.5 : 1-10000, 1.5 : 10000-20000, ..., 10,5 : > 10000
                //... current MOT year ranges are 2005-2013
                //... pass rates: year:[mileage_range:frequency,mileage_range:frequency,...], e.g. 2006:[0.5:1,5.5:1,7.5:1,9.5:2,10.5:4]
                //... failure rates: year:[mileage_range:frequency,mileage_range:frequency,...], e.g. '2006:[0.5:1,5.5:1,7.5:1,9.5:2,10.5:4]
                //... failure_frequency categories:
                //... ['Body, Structure and General Items', 'Brakes', 'Drivers View of the Road', 'Driving Controls and Speed Limiters','Exhaust, Fuel and Emissions', 'Items Not Tested', 'Lamps, Reflectors and Electrical Equipment', 'Registration Plates and VIN', 'Road Wheels', 'Seat Belts and Supplementary Restraint Systems', 'Steering', 'Suspension', 'Towbars', 'Tyres']
                //... failure_frequency: [cat_1_frequency, cat_2_frequency, cat_3_frequency,...], e.g. 0,2,0,0,2,0,0,0,0,0,0,12,0,0
                //... number of vehicles tested returned as "mot_vehicles_tested". mot_year:count,mot_year:count,..., e.g. 2005:10
                /*
                //SAMPLE CODE
                var mot_pass_rates = json_data.mot_pass_rates.split(",");
                for( i = 0; i < mot_pass_rates.size(); i++) {
                    var year_values = mot_pass_rates[i].split(":");
                    var year = year_values[0];
                    var mileage_range_frequency = year_values[1].split(",");
                    for( i = 0; i < mileage_range_frequency.size(); i++) {
                        mileage_range = mileage_range_frequency[i].split(":")[0];
                        frequency = mileage_range_frequency[i].split(":")[1];
                    }
                }
                */
                priceSeriesArray = new Array();			
				var i;
				/*
				if(report_image_button_enabled)
						reportPage.close();  
				*/
				var normilizer = 1; 
				var normalizer_dealer = 1; //dealer
				var absolute_min = 0;
				var absolute_min_dealer = 0; //dealer
				var difference = json_data.price_max_private - json_data.price_min_private;
				var difference_dealer = json_data.price_max_dealer - json_data.price_min_dealer; //dealer
				if((json_data.price_min_private - difference *normilizer) > 0){
					absolute_min = 	json_data.price_min_private - difference*normilizer;
				}
				
				if((json_data.price_min_dealer - difference_dealer *normalizer_dealer) > 0){ //dealer
					absolute_min_dealer = 	json_data.price_min_dealer - difference_dealer*normalizer_dealer; //dealer
				} //dealer
				
				for(i=0;i<data_all.size();i++){	
					if ((data_all[i][0] >= absolute_min) && (data_all[i][0]<=(difference*normilizer + json_data.price_max_private))){
						data_all_normalized.push(data_all[i]);
						data_all_normalized_for_histogram.push(data_all[i][0]);
					}
				}
		
				for(i=0;i<data_all_dealer.size();i++){ //dealer	
					if ((data_all_dealer[i][0] >= absolute_min_dealer) && (data_all_dealer[i][0]<=(difference_dealer*normalizer_dealer + json_data.price_max_dealer))){ //dealer
						data_all_normalized_dealer.push(data_all_dealer[i]); //dealer
						data_all_normalized_for_histogram_dealer.push(data_all_dealer[i][0]); //dealer
					} //dealer
				} //dealer
				
				var data_this_model_normalized = new Array();
				var data_this_model_normalized_dealer = new Array(); //dealer
				var data_this_model_normalized_for_histogram = new Array();
				var data_this_model_normalized_for_histogram_dealer = new Array(); //dealer
				var curve_test_array = new Array();
				var curve_test_array_dealer = new Array(); //dealer	
				
				for(i=0;i<data_this_model.size();i++){
					if ((data_this_model[i][0] >= absolute_min) && (data_this_model[i][0] <= (difference*normilizer + json_data.price_max_private))){
						data_this_model_normalized.push(data_this_model[i]);
						data_this_model_normalized_for_histogram.push(data_this_model[i][0]);
						curve_test_array.push(data_this_model[i][1]);
					}
				}
			
				for(i=0;i<data_this_model_dealer.size();i++){ //dealer
					if ((data_this_model_dealer[i][0] >= absolute_min_dealer) && (data_this_model_dealer[i][0] <= (difference_dealer*normalizer_dealer + json_data.price_max_dealer))){ //dealer
						data_this_model_normalized_dealer.push(data_this_model_dealer[i]); //dealer
						data_this_model_normalized_for_histogram_dealer.push(data_this_model_dealer[i][0]); //dealer
						curve_test_array_dealer.push(data_this_model_dealer[i][1]); //dealer
					} //dealer
				}	//dealer
				
				// creating a histogram from scattered columns
				var min_of_hist = Math.min.apply(null, data_this_model_normalized_for_histogram);
				var min_of_hist_dealer = Math.min.apply(null, data_this_model_normalized_for_histogram_dealer); //dealer
				var max_of_hist = Math.max.apply(null, data_this_model_normalized_for_histogram);
				var max_of_hist_dealer = Math.max.apply(null, data_this_model_normalized_for_histogram_dealer); //dealer
				var bin_width = 0;
				var bin_width_dealer = 0; //dealer
				if(max_of_hist>min_of_hist){
					bin_width = (max_of_hist-min_of_hist)/40;
				}
				else{
					min_of_hist = min_of_hist-100;
					max_of_hist = max_of_hist+100;
					bin_width = (max_of_hist-min_of_hist)/1;
					max_of_hist = max_of_hist + bin_width/2 + 1;
				}
				
				if(max_of_hist_dealer>min_of_hist_dealer){ //dealer
					bin_width_dealer = (max_of_hist_dealer-min_of_hist_dealer)/40; //dealer
				} //dealer
				else{ //dealer
					min_of_hist_dealer = min_of_hist_dealer-100; //dealer
					max_of_hist_dealer = max_of_hist_dealer+100; //dealer
					bin_width_dealer = (max_of_hist_dealer-min_of_hist_dealer)/1; //dealer
					max_of_hist_dealer = max_of_hist_dealer + bin_width_dealer/2 + 1; //dealer
				} //dealer
				
				range = bin_width;
				range_dealer = bin_width_dealer; //dealer
				var hist_count = 0;
				var hist_count_dealer = 0; //dealer
				var previous_bound = min_of_hist;
				var previous_bound_dealer = min_of_hist_dealer; //dealer
				var current_bound = min_of_hist + bin_width;
				var current_bound_dealer = min_of_hist_dealer + bin_width_dealer; //dealer
				var i=0;
				var histogram_data = new Array();
				var histogram_data_dealer = new Array(); //dealer
				var first_element;
				var first_element_dealer; //dealer
				var second_element;
				var second_element_dealer; //dealer
				while (current_bound < max_of_hist){
					first_element = (current_bound + previous_bound)/2;
					second_element = 0;
					for(i=0;i<data_this_model_normalized.size();i++){
						if((data_this_model_normalized[i][0]>=previous_bound) && (data_this_model_normalized[i][0]<current_bound)){
							second_element = second_element + data_this_model_normalized[i][1];
						}
					}
					histogram_data.push([first_element,second_element]);
					hist_count = hist_count+1;
					previous_bound = current_bound;
					current_bound = current_bound + bin_width;
				}
				
				while (current_bound_dealer < max_of_hist_dealer){ //dealer
					first_element_dealer = (current_bound_dealer + previous_bound_dealer)/2; //dealer
					second_element_dealer = 0; //dealer
					for(i=0;i<data_this_model_normalized_dealer.size();i++){ //dealer
						if((data_this_model_normalized_dealer[i][0]>=previous_bound_dealer) && (data_this_model_normalized_dealer[i][0]<current_bound_dealer)){ //dealer
							second_element_dealer = second_element_dealer + data_this_model_normalized_dealer[i][1]; //dealer
						}//dealer
					}//dealer
					histogram_data_dealer.push([first_element_dealer,second_element_dealer]);//dealer
					hist_count_dealer = hist_count_dealer+1;//dealer
					previous_bound_dealer = current_bound_dealer;//dealer
					current_bound_dealer = current_bound_dealer + bin_width_dealer;//dealer
				} //dealer
				
				var max_of_hist = Math.max.apply(null, data_all_normalized_for_histogram);
				var max_of_hist_dealer = Math.max.apply(null, data_all_normalized_for_histogram_dealer); //dealer
				var hist_count = 0;
				var hist_count_dealer = 0;
				var previous_bound = min_of_hist;
				var previous_bound_dealer = min_of_hist_dealer; //dealer
				var current_bound = min_of_hist + bin_width;
				var current_bound_dealer = min_of_hist_dealer + bin_width_dealer; //dealer
				var i=0;
				var histogram_data_all = new Array();
				var histogram_data_all_dealer = new Array(); //dealer
				var first_element;
				var first_element_dealer; //dealer
				var second_element;
				var second_element_dealer; //dealer
				while (current_bound < max_of_hist){
					first_element = (current_bound + previous_bound)/2;
					second_element = 0;
					for(i=0;i<data_all_normalized.size();i++){
						if((data_all_normalized[i][0]>=previous_bound) && (data_all_normalized[i][0]<current_bound)){
							second_element = second_element + data_all_normalized[i][1];
						}
					}
					histogram_data_all.push([first_element,second_element]);
					hist_count = hist_count+1;
					previous_bound = current_bound;
					current_bound = current_bound + bin_width;
				}

				while (current_bound_dealer < max_of_hist_dealer){ //dealer
					first_element_dealer = (current_bound_dealer + previous_bound_dealer)/2; //dealer
					second_element_dealer = 0; //dealer
					for(i=0;i<data_all_normalized_dealer.size();i++){ //dealer
						if((data_all_normalized_dealer[i][0]>=previous_bound_dealer) && (data_all_normalized_dealer[i][0]<current_bound_dealer)){ //dealer
							second_element_dealer = second_element_dealer + data_all_normalized_dealer[i][1]; //dealer
						} //dealer
					} //dealer
					histogram_data_all_dealer.push([first_element_dealer,second_element_dealer]); //dealer
					hist_count_dealer = hist_count_dealer+1; //dealer
					previous_bound_dealer = current_bound_dealer; //dealer
					current_bound_dealer = current_bound_dealer + bin_width_dealer; //dealer
				}	//dealer			
				// -------------------------------------------
				
				global_model_valuation_data = new Array();
				global_similar_models_valuation_data = new Array();
				global_model_valuation_data = histogram_data;
				global_similar_models_valuation_data = histogram_data_all;
				
				global_model_valuation_data_dealer = new Array(); //dealer
				global_similar_models_valuation_data_dealer = new Array(); //dealer
				global_model_valuation_data_dealer = histogram_data_dealer; //dealer
				global_similar_models_valuation_data_dealer = histogram_data_all_dealer; //dealer
				
				// sample depreciation data
				car_make_from_valuation=car_make;
				car_model_from_valuation=car_model;
				car_year_from_valuation=car_year;
				car_engine_from_valuation=car_engine;
				depretiation_this_model = [[2007,12900],[2008,10900],[2009,9800],[2010,7000],[2011,6600],[2012,6450],[2013,6100],[2014,5900]];
				depreciation_this_model_prediction = [[2014,5900],[2015,5100],[2016,4900],[2017,4750]];
				var priceSeries1 = {"name": car_make + "  " + car_model + "  " + car_engine + "  " + car_year, "color": "#009CCF", "marker":{"symbol": "circle"}, "data": depretiation_this_model};
				priceSeriesArray.push(priceSeries1);
				var priceSeries2 = {"name": "prediction", "color": "#009CCF", "marker":{"symbol": "circle"}, "dashStyle": "ShortDash", "data": depreciation_this_model_prediction};
				priceSeries2.showInLegend = false;
				priceSeriesArray.push(priceSeries2);
				//var legend = chart_car.legend; 
                //legend.series[1].hide();
				// ------------------------
				
				minimum_of_valuation = Math.round(json_data.price_min_private);
				maximum_of_valuation = Math.round(json_data.price_max_private);
				mean_of_valuation = Math.round(json_data.price_mean_private);
				
				
				//-------- Processing MOT Data --------
				current_mot_passes = 0;
				current_mot_fails = 0;	
                current_mot_fail_categories = [0,0,0,0,0,0,0,0,0,0];                
				var pass_sums;		
				var fail_sums;				//2005:[0.5:4,1.5:8, ...],2006:[0.5:2,1.5:4, ...],2007:[0.5:10,1.50, ...]
				if(	json_data.mot_pass_rates != ''){
					var temp1 = json_data.mot_pass_rates.split("],");   			//2005:[0.5:4,1.5:8, ...    2006:[0.5:2,1.5:4, ...         2007:[0.5:10,1.50, ...]
					var mot_passes = new Array();
					for (var i=0;i<temp1.length;i++)
						mot_passes[i] = temp1[i].split(":[");   					// 2005   0.5:4,1.5:8, ...    2006    0.5:2,1.5:4, ...         2007   0.5:10,1.50, ...]
					
					
																// mot_passes[i][0]:  2005   2006  ... 2007          mot_passes[i][1]:  0.5:4,1.5:8, ...    0.5:2,1.5:4, ...    ... 0.5:10,1.50, ...]
					var temp3 = mot_passes[mot_passes.length-1][1].split("]");
					mot_passes[mot_passes.length-1][1] = temp3[0];   				// mot_passes[i][0]:  2005   2006  ... 2007          mot_passes[i][1]:  0.5:4,1.5:8, ...    0.5:2,1.5:4, ...    ... 0.5:10,1.50, ...
					mot_data_points_pass = new Array();
					pass_sums = new Array();	
					for(var i=0;i<mot_passes.length;i++){
						mot_data_points_pass = new Array();
						pass_sums[i] = 0;
						mot_data_points_pass =  mot_passes[i][1].split(",");              //mot_data_points_pass: 0.5:4  ,   1.5:8   , ...
						for(var j=0; j<mot_data_points_pass.length;j++){
								mot_data_points_pass[j] = mot_data_points_pass[j].split(":");  //mot_data_points_pass[j][1]: 4  ,  8   , ...
								//alert(mot_data_points_pass[j][1]);
								pass_sums[i] = pass_sums[i] + parseInt(mot_data_points_pass[j][1]);
						}
					}
                    mot_passes_per_year = new Array();
                    for (var i=0; i<mot_passes.length; i++){
                        switch(mot_passes[i][0]){
                            case "2005": mot_passes_per_year[0] = pass_sums[i];
                            break;
                            case "2006": mot_passes_per_year[1] = pass_sums[i];
                            break;
                            case "2007": mot_passes_per_year[2] = pass_sums[i];
                            break;
                            case "2008": mot_passes_per_year[3] = pass_sums[i];
                            break;
                            case "2009": mot_passes_per_year[4] = pass_sums[i];
                            break;
                            case "2010": mot_passes_per_year[5] = pass_sums[i];
                            break;
                            case "2011": mot_passes_per_year[6] = pass_sums[i];
                            break;
                            case "2012": mot_passes_per_year[7] = pass_sums[i];
                            break;
                            case "2013": mot_passes_per_year[8] = pass_sums[i];
                            break;
                        }
                    }
                    //alert(mot_passes_per_year);
				}
    
			
				if(json_data.mot_failure_rates != ''){
					var temp1 = new Array();
					temp1 = json_data.mot_failure_rates.split("],");   			//2005:[0.5:4,1.5:8, ...    2006:[0.5:2,1.5:4, ...         2007:[0.5:10,1.50, ...]
					var mot_fails = new Array();
					for (var i=0;i<temp1.length;i++)
						mot_fails[i] = temp1[i].split(":[");   					    // 2005   0.5:4,1.5:8, ...    2006    0.5:2,1.5:4, ...         2007   0.5:10,1.50, ...]
																					// mot_passes[i][0]:  2005   2006  ... 2007          mot_passes[i][1]:  0.5:4,1.5:8, ...    0.5:2,1.5:4, ...    ... 0.5:10,1.50, ...]
					var temp3 = mot_fails[mot_fails.length-1][1].split("]");
					mot_fails[mot_fails.length-1][1] = temp3[0];	
					mot_data_points_fail = new Array();
					fail_sums = new Array();
					for(var i=0;i<mot_fails.length;i++){
						mot_data_points_fail = new Array();
						fail_sums[i] = 0;
						mot_data_points_fail =  mot_fails[i][1].split(",");              //mot_data_points_pass: 0.5:4  ,   1.5:8   , ...
						for(var j=0; j<mot_data_points_fail.length;j++){
								mot_data_points_fail[j] = mot_data_points_fail[j].split(":");  //mot_data_points_pass[j][1]: 4  ,  8   , ...
								//alert(mot_data_points_pass[j][1]);
								fail_sums[i] = fail_sums[i] + parseInt(mot_data_points_fail[j][1]);
						}
					}
                    mot_fails_per_year = new Array();
                    for (var i=0; i<mot_fails.length; i++){
                        switch(mot_fails[i][0]){
                            case "2005": mot_fails_per_year[0] = fail_sums[i];
                            break;
                            case "2006": mot_fails_per_year[1] = fail_sums[i];
                            break;
                            case "2007": mot_fails_per_year[2] = fail_sums[i];
                            break;
                            case "2008": mot_fails_per_year[3] = fail_sums[i];
                            break;
                            case "2009": mot_fails_per_year[4] = fail_sums[i];
                            break;
                            case "2010": mot_fails_per_year[5] = fail_sums[i];
                            break;
                            case "2011": mot_fails_per_year[6] = fail_sums[i];
                            break;
                            case "2012": mot_fails_per_year[7] = fail_sums[i];
                            break;
                            case "2013": mot_fails_per_year[8] = fail_sums[i];
                            break;
                        }
                    }
                    //alert(mot_fails_per_year);
					//alert("no null");
				}
					// for(var i=0;i<pass_sums.length;i++){
						// alert(mot_passes[i][0] + ": " + pass_sums[i] + " passed\n" + mot_fails[i][0] + ": " + fail_sums[i] + " failed\n");
					// }
				var mot_total_pass = 0;
				var mot_total_fail = 0;
				if(	json_data.mot_pass_rates != ''){	
					for(var i=0;i<pass_sums.length;i++)
						mot_total_pass = mot_total_pass + pass_sums[i];
					current_mot_passes = mot_total_pass;
				}
				if(json_data.mot_failure_rates != ''){
					for(var i=0;i<fail_sums.length;i++)
						mot_total_fail = mot_total_fail + fail_sums[i];
					current_mot_fails = mot_total_fail;
				}
                
                // mapping: [0, 1, 2, 9, 4, 6, 10, 11, 8, 3+5+7+12+13]
                var temp4 = json_data.mot_failure_frequency.split(",");
                current_mot_fail_categories[0] = parseInt(temp4[0]);
                current_mot_fail_categories[1] = parseInt(temp4[1]);
                current_mot_fail_categories[2] = parseInt(temp4[2]);
                current_mot_fail_categories[3] = parseInt(temp4[9]);
                current_mot_fail_categories[4] = parseInt(temp4[4]);
                current_mot_fail_categories[5] = parseInt(temp4[6]);
                current_mot_fail_categories[6] = parseInt(temp4[10]);
                current_mot_fail_categories[7] = parseInt(temp4[11]);
                current_mot_fail_categories[8] = parseInt(temp4[8]);
                current_mot_fail_categories[9] = parseInt(temp4[3])+parseInt(temp4[5])+parseInt(temp4[7])+parseInt(temp4[12])+parseInt(temp4[13]);
				
				if(json_data.mot_vehicles_tested != ''){
					 var temp = json_data.mot_vehicles_tested.split(","); //2005:10     2006:4    ....
					 current_years_results = new Array();
					 for(var i=0;i<temp.length;i++)
						 current_years_results[i] = temp[i].split(":");
				}
				// //-------------------------------------
				
				
				minimum_of_valuation_dealer = Math.round(json_data.price_min_dealer);
                //alert(json_data.price_min_dealer);
				maximum_of_valuation_dealer = Math.round(json_data.price_max_dealer);
				mean_of_valuation_dealer = Math.round(json_data.price_mean_dealer); 
				if(request_from == "comparison"){
					comp_online_prices.push(mean_of_valuation);
					comp_dealers_prices.push(mean_of_valuation_dealer);
					comp_MOT_Passes.push(current_mot_passes);
					comp_MOT_Fails.push(current_mot_fails);
                    current_mot_fail_categories_stack.push(current_mot_fail_categories);
				}
			
				select_chart(which_model,which_chart);
				which_chart.hideLoading();
				document.getElementById("btn_submit").disabled = false;
				reset_switch = 1;
			},
			onFailure: function(transport) {
				//$(data_result).update("ERROR: " + transport.responseText);
				//alert("ERROR: " + transport.responseText);
			}
		});
	}
	else
		addNewCar();
}

function get_dynamic_data( params, resp_container_id ) {
	reset_selections(params.selected);
    
	new Ajax.Request('wp-content/themes/twentythirteen/tools/data_selection.php', {
		method:'get',
		parameters: Object.extend( $('car_selection').serialize(true), params ),
		onSuccess: function(data) {
			$(resp_container_id).update(data.responseText);
		},
		onFailure: function() { 
			//alert('Something went wrong...'); 
		}
	});
}

function reset_selections(selected) {
	switch( selected )
	{
		case "make":
			$("trim").update("");
            $("body_type").update("");
			break;
		case "model":
			$("body_type").update("");
			break;
		default:
			break;
	}	
}

/* Returns list of vehicle data based on selected budget. **/
function get_budget_data( params, resp_container_id ) {
	new Ajax.Request('wp-content/themes/twentythirteen/tools/data_selection.php', {
	    method:'get',
	    parameters: Object.extend( $('form_budget_selection').serialize(true), params ),
            onSuccess: function(data) {
            /* 
            response is a JSON formatted array of cars with these parameters: make, model, body_type, year, color, mileage, transmission, engine_size, fuel_type, price
            {[{'make':'Audi', 'model':'A1', 'body_type':'Hatchback'}, {'make':'Audi', 'model':'A2', 'body_type':'Hatchback'}]}
            loop through results:
            var json_data = eval(data.responseText.evalJSON());
            var res = "";
            for( var i = 0; i < json_data.length; i++ ) {
                res += '<div>' + json_data[i].make + '<div>';
                res += '<div>' + json_data[i].model + '<div>';
            }
            */
		
	    //alert(data.responseText);
        var car_options_tbl = document.getElementById("car_options_table");
		var json_data = eval(data.responseText.evalJSON());
        var rowss = car_options_tbl.rows.length;        
        miniCharts_form_data = new Array();
		comp_categories =new Array();
		comp_categories_full_label =new Array();
		comp_MOT_Passes =new Array();
		comp_MOT_Fails =new Array();
		com_Deps = new Array();
		comp_online_prices = new Array();
		comp_dealers_prices = new Array();
		comparitive_counter = 0;
        for (var i=1;i<rowss;i++){
            car_options_tbl.deleteRow(rowss-i);
        }
        
        for (var i=1;i<json_data.length;i++){
            var car_options_btn_id = "car_options_btn_id_" + i;
            var model_string = json_data[i].make + ", " + json_data[i].model + ", " + json_data[i].body_type + ", " + json_data[i].engine_size + ", " + json_data[i].year + ", " + json_data[i].fuel_type + ", (" + json_data[i].mileage + " miles)"; //, £" + json_data[i].price + ")"; 
            var row = car_options_tbl.insertRow(car_options_tbl.rows.length);
            var cell = row.insertCell(0);
            var production_year = this_year - json_data[i].year; 
            var model_engine_size;
            if (json_data[i].engine_size <= 1.3){
                model_engine_size = "1_1.3";
            }
            else if (json_data[i].engine_size <= 1.6){
                model_engine_size = "1.4_1.6";
            }
            else if (json_data[i].engine_size <= 1.9){
            model_engine_size = "1.7_1.9";
            }
            else if (json_data[i].engine_size <= 2.5){
            model_engine_size = "2_2.5";
            }
            else if (json_data[i].engine_size <= 2.9){
            model_engine_size = "2.6_2.9";
            }
            else if (json_data[i].engine_size <= 3.9){
            model_engine_size = "3_3.9";
            }
            else if (json_data[i].engine_size <= 4.9){
            model_engine_size = "4_4.9";
            }
            else {
            model_engine_size = "5_10";
            }
                 
            var param1 = '{"req_type":"get_car_data","make":"' + json_data[i].make + '","model":"' + json_data[i].model + '","body_type":"' + json_data[i].body_type + '","fuel_type":"' + json_data[i].fuel_type + '","engine_size":"' + model_engine_size + '","year":"' + production_year + '","mileage":"' + json_data[i].mileage + '","color":"any","transmission":"' + json_data[i].transmission + '","doors":"0"}';
            miniCharts_form_data.push(param1);
            cell.innerHTML = "<button type='button' id=" + car_options_btn_id + "class='btn_options' value='0' style='font-size:0.85vw;text-align:left;border: none;' name='test1' onClick='on_model_select(this.id,this.value)'>" + model_string + "</button>";    
        }
	    
        },
		onFailure: function() { 
		    //alert('Something went wrong...'); 
		}
	});
}

var comp_indices = [];
var comparitive_counter = 0;
var previous_model ="";
function on_model_select(e_id,e_val,par){
    var str = e_id.split("class")[0];
    budget_active = 1;
    var model_index = e_id.slice(19,str.length);
	
    // styles the selected car button
	var obj = JSON.parse(miniCharts_form_data[model_index-1]);
    var items_table = document.getElementById("comparison_items");
    if(e_val == 0){
        if(comparitive_counter<4){
            document.getElementById(e_id).style.color = "#FFFFFF";
            document.getElementById(e_id).style.backgroundColor = "#617889";
            document.getElementById(e_id).style.fontWeight = "bold";
            document.getElementById(e_id).value = "1";
			comp_categories.push(obj.make + "<br>" + obj.model);
			var full_year = this_year - parseInt(obj.year);
			comp_categories_full_label.push("<b>" + obj.make + " " + obj.model + "</b>, " + obj.body_type + ", " + obj.fuel_type + ", " + obj.engine_size + " lit, <b>" + full_year + "</b>, " + obj.mileage + " miles, " + obj.transmission);
			comp_indices.push(obj);
            //comp_MOT_Passes.push(70-comparitive_counter*10);
			//comp_MOT_Fails.push(30+comparitive_counter*10);
            var priceSeries1 = {"name": obj.make + "  " + obj.model + "  " + obj.engine_size + "  " + full_year, "color": com_Deps_colors[comparitive_counter], "marker":{"symbol": "circle"}, "data": depretiation_sample_data[comparitive_counter]};
            com_Deps.push(priceSeries1);
            if(comparitive_counter == 0){
                reset_option1('chart_container','');
                chart_car = new Highcharts.Chart(options1);
                ajax_request('',obj,chart_car,'summary', 'comparison');
                document.getElementById("tool1_btn").style.color = "rgba(150,50,50,1)";
                document.getElementById("tool2_btn").style.color = "rgba(50,50,150,1)";
            }
            else{
                //Logic for comparison charts
                reset_option1('chart_container','');
                chart_car = new Highcharts.Chart(options1);
                ajax_request('',obj,chart_car,'comparison', 'comparison');
            }
            comparitive_counter++;
        }
    }
    else{
        document.getElementById(e_id).style.color = "#000000";
        document.getElementById(e_id).style.backgroundColor = "#FFFFFF";      
        document.getElementById(e_id).style.fontWeight = "normal";
        document.getElementById(e_id).value = "0";
		var index = comp_categories.indexOf(obj.make + "<br>" + obj.model);
		comp_categories.splice(index, 1);
		comp_categories_full_label.splice(index, 1);
		comp_MOT_Passes.splice(index, 1);
		comp_MOT_Fails.splice(index, 1);
		comp_indices.splice(index, 1);
		comp_online_prices.splice(index, 1);
		comp_dealers_prices.splice(index, 1);
        com_Deps.splice(index, 1);
		
        comparitive_counter--;
		if (comparitive_counter == 1){
			reset_option1('chart_container','');
            chart_car = new Highcharts.Chart(options1);
            ajax_request('',comp_indices[0],chart_car,'summary', '');
		}
		else if (comparitive_counter == 0){
			comp_categories = new Array();
			comp_MOT_Passes = new Array();
			comp_MOT_Fails = new Array();
			comp_indices = new Array();
            com_Deps = new Array();
			comp_online_prices = new Array();
			comp_dealers_prices = new Array();
			comp_categories_full_label = new Array();
			chart_car = new Highcharts.Chart(options0);
            select_chart('blank',chart_car,'');
		}
        else {
            reset_option1('chart_container','');
            chart_car = new Highcharts.Chart(options1);
            ajax_request('',obj,chart_car,'comparison', '');
        }
    }
}

var plotLines = [{"id": "price_mean"}, {"id":"price_min"}, {"id":"price_max"}];
//var chart_car;
var make_model_title = "";
var make_model_subtitle = "";

/*
document.observe("dom:loaded", function() {
    chart_car = new Highcharts.Chart(options1);	
});
*/
var your_car = car_make + "  " + car_model + "  " + car_engine + "  " + car_year;
var options0 = {
    chart: {
        renderTo: 'chart_container',
        alignTicks: true,
        marginTop: 50,
        showAxes: true,
        //backgroundColor: '#FFFFFF',
        //borderColor: '#527D9C',
        //height:chart_height,
        //borderWidth: 2,
        //borderRadius: 8,
        spacingTop: 200
        //plotBackgroundColor: '#FFFFFF',
        //zoomType: 'x'
    },
    title: {
        text: ''
    },
    credits: {
            enabled: false
        },
    yAxis: {
        title: {
            text: ''
        }
    },
	xAxis: {
		gridLineWidth: 0,
        labels: {
            enabled: false
        }
    },
    exporting: {
        enabled: false
    }
}

function reset_option1(chart_target,chart_size){
    options1 = {
        chart: {
            renderTo: chart_target,
            type: 'column',
            alignTicks: true,
            marginTop: 65,
            showAxes: true,
            //backgroundColor: '#FFFFFF',
            //borderColor: '#527D9C',
			height:chart_size,
            //borderWidth: 2,
			//borderRadius: 8,
            spacingTop: 200
            //plotBackgroundColor: '#FFFFFF',
            //zoomType: 'x'
        },
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Valuation Model (Online)',
	    align: 'left',
            verticalAlign: 'top',
            floating: true,
 	    x: 0,
            y: -180,
            padding: 2,
	    style: {
                   font: '0.95vw Trebuchet MS, Verdana, sans-serif',
                   color: '#000',
                   fontWeight: 'bold'
            }
        },
        subtitle: {
	    text:  make_model_subtitle,
	    align: 'left',
            verticalAlign: 'top',
            floating: true,
 	    x: 0,
            y: -160,
            padding: 2
		}, 
        tooltip: {
            borderWidth: 1,
            formatter: function () {
                return '<b>£' + Math.round(this.x - range/2) + '-£' + Math.round(this.x + range/2) + '   ' + '</b><br/>' + '<b>Freq:</b> ' + this.y + ' ';
            },
            backgroundColor: '#C5FFFC',
            crosshairs: false,
            valueDecimals: 2,
            valuePrefix: '£',
            valueSuffix: ' GBP'
        },
		loading: {
            labelStyle: {
                color: 'white'
            },
            style: {
                backgroundColor: 'rgba(50,50,50,1)'
            }
        },
        xAxis: {
            lineColor: '#c0D0E0',
            tickColor: '#c0D0E0',
            plotLines: plotLines,
            max: null,
            //tickInterval: 1
            title: {
                text: 'Value (£)'
            }
        },
        yAxis: {
            title: {
                text: 'Frequency'
            },
            tickWidth: 1,
            tickLength: 3,
            tickColor: '#ccc',
            lineColor: '#ccc',
            endOnTick: false,
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: true,
 	    x: 0,
            y: -190,
            padding: 2,
            style: {
                   font: '0.5vw Trebuchet MS, Verdana, sans-serif',
                   color: '#000',
                   fontWeight: 'bold'
            }
        },
		plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Similar Cars',
            type: 'column',
            borderWidth: 0.1,
            borderColor: 'rgba(0,24,70,1)', //'#006699',
            pointPadding: 0.065,
            groupPadding: 0,
			shadow: false,
            color: 'rgba(0,84,120,0.5)', //'#006699',
            data: []
        },{
            name: 'Your Car',
            type: 'column',
            borderWidth: 0.1,
            borderColor: 'rgba(20,20,20,1)',//'#000000',
            pointPadding: 0.065,
            groupPadding: 0,
			shadow: false,
            color: 'rgba(200,0,0,0.6)',//'#202020',
            data: []
        }]
    }
}
 
var options2 = {
	chart: {
		renderTo: 'chart_container',
		type: 'line',
		alignTicks: true,
		marginTop: 65,
		showAxes: true,
		//backgroundColor: '#FFFFFF',
		//borderColor: '#527D9C',
		//height:360,
		//borderWidth: 2,
		//borderRadius: 8,
		spacingTop: 200
		//plotBackgroundColor: '#FFFFFF',
		//zoomType: 'x'
	},
    credits: {
            enabled: false
        },
	title: {
		text: 'Depreciation Model',	
	align: 'left',
		verticalAlign: 'top',
		floating: true,
	x: 0,
		y: -180,
		padding: 2,
	style: {
			   font: '0.95vw Trebuchet MS, Verdana, sans-serif',
			   color: '#000',
			   fontWeight: 'bold'
		}
	},
	subtitle: {
	text:  '',
	align: 'left',
		verticalAlign: 'top',
		floating: true,
	x: 0,
		y: -160,
		padding: 2
	}, 
	tooltip: {
		borderWidth: 1,
		formatter: function () {
			return '<b>Value: £</b> ' + this.y + ' ';
		},
		backgroundColor: '#C5FFFC',
		crosshairs: false,
		valueDecimals: 2,
		valuePrefix: '£',
		valueSuffix: ' GBP'
	},
	loading: {
		labelStyle: {
			color: 'white'
		},
		style: {
			backgroundColor: 'rgba(50,50,50,1)'
		}
	},
	xAxis: {
		lineColor: '#c0D0E0',
		tickColor: '#c0D0E0',
		plotLines: plotLines,
		max: null,
		type: 'date',
		title: {
			text: 'Date'
		}
	},
	yAxis: {
		title: {
			text: 'Value (£)'
		},
		tickWidth: 1,
		tickLength: 3,
		tickColor: '#ccc',
		lineColor: '#ccc',
		endOnTick: false,
	},
	legend: {
		layout: 'vertical',
		align: 'right',
		verticalAlign: 'top',
		floating: true,
		x: 0,
		y: -190,
		padding: 2,
        style: {
                   font: '0.5vw Trebuchet MS, Verdana, sans-serif',
                   color: '#000',
                   fontWeight: 'bold'
            }
	},
	series: [],
	navigation: {
		buttonOptions: {
			theme: {
				style: {
					color: '#039',
					textDecoration: 'underline',
					background: '#900'
				}
			}
		}
	},
	exporting: {
		buttons: {
			contextButton: {
				enabled: false
			},
			exportButton2: {
				text: 'Remove',
				verticalAlign: 'top',
				y: -195,
				align: 'center',
				style: {
				   font: '0.7vw Trebuchet MS, Verdana, sans-serif',
				   color: '#000',
				   fontWeight: 'bold'
				},
				onclick: function () {
					var priceLength = priceSeriesArray.length;
					if (priceLength > 2){
						priceSeriesArray.splice(priceLength-2,2);
						chart_car = new Highcharts.Chart(options2);
						for(var i=0;i<priceSeriesArray.length;i++){
								chart_car.addSeries(priceSeriesArray[i]);
						}
					}
				}
			}
		}
	}
}

var options3 = {
        chart: {
            renderTo: 'chart_container',
            type: 'column',
            alignTicks: true,
            marginTop: 65,
            showAxes: true,
            //backgroundColor: '#FFFFFF',
            //borderColor: '#527D9C',
			//height:360,
            //borderWidth: 2,
			//borderRadius: 8,
            spacingTop: 200
            //plotBackgroundColor: '#FFFFFF',
            //zoomType: 'x'
        },
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Valuation Model (Dealers)',
	    align: 'left',
            verticalAlign: 'top',
            floating: true,
 	    x: 0,
            y: -180,
            padding: 2,
	    style: {
           font: '0.95vw Trebuchet MS, Verdana, sans-serif',
           color: '#000',
           fontWeight: 'bold'
            }
        },
        subtitle: {
	    text:  make_model_subtitle,
	    align: 'left',
            verticalAlign: 'top',
            floating: true,
 	    x: 0,
            y: -160,
            padding: 2
		}, 
        tooltip: {
            borderWidth: 1,
            formatter: function () {
                return '<b>£' + Math.round(this.x - range/2) + '-£' + Math.round(this.x + range/2) + '   ' + '</b><br/>' + '<b>Freq:</b> ' + this.y + ' ';
            },
            backgroundColor: '#C5FFFC',
            crosshairs: false,
            valueDecimals: 2,
            valuePrefix: '£',
            valueSuffix: ' GBP'
        },
		loading: {
            labelStyle: {
                color: 'white'
            },
            style: {
                backgroundColor: 'rgba(50,50,50,1)'
            }
        },
        xAxis: {
            lineColor: '#c0D0E0',
            tickColor: '#c0D0E0',
            plotLines: plotLines,
            max: null,
            //tickInterval: 1
            title: {
                text: 'Value (£)'
            }
        },
        yAxis: {
            title: {
                text: 'Frequency'
            },
            tickWidth: 1,
            tickLength: 3,
            tickColor: '#ccc',
            lineColor: '#ccc',
            endOnTick: false,
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: true,
 	    x: 0,
            y: -190,
            padding: 2,
            style: {
                   font: '0.5vw Trebuchet MS, Verdana, sans-serif',
                   color: '#000',
                   fontWeight: 'bold'
            }
        },
		plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Similar Cars',
            type: 'column',
            borderWidth: 0.1,
            borderColor: 'rgba(0,24,70,1)', //'#006699',
            pointPadding: 0.065,
            groupPadding: 0,
			shadow: false,
            color: 'rgba(0,84,120,0.5)', //'#006699',
            data: []
        },{
            name: 'Your Car',
            type: 'column',
            borderWidth: 0.1,
            borderColor: 'rgba(20,20,20,1)',//'#000000',
            pointPadding: 0.065,
            groupPadding: 0,
			shadow: false,
            color: 'rgba(200,0,0,0.6)',//'#202020',
            data: []
        }]
 }

var options4;
function reset_option4(current_mot_fail_categories_stk, current_years_res1, current_years_passes, current_years_fails){
    options4 = {
        chart: {
			renderTo: 'chart_container',
            //plotBackgroundColor: null,
            plotBorderWidth: 0,
			marginTop: 65,
			marginLeft: 50,
            backgroundColor: '#FFFFFF',
            //borderColor: '#527D9C',
			//height:360,
            //borderWidth: 2,
			//borderRadius: 8,
			spacingTop: 200
            //plotBackgroundColor: '#FFFFFF',
            //zoomType: 'x'
		},
        credits: {
            enabled: false
        },
        title: {
			text: 'MOT Test Results',	
			align: 'left',
			verticalAlign: 'top',
			floating: true,
			x: 0,
			y: -180,
			padding: 2,
			style: {
			   font: '0.95vw Trebuchet MS, Verdana, sans-serif',
			   color: '#000',
			   fontWeight: 'bold'
			}
		},
		yAxis: {
			title: {
                text: '%'
            },
			max: 215,
			 labels: {
                enabled: false,
                style: {
                    fontSize: '0.6vw'
				}
			}
		},
        xAxis: {
			title: {
                text: 'MOT Year'
            },
			type: 'category',
            labels: {
                style: {
                    fontSize: '0.6vw',
                    fontFamily: 'Verdana, sans-serif',
					fontWeight: 'bold',
					color: '#000000'
                }
            },
            categories: current_years_res1
        },
		exporting: {
            enabled: false
        },
		legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: true,
			x: 0,
            y: -190,
            padding: 2
        },
        //tooltip: {borderWidth: 1,formatter: function () {return 'Total MOT Records' + ': <b>' + current_years_res1 + '</b>';}, backgroundColor: '#EEEEEE', crosshairs: false, valueDecimals: 2},
        series: [{
            type: 'column',
            stacking: 'percent',
            dataLabels: {
                enabled: true,
                format: "<strong><h4>{point.name}</h4><br>{point.percentage:.0f}%</strong>",
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                font: '0.9vw Trebuchet MS, Verdana, sans-serif',
                style: {
                    textShadow: '0 0 0.9vw black'
                }
            },
            name: 'MOT Fails',
            data: current_years_passes, //current_years_res2,  
			color: com_Deps_colors[1] //pie_colors[MOT_sub_categories_color]//Highcharts.getOptions().colors[MOT_sub_categories_color]
         },
         {
            type: 'column',
            stacking: 'percent',
            dataLabels: {
                enabled: true,
                format: "<strong><h4>{point.name}</h4><br>{point.percentage:.0f}%</strong>",
                color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                font: '0.9vw Trebuchet MS, Verdana, sans-serif',
                style: {
                    textShadow: '0 0 0.9vw black'
                }
            },
            name: 'MOT Passes',
            data: current_years_fails, //current_years_res2,  
			color: com_Deps_colors[3]
        }
         ,{
            type: 'pie',   
            name: 'Failed Total',
			startAngle: -90,
            endAngle: 90,
			center: ['25%', '40%'],
			innerSize: '30%',
			allowPointSelect: true,
			cursor: 'pointer',
            size: '80%',
			    data: [{
                name: MOT_main_categories[0],
                y: current_mot_fail_categories_stk[0],
                color: pie_colors[0] 
            }, {
                name: MOT_main_categories[1],
                y: current_mot_fail_categories_stk[1],
				//sliced: true,
                //selected: true,
                color: pie_colors[1] 
            }, {
                name: MOT_main_categories[2],
                y: current_mot_fail_categories_stk[2],
                color: pie_colors[2] 
            }, {
                name: MOT_main_categories[3],
                y: current_mot_fail_categories_stk[3],
                color: pie_colors[3] 
            }, {
                name: MOT_main_categories[4],
                y: current_mot_fail_categories_stk[4],
                color: pie_colors[4] 
            },{
                name: MOT_main_categories[5],
                y: current_mot_fail_categories_stk[5],
                color: pie_colors[5] 
            },{
                name: MOT_main_categories[6],
                y: current_mot_fail_categories_stk[6],
                color: pie_colors[6] 
            },{
                name: MOT_main_categories[7],
                y: current_mot_fail_categories_stk[7],
                color: pie_colors[7] 
            },{
                name: MOT_main_categories[8],
                y: current_mot_fail_categories_stk[8],
                color: pie_colors[8] 
            },{
                name: MOT_main_categories[9],
                y: current_mot_fail_categories_stk[9],
                color: pie_colors[9] 
            }],
            dataLabels: {
                enabled: true,
				style: {
                    fontSize: '0.8vw',
                    fontFamily: 'Verdana, sans-serif',
					fontWeight: 'bold',
					color: '#000044'
                }
            }
        }
		]
 }
}

var options5;
function reset_option5(chart_target_t,chart_size_t, chart_type_t, cat_t, chart_style_opt, plot_opt, tool_tip, plot_leg, plot_y){
	options5 = {
        chart: {
            renderTo: chart_target_t,
			height:chart_size_t,
			alignTicks: true,
			marginTop: 30,
			showAxes: false,
			spacingTop: 3
        },
        credits: {
            enabled: false
        },
		title: {
			text: '',
            style: {
			   font: '0.9vw Trebuchet MS, Verdana, sans-serif',
			   color: '#000',
			   fontWeight: 'bold'
			}
		},
        legend: plot_leg,
		exporting: {
            enabled: false
        },
        xAxis: cat_t,
        yAxis: plot_y, 
        /*yAxis: {
            labels: {
                rotation: -45
            }
        },*/
		plotOptions: { 
			boxplot: {
				fillColor: '#C0C0C0', //'#F0F0E0',
                edgeColor: 'black',
                lineWidth: 2,
                color: '#505050',
                medianColor: '#009CCF',
                medianWidth: 2,
				pointWidth: 35,
                stemColor: 'black',
                stemDashStyle: 'dot',
                stemWidth: 2,
                whiskerColor: 'black',
                whiskerLength: '20%',
                whiskerWidth: 2
			},
			pie: {
				size:'85%',
                dataLabels: chart_style_opt
			},
			line: {
				lineColor: '#505050',
				color: '#00CCFF'
			},
			column: {
				stacking: 'percent',
                dataLabels: {
                    enabled: true,
					format: "<strong><h4>{point.name}</h4><br>{point.percentage:.0f}%</strong>",
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    font: '0.9vw Trebuchet MS, Verdana, sans-serif',
                    style: {
                        textShadow: '0 0 0.9vw black'
                    }
                }
			}, 			
			bar: {
                dataLabels: {
                    enabled: true,
					color: 'black',
                    
					style: {
                        font: '0.6vw Trebuchet MS, Verdana, sans-serif',
                        textShadow: '0 0 0.6vw white',
                        fontWeight: 'bold'
                    }
                }
			}
		},
		tooltip: tool_tip,
		//dataLabels: chart_style_opt,
        series: [{
		type: chart_type_t,
		events: {
           click: function (event) {
                switch(chart_type_t){
                    case('boxplot'): select_chart('valuation', chart_car);
                    break;
                    case('line'): select_chart('depreciation', chart_car);
                    break;
                    case('pie'): select_chart('mot', chart_car);
                    break;
					case('column'): alert("test");//select_chart('mot', chart_car);
                    break;
                }
           }
		},
		data: []
		}]

    }
}

function select_chart(c,cn,ch_size){
	switch(c){
		case 'blank':
		{
            document.getElementById("summary_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("valuation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("depreciation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("dealers_valuation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("mot_btn").style.color = "rgba(150,50,50,1)";
			//document.getElementById("tool1_btn").style.color = "rgba(50,50,150,1)";
			document.getElementById("model1_btn").style.color = "rgba(50,50,150,1)";
			document.getElementById("chart_container").style.display ="block";
			document.getElementById("summary_charts").style.display = "none";
            document.getElementById("comparison_table").style.display ="none";
			//document.getElementById("comparison_items").style.display ="none";
			document.getElementById("chart_explanation").style.display = "none";
            document.getElementById("left_side_nav_img").style.display = "none";
            document.getElementById("right_side_nav_img").style.display = "none";
			chart_height = document.getElementById("chart_container").offsetHeight-10;
			cn = new Highcharts.Chart(options0);
			cn.renderer.image('http://car.khash777.webfactional.com/v2/wp-content/themes/twentythirteen/tools/model.jpeg',4,4,document.getElementById("chart_container").offsetWidth-10,document.getElementById("chart_container").offsetHeight-10).add();
			mode_switch = "blank";
            main_chart_container_width = document.getElementById("chart_container").offsetWidth;
            main_chart_container_heigth = document.getElementById("chart_container").offsetHeight;
			document.getElementById("btn_submit").style.background = "#478bb8";
			document.getElementById("btn_submit").value = "Evaluate";
		}
		break;
        case 'summary':
		{
			var table1 = document.getElementById("summary_charts");
			document.getElementById("valuation_btn").disabled = false;
			document.getElementById("depreciation_btn").disabled = false;
			document.getElementById("dealers_valuation_btn").disabled = false;
			document.getElementById("mot_btn").disabled = false;
			document.getElementById("summary_btn").disabled = false;
			document.getElementById("summary_btn").style.color = "rgba(50,50,150,1)";
			document.getElementById("valuation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("depreciation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("dealers_valuation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("mot_btn").style.color = "rgba(150,50,50,1)";
			//document.getElementById("tool1_btn").style.color = "rgba(50,50,150,1)";
			document.getElementById("model1_btn").style.color = "rgba(50,50,150,1)";
            document.getElementById("chart_container").style.display ="block";
			document.getElementById("btn_submit").style.background = "#478bb8";
            document.getElementById("left_side_nav_img").style.display = "block";
            document.getElementById("right_side_nav_img").style.display = "block";
			document.getElementById("btn_submit").value = "Evaluate";
			chart_height = document.getElementById("chart_container").offsetHeight-10;
			if(reset_switch == 1){
				if(table1.rows[0].cells.length>0){
					table1.rows[1].deleteCell(cell_12);
					table1.rows[1].deleteCell(cell_11);
					table1.rows[1].deleteCell(cell_10);
					table1.rows[0].deleteCell(cell_00);
					table1.rows[0].deleteCell(cell_01);
					table1.rows[0].deleteCell(cell_02);
				}
				
				cell_00 = table1.rows[0].insertCell(0); 
				cell_01 = table1.rows[0].insertCell(1);  
				cell_02 = table1.rows[0].insertCell(2);
				cell_10 = table1.rows[1].insertCell(0);
				cell_11 = table1.rows[1].insertCell(1); 
				cell_12 = table1.rows[1].insertCell(2);
			 
				cell_00.innerHTML = "<div id='chart_tbl_00'></div>";
				cell_00.id = "summary_cell_00";
				var pix_width = 30 * (main_chart_container_width/80) + 'px';  
				cell_00.style.width = pix_width;
				    
				cell_01.innerHTML = "<div id='chart_tbl_01'></div>";
				cell_01.id = "summary_cell_01";
				var pix_width = 26 * (main_chart_container_width/80) + 'px';        
				cell_01.style.width = pix_width;
				
				cell_02.id = "summary_cell_02";				
				var pix_width = 23 * (main_chart_container_width/80) + 'px';        
				cell_02.style.width = pix_width;
  
				cell_10.innerHTML = "<div id='chart_tbl_10'></div>";
				cell_10.id = "summary_cell_10";
				//cell_10.colSpan="2";
				var pix_width = 30 * (main_chart_container_width/80) + 'px';         
				cell_10.style.width = pix_width;	
 
				cell_11.innerHTML = "<div id='chart_tbl_11'></div>";
				cell_11.id = "summary_cell_11";
				//cell_11.colSpan="2";
				var pix_width = 26 * (main_chart_container_width/80) + 'px';         
				cell_11.style.width = pix_width;
				 
				cell_12.innerHTML = "<div style='font-size:1.5vw;text-align:center'}><span id = 'summary_vehicle_title' style='font-size:1.2vw;line-height: 30%;text-align:center; font-weight:bold;color:rgba(150,50,50,1)'></span></div><div id='summary_description' style='background-color: #f3f3ff; height: '85%'; margin-top:0px'><span id = 'summary_vehicle_description' style='line-height: 1.5'></span></div>";
				cell_12.id = "summary_cell_12";
				cell_12.style.height = "100%";
				cell_12.style.verticalAlign = "top";
				var pix_width = 23 * (main_chart_container_width/80) + 'px';         
				cell_12.style.width = pix_width;
				
				reset_option5('summary_cell_00',3*(main_chart_container_heigth/5), 'line', {type:'date'}, '', '', {borderWidth: 1,formatter: function () {return 'Year: <b>' + this.x + '   ' + '</b><br/>' + 'Value: <b>' + this.y + '</b>';}, backgroundColor: '#C5FFFC', crosshairs: false, valueDecimals: 2}, {enabled: false});
				cn = new Highcharts.Chart(options5);
                for(var i=0;i<priceSeriesArray.length;i++){
                    cn.addSeries(priceSeriesArray[i]);
                }
				/* var arr_data = new Array();
				arr_data.push();
				cn.series[0].setData(depretiation_this_model); */
				cn.yAxis[0].setTitle({ text: "", rotation: 0});
				cn.setTitle({ text: "Depreciation", style: {fontSize: "0.8vw"}});
				
				reset_option5('summary_cell_01',3*(main_chart_container_heigth/5), 'pie', '',
                {enabled: true, format: "<strong><h4>{point.name}</h4><br>{point.percentage:.0f}%</strong>", distance: -35, color: "white"}, '', 
                {borderWidth: 1, format: '<h3>{point.name}</h3>: {point.percentage:.1f} %', backgroundColor: '#C5FFFC', crosshairs: false, valueDecimals: 2}, {enabled: false}); //format: '<b>{point.name}</b>: {point.percentage:.1f} %'
				cn = new Highcharts.Chart(options5);
				var arr_data = new Array();
				arr_data.push({name: "Passed", color: com_Deps_colors[3], y: current_mot_passes},{name: "Failed",color: com_Deps_colors[1],y: current_mot_fails});
				cn.series[0].setData(arr_data);
				cn.setTitle({ text: "MOT Test Results", style: {fontSize: "0.8vw"}});
				
				if(car_make_from_valuation == "Audi")
					cell_02.innerHTML = "<img id='img_chart_tbl_02' width=" + pix_width + " src ='http://car.khash777.webfactional.com/v2/wp-content/themes/twentythirteen/tools/Audi.jpg'></img>";
				else
					cell_02.innerHTML = "<img id='img_chart_tbl_02' width=" + pix_width + " src ='' alt='Missing car photo!'></img>";
				
				if(global_model_valuation_data.length == 0){
						cell_10.innerHTML = "<h4 style='text-align: center; color:gray'>Data Unavailable!</h4>";
				}
				else {
					reset_option5('summary_cell_10',3*(main_chart_container_heigth/5), 'boxplot', {type: 'categories', categories: ['']}, '', '', {enabled:false}, {enabled: false});
					cn = new Highcharts.Chart(options5);
					var arr_data = new Array();
					arr_data.push({ low: minimum_of_valuation, q1: minimum_of_valuation, median: mean_of_valuation, q3: maximum_of_valuation, high: maximum_of_valuation });
					cn.series[0].setData(arr_data);
					cn.yAxis[0].setTitle({ text: "", rotation: 0});
                    cn.setTitle({ text: "Online Valuation", style: {fontSize: "0.8vw"}});
                    if (minimum_of_valuation != mean_of_valuation)
                        Show_Analysis_for_Summary_Charts(cn, minimum_of_valuation, mean_of_valuation, maximum_of_valuation);
                    else
                        Show_Analysis_for_Summary_Charts_Only_One_Data(cn, mean_of_valuation);
					
					/* var other_graph_max = cn.yAxis[0].getExtremes().max;
					var other_graph_min = cn.yAxis[0].getExtremes().min; */
				}
				
									
				if(global_model_valuation_data_dealer.length == 0){
						cell_11.innerHTML = "<h4 style='text-align: center; color:gray'>Dealers Data Unavailable!</h4>";
				}
				else {
					reset_option5('summary_cell_11',3*(main_chart_container_heigth/5), 'boxplot', {type: 'categories', categories: ['']}, '', '', {enabled:false}, {enabled: false});
					//ch_var_valuation[counter-1] = new Highcharts.Chart(options1);
					cn = new Highcharts.Chart(options5);
					var arr_data = new Array();
					arr_data.push({ low: minimum_of_valuation_dealer, q1: minimum_of_valuation_dealer, median: mean_of_valuation_dealer, q3: maximum_of_valuation_dealer, high: maximum_of_valuation_dealer });
					cn.series[0].setData(arr_data);
					cn.yAxis[0].setTitle({ text: "" });
                    cn.setTitle({ text: "Dealers Valuation", style: {fontSize: "0.8vw"}});
                    if (minimum_of_valuation_dealer != mean_of_valuation_dealer)
                            Show_Analysis_for_Summary_Charts(cn, minimum_of_valuation_dealer, mean_of_valuation_dealer, maximum_of_valuation_dealer);
                    else
                        Show_Analysis_for_Summary_Charts_Only_One_Data(cn, mean_of_valuation_dealer);
				}
                
                /* // Setting the extremes of dealers' summary graph of valuation similar to the on-line valuation graph extremes
                if (minimum_of_valuation_dealer>other_graph_min && maximum_of_valuation_dealer<other_graph_max){
                        cn.yAxis[0].setExtremes(other_graph_min, other_graph_max);
                } */
				
				var model_year = this_year-parseInt(car_year_from_valuation);
				var sum_veh_title = document.getElementById("summary_vehicle_title");
				var your_car = car_make_from_valuation + "  " + car_model_from_valuation + "  " + car_engine_from_valuation + "  " + model_year;
				sum_veh_title.innerHTML = your_car;
				reset_switch = 0;
				var sum_veh_desc = document.getElementById("summary_vehicle_description");
				sum_veh_desc.innerHTML = "<p style='margin-to:0em; margin-bottom:0.5em; font-size:0.85vw'>The average value of the car is <b>£" + mean_of_valuation + "</b>, which is calculated from on-line trading big data-set.</p>" +
										 "<p style='margin-to:0em; margin-bottom:0.5em; font-size:0.85vw'>The estimated dealers' valuation is <b>£" + mean_of_valuation_dealer + "</b>.</p>" +
										 "<p style='margin-to:0em; margin-bottom:0.5em; font-size:0.85vw'>The estimated depreciation rate is <b>14%</b>; therefore, this car is expected to worth about <b>£5200 in 2016</b> and about <b>£4450 in 2017</b>.</p>" +
										 "<p style='margin-to:0em; margin-bottom:0.5em; font-size:0.85vw'>MOT results of <b>70% PASS</b> and <b>30% FAIL</b> for <b>2005-2015</b> suggest this car as <b>VERY RELIABLE.</p>";
            }
            document.getElementById("chart_container").style.display ="none";
            document.getElementById("comparison_table").style.display ="none";
			//document.getElementById("comparison_items").style.display ="none";
			document.getElementById("chart_explanation").style.display = "none";
            document.getElementById("summary_charts").style.display = "block";
			mode_switch = "summary";
            //main_chart_container_width = document.getElementById("chart_container").offsetWidth;
            //main_chart_container_heigth = document.getElementById("chart_container").offsetHeight;
		}
		break;
		case 'valuation':
		{
            document.getElementById("summary_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("valuation_btn").disabled = false;
			document.getElementById("depreciation_btn").disabled = false;
			document.getElementById("dealers_valuation_btn").disabled = false;
			document.getElementById("mot_btn").disabled = false;
			document.getElementById("summary_btn").disabled = false;
			document.getElementById("valuation_btn").style.color = "rgba(50,50,150,1)";
			document.getElementById("depreciation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("dealers_valuation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("mot_btn").style.color = "rgba(150,50,50,1)";
			//document.getElementById("tool1_btn").style.color = "rgba(50,50,150,1)";
			document.getElementById("model1_btn").style.color = "rgba(50,50,150,1)";
			document.getElementById("chart_container").style.display ="block";
			document.getElementById("summary_charts").style.display = "none";
			document.getElementById("chart_explanation").style.display = "block";
            reset_option1('chart_container',ch_size);
            cn = new Highcharts.Chart(options1);
            var your_car = car_make_from_valuation + "  " + car_model_from_valuation + "  " + car_engine_from_valuation + "  " + car_year_from_valuation;
            if(global_model_valuation_data.length == 0){
                        cn.renderer.text('Data Unavailable!',(9*main_chart_container_width)/24,main_chart_container_heigth/2,document.getElementById("chart_container").offsetWidth-10,document.getElementById("chart_container").offsetHeight-10).css({textAlign:'center', fontSize: '1.5vw', fontWeight: 'bold', color: 'gray'}).add();
            }   
            else {
                cn.series[1].update({name:your_car}, false);
                cn.series[0].setData(global_similar_models_valuation_data);
                cn.series[1].setData(global_model_valuation_data);    
				if(minimum_of_valuation != mean_of_valuation)
                    show_analysis(minimum_of_valuation, mean_of_valuation, maximum_of_valuation, cn);
                else
                    show_analysis_Equal_Analysis(minimum_of_valuation, mean_of_valuation, maximum_of_valuation, cn);
                //var svg1 = chart_car.getSVG({type: "image/jpeg", width: "50px"});
                //var svg = canvg(document.getElementById("canvas1"), svg1, {});
                /*
                var svg1 = chart_car.getSVG();
                var svg = canvg(document.getElementById('canvas1'), svg1, {
                //ignoreDimensions: true
                });
                */
            }
            
            document.getElementById("btn_submit").style.background = "#478bb8";
            document.getElementById("btn_submit").value = "Evaluate";
            mode_switch = "valuation";
			main_chart_container_width = document.getElementById("chart_container").offsetWidth;
			main_chart_container_heigth = document.getElementById("chart_container").offsetHeight;
			chart_height = document.getElementById("chart_container").offsetHeight-10;
		}
		break;
		case 'valuation_dealers':
		{
            document.getElementById("summary_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("dealers_valuation_btn").style.color = "rgba(50,50,150,1)";
			document.getElementById("valuation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("depreciation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("mot_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("chart_container").style.display ="block";
			document.getElementById("summary_charts").style.display = "none";
			document.getElementById("chart_explanation").style.display = "block";
            cn = new Highcharts.Chart(options3);
			var your_car = car_make_from_valuation + "  " + car_model_from_valuation + "  " + car_engine_from_valuation + "  " + car_year_from_valuation;
            if(global_model_valuation_data_dealer.length == 0){
                        cn.renderer.text('Dealers Data Unavailable!',(9*main_chart_container_width)/24,main_chart_container_heigth/2,document.getElementById("chart_container").offsetWidth-10,document.getElementById("chart_container").offsetHeight-10).css({textAlign:'center', fontSize: '1.5vw', fontWeight: 'bold', color: 'gray'}).add();
            }
			else {
                cn.series[1].update({name:your_car}, false);
                cn.series[0].setData(global_similar_models_valuation_data_dealer);
                cn.series[1].setData(global_model_valuation_data_dealer);
				if (minimum_of_valuation_dealer != mean_of_valuation_dealer)
                    show_analysis(minimum_of_valuation_dealer, mean_of_valuation_dealer, maximum_of_valuation_dealer, cn);
                else
                    show_analysis_Equal_Analysis(minimum_of_valuation_dealer, mean_of_valuation_dealer, maximum_of_valuation_dealer, cn);
            }
			document.getElementById("btn_submit").style.background = "#478bb8";
			document.getElementById("btn_submit").value = "Evaluate";
			mode_switch = "valuation_dealers";
		}
		break;
		case 'budget_valuation':
		{
			show_analysis(minimum_of_valuation, mean_of_valuation, maximum_of_valuation, cn);
			var your_car = car_make_from_valuation + "  " + car_model_from_valuation + "  " + car_engine_from_valuation + "  " + car_year_from_valuation;
			cn.series[1].update({name:your_car}, false);
			cn.series[0].setData(global_similar_models_valuation_data);
			cn.series[1].setData(global_model_valuation_data);
            mode_switch = "budget_valuation";
			//var svg1 = chart_car.getSVG({type: "image/jpeg", width: "50px"});
			//var svg = canvg(document.getElementById("canvas1"), svg1, {});
			/*
			var svg1 = chart_car.getSVG();
			var svg = canvg(document.getElementById('canvas1'), svg1, {
			//ignoreDimensions: true
			});
			*/
		}
		break;
        case 'budget_valuation_dealers':
		{
			var your_car = car_make_from_valuation + "  " + car_model_from_valuation + "  " + car_engine_from_valuation + "  " + car_year_from_valuation;
			cn.series[1].update({name:your_car}, false);
			cn.series[0].setData(global_similar_models_valuation_data_dealer);
			cn.series[1].setData(global_model_valuation_data_dealer);
			show_analysis(minimum_of_valuation_dealer, mean_of_valuation_dealer, maximum_of_valuation_dealer, cn);
			mode_switch = "budget_valuation_dealers";
		}
		break;
		case 'depreciation':
		{
            document.getElementById("summary_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("valuation_btn").style.color = "rgba(150,50,50,1)";
            document.getElementById("depreciation_btn").style.color = "rgba(50,50,150,1)";
			document.getElementById("dealers_valuation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("mot_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("chart_container").style.display ="block";
			document.getElementById("summary_charts").style.display = "none";
			document.getElementById("chart_explanation").style.display = "block";
			chart_car = new Highcharts.Chart(options2);
			for(var i=0;i<priceSeriesArray.length;i++){
				chart_car.addSeries(priceSeriesArray[i]);
			}
			document.getElementById("btn_submit").style.background = "rgba(50,150,150,1)";
			document.getElementById("btn_submit").value = "Add";
			mode_switch = "depreciation";
		}
		break;
		case 'mot':
		{
            document.getElementById("summary_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("valuation_btn").style.color = "rgba(150,50,50,1)";
            document.getElementById("depreciation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("dealers_valuation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("chart_container").style.display ="block";
			document.getElementById("summary_charts").style.display = "none";
			document.getElementById("chart_explanation").style.display = "block";
			document.getElementById("mot_btn").style.color = "rgba(50,50,150,1)";
			var temp1 = new Array();
			var temp2 = new Array();
            var temp3 = new Array();
			for(var i=0;i<current_years_results.length;i++){
				temp1[i]= current_years_results[i][0];
                if (mot_fails_per_year[i] != null && current_years_results[i][1] != 0 && current_years_results[i][1] != null)
                    temp3[i]= parseInt(mot_fails_per_year[i]);
                    //temp3[i]= (parseInt(mot_fails_per_year[i])/parseInt(current_years_results[i][1])); //mot_data_points_pass, mot_data_points_fail
                else 
                    temp3[i]= 0;
                if (mot_passes_per_year[i] != null && current_years_results[i][1] != 0 && current_years_results[i][1] != null)
                    temp2[i]= parseInt(mot_passes_per_year[i]);
                    //temp2[i]= (parseInt(mot_passes_per_year[i])/parseInt(current_years_results[i][1])); //mot_data_points_pass, mot_data_points_fail
                else 
                    temp2[i]= 0;
                //alert(temp3[i]);
            }
            reset_option4(current_mot_fail_categories, temp1, temp3, temp2);
			chart_car = new Highcharts.Chart(options4);
			//chart_car.addSeries({type: 'column', name: 'Failed', color: com_Deps_colors[1], data: comp_MOT_Fails});
			//chart_car.addSeries({type: 'column', name: 'Passed', color: com_Deps_colors[3], data: comp_MOT_Passes});
			document.getElementById("btn_submit").style.background = "#478bb8";
			document.getElementById("btn_submit").value = "Evaluate";
			mode_switch = "mot";
		}
		break;
        case 'comparison':
		{
            var table1 = document.getElementById("comparison_table");
			document.getElementById("valuation_btn").disabled = true;
			document.getElementById("depreciation_btn").disabled = true;
			document.getElementById("dealers_valuation_btn").disabled = true;
			document.getElementById("mot_btn").disabled = true;
			document.getElementById("summary_btn").disabled = true;
			document.getElementById("summary_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("valuation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("depreciation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("dealers_valuation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("mot_btn").style.color = "rgba(150,50,50,1)";
			//document.getElementById("tool1_btn").style.color = "rgba(50,50,150,1)";
			document.getElementById("model1_btn").style.color = "rgba(50,50,150,1)";
			document.getElementById("chart_container").style.display ="none";
			document.getElementById("summary_charts").style.display = "none";
			document.getElementById("chart_explanation").style.display = "none";
            document.getElementById("left_side_nav_img").style.display = "none";
            document.getElementById("right_side_nav_img").style.display = "none";
			document.getElementById("btn_submit").style.background = "#478bb8";
            //document.getElementById("comparison_items").style.display ="block";
			document.getElementById("btn_submit").value = "Evaluate";
			chart_height = document.getElementById("chart_container").offsetHeight-10;
			if(reset_switch == 1){
				if(table1.rows[0].cells.length==0){
					cell_000 = table1.rows[0].insertCell(0); 
                    cell_001 = table1.rows[0].insertCell(1);  
                    cell_100 = table1.rows[1].insertCell(0);
                 
                    cell_000.innerHTML = "<div id='comp_chart_tbl_00'></div>";
                    cell_000.id = "comparison_cell_00";
                    var pix_width = main_chart_container_width/2 + 'px';  
                    cell_000.style.width = pix_width;
                        
                    cell_001.innerHTML = "<div id='comp_chart_tbl_01'></div>";
                    cell_001.id = "comparison_cell_01";
                    var pix_width = main_chart_container_width/2 + 'px';        
                    cell_001.style.width = pix_width;
                    
                    
                    cell_100.innerHTML = "<div id='comp_chart_tbl_10'></div>";
                    cell_100.id = "comparison_cell_10";
                    cell_100.colSpan="2";
                    var pix_width = main_chart_container_width + 'px';         
                    cell_100.style.width = pix_width;	
				}
				
				reset_option5('comparison_cell_00',(3*main_chart_container_heigth)/5, 'line', {type:'date'}, '', '', {borderWidth: 1,formatter: function () {return '<b>' + this.series.name + '</b><br>Year: <b>' + this.x + '   ' + '</b>' + 'Value: <b>£' + this.y + '</b></br>';}, backgroundColor: '#EEEEEE', crosshairs: false, valueDecimals: 2},{enabled: false}, '');
				cn = new Highcharts.Chart(options5);
                for(var i=0;i<com_Deps.length;i++){
                    cn.addSeries(com_Deps[i]);
                }
				cn.yAxis[0].setTitle({ text: "", rotation: 0});
				cn.setTitle({ text: "Depreciation Comparison", style: {fontSize: "0.8vw"}});
				

				reset_option5('comparison_cell_01',(3*main_chart_container_heigth)/5, 'column', {categories: comp_categories}, '', '', {borderWidth: 1,formatter: function () {return 'MOT test years: <b>2005-2013</b><br>' + this.series.name + ': <b>' + this.y + '</b>';}, backgroundColor: '#EEEEEE', crosshairs: false, valueDecimals: 2}, {enabled: false}, ''); //{categories: ['vehicle 1', 'vehicle 2', 'vehicle 3', 'vehicle 4']}
				cn = new Highcharts.Chart(options5);
                var arr_data = new Array();
				cn.addSeries({type: 'column', name: 'Failed', color: com_Deps_colors[1], data: comp_MOT_Fails});
				cn.addSeries({type: 'column', name: 'Passed', color: com_Deps_colors[3], data: comp_MOT_Passes});
				cn.yAxis[0].setTitle({ text: "", rotation: 0});
				cn.setTitle({ text: "MOT Results Comparison", style: {fontSize: "0.8vw"}});
				
				reset_option5('comparison_cell_10',(3*main_chart_container_heigth)/5, 'bar', {categories: comp_categories_full_label}, '', '', {borderWidth: 1,formatter: function () {return 'Valuation year: <b>2014</b><br>' + this.series.name + ': <b>£' + this.y + '</b>';}, backgroundColor: '#EEEEEE', crosshairs: false, valueDecimals: 2}, {enabled: false}, ''); //{categories: ['vehicle 1', 'vehicle 2', 'vehicle 3', 'vehicle 4']}
				cn = new Highcharts.Chart(options5);
                var arr_data = new Array();
				cn.addSeries({type: 'bar', name: 'Online Valuation', color: com_Deps_colors[2], data: comp_online_prices});
				cn.addSeries({type: 'bar', name: 'Dealers Valuation', color: com_Deps_colors[1], data: comp_dealers_prices});
				cn.yAxis[0].setTitle({ text: "", rotation: 0});
				cn.setTitle({ text: "Price Comparison", style: {fontSize: "0.8vw"}});
 
			}
            document.getElementById("comparison_table").style.display = "block";
			mode_switch = "comparison";
        }
        break;
		case 'budget_option':
		{
			
		}
		break;
	}
}

function show_analysis(min, mean, max, this_chart) {
	document.getElementById("min_value_text").innerHTML = "Minimum expected value:   <b>£" + min + "</b>";
	document.getElementById("max_value_text").innerHTML = "Maximum expected value:   <b>£" + max + "</b>";
	document.getElementById("avg_value_text").innerHTML = "Average expected value:   <b>£" + mean + "</b>";
	this_chart.xAxis[0].removePlotLine('price_mean');
	this_chart.xAxis[0].removePlotLine('price_min');
	this_chart.xAxis[0].removePlotLine('price_max');
	this_chart.xAxis[0].removePlotBand();
	this_chart.xAxis[0].addPlotBand({
		color: "#F5F1E1", // Color value
		from: min, // Start of the plot band
		to: max // End of the plot band
	});
	this_chart.xAxis[0].addPlotLine({
		"id": "price_min",
		"value": min,
		"color": "#505050",
		"dashStyle": "shortdash",
		"width": 3,
		"label": {
			"text": 'Minimum<br/>' + '£' + min,
			"rotation": 0,
			"align": "center",
			"y": -18,
			"style": {"fontSize": "0.8vw", "fontWeight": "normal", "color": "#505050"}
		}
	});
	this_chart.xAxis[0].addPlotLine({
		"id": "price_max",
		"value": max,
		"color": "#ff4d4d",
		"dashStyle": "shortdash",
		"width": 3,
		"label": {
			"text": 'Maximum<br/>' + '£' + max,
			"rotation": 0,
			"align": "center",
			"y": -18,
			"style": {"fontSize": "0.8vw", "fontWeight": "normal", "color": "#ff4d4d"}
		}
	});
	this_chart.xAxis[0].addPlotLine({
		"id": "price_mean",
		"value": mean,
		"color": "#009CCF",
		"dashStyle": "shortdash",
		"width": 3,
		"label": {
			"text": 'Average<br/>' + '£' + mean,
			"rotation": 0,
			"align": "center",
			"y": -18,
			"style": {"fontSize": "0.9vw", "fontWeight": "bold", "color": "#009CCF"}
		}
	});
}

function show_analysis_Equal_Analysis(min, mean, max, this_chart) {
	document.getElementById("min_value_text").innerHTML = "Minimum expected value:   <b>£" + min + "</b>";
	document.getElementById("max_value_text").innerHTML = "Maximum expected value:   <b>£" + max + "</b>";
	document.getElementById("avg_value_text").innerHTML = "Average expected value:   <b>£" + mean + "</b>";
	this_chart.xAxis[0].removePlotLine('price_mean');
	this_chart.xAxis[0].removePlotLine('price_min');
	this_chart.xAxis[0].removePlotLine('price_max');
	this_chart.xAxis[0].removePlotBand();
	this_chart.xAxis[0].addPlotLine({
		"id": "price_mean",
		"value": mean,
		"color": "#009CCF",
		"dashStyle": "shortdash",
		"width": 3,
		"label": {
			"text": 'Average<br/>' + '£' + mean,
			"rotation": 0,
			"align": "center",
			"y": -18,
			"style": {"fontSize": "0.9vw", "fontWeight": "bold", "color": "#009CCF"}
		}
	});
}


function addNewCar() {
	if (priceSeriesArray.length < 8){
		var depreciation_color;
		var depreciation_car_string;
		var priceSeries1 = new Array();
		var priceSeries2 = new Array();
		car_make= document.getElementById("make").value;
		car_model= document.getElementById("model").value;
		car_year= document.getElementById("year").value;
		car_engine= document.getElementById("engine_size").value;
		switch (priceSeriesArray.length){
			case 2: 
				depreciation_color = "#921"; 
				depreciation_car_string = "Car2";
				priceSeries1 = {"name": car_make + "  " + car_model + "  " + car_engine + "  " + car_year, "color": depreciation_color, "marker":{"symbol": "circle"}, "data": [[2006,12900],[2007,11300],[2008,9000],[2009,8000],[2010,6500],[2011,5600],[2012,5450],[2013,5000],[2014,3900]]};
				priceSeriesArray.push(priceSeries1);
				priceSeries2 = {"name": "prediction", "color": depreciation_color, "marker":{"symbol": "circle"}, "dashStyle": "ShortDash", "data": [[2014,3900],[2015,3100],[2016,2900],[2017,2750]]};
				priceSeries2.showInLegend = false;
				priceSeriesArray.push(priceSeries2);
			break;
			case 4: 
				depreciation_color = "#291"; 
				depreciation_car_string = "Car3";
				priceSeries1 = {"name": car_make + "  " + car_model + "  " + car_engine + "  " + car_year, "color": depreciation_color, "marker":{"symbol": "circle"}, "data": [[2006,10900],[2007,10300],[2008,9000],[2009,8000],[2010,7500],[2011,6600],[2012,5450],[2013,4900],[2014,4600]]};
				priceSeriesArray.push(priceSeries1);
				priceSeries2 = {"name": "prediction", "color": depreciation_color, "marker":{"symbol": "circle"}, "dashStyle": "ShortDash", "data": [[2014,4600],[2015,4100],[2016,3900],[2017,3750]]};
				priceSeries2.showInLegend = false;
				priceSeriesArray.push(priceSeries2);
			break;
			case 6: 
				depreciation_color = "#222"; 
				depreciation_car_string = "Car4";
				priceSeries1 = {"name": car_make + "  " + car_model + "  " + car_engine + "  " + car_year, "color": depreciation_color, "marker":{"symbol": "circle"}, "data": [[2006,15900],[2007,14300],[2008,12500],[2009,11000],[2010,9500],[2011,9600],[2012,8450],[2013,8000],[2014,6900]]};
				priceSeriesArray.push(priceSeries1);
				priceSeries2 = {"name": "prediction", "color": depreciation_color, "marker":{"symbol": "circle"}, "dashStyle": "ShortDash", "data": [[2014,6900],[2015,5100],[2016,4900],[2017,4750]]};
				priceSeries2.showInLegend = false;
				priceSeriesArray.push(priceSeries2);
			break;
		}
		
		chart_car = new Highcharts.Chart(options2);
		for(var i=0;i<priceSeriesArray.length;i++){
				chart_car.addSeries(priceSeriesArray[i]);
		}
	}
}

function show_report(){
	if(report_image_button_enabled){
		//chart_car.print();
		//chart_car.exportChart({filename:"img-exp"});
		//document.getElementById("report_button").src="C:\Users\Zahra\Downloads\img-exp.png";
		//chart_car.exportChart();
		reportPage = window.open("", "reportPage", "width=800, height=600"); 
		//reportPage.document.write("<p>This is 'myWindow'</p>");
		reportPage.document.write('<html><head><title>Report Page</title></head><body><canvas id="canvas1" width="600" height="250" style="border:1px solid #000000;"></canvas><script> var cx = reportPage.document.getElementById("canvas1").getContext("2d");cx.font = "28px Georgia";cx.fillStyle = "fuchsia";cx.fillText("I can draw text, too!", 10, 50);</script></body></html>');
		//svg1 = chart_car.getSVG();
		//reportPage.document.write('<script> alert("Hi");</script>');
		//reportPage.document.write('<script> var cx = reportPage.document.getElementById("canvas1").getContext("2d");cx.font = "28px Georgia";cx.fillStyle = "fuchsia";cx.fillText("I can draw text, too!", 10, 50);</script>');
		//reportPage.document.write('<script> var svg = canvg(reportPage.document.getElementById("canvas1"), ' + svg1 + ', {});</script>');
		//reportPage.document.write('<script>alert(' + test + ');</script>');
		//report_image_button_enabled = false;
	}
}

function show_next_chart(){
    /* if(on_budget_mode == 1){
        switch (mode_switch){
            case ("budget_valuation"):
                select_chart('valuation_dealers', chart_car);
            break;
            case ("budget_valuation_dealers"):
                select_chart('mot', chart_car);
            break;
        }
    }
    else{ */
        if (document.getElementById("summary_btn").disabled == false){
            switch (mode_switch){
				case ("summary"):
                    select_chart('valuation', chart_car);
                break;
                case ("valuation"):
                    select_chart('valuation_dealers', chart_car);
                break;
                case ("valuation_dealers"):
                    select_chart('mot', chart_car);
                break;
                case ("mot"):
                    select_chart('depreciation', chart_car);
                break;
                case ("depreciation"):
                    select_chart('summary', chart_car);
                break;
            }
        }
    /* } */
}

function show_previous_chart(){
   /*  if(on_budget_mode == 1){
        switch (mode_switch){
            case ("budget_valuation"):
                select_chart('valuation_dealers', chart_car);
            break;
            case ("budget_valuation_dealers"):
                select_chart('mot', chart_car);
            break;
        }
    }
    else { */
        if (document.getElementById("summary_btn").disabled == false){
            switch (mode_switch){
				case ("valuation"):
                select_chart('summary', chart_car);
                break;
                case ("summary"):
                select_chart('depreciation', chart_car);
                break;
                case ("valuation_dealers"):
                select_chart('valuation', chart_car);
                break;
                case ("mot"):
                select_chart('valuation_dealers', chart_car);
                break;
                case ("depreciation"):
                select_chart('mot', chart_car);
                break;
            }
        }
    /* } */
}

function Show_Analysis_for_Summary_Charts(e_chart, e_min, e_mean, e_max){
    e_chart.yAxis[0].addPlotLine({
        value: e_mean,
        color: '#009CCF',
        width: 2,
        id: 'plot-line-dealer_mean',
        dashStyle: 'shortdash',
        label: {
            text: '£' + e_mean,
            rotation: 0,
            align: "left",
            y: -5,
            x: -8,
            style: {"fontSize": "1.2vw", "fontWeight": "bold", "color": "#009CCF"}
        }
    });
    e_chart.yAxis[0].addPlotLine({
        value: e_min,
        color: '#505050',
        width: 2,
        id: 'plot-line-dealer_min',
        dashStyle: 'shortdash',
        label: {
            text: 'Min: £' + e_min,
            rotation: 0,
            align: "left",
            y: -5,
            x: -8,
            style: {"fontSize": "0.8vw", "fontWeight": "bold", "color": "#505050"}
        }
    });
    e_chart.yAxis[0].addPlotLine({
        value: e_max,
        color: 'red',
        width: 2,
        id: 'plot-line-dealer_max',
        dashStyle: 'shortdash',
        label: {
            text: 'Max: £' + e_max,
            rotation: 0,
            align: "left",
            y: -5,
            x: -8,
            style: {"fontSize": "0.8vw", "fontWeight": "bold", "color": "red"}
        }
    });
}

function Show_Analysis_for_Summary_Charts_Only_One_Data(e_chart, e_mean){
    e_chart.yAxis[0].addPlotLine({
        value: e_mean,
        color: '#009CCF',
        width: 2,
        id: 'plot-line-dealer_mean',
        dashStyle: 'shortdash',
        label: {
            text: '£' + e_mean,
            rotation: 0,
            align: "left",
            y: -5,
            x: 70,
            style: {"fontSize": "1.2vw", "fontWeight": "bold", "color": "#009CCF"}
        }
    });
}
