const auth_link = "https://www.strava.com/oauth/token"
//
function getActivites(res){

  // console.log(res.access_token);
  // console.log('adsfads');
  const activites_link  = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
  fetch(activites_link)
    .then((resuu)=> resuu.json())
    .then (function(data){

        var map = L.map('map').setView([27.62996,85.51366], 15);

       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
        // console.log(data);
for(let x=0; x< data.length; x++){
  console.log(data[x].map.summary_polyline)
                 var coordinates = L.Polyline.fromEncoded(data[x].map.summary_polyline).getLatLngs()
                 console.log(data)
                 L.polyline(

                    coordinates,
                    {
                        color: "#" + Math.floor(Math.random()*16777215).toString(16),
                        weight:3,
                        opacity:.7,
                        lineJoin:'round'
                    }

                ).addTo(map)

}

    }


  )
}
// getActivites()


function reAuthorize(){
    fetch(auth_link,{
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'

        },

        body: JSON.stringify({

            client_id: '75066',
            client_secret: '7fba959cc1afaaa318d546492963e64ea495eb80',
            refresh_token: '19b7c384ea7b7222198e4e74f769bde67fb43290',
            grant_type: 'refresh_token'
        })
      }).then(res => res.json())
        .then(res => getActivites(res))

}

reAuthorize()

//all this does is follow the auth_link with parameters given in body, to ultimately show the access_token and other info. We pass the access_token value to getActivites function
// to get the activities all the time without needing to worry about token expiration.
