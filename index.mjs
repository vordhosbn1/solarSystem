import express from 'express';
const solarSystem = (await import('npm-solarsystem')).default;


const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//root route
app.get('/', async (req, res) => {
   let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar%20system";
   let response = await fetch(url);
   let data = await response.json();
   //console.log(data);
   let randIndex = Math.floor(Math.random() * data.hits.length);
   let randImg = data.hits[randIndex].webformatURL;

   res.render('home.ejs', { randImg })
});


app.get('/planet', (req, res) => {
   let planet_name = req.query.planetName;
   let planetInfo = solarSystem[`get${planet_name}`]();

   const safeImage = {
      Mars: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
      Jupiter: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg",
      Pluto: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Nh-pluto-in-true-color_2x_JPEG-edit-frame.jpg"
   };

   if (safeImage[planet_name]) {
      planetInfo.image = safeImage[planet_name];
   }

   console.log(planetInfo);
   res.render('planetInfo.ejs', { planetInfo, planet_name });
});

app.get('/rock', (req, res) => {
   let planet_name = req.query.planetName;
   let planetInfo = solarSystem[`get${planet_name}`]();

   console.log(planetInfo);
   res.render('rockInfo.ejs', { planetInfo, planet_name });

});


app.get('/nasaPod', async (req, res) => {
  const key = 'DEMO_KEY'; // Replace with your NASA API key if you have one
  const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.render('comingSoon.ejs', { apod: data });
  } catch (error) {
    console.log(error);
    res.render('comingSoon.ejs', { apod: null });
   //  .media_type = video
   // and then the apod.date should show the date of the picture
  }
});

app.listen(3000, () => {
   console.log('server started');
});