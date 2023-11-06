const express = require("express");
const https = require("https");
const app = express();

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))



//For 1 app.get() there can only be one res.send() only
app.get("/",function(req,res)
{
res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
  const query = req.body.cityName;
  const apiKey = "Your_Api_Key";
  const unit = "metric"
  /*1*/ const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url,function(response)
   {
  /*2*/
      //console.log(response.statusCode);
        response.on("data",function(data) //One of the methods .on when using the https(as shown in the 2 line of the code)
         {
            console.log(data);//This data is in hexadecimal format so we can use hexadecimal convertor we get the data in json format

           //So we convert the data into JS object to get the required data
  /*3*/      const weatherData=JSON.parse(data);
           console.log(weatherData); //We get the data in the terminal JS Object format (ie the data we get when we run the url in the browser)

           console.log("The data actually to be presented is :");

          //For the path to "temp" use the JSON viewer extension to get the path from the weatherData shown in browser and paste it directly here
           const temp = weatherData.main.temp;
           console.log(temp);

           const weatherDescrip = weatherData.weather[0].description;
           console.log(weatherDescrip);

  /*4 Sending the response*/
  //Since we can use only one res.send() you can use multiple res.write() and send all the multiple writes using res.send()[that is done at end after all the writes]
           res.write("<h1>The temperature in "+query+" is "+temp+" degrees Celcius</h1>");  //This response is of app.get to display our data to the user
           res.write("<p>The Weather is currently "+weatherDescrip+"</p>")


  /*5 Now sending an image */
           const iconCode = weatherData.weather[0].icon;
           const src = " http://openweathermap.org/img/wn/"+iconCode+"@2x.png"
           res.write("<img src="+src+">")
           res.send()

           //****Converting a JS Object in JSON Format [ie:- JSON.stringify() method]***
           // const object={
           //   name:"Sam",
           //   favFood:"Ramen",
           // }
           // console.log(JSON.stringify(object));
 
       })

   })
})

app.listen(3000,function(){
  console.log("Server is running on port 3000");
})
