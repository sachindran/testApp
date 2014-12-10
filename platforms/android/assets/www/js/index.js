var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
		
		webServiceTest();
		var flipCompSet = 0;
		$("#conflipComp").bind( "change", function(event, ui) {
				if((flipCompSet==0)&&($("#conflipComp").val()=="Compare"))
				{
					GetAllOtherPortNames();
					flipCompSet = 1;
				}
				else if((flipCompSet==1)&&($("#conflipComp").val()=="Self"))
				{
					hideOtherPorts();
					flipCompSet = 0;
				}
			});
			
	},
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
	
		alert(id);
        console.log('Received Event: ' + id);
	}
};
function hideOtherPorts()
{
	$("#otherPortsConDiv").remove()
	
}
function getPortNames()
{
		var jsonText = JSON.stringify({});
			$.ajax({
                type: "POST",
                url: "http://thekbsystems.com/WorldPorts-SustainabilityForum/UserDetails.asmx/GetPortNames", // add web service Name and web service Method Name
                data: {},  //web Service method Parameter Name and ,user Input value which in Name Variable.
				contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response)
					{
					if(response.d=="Success")
						{
							alert("Webservice Success");
							//changePage("#Consumption");
							//window.localStorage["userId"] = response;
						}
					},
                error: function (xhr, ajaxOptions, thrownError)
					{
						alert(xhr.status);
						alert(thrownError);
					}
            });
}
function selectChange()
{
	alert($("#conPort-name option:selected").val());
}
function webServiceTest()
        {
			var jsonText = JSON.stringify({});
			$.ajax({
                type: "POST",
                url: "http://thekbsystems.com/WorldPorts-SustainabilityForum/UserDetails.asmx/GetPortNames", // add web service Name and web service Method Name
                data: {},  //web Service method Parameter Name and ,user Input value which in Name Variable.
				contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response)
					{
					if(response.d)
						{
							var data = JSON.parse(response.d);
							$.each(data, function(index, element) 	{
									$("#conPort-name").append('<option value='+element.portId+'>'+element.portName+'</option>');
								});
							//alert(response.d.portId);
							//changePage("#Consumption");
							//window.localStorage["userId"] = response;
						}
					},
                error: function (xhr, ajaxOptions, thrownError)
					{
						alert(xhr.status);
						alert(ajaxOptions);
						alert(thrownError);
					}
            });
			
		var jsonText1 = JSON.stringify({categoryType: "Consumption"});
			$.ajax({
                type: "POST",
                url: "http://thekbsystems.com/WorldPorts-SustainabilityForum/UserDetails.asmx/GetConsumptionCategories", // add web service Name and web service Method Name
                data: jsonText1,  //web Service method Parameter Name and ,user Input value which in Name Variable.
				contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response)
					{
					if(response.d)
						{
							var data = JSON.parse(response.d);
							$.each(data, function(index, element) 	{
									$("#conCategory").append('<option value='+element.categoryId+'>'+element.categoryName+'</option>');
								});
							//alert(response.d.portId);
							//changePage("#Consumption");
							//window.localStorage["userId"] = response;
						}
					},
                error: function (xhr, ajaxOptions, thrownError)
					{
						alert(xhr.status);
						alert(ajaxOptions);
						alert(thrownError);
					}
            });
			
			
        }
function graphDataValidation()
{
	if($("#confromDate").val() != "")
	{
		var fromDate = ($("#confromDate").val()).split("-");
		if($("#contoDate").val() != "")
		{
			var toDate = ($("#contoDate").val()).split("-");
			if(fromDate[0]<=toDate[0])
			{
				if(fromDate[0]==toDate[0])
				{
					if(fromDate[1]<=toDate[1])
					{
						if(fromDate[1]==toDate[1])
						{
							if(fromDate[2]<=toDate[2])
							{
								return true;
							}
							else
							{
								return false;
							}
						}
						else
						{
							return true;
						}
					}
					else
					{
						return false;
					}
						
				}
				else
				{
					return true;
				}
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}
	else
	{
		return false;
	}
}
function GetDataforGraph()
{
	if(graphDataValidation()==true)
	{
	var fromDate = ($("#confromDate").val()).split("-");
	var toDate = ($("#contoDate").val()).split("-");
	var portId = $("#conPort-name").val()
	var catId = $("#conCategory").val();
	var jsonText1 = JSON.stringify({portId: portId,CatId: catId,fromMonth: fromDate[1],fromYear:fromDate[0],toMonth:toDate[1],toYear:toDate[0]});
			$.ajax({
                type: "POST",
                url: "http://thekbsystems.com/WorldPorts-SustainabilityForum/UserDetails.asmx/GetDataforGraph", // add web service Name and web service Method Name
                data: jsonText1,  //web Service method Parameter Name and ,user Input value which in Name Variable.
				contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response)
					{
					if(response.d)
						{
							var data = JSON.parse(response.d);
							/*$.each(data, function(index, element) 	{
									$("#conCategory").append('<option value='+element.categoryId+'>'+element.categoryName+'</option>');
								});*/
							//alert(response.d.portId);
							//changePage("#Consumption");
							//window.localStorage["userId"] = response;
							if(data.length>0)
							{
								igniteChart(data,portId,1,catId);
							}
							else
							{
								return data;
							}
						}
					},
                error: function (xhr, ajaxOptions, thrownError)
					{
						alert(xhr.status);
						alert(ajaxOptions);
						alert(thrownError);
						alert("Data unavailable");
					}
            });
	}
	else
	{
		alert("Enter Valid dates");
	}
}


function GetMultipleDataforGraph()
{
	var otherPorts = $("#otherPortsSel").val() || [];
	var numOfPorts = (otherPorts.length)+1;
	if((graphDataValidation()==true) && (numOfPorts>1))
	{
	otherPorts[numOfPorts-1] = $("#conPort-name").val();
	var ports = "";
	for(var i=0;i<otherPorts.length;i++)
	{
		if(i==(otherPorts.length-1))
		{
			ports += otherPorts[i];
		}
		else
		{
			ports += otherPorts[i]+",";
		}
		
	}
	var fromDate = ($("#confromDate").val()).split("-");
	var toDate = ($("#contoDate").val()).split("-");
	var catId = $("#conCategory").val();
	var jsonText1 = JSON.stringify({CatId: catId,fromMonth: fromDate[1],fromYear:fromDate[0],toMonth:toDate[1],toYear:toDate[0],portsString:ports,noOfports:numOfPorts});
			$.ajax({
                type: "POST",
                url: "http://thekbsystems.com/WorldPorts-SustainabilityForum/UserDetails.asmx/GetMultipleDataforGraph", // add web service Name and web service Method Name
                data: jsonText1,  //web Service method Parameter Name and ,user Input value which in Name Variable.
				contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response)
					{
					if(response.d)
						{
							var data = JSON.parse(response.d);
							/*$.each(data, function(index, element) 	{
									$("#conCategory").append('<option value='+element.categoryId+'>'+element.categoryName+'</option>');
								});*/
							//alert(response.d.portId);
							//changePage("#Consumption");
							//window.localStorage["userId"] = response;
							if(data.length>0)
							{
								igniteChart(data,otherPorts,numOfPorts,catId);
							}
							else
							{
								return data;
							}
						}
					},
                error: function (xhr, ajaxOptions, thrownError)
					{
						alert(xhr.status);
						alert(ajaxOptions);
						alert(thrownError);
						alert("Data unavailable");
					}
            });
	}
	else
	{
		alert("Enter Valid dates");
	}
}


function GetAllOtherPortNames()
{
		var jsonText1 = JSON.stringify({portSelectedValue: "1",categoryId: "1"});
			$.ajax({
                type: "POST",
                url: "http://thekbsystems.com/WorldPorts-SustainabilityForum/UserDetails.asmx/GetAllOtherPortNames", // add web service Name and web service Method Name
                data: jsonText1,  //web Service method Parameter Name and ,user Input value which in Name Variable.
				contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response)
					{
					if(response.d)
						{
							var data = JSON.parse(response.d);
							
							var label = document.createElement('label');
							label.setAttribute("name","otherPortsLabel");
							label.setAttribute("id","otherPortsLabel");
							label.setAttribute("for","conOtherPorts");
							label.setAttribute("align","center");
							
							var select = document.createElement('select');
							select.setAttribute("name", "otherPortsSel");
							select.setAttribute("id", "otherPortsSel");
							
							select.setAttribute("multiple", "multiple");
							var conDiv = document.createElement('div');
							conDiv.setAttribute("name","otherPortsConDiv");
							conDiv.setAttribute("id","otherPortsConDiv");
							
							$("#conOtherPorts").append(conDiv);
							$("#conOtherPorts").trigger("create");
							
							$("#otherPortsConDiv").append(label);
							$("#otherPortsConDiv").append(select);
							$("#otherPortsConDiv").trigger("create");    
							$("#otherPortsLabel").append('Other Ports');
							$.each(data, function(index, element) 	{
									$("#otherPortsSel").append('<option value='+element.portId+'>'+element.portName+'</option>');
								});
							$("#otherPortsSel").trigger("create");
							/*$.each(data, function(index, element) 	{
									$("#conCategory").append('<option value='+element.categoryId+'>'+element.categoryName+'</option>');
								});*/
							//alert(response.d.portId);
							//changePage("#Consumption");
							//window.localStorage["userId"] = response;
						}
					},
                error: function (xhr, ajaxOptions, thrownError)
					{
						alert(xhr.status);
						alert(ajaxOptions);
						alert(thrownError);
					}
            });
}	
function displayChart() {
	if($("#conflipComp").val()=="Self")
	{
		GetDataforGraph()
	}
	else
	{
		GetMultipleDataforGraph()
	}
}

function checkPreAuth() {
    var form = $("#loginForm");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}
function resetIgniteChart()
{
	$("#chart").igDataChart("option", "windowScaleVertical", 1);
	$("#chart").igDataChart("option", "windowScaleHorizontal", 0.1);
	
}
function getMonth(i)
{
	switch(i)
	{
		case 1:
			return "Jan";
		case 2:
			return "Feb";
		case 3:
			return "Mar";
		case 4:
			return "Apr";
		case 5:
			return "May";
		case 6:
			return "Jun";
		case 7:
			return "Jul";
		case 8:
			return "Aug";
		case 9:
			return "Sep";
		case 10:
			return "Oct";
		case 11:
			return "Nov";
		case 12:
			return "Dec";
	}
}

function igniteChart(rawData,portIds,numOfPorts,catId)
{
        $(function () {
			$("#chart").igDataChart();
			$("#chart").igDataChart( "destroy" );
			$("#horizontalZoomSlider").val(1);
			$("#horizontalZoomSlider").slider('refresh');
			
			var graphData = [];
			var avg = rawData[0].Column1;
			var monthsCount = (rawData.length)/numOfPorts;
			var startDate = getMonth(rawData[0].Column2)+"-"	+(rawData[0].year).toString();
			var endDate;
			var catName = portName = $("#conCategory option[value='"+catId+"']").text();
			var marker = "none";
			var thickness = 5;
			var	seriesType = $("#seriesType").val();
			if (seriesType == "area" ||
				seriesType == "splineArea" ||
				seriesType == "column" ||
				seriesType == "waterfall" ||
				seriesType == "point" ||
				seriesType == "stepArea") 
				{
					thickness = 1;
                }
			if (seriesType == "point") 
				{
                    marker = "circle";
                }
			if(numOfPorts == 1)
			{
				for(i=0;i<rawData.length;i++)
				{
					var portValue = "Port"+rawData[i].portId+"Value";
					graphData[i] = {Date: getMonth(rawData[i].Column2)+"-"	+(rawData[i].year).toString()};
					graphData[i][portValue] = rawData[i].Column1;
					if(avg>rawData[i].Column1)
					{
						avg = rawData[i].Column1;
					}
				}
				endDate = getMonth(rawData[i-1].Column2)+"-"	+(rawData[i-1].year).toString()
			}
			else
			{
				for(i=0;i<monthsCount;i++)
					{
						graphData[i] = {Date: getMonth(rawData[i].Column2)+"-"	+(rawData[i].year).toString()};
					}
				i=0;
				while(i<rawData.length)
				{
					var portValue = "Port"+rawData[i].portId+"Value";
					for(j=0;j<monthsCount;j++)
					{
						graphData[j][portValue] = rawData[i].Column1;
						if(avg>rawData[i].Column1)
						{
							avg = rawData[i].Column1;
						}
						i++;
					}
				}
				endDate = getMonth(rawData[i-1].Column2)+"-"	+(rawData[i-1].year).toString()
			}
			var series = [];
			for(i=0;i<numOfPorts;i++)
			{
				var portId = portIds[i];
				var portName;
				var portValue = "Port"+portId+"Value";
				if(i!=(numOfPorts-1))
				{
					portName = $("#otherPortsSel option[value='"+portId+"']").text();
				}
				else
				{
					portName = $("#conPort-name option[value='"+portId+"']").text();
				}
				series[i]= {
							name: portName,
								type: $("#seriesType").val(),
								title: portName,
								xAxis: "DateAxis",
								yAxis: "CatAxis",
								valueMemberPath: portValue,
								markerType: marker,
                    			isTransitionInEnabled: true,
								isHighlightingEnabled: true,
								thickness: thickness
							}
			}
			var data = [
                { "CountryName": "China", "Pop1995": 1216, "Pop2005": 1297, "Pop2015": 1361, "Pop2025": 1394 },
                { "CountryName": "India", "Pop1995": 920, "Pop2005": 1090, "Pop2015": 1251, "Pop2025": 1396 },
                { "CountryName": "United States", "Pop1995": 266, "Pop2005": 295, "Pop2015": 322, "Pop2025": 351 },
                { "CountryName": "Indonesia", "Pop1995": 197, "Pop2005": 229, "Pop2015": 256, "Pop2025": 277 },
                { "CountryName": "Brazil", "Pop1995": 161, "Pop2005": 186, "Pop2015": 204, "Pop2025": 218 }
            ];

			var title;
			var subtitle
			if(numOfPorts>1)
				{
					title = "Comparison of "+catName+" Consumption in Ports";
					subtitle = "Graph from "+startDate+" to "+endDate;
				}
			else
				{
					title = catName+" Consumption in Port";
					subtitle = "Graph from "+startDate+" to "+endDate;
				}
			$("#chart").igDataChart({
                legend: { element: "lineLegend" },
                title: title,
                subtitle: subtitle,
                horizontalZoomable: true,
                verticalZoomable: true,
                dataSource: graphData,
                axes: [
                    {
                        name: "DateAxis",
                        type: "categoryX",
                        label: "Date"
                    },
                    {
                        name: "CatAxis",
                        type: "numericY", 
                        minimumValue: avg-1000,
                        title: "Units",
                    }
                ],
                series: series
                    
            });
            $("#chart").igDataChart("resetZoom");

			$("#chart").igDataChart({defaultInteraction: "dragPan"});
            
			$("#seriesType").change(function (e) {
                $("#horizontalZoomSlider").val(1);
				$("#horizontalZoomSlider").slider('refresh');
			
				var marker = "none";
                var thickness = 5,
				seriesType = $(this).val();
				if (seriesType == "area" ||
                    seriesType == "splineArea" ||
                    seriesType == "column" ||
                    seriesType == "waterfall" ||
                    seriesType == "point" ||
                    seriesType == "stepArea") {
                    thickness = 1;
                }
                if (seriesType == "point") {
                    marker = "circle";
                }
				for(i=0;i<numOfPorts;i++)
				{
					var portId = portIds[i];
					var portName;
					var portValue = "Port"+portId+"Value";
					if(i!=(numOfPorts-1))
					{
						portName = $("#otherPortsSel option[value='"+portId+"']").text();
					}
					else
					{
						portName = $("#conPort-name option[value='"+portId+"']").text();
					}
					$("#chart").igDataChart("option", "series", [{ name: portName,remove: true}]);
				}
				for(i=0;i<numOfPorts;i++)
				{
					var portId = portIds[i];
					var portName;
					var portValue = "Port"+portId+"Value";
					if(i!=(numOfPorts-1))
					{
						portName = $("#otherPortsSel option[value='"+portId+"']").text();
					}
					else
					{
						portName = $("#conPort-name option[value='"+portId+"']").text();
					}
					$("#chart").igDataChart("option", "series", [{
								name: portName,
								type: $(this).val(),
								title: portName,
								xAxis: "DateAxis",
								yAxis: "CatAxis",
								valueMemberPath: portValue,
								markerType: marker,
                    			isTransitionInEnabled: true,
								isHighlightingEnabled: true,
								thickness: thickness
								}]);
				}
			$("#chart").igDataChart("resetZoom");
            });
			$("#horizontalZoomSlider").change(function (e) {
				var val = $("#horizontalZoomSlider").val();
				val = Math.abs(val-101);
				val = val/100;
				$("#chart").igDataChart("option", "windowScaleVertical", 1);
				$("#chart").igDataChart("option", "windowScaleHorizontal", val);
			});
		});	
}

/*function changePage(){
            $('#UserPage').bind("callback", function(e, args) {
                alert(args.mydata);
            });

            //$.mobile.updateHash('#pg2',true);
            //$.mobile.changePage($("#pg2"),"slide");
            $.mobile.changePage( $("#pg2"), "slide", true, true);

            $("page").trigger("callback");
        }*/
function changePage(page){
            $(page).bind("callback", function(e, args) {
                alert(args.mydata);
            });

            //$.mobile.updateHash('#pg2',true);
            //$.mobile.changePage($("#pg2"),"slide");
            $.mobile.changePage( $(page), "pop", true, true);

            $("page").trigger("callback");
        }

function handleLogin() {
    var form = $("#loginForm");  
	//$("#test").text("handleLogin hit");
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
	//navigator.notification.alert('HI',alertDismissed,'HIT SUCCESS','DONE');
    console.log("click");
    if(u != '' && p!= '') {
		var jsonText = JSON.stringify({UserName : u,PassWord :p});
        $.ajax({
			type: "POST",
			url: "http://thekbsystems.com/WorldPorts-SustainabilityForum/UserDetails.asmx/ValidateUser", // add web service Name and web service Method Name
			data: jsonText,  //web Service method Parameter Name and ,user Input value which in Name Variable.
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (response)
				{
				if(response.d=="Success")
					{
						changePage("#Consumption");
						window.localStorage["userId"] = response;
					}
					else
					{
						alert("failed login");
						//location.href = "index.html";
					}
				},
			error: function(xhr, textStatus, error){
				console.log(xhr.statusText);
				console.log(textStatus);
				console.log(error);
				}      
		});
		
				
		/*$.post("http://www.coldfusionjedi.com/demos/2011/nov/10/service.cfc?method=login&returnformat=json", {username:u,password:p}, function(res) {
            if(res == true) {
                //store
                window.localStorage["username"] = u;
                window.localStorage["password"] = p;             
                $.mobile.changePage("some.html");
            } else {
                navigator.notification.alert("Your login failed", function() {});
            }
         $("#submitButton").removeAttr("disabled");
        },"json");
		*/
		
		
    } else {
        //Thanks Igor!
        alert("You must enter a username and password", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}

function deviceReady() {
    
$("#loginForm").on("submit",handleLogin);
webServiceTest();
}