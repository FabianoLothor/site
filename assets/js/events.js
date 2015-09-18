// Listeners
document.addEventListener("loadedSettings", function(e) {
	_settings = e.detail;

	waitingSettings();
}, false);

document.addEventListener("informationReceived", function(e) {
	information = e.detail;

	$("#full_name").html(information.name + " " + information.surname + " " + information.last_name);
}, false);

document.addEventListener("socialMediaReceived", function(e) {
	socialMedia = e.detail;

	if(Object.keys(socialMedia).length > 0) {
		$("#social").removeAttr("hidden");

		for (index in socialMedia) {
			if(socialMedia[index].enable) {
				$("#social").append("<a alt='" + socialMedia[index].name + "' href='" + socialMedia[index].url + "' target='_blank'>" + "<img id='" + index + "_icon' class='social_icon' title='" + socialMedia[index].name + "' src='assets/images/social/" + index + ".svg' />" + "</a>");
			}
		}

		$("#social img").first().addClass("first_social_icon");
		$("#social img").last().addClass("last_social_icon");

		$("#social img").jrumble({ x : 0, y : 0, rotation : 5 });
		$("#social img").hover( function() { $(this).trigger("startRumble"); }, function(){ $(this).trigger("stopRumble"); });
	}
}, false);

document.addEventListener("contentReceived", function(e) {
	content = e.detail;
	menu = content.menu;
	colorsUsed = 0;

	$("#profession").html(content.profession);
	$("#copyright").html(content.copyright.replace("{to}", getCurrentYear() > 2015 ? " - " + getCurrentYear() : ""));

	for (index in menu) {
		if(menu[index].enable) {
			$("#menu").append("<li class='menu_item'><a alt='" + menu[index].title + "' href='#'><div id='" + index + "' class='menu_item_block " + _settings.colors[colorsUsed] + "'><i class='fa fa-" + menu[index].icon + "'></i><strong><span class='menu_item_title'>" + menu[index].title + "</span></strong><span class='menu_item_subtitle'>" + menu[index].subtitle + "</span></div></a></li>");
			
			$("section#" + index + ".content").addClass(_settings.colors[colorsUsed]);
			$("section#" + index + ".content h2").html(menu[index].subtitle);

			++colorsUsed;
		}
	}

	menuLoaded();
}, false);