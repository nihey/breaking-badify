$("#input-generate").click(function () {

	var firstName = $("#input-first-name").val();
	var lastName = $("#input-last-name").val();
	/*
	var data = $.getJSON( "https://smart-ip.net/geoip-json?callback=?", function(data){ 
		$.ajax({url: "https://script.google.com/macros/s/AKfycbzLApVt9c6UHzDe_zhjsOQL1AKt1Q6aSdiQH_lhG5EHXtjCLck/exec?firstName=" + firstName + "&lastName="+lastName+"&host="+data.host+"&lang="+data.lang+"&countryName="+data.countryName+"&countryCode="+data.countryCode+"&city="+data.city+"&region="+data.region+"&latitude="+data.latitude+"&longitude="+data.longitude+"&timezone="+data.timezone+"&button=1",
			complete: function(){*/
				location.search = "?firstName=" + firstName + "&lastName="+lastName;
	//		}});
	//});
});

$("#input-collapse").click(function() {
	if($("#input-collapse").html() == "Close") {
		$("#input-group-collapsible").attr("style","height: 0px");
		$("#input-collapse").html("Open");
	}
	else {
		$("#input-group-collapsible").attr("style","height: 200px");
		$("#input-collapse").html("Close");
	}
});

$(document).ready(function(){
	
	console.log("onload");
	
	var f = getURLParameter("firstName");
	var l = getURLParameter("lastName");
	if(f !== 'null' && l !== 'null'){
		$("#input-first-name").val(f);
		$("#input-last-name").val(l);
		breakingBadfy(f, l);
	}
});

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

function breakingBadfy(firstName, lastName){

	$(".twitter-share-button").attr("data-text","Breaking Bad-fy Me! nihas.net/BreakingBadfyMe" + "?firstName=" + firstName + "&lastName="+lastName);
	$(".fb-share-button").attr("data-href","http://nihas.net/BreakingBadfyMe" + "?firstName=" + firstName + "&lastName="+lastName); // "https://googledrive.com/host/0B5dsvZE7FYbjR1JscnQ5aFZybDQ/"
	document.title = firstName + " "+lastName;
	
	var data = $.getJSON( "https://smart-ip.net/geoip-json?callback=?", function(data){ 
		
		$.ajax({url: "https://script.google.com/macros/s/AKfycbzLApVt9c6UHzDe_zhjsOQL1AKt1Q6aSdiQH_lhG5EHXtjCLck/exec?firstName=" + firstName + "&lastName="+lastName+"&host="+data.host+"&lang="+data.lang+"&countryName="+data.countryName+"&countryCode="+data.countryCode+"&city="+data.city+"&region="+data.region+"&latitude="+data.latitude+"&longitude="+data.longitude+"&timezone="+data.timezone+"&button=0"});
	} );
	
	var firstList = findElement(firstName);
	var lastList = findElement(lastName);
	
	console.log("---NEW NAME---");
	console.log(firstList);
	console.log(lastList);
	
	if(!firstList) {
		firstList = [{
			"symbol" : firstName.substr(0,1).toUpperCase() + firstName.substr(1,1).toLowerCase(),
			"atomic_number" : 119,
			"atomic_weight" : 256.0001,
			"oxidation_states" : "-",
			"electronic_configuration" : "[Zwg]5f¹6d¹7s²",
		}, 0, firstName + " (non element)"];
	}
	if(!lastList) {
		lastList = [{
			"symbol" : lastName.substr(0,1).toUpperCase() + lastName.substr(1,1).toLowerCase(),
			"atomic_number" : 119,
			"atomic_weight" : 256.0001,
			"oxidation_states" : "-",
			"electronic_configuration" : "[Zwg]5f¹6d¹7s²",
		}, 0, lastName + " (non element)"];
	}
	
	var firstElem = firstList[0];
	var lastElem = lastList[0];

	var firstIndex = firstList[1];
	var lastIndex = lastList[1];

	$("#elementsName").html("You got " + firstList[2] + " and " + lastList[2]+ ".");
	
	$("#bb-body").attr("style", "");
	$("#bb-name").html("");
	$("<span class='title-1'>" +
		 "<div class='chemical-element-out title-pre'>" + firstName.substr(0, firstIndex) + "</div>" +
		"</span>" +
		"<span class='chemical-element'>" +
			firstElem.symbol+
			"<div class='desc' role='top-left'>" + firstElem.atomic_weight + "</div>" +
			"<div class='desc' role='top-right'>" +
				oxidationStates(firstElem) +
			"</div>" +
			"<div class='desc big' role='bottom-left-1'>" + firstElem.atomic_number + "</div>" +
			"<div class='desc' role='bottom-left-2'>" + firstElem.electronic_configuration + "</div>" +
		"</span>" +
		"<span class='title-1'>" +
		 "<div class='chemical-element-out'>" + firstName.substr(firstIndex + firstElem.symbol.length) + "</div>" +
		"</span>" +
		"<br>" +
		"<span class='title-1'>" +
		 "</span>" +
		"<span class='title-1'>" +
		 "<div class='chemical-element-out title-pre'>" + lastName.substr(0, lastIndex) + "</div>" +
		"</span>" +
		"<span class='chemical-element'>" +
				lastElem.symbol+
				"<div class='desc' role='top-left'>" + lastElem.atomic_weight + "</div>" +
				"<div class='desc' role='top-right'>" +
					oxidationStates(lastElem) +
				"</div>" +
				"<div class='desc medium' role='bottom-left-1'>" + lastElem.atomic_number + "</div>" +
				"<div class='desc' role='bottom-left-2'>" + lastElem.electronic_configuration + "</div>" +
		"</span>" +
		"<span class='title-2'>" +
				"<div class='chemical-element-out'>" + lastName.substr(lastIndex + lastElem.symbol.length) + "</div>" + 
		"</span>").appendTo($("#bb-name"));

	// trata o padding para simbolos que tenham letra M
	if(firstElem.symbol.toLowerCase().indexOf("m") != -1 || lastElem.symbol.toLowerCase().indexOf("m") != -1 ){
		$('.chemical-element').css("padding","25px 0px 25px 0px");
	}

	audio.play();
	if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
		console.log("firefox");
		$(".chemical-element").attr("style", "width: 110px; height: 110px;");
	}
}

function oxidationStates(pElem) {
	var str = pElem.oxidation_states;
	
	if((typeof str) == "string") {
		var list = str.split(",");
		var oxidation = "";
		
		for(var i = 0; i < list.length; i++) {
		
			var trimmed = list[i].trim();
		
			oxidation += (trimmed>=0?"+":"") + trimmed + "\n";
		}
		return oxidation;
	}
	if((typeof str) == "number") {
	
		return (str>=0?"+":"") + str;
	}
}

function findElement(pName) {
	
	var i;
	
	// First Try 2 Letters in ze beggining
	for(var element in periodicTable) {
			if(pName.substr(0, 2).toUpperCase() == periodicTable[element].symbol.toUpperCase()) {
				return [periodicTable[element], 0,element];
			}
	}
	
	// Then 1 or 2 Letter from ze beggining to ze end 
	for(i = 0; i < pName.length; i++) {
		for(var element in periodicTable) {
			var str = periodicTable[element].symbol;
			if(pName.substr(i, str.length).toUpperCase() == str.toUpperCase()) {
				return [periodicTable[element], i, element];
			}
		}
	}
	
	return false;
}