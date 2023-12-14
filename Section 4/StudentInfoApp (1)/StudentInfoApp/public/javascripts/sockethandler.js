var socket = io.connect();
//alert(window.location.hostname);
socket.on('connect', function () {
    $('#status').append('<b>Connected!</b>');
});

socket.on('outboundmessage', function (data) {
    
    //variables that hold latitude and longitude 
    var lat, lng;
    
    //code the mailing address
    geocoder.geocode({ 'address': data.mailingaddr }, function (results, status) {
        
        if (status == google.maps.GeocoderStatus.OK) {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
        }
        else {
            alert('failed because: ' + status);
        }
        
        //add a new marker based on long/lat values generated from outbound message
        $('<script>var mk = new google.maps.Marker({map: map,position: { lat: ' + lat + ', lng: ' + lng + '}});</' + 'script>').appendTo(document.body);
    });
});
