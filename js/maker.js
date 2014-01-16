audio.pause();

$("#input-generate").click(function () {

	var firstName = $("#input-first-name").val();
	var lastName = $("#input-last-name").val();
});


$("#input-generate").click(function () {

	var firstName = $("#input-first-name").val();
	var lastName = $("#input-last-name").val();
	location.search = "?firstName=" + firstName + "&lastName="+lastName;

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
	
	var firstList = findElement(firstName);
	var lastList = findElement(lastName);
	
	if(firstList && lastList) {
		
		var firstElem = firstList[0];
		var lastElem = lastList[0];
		
		var firstIndex = firstList[1];
		var lastIndex = lastList[1];
		
		console.log("---NEW NAME---");
		console.log(firstList);
		console.log(lastList);
		
		$("#bb-body").attr("style", "");
		$("#bb-name").html("");
		$("<span class='chemical-element'>" +
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
			"<span class='chemical-element' style='text-align:center;'>" +
					lastElem.symbol+
					"<div class='desc' role='top-left'>" + lastElem.atomic_weight + "</div>" +
					"<div class='desc' role='top-right'>" +
						oxidationStates(lastElem) +
					"</div>" +
					"<div class='desc medium' role='bottom-left-1'>" + lastElem.atomic_number + "</div>" +
					"<div class='desc' role='bottom-left-2'>" + lastElem.electronic_configuration + "</div>" +
			"</span>" +
			"<span class='title-2'>" +
					"<div class='chemical-element-out'>" + lastName.substr(lastElem.symbol.length) + "</div>" + 
			"</span>").appendTo($("#bb-name"));
		audio.play();
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
	
	// First Try 2 Letters
	for(i = 0; i < (pName.length - 2); i++) {
		for(var element in periodicTable) {
				if(pName.substr(i, 2).toUpperCase() == periodicTable[element].symbol.toUpperCase()) {
					return [periodicTable[element], i];
				}
		}
	}
	
	// Then 1 Letter 
	for(i = 0; i < (pName.length - 2); i++) {
		for(var element in periodicTable) {
			if(pName.substr(i, 1).toUpperCase() == periodicTable[element].symbol.toUpperCase()) {
				return [periodicTable[element], i];
			}
		}
	}
	
	return false;
}