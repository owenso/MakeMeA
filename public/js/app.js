window.onload=function(){
$('#new-user-form #avatarupload').dependsOn({
    // The selector for the depenency
    '#new-user-form #yourOwn': {
        // The dependency qualifiers
        checked: true
    }
});

};