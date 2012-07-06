// A file that contains the necessary API processing.

var requestAuth = function()
{
	if(IN.User.isAuthorized())
	{
		loadJobs();
	}
	else
	{
		IN.User.authorize(loadJobs);
	}
}

var loadJobs = function()
{
	// At this point, we're authenticated, so let's display the result divs.
	$("#field-of-study-div").show("slow");
	$("#job-prospects-div").show("slow");

	// Extract the user's major.
	IN.API.Profile("me").fields(["educations:(field-of-study)"]).result(function(result)
	{
		// For some reason, some user educations are empty; let's filter them out.
		var user_educations = result.values[0].educations.values;
		var field_of_study = get_field_of_study(user_educations);

		// Update the HTML
		$("#field-of-study").append(field_of_study);

		// Pass this on to extract your 'friend's' headlines.
		jobOpportunities(field_of_study)
	})	
};



var get_field_of_study = function(user_educations)
{
	var index = 0;
	// As long as the fieldOfStudy property is empty, ignore it.
	while (user_educations[index].fieldOfStudy.length === 0) { index += 1; }
	if(user_educations[index].fieldOfStudy === undefined) { return ""; }
	else { return user_educations[index].fieldOfStudy; }
}


var jobOpportunities = function(field_of_study)
{

	IN.API.PeopleSearch().result(function(result) { 
		// We extract the total so we can calculate the number of batches we have to fetch.
		var total = result.people._total;
		num_batches = Math.floor(total / 25) + 1

		// For each batch, extract the users and their headlines.
		for (var i = 0; i < num_batches; i++)
		{
			IN.API.PeopleSearch().fields(["first-name", "last-name", "headline", "educations:(field-of-study)"]).params({"start": 25*i, "count":25}).result(function(result)
			{
				users = result.people.values;
				for (var j = 0; j < users.length; j++)
				{
					user_educations = users[j].educations.values;
					var user_education = get_field_of_study(user_educations);
				
					if (user_education === field_of_study)
					{
						$("#job-prospects").append(users[j].headline + " (held by: " + users[j].firstName + " " + users[j].lastName + ")<br />");
					}
				}
			});
		}
	});
}