$('#bookSearch').on("click", function(e) {
    e.preventDefault();
    console.log('select_link clicked');

    var data = {};
    data.title = "title";
    data.message = "message";
    
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:3000/result',						
        success: function(data) {
            console.log('success');
            console.log(JSON.stringify(data));
        }
    });
});