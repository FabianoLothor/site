//

var _settings;

$(document).ready(function() {
	initialize();
});

function initialize() {
	getSettings();

	getInformation();
	getSocialMedia();
}

function waitingSettings() {
	getContent();
}

//

function dispatchCustomEvent(eventName, args) {
	document.dispatchEvent(new CustomEvent(eventName, {"detail": args}));
}

function getContent() {
	loadJSON("lang_" + _settings.default_language, "contentReceived");
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