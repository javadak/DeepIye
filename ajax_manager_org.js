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
var mode_switch = "evaluation";
var svg1;
var MOT_sub_categories_this;
var MOT_sub_categories_color = 1;
var chart_height = 360;
var options1;
var ch_car1;
var ch_car2;
var ch_car3;
var ch_car4;
var ch_car5;
var ch_car6;
var ch_car7;
var ch_car8;
var ch_var = [ch_car1, ch_car2, ch_car3,ch_car4, ch_car5,ch_car6, ch_car7,ch_car8];
var ch_conts = ['chart_container1', 'chart_container2', 'chart_container3','chart_container4','chart_container5','chart_container6','chart_container7','chart_container8'];
var miniCharts_form_data;
var chart_cells;
var cell0;
var cell1;
var main_chart_container_width;
var main_chart_container_heigth;
var budget_active = 0;

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
var MOT_data =[[25,36,18,46,22,54,76,29,39,100],[53,42,41,11,24,19,34,97,113,54,87,110,19,51,21,102],[29,41,32,17,52,83,26,97,19],
				[78,109],[21,53,87,109],[53,11,42,41,11,24,19,134,97,113,54,87,110,19,51],[56,21,46,90,29,39,80],
				[53,18,42,27,41,29,11,24,19,34,91,97,78,113,17,54,87,110,91,29,19,51,80,21,102],[54,76,29,39],[276]];

function ajax_request(form_name, params, which_chart, which_model) {
	if (document.getElementById("btn_submit").value == 'Evaluate'){
		which_chart.showLoading('Loading ...');
		document.getElementById("btn_submit").disabled = true;
                var form_data = form_name != '' ? $(form_name).serialize(true) : params;
                car_make = form_name != '' ? form_data.make : params.make;
                car_model = form_name != '' ? form_data.model : params.model;
                car_year = form_name != '' ? form_data.year : params.year;
                car_engine = form_name != '' ? form_data.engine_size : params.engine_size;
            //alert(JSON.stringify(params));
          
            new Ajax.Request('wp-content/themes/twentythirteen/tools/data_selection.php', {
			method:'POST',
			parameters: Object.extend( form_data, params ),
			onSuccess: function(data) {
                //... returned data structure: price_mean_private, price_min_private, price_max_private, dist_all_private, dist_maker_private, price_mean_dealer, price_min_dealer, price_max_dealer, dist_all_dealer, dist_maker_dealer
                var json_data = data.responseText.evalJSON();
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
				
				// /sample depreciation data
				
				car_make_from_valuation=car_make;
				car_model_from_valuation=car_model;
				car_year_from_valuation=car_year;
				car_engine_from_valuation=car_engine;
				depretiation_this_model = [[2006,14900],[2007,12300],[2008,10900],[2009,9800],[2010,7000],[2011,6600],[2012,6450],[2013,6100],[2014,5900]];
				depreciation_this_model_prediction = [[2014,5900],[2015,5100],[2016,4900],[2017,4750]];
				var priceSeries1 = {"name": car_make + "  " + car_model + "  " + car_engine + "  " + car_year, "color": "#129", "marker":{"symbol": "circle"}, "data": depretiation_this_model};
				priceSeriesArray.push(priceSeries1);
				var priceSeries2 = {"name": "prediction", "color": "#129", "marker":{"symbol": "circle"}, "dashStyle": "ShortDash", "data": depreciation_this_model_prediction};
				priceSeries2.showInLegend = false;
				priceSeriesArray.push(priceSeries2);
				//var legend = chart_car.legend; 
                //legend.series[1].hide();
				// ------------------------
				
				minimum_of_valuation = Math.round(json_data.price_min_private);
				maximum_of_valuation = Math.round(json_data.price_max_private);
				mean_of_valuation = Math.round(json_data.price_mean_private);
				
				minimum_of_valuation_dealer = Math.round(json_data.price_min_dealer);
				maximum_of_valuation_dealer = Math.round(json_data.price_max_dealer);
				mean_of_valuation_dealer = Math.round(json_data.price_mean_dealer); 
				select_chart(which_model,which_chart);
				//show_analysis(minimum_of_valuation, mean_of_valuation, maximum_of_valuation);
				which_chart.hideLoading();
				document.getElementById("btn_submit").disabled = false;
				//report_image_button_enabled = true;
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
        for (var i=1;i<rowss;i++){
            car_options_tbl.deleteRow(rowss-i);
        }
        
        for (var i=1;i<json_data.length;i++){
            var car_options_btn_id = "car_options_btn_id_" + i;
            var model_string = json_data[i].make + "  " + json_data[i].model + "  " + json_data[i].body_type + "  " + json_data[i].engine_size + "  " + json_data[i].year + "  " + json_data[i].fuel_type + "  (" + json_data[i].mileage + " miles - £" + json_data[i].price + ")"; 
            var row = car_options_tbl.insertRow(car_options_tbl.rows.length);
            var cell = row.insertCell(0);
            var production_year = 2015 - json_data[i].year; 
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
            cell.innerHTML = "<button type='button' id=" + car_options_btn_id + "class='btn_options' value='0' style='font-size:1.0vw;text-align:left' name='test1' onClick='set_color(this.id,this.value)'>" + model_string + "</button>";    
        }
	    
        },
		onFailure: function() { 
		    //alert('Something went wrong...'); 
		}
	});
}

var row;
var counter = 0;
var comparison_counter = 0;
function set_color(e_id,e_val,par){
    var str = e_id.split("class")[0];
    budget_active = 1;
    var model_index = e_id.slice(19,str.length);
    if(e_val==0){
    if(comparison_counter<4){
        document.getElementById(e_id).style.color = "#FFFFFF";
        document.getElementById(e_id).style.backgroundColor = "#617889";
        document.getElementById(e_id).style.fontWeight = "bold";
        document.getElementById(e_id).value = "1";
        document.getElementById("chart_container").style.display ="none";
        document.getElementById("comparison_charts").style.display = "block";
        document.getElementById("chart_explanation").style.display = "none";
        counter = counter + 1;
        var table = document.getElementById("comparison_charts");
        if(table.rows[0].cells.length<2){
            if (cell0 == null || cell0.cellIndex == -1)
                cell0 = table.rows[0].insertCell(0);
            else if (cell0.cellIndex == 1)
                cell0 = table.rows[0].insertCell(0);
            else if (cell0.cellIndex == 0)
                cell0 = table.rows[0].insertCell(1);
        }
        else {
                if (cell0 == null || cell0.cellIndex == -1)
                    cell0 = table.rows[1].insertCell(0);
                else if (cell0.cellIndex == 1)
                        cell0 = table.rows[1].insertCell(0);
                else if (cell0.cellIndex == 0)
                        cell0 = table.rows[1].insertCell(1); 
        }                            
        
        cell0.innerHTML = "<div id=" + ch_conts[counter-1] + "></div>";
        cell0.id = "chart_cell_" + model_index;
        var pix_width = main_chart_container_width/2 + 'px';      
        cell0.style.width = pix_width;
        reset_option1(ch_conts[counter-1],3*(main_chart_container_heigth/5));
        ch_var[counter-1] = new Highcharts.Chart(options1);
        var obj = JSON.parse(miniCharts_form_data[model_index-1]);
        ajax_request('',obj,ch_var[counter-1],'budget_valuation');
        comparison_counter = comparison_counter + 1;
    }
    else{
        //alert("Deselect one of the selected cars, then select this one");
    }
    }
    
    if (e_val==1){
        document.getElementById(e_id).style.color = "#000000";
        document.getElementById(e_id).style.backgroundColor = "#FFFFFF";
        comparison_counter = comparison_counter - 1;        
        document.getElementById(e_id).style.fontWeight = "normal";
        document.getElementById(e_id).value = "0";
        //remove from the table of results
        counter = counter - 1;
        var table = document.getElementById("comparison_charts");
        var elem = document.getElementById("chart_cell_" + model_index);
        elem.parentNode.removeChild(elem); 
        if(counter == 0){
            document.getElementById("chart_container").style.display ="block";
            document.getElementById("comparison_charts").style.display = "none";
            document.getElementById("chart_explanation").style.display = "block";
            if (document.getElementById("valuation_btn").disabled == true){
                select_chart('blank', chart_car);
                document.getElementById("tool2_btn").style.color = "rgba(50,50,150,1)";
                document.getElementById("tool1_btn").style.color = "rgba(150,50,50,1)";
            }
            budget_active = 0;
        }
    }
}

function reset_selections(selected) {
	switch( selected )
	{
		case "make":
			$("body_type").update("");
			//$("fuel_type").update("");
			break;
		case "model":
			//$("fuel_type").update("");
			break;
		default:
			break;
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
            backgroundColor: '#FFFFFF',
            borderColor: '#527D9C',
			//height:chart_height,
            borderWidth: 2,
			borderRadius: 8,
            spacingTop: 200,
            plotBackgroundColor: '#FFFFFF',
            zoomType: 'x'
        },
		title: {
            text: ''
		},
		yAxis: {
            title: {
                text: ''
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
            backgroundColor: '#FFFFFF',
            borderColor: '#527D9C',
			height:chart_size,
            borderWidth: 2,
			borderRadius: 8,
            spacingTop: 200,
            plotBackgroundColor: '#FFFFFF',
            zoomType: 'x'
        },
        exporting: {
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
		backgroundColor: '#FFFFFF',
		borderColor: '#527D9C',
		//height:360,
		borderWidth: 2,
		borderRadius: 8,
		spacingTop: 200,
		plotBackgroundColor: '#FFFFFF',
		zoomType: 'x'
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
            backgroundColor: '#FFFFFF',
            borderColor: '#527D9C',
			//height:360,
            borderWidth: 2,
			borderRadius: 8,
            spacingTop: 200,
            plotBackgroundColor: '#FFFFFF',
            zoomType: 'x'
        },
        exporting: {
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
 
 var options4 = {
        chart: {
			renderTo: 'chart_container',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
			marginTop: 65,
			marginLeft: 50,
            backgroundColor: '#FFFFFF',
            borderColor: '#527D9C',
			//height:360,
            borderWidth: 2,
			borderRadius: 8,
			spacingTop: 200,
            plotBackgroundColor: '#FFFFFF',
            zoomType: 'x'
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
			title:{
				text: null
			},
			max: 2*MOT_data[MOT_sub_categories_color].max()
		},
        xAxis: {
			type: 'category',
            labels: {
				//enabled: false,
                //rotation: -45,
                style: {
                    fontSize: '8px',
                    fontFamily: 'Verdana, sans-serif',
					fontWeight: 'bold',
					color: '#000000'
                }
            },
            categories: MOT_sub_categories[MOT_sub_categories_color]
        },
		exporting: {
            enabled: false
        },
		/*
		tooltip: {
            borderWidth: 1,
            formatter: function () {
                return this.x + '   ' + this.y;
            },
            backgroundColor: '#C5FFFC',
            crosshairs: false
        },
		*/
		legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'top',
            floating: true,
 	    x: 0,
            y: -190,
            padding: 2
        },
        series: [{
            type: 'column',
            name: MOT_main_categories[MOT_sub_categories_color],
            data: MOT_data[MOT_sub_categories_color],
			color: pie_colors[MOT_sub_categories_color]//Highcharts.getOptions().colors[MOT_sub_categories_color]
        }, {
            type: 'pie',
			point:{
				events:{
					click: function (event) {
						MOT_sub_categories_color = this.x;
						chart_car.yAxis[0].setExtremes(null,2*MOT_data[MOT_sub_categories_color].max());
						chart_car.xAxis[0].setCategories(MOT_sub_categories[MOT_sub_categories_color]);
						chart_car.series[0].update({name: MOT_main_categories[MOT_sub_categories_color], 
													color: pie_colors[MOT_sub_categories_color]}, false);
						chart_car.series[0].setData(MOT_data[MOT_sub_categories_color]);
						chart_car.series[1].data[1].slice(false);
						chart_car.series[1].data[MOT_sub_categories_color].slice();
					}
				}
			},     
            name: 'Frequency',
			startAngle: -90,
            endAngle: 90,
			center: ['50%', '75%'],
			innerSize: '30%',
			allowPointSelect: true,
			cursor: 'pointer',
            data: [{
                name: MOT_main_categories[0],
                y: 135,
                color: pie_colors[0] 
            }, {
                name: MOT_main_categories[1],
                y: 878,
				sliced: true,
                selected: true,
                color: pie_colors[1] 
            }, {
                name: MOT_main_categories[2],
                y: 198,
                color: pie_colors[2] 
            }, {
                name: MOT_main_categories[3],
                y: 123,
                color: pie_colors[3] 
            }, {
                name: MOT_main_categories[4],
                y: 230,
                color: pie_colors[4] 
            },{
                name: MOT_main_categories[5],
                y: 523,
                color: pie_colors[5] 
            },{
                name: MOT_main_categories[6],
                y: 42,
                color: pie_colors[6] 
            },{
                name: MOT_main_categories[7],
                y: 59,
                color: pie_colors[7] 
            },{
                name: MOT_main_categories[8],
                y: 89,
                color: pie_colors[8] 
            },{
                name: MOT_main_categories[9],
                y: 21,
                color: pie_colors[9] 
            }],
            center: [175, 110],
            size: 7*(chart_height/10),
            showInLegend: false,
            dataLabels: {
                enabled: true,
				style: {
                    fontSize: '0.8vw',
                    fontFamily: 'Verdana, sans-serif',
					fontWeight: 'bold',
					color: '#000044'
                }
            }
        }]
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
			document.getElementById("tool1_btn").style.color = "rgba(50,50,150,1)";
			document.getElementById("model1_btn").style.color = "rgba(50,50,150,1)";
			chart_height = document.getElementById("chart_container").offsetHeight-10;
			cn = new Highcharts.Chart(options0);
			cn.renderer.image('http://car.khash777.webfactional.com/v2/wp-content/themes/twentythirteen/tools/model.jpeg',4,4,document.getElementById("chart_container").offsetWidth-10,document.getElementById("chart_container").offsetHeight-10).add();
			mode_switch = "blank";
            main_chart_container_width = document.getElementById("chart_container").offsetWidth;
            main_chart_container_heigth = document.getElementById("chart_container").offsetHeight;
		}
		break;
        case 'summary':
		{
            document.getElementById("summary_btn").style.color = "rgba(50,50,150,1)";
			document.getElementById("valuation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("depreciation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("dealers_valuation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("mot_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("tool1_btn").style.color = "rgba(50,50,150,1)";
			document.getElementById("model1_btn").style.color = "rgba(50,50,150,1)";
			chart_height = document.getElementById("chart_container").offsetHeight-10;
			cn = new Highcharts.Chart(options0);
			cn.renderer.image('http://car.khash777.webfactional.com/v2/wp-content/themes/twentythirteen/tools/summary_image.bmp',4,4,document.getElementById("chart_container").offsetWidth-10,document.getElementById("chart_container").offsetHeight-10).add();
			mode_switch = "summary";
            main_chart_container_width = document.getElementById("chart_container").offsetWidth;
            main_chart_container_heigth = document.getElementById("chart_container").offsetHeight;
		}
		break;
		case 'valuation':
		{
            document.getElementById("summary_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("valuation_btn").disabled = false;
			document.getElementById("depreciation_btn").disabled = false;
			document.getElementById("dealers_valuation_btn").disabled = false;
			document.getElementById("mot_btn").disabled = false;
			document.getElementById("valuation_btn").style.color = "rgba(50,50,150,1)";
			document.getElementById("depreciation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("dealers_valuation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("mot_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("tool1_btn").style.color = "rgba(50,50,150,1)";
			document.getElementById("model1_btn").style.color = "rgba(50,50,150,1)";
			reset_option1('chart_container',ch_size);
			cn = new Highcharts.Chart(options1);
			show_analysis(minimum_of_valuation, mean_of_valuation, maximum_of_valuation, cn);
			var your_car = car_make_from_valuation + "  " + car_model_from_valuation + "  " + car_engine_from_valuation + "  " + car_year_from_valuation;
			cn.series[1].update({name:your_car}, false);
			cn.series[0].setData(global_similar_models_valuation_data);
			cn.series[1].setData(global_model_valuation_data);
			document.getElementById("btn_submit").style.background = "#478bb8";
			document.getElementById("btn_submit").value = "Evaluate";
			mode_switch = "evaluation";
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
		case 'valuation_dealers':
		{
            document.getElementById("summary_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("dealers_valuation_btn").style.color = "rgba(50,50,150,1)";
			document.getElementById("valuation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("depreciation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("mot_btn").style.color = "rgba(150,50,50,1)";
			cn = new Highcharts.Chart(options3);
			show_analysis(minimum_of_valuation_dealer, mean_of_valuation_dealer, maximum_of_valuation_dealer, cn);
			var your_car = car_make_from_valuation + "  " + car_model_from_valuation + "  " + car_engine_from_valuation + "  " + car_year_from_valuation;
			cn.series[1].update({name:your_car}, false);
			cn.series[0].setData(global_similar_models_valuation_data_dealer);
			cn.series[1].setData(global_model_valuation_data_dealer);
			document.getElementById("btn_submit").style.background = "#478bb8";
			document.getElementById("btn_submit").value = "Evaluate";
			mode_switch = "evaluation_dealers";
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
		case 'budget_valuation':
		{
			cn = new Highcharts.Chart(options1);
			show_analysis(minimum_of_valuation_dealer, mean_of_valuation_dealer, maximum_of_valuation_dealer, cn);
			var your_car = car_make_from_valuation + "  " + car_model_from_valuation + "  " + car_engine_from_valuation + "  " + car_year_from_valuation;
			cn.series[1].update({name:your_car}, false);
			cn.series[0].setData(global_similar_models_valuation_data_dealer);
			cn.series[1].setData(global_model_valuation_data_dealer);
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
		case 'depreciation':
		{
            document.getElementById("summary_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("valuation_btn").style.color = "rgba(150,50,50,1)";
            document.getElementById("depreciation_btn").style.color = "rgba(50,50,150,1)";
			document.getElementById("dealers_valuation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("mot_btn").style.color = "rgba(150,50,50,1)";
			chart_car = new Highcharts.Chart(options2);
			for(var i=0;i<priceSeriesArray.length;i++){
				chart_car.addSeries(priceSeriesArray[i]);
			}
			document.getElementById("btn_submit").style.background = "rgba(50,150,150,1)";
			document.getElementById("btn_submit").value = "Add";
			mode_switch = "depreciation";
			//var svg1 = chart_car.getSVG({type: "image/jpeg", width: "50px"});
			//var svg = canvg(document.getElementById("canvas2"), svg1, {});

			//chart_car.print();
			//var chart = $('chart_container').highcharts();
			   // var chart = $('#chart_container').highcharts();
			/*   
			var svg1 = chart_car.getSVG();
			var svg = canvg(document.getElementById('canvas2'), svg1, {
			//ignoreDimensions: true
			});
			*/
			
			//img_PNG = "<img src='#{canvas.toDataURL()}' />"
			//alert(img_PNG);
			//document.getElementById("graph_image1").src = img_PNG;
			//$("make").update(document.write("<?php echo 'hello!'; ?>"));
			/*
			$("make").update("");
			$("model").update("");
			$("body_type").update("");
			$("year").update("");
			$("fuel_type").update("");
			$("engine_size").update("");
			*/
			//chart_car.series[1].setData(depreciation_this_model_prediction);
		}
		break;
		case 'mot':
		{
            document.getElementById("summary_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("valuation_btn").style.color = "rgba(150,50,50,1)";
            document.getElementById("depreciation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("dealers_valuation_btn").style.color = "rgba(150,50,50,1)";
			document.getElementById("mot_btn").style.color = "rgba(50,50,150,1)";
			chart_car = new Highcharts.Chart(options4);
			mode_switch = "mot";
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
		"color": "#19AFD4",
		"dashStyle": "shortdash",
		"width": 3,
		"label": {
			"text": 'Minimum<br/>' + '£' + min,
			"rotation": 0,
			"align": "center",
			"y": -18,
			"style": {"fontSize": "13px", "color": "#19AFD4"}
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
			"style": {"fontSize": "13px", "color": "#ff4d4d"}
		}
	});
	this_chart.xAxis[0].addPlotLine({
		"id": "price_mean",
		"value": mean,
		"color": "#00B26B",
		"dashStyle": "shortdash",
		"width": 3,
		"label": {
			"text": 'Average<br/>' + '£' + mean,
			"rotation": 0,
			"align": "center",
			"y": -18,
			"style": {"fontSize": "13px", "color": "#00B26B"}
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
    if (document.getElementById("valuation_btn").disabled == false){
        switch (mode_switch){
            case ("evaluation"):
                select_chart('valuation_dealers', chart_car);
            break;
            case ("evaluation_dealers"):
                select_chart('mot', chart_car);
            break;
            case ("mot"):
                select_chart('depreciation', chart_car);
            break;
            case ("depreciation"):
                select_chart('valuation', chart_car);
            break;
        }
    }
}

function show_previous_chart(){
    if (document.getElementById("valuation_btn").disabled == false){
        switch (mode_switch){
            case ("evaluation"):
            select_chart('depreciation', chart_car);
            break;
            case ("evaluation_dealers"):
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
}