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

function webServiceTest()
        {
			var jsonText = JSON.stringify({UserName : 'vvangari',PassWord :'Munn@963'});
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
					},
                error: function (xhr, ajaxOptions, thrownError)
					{
						alert(xhr.status);
						alert(thrownError);
					}
            });
        }
		
function displayChart() {
var chartType = $('input:radio[name=radio-chart-type]:checked').val();
if(chartType == "line")
	{
		$.jqplot('chartdiv',  [[[1, 2],[3,5.12],[5,13.1],[7,33.6],[9,85.9],[11,219.9]]]);
	}
else
	{
		$.jqplot('chartdiv',  [[[1, 2],[3,5.12],[5,13.1],[7,33.6],[9,85.9],[11,219.9]]],{
		animate: !$.jqplot.use_excanvas,
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: true }
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                }
            },
            highlighter: { show: false }
        });
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

}