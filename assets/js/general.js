//

var _settings,
	_informations,
	_contactFormElement,
	_sendFormButton;

$(document).ready(function() {
	initialize();
});

function initialize() {
	getSettings();

	getInformation();
	getSocialMedia();
}

function waitingDependencies() {
	if((typeof _settings !== "undefined") && (typeof _informations !== "undefined")) {
		getContent();
	}
}

//

function dispatchCustomEvent(eventName, args) {
	document.dispatchEvent(new CustomEvent(eventName, {"detail": args}));
}

function getContent() {
	loadJSON("lang_" + _settings.default_language, "contentReceived");
}

function getCurrentMonth() {
	return (new Date()).getMonth() + 1;
}

function getCurrentYear() {
	return (new Date()).getFullYear();
}

function getInformation() {
	loadJSON("data_info", "informationReceived");
}

function getSettings() {
	loadJSON("settings", "loadedSettings");
}

function getSocialMedia() {
	loadJSON("data_social", "socialMediaReceived");
}

function loadJSON(jsonName, callEvent) {
	$.getJSON("assets/json/" + jsonName + ".json", function(json) {
		dispatchCustomEvent(callEvent, json);
	});
}

function menuLoaded() {
	$(document).on("click", ".menu_item_block:not('.active')", function() {
		$("section.content").hide();

		$(".menu_item_block").removeClass("active");
		$(this).addClass("active");

		$("section#" + $(this).attr("id") + ".content").animate({ width: "toggle" }, 1000);
	});

	$(".menu_item_block").eq(0).click();
}

function showAlertMessage(type, message) { showAlertMessage(type, message, type); }
function showAlertMessage(type, message, icon) {
	$("#alert_message")
		.html("<i class='fa fa-" + icon + " fa-fw'></i> " + message)
		.addClass(type + "_message")
		.fadeIn(500);
}

//

Number.prototype.padLeft = function (n, str) { return Array(n-String(this).length+1).join(str||'0')+this; }

String.prototype.isEmail = function() { return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this); }