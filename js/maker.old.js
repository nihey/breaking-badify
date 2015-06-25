audio.pause();

$("#input-generate").click(function () {

  var firstName = $("#input-first-name").val();
  var lastName = $("#input-last-name").val();

  var firstElem = findElement(firstName);
  var lastElem = findElement(lastName);
  console.log("-- NAME");
  console.log(firstElem);
  console.log(lastElem);

  if(firstElem && lastElem) {

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
       "<div class='chemical-element-out'>" + firstName.substr(firstElem.symbol.length) + "</div>" +
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
});

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
  // First Try 2 Letters
  for(var element in periodicTable) {

    if(pName.substr(0, 2).toUpperCase() == periodicTable[element].symbol.toUpperCase()) {
      return periodicTable[element];
    }
  }

  // Then 1 Letter
  for(var element in periodicTable) {

    if(pName.substr(0, 1).toUpperCase() == periodicTable[element].symbol.toUpperCase()) {
      return periodicTable[element];
    }
  }

  return false;
}
