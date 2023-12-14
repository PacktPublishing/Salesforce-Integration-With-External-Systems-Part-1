$(document).ready(function () {
    $('.btn-details').click(function () {
        
        //get the student id
        var id = $(this).attr("value");
        
        //clear table rows
        $('#studentdetails').find('tr').remove();
        
        //make server side request for student details
        $.ajax({
            url: "/lookupdetail",
            type: "POST",
            dataType: "json",
            data: JSON.stringify({ studentid: id }),
            contentType: "application/json",
            cache: false,
            timeout: 5000,
            complete: function () {
                //called when complete
                //alert('complete');
            },
            
            success: function (data) {
                
                //create table based on student detail results
                $('#studentdetails').append('<tr><td class=\'studentdetailheader\'>Name:</td><td>'+ data.student.studentName +'</td></tr>');
                $('#studentdetails').append('<tr><td class=\'studentdetailheader\'>Party:</td><td>' + data.student.studentParty + '</td></tr>');
                for (var i = 0; i < data.student.Donations.length; i++) {
                    $('#studentdetails').append('<tr><td class=\'studentdetailheader\'>Donation:</td><td>' + data.student.Donations[i].Donation_Date__c + ' - '+ data.student.Donations[i].Candidate_Name__c +' ($'+ data.student.Donations[i].Amount__c +')</td></tr>');
                }
            },
            
            error: function () {
                alert('error');
            },
        });
        
        return false;
    });    
});