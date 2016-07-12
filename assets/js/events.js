// Listeners
document.addEventListener("loadedSettings", function(e) {
	_settings = e.detail;

	_contactFormElement = $("#" + _settings.contact_form_id);
	_contactFormElement.submit(function(event) { event.preventDefault(); });

	_sendFormButton = $("#" + _settings.contact_form_id + " [name='send']");

	$("body").on("submit", _sendFormButton, function() {
		loadJSON("lang_" + _settings.default_language, "sendMail");
	});

	waitingDependencies();
}, false);

document.addEventListener("informationReceived", function(e) {
	_informations = e.detail;
	_informations.fullName = _informations.name + " " + _informations.surname + " " + _informations.last_name;

	$("#full_name").html(_informations.fullName);

	waitingDependencies();
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

	$("title").html(_informations.fullName + " - " + content.profession);
	$("#profession").html(content.profession);
	$("#copyright").html(content.copyright
		.replace("{year_site}", _settings.year_site)
		.replace("{to}", getCurrentYear() > _settings.year_site ? " - " + getCurrentYear() : ""));

	for (index in menu) {
		if(menu[index].enable) {
			$("#menu").append("<li class='menu_item'><a alt='" + menu[index].title + "' href='#'><div id='" + index + "' class='menu_item_block " + _settings.colors[colorsUsed] + "'><i class='fa fa-" + menu[index].icon + "'></i><strong><span class='menu_item_title'>" + menu[index].title + "</span></strong><span class='menu_item_subtitle'>" + menu[index].subtitle + "</span></div></a></li>");
			
			$("section#" + index + ".content").addClass(_settings.colors[colorsUsed]);
			$("section#" + index + ".content h2").html(menu[index].subtitle);

			switch (index) {
				case "profile" :
					profile = content.profile;

					$("#resume").html(profile.resume);

					$("#personal_informations").append("<li class='personal_informations_item'><label>" + profile.name + "</label><span>" + _informations.fullName +"</span></li>");
					$("#personal_informations").append("<li class='personal_informations_item'><label>" + profile.nickname + "</label><span>" + _informations.nickname +"</span></li>");
					$("#personal_informations").append("<li class='personal_informations_item'><label>" + profile.locality + "</label><span>" + _informations.locality +"</span></li>");
					$("#personal_informations").append("<li class='personal_informations_item'><label>" + profile.email + "</label><span>" + _informations.email + "</span></li>");
					$("#personal_informations").append("<li class='personal_informations_item'><label>" + profile.skype + "</label><span>" + _informations.skype + "</span></li>");
					//$("#personal_informations").append("<li class='personal_informations_item'><label>" + profile.phone + "</label><span>" + _informations.phone + "</span></li>");
					//$("#personal_informations").append("<li class='personal_informations_item'><label>" + profile.birthplace + "</label><span>" + _informations.birthplace + "</span></li>");
					$("#personal_informations").append("<li class='personal_informations_item'><label>" + profile.birthday + "</label><span>" + _informations.birthday.complete + " (" + (getCurrentYear() - _informations.birthday.year) + ")</span></li>");
					$("#personal_informations").append("<li class='clear'></li>");

					for (var i = 1; i <= _settings.total_photos; ++i) {
						$("#photos_slider").append("<img alt='Foto " + i + "' src='" + _settings.photos_path + "photo_" + i + ".jpg' />");;
					};

					$('.nivoSlider').nivoSlider({
						directionNav : false,
						controlNav : true,
						controlNavThumbs : false,
						randomStart : true
					});
				break;
				case "experience" :
					experience = content.experience;

					$("#jobs").children().first().html(content.experience.jobs_title);

					for (job in experience.jobs) {
						$("#jobs").children().first().after("<h6 class='company'>" + experience.jobs[job].company + "<span>" + job.replace("{today}", getCurrentMonth().padLeft(2) + "/" + getCurrentYear()) + "</span></h6>");

						for (task in experience.jobs[job].tasks.reverse()) {
							$("h6.company").first().after("<ul class='office'><li><i class='fa fa-caret-right'><span>" + experience.jobs[job].tasks[task] + ".</span></i></li></ul>");
						}
					}

					$("#education").children().first().html(content.experience.education_title);

					for (education in experience.education) {
						$("#education").children().first().after("<h6 class='institution'>" + experience.education[education].institution + "<span>" + education.replace("{today}", getCurrentYear() + " (" + experience.coursing + ")") + "</span></h6>");
						
						$("h6.institution").first().after("<ul class='formation'><li><i class='fa fa-caret-right'><span>" + experience.education[education].formation + ".</span></i></li></ul>");
					}

					$("#skills").children().first().html(content.experience.skills_title);

					for (skill in experience.skills) {
						$("#skills").children().first().after("<h6 class='skill'>" + experience.skills[skill].text + "</h6>");
						
						$("h6.skill").first().after("<ul class='skills'></ul>");
						
						for (skill_item in experience.skills[skill].list) {
							$(".skills").first().append("<li class='skills_item " + (skill_item % 2 === 0 ? "skills_item_left" : "skills_item_right") + "'><label>" + experience.skills[skill].list[skill_item] + "</label></li>");
						}
					}
				break;
				case "contact" :
					$("#contact_form input[type='text']").each(function() {
						$(this).attr("placeholder",
							$(this).attr("placeholder")
								.replace("{" + $(this).attr("name") + "}", content.contact[$(this).attr("name")])
								.replace("{required}", content.contact.required)
						);
					});

					textarea = $("#contact_form textarea");
					textarea.attr("placeholder", textarea.attr("placeholder")
						.replace("{" + textarea.attr("name") + "}", content.contact[textarea.attr("name")])
						.replace("{required}", content.contact.required)
					);

					submit = $("#contact_form input[type='submit']");
					submit.val(content.contact[submit.val()]);
				break;
			}

			++colorsUsed;
		}
	}

	menuLoaded();
}, false);
     
document.addEventListener("sendMail", function(e) {
	content = e.detail;

	sendFormButton = $(e.srcElement.activeElement);
	sendFormButton.val(content.contact.sending);
    sendFormButton.prop('disabled', true);
return;
    var data = {};

    data["access_token"] = _settings.postmail_access_token;
    data["subject"] = $("#" + _settings.contact_form_id + " [name='subject']").val();
    data["text"] = $("#" + _settings.contact_form_id + " [name='text']").val();

	$.post("https://postmail.invotes.com/send",
        data,
        function() {
        	console.log("success");
        }
    ).fail(function() {
    	console.log("error");
    });

    return false;
}, false);