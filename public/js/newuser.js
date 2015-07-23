window.onload = function() {
    console.log('loaded');
    $('#new-user-form input[type=file]').dependsOn({
        // The selector for the depenency
        '#new-user-form input[type=radio]': {
            // The dependency qualifiers
            values: ['yourown']
        }
    });
};


$.get("http://ipinfo.io", function(response) {
    $('#country').val(response.country);
    $('#city').val(response.city);
    $('#region').val(response.region);
}, "jsonp");
