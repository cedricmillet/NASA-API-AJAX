
//	Classe parente pour toutes les requetes via l'APi Nasa, les enfants seront Earth, Mars...)
class API_NASA {
	constructor() {
		this.api_key = "IfKZTldVA2dOG6UunzXG9OvgSnmzaCtDdZdz8Duw";
	}

	log(txt) {
		var dt = new Date();
		var prefix = "["+dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()+"] ";
		$('#console').append(prefix + txt + "<br>");
	}
}

//	Classe enfant les requetes de type 'Earth'
class Image_Satellite extends API_NASA {
	constructor(lat, long, date, dim) {
		//proprietes
		super();
		this.api_endpoint = "https://api.nasa.gov/planetary/earth/imagery";
		this.result = null;

		//	methodes
		this.image(lat, long, date, dim);
	}

	
	image(lat = 1.5, long = 100.75, date = "2014-02-01", dim=0.025, cloud_score = false) {
		$('#loader').css('display', 'block');
		this.log('Envoi requete... (lat:'+lat+'; long:'+long+'; date:'+date+')');
		if(cloud_score)
			cloud_score = "True";
		else
			cloud_score = "False";
		var _this = this;
		var url = this.api_endpoint+"?lon="+long+"&lat="+lat+"&date="+date+"&cloud_score="+cloud_score+"&api_key="+this.api_key;
		$.ajax({
		  url: url,
		  success: function(result){
		  	console.log(result);
		  		$('#loader').css('display', 'none');
		  		_this.log('Image satellite récupérée : '+result.id+'');
		  		$('body').append('<img class="sat" src="'+result.url+'">');
			},
			error: function(result){
		  		_this.log('Erreur - image irrécupérable');		  		
			}
		});
	}


}




$('input[type="submit"').click(function() {
	var date = $('input[type="date"]').val();
	var md = "-"+date.split('-')[1]+'-'+date.split('-')[2];
	var y = parseInt(date.split('-')[0]);
	for(var i=-2; i<=2;i++) {
		var d = (y+i)+""+md;
		var a = new Image_Satellite( $('#lat').val(), $('#long').val(), d, $('#dim').val() );
		console.log('image satellite -  date: ', d);
	}
});

