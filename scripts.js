var API_ENDPOINT = "https://1uigmkcdy5.execute-api.us-east-1.amazonaws.com/dev"

document.getElementById("sayButton").onclick = function(){

	var inputData = {
		"voice": $('#voiceSelected option:selected').val(),
		"text" : $('#postText').val()
	};

	$.ajax({
	      url: API_ENDPOINT,
	      type: 'POST',
	      data:  JSON.stringify(inputData)  ,
	      contentType: 'application/json; charset=utf-8',
	      success: function (response) {
					document.getElementById("postIDreturned").textContent="Post ID: " + response;
	      },
	      error: function () {
	          alert("error");
	      }
	  });
}


document.getElementById("searchButton").onclick = function(){

	var postId = $('#postId').val();


	$.ajax({
				url: API_ENDPOINT + '?postId='+postId,
				type: 'GET',
				success: function (response) {

					$('#posts tr').slice(1).remove();

	        jQuery.each(response, function(i,data) {

						var player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"

						if (typeof data['url'] === "undefined") {
	    				var player = ""
						}

						$("#posts").append("<tr> \
								<td>" + data['id'] + "</td> \
								<td>" + data['voice'] + "</td> \
								<td>" + player + "<br /><br />" + data['text'].substring(0, 250)  + "... </td> \
								<td>" + data['status']  + "</td> \
								</tr>");
	        });
				},
				error: function () {
						alert("error");
				}
		});
}

document.getElementById("postText").onkeyup = function(){
	var length = $(postText).val().length;
	document.getElementById("charCounter").textContent="Characters: " + length;
}

var comfyText = (function(){
  var tag = document.querySelectorAll('textarea')
  for (var i=0; i<tag.length; i++){
    tag[i].addEventListener('paste',autoExpand)
    tag[i].addEventListener('input',autoExpand)
    tag[i].addEventListener('keyup',autoExpand)
  }
  function autoExpand(e,el){
    var el = el || e.target
    el.style.height = 'inherit'
    el.style.height = el.scrollHeight+'px'
  }
  window.addEventListener('load',expandAll)
  window.addEventListener('resize',expandAll)
  function expandAll(){
    var tag = document.querySelectorAll('textarea')
    for (var i=0; i<tag.length; i++){
      autoExpand(e,tag[i])
    }
  }
})()
