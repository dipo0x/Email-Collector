function deleteLead(leadID){
    $.ajax({
        url:"/leads/" + leadID +"/delete-json",
        type:"POST",
        dataType: 'json',
        data: JSON.stringify({leadID}),       
        contentType: "application/json",
        success: ((res)=>{
            console.log("Result: ", res)
            $("#"+ leadID).remove()
        }),
        error: ((error)=>{
            console.log(error)
        })
    });
}