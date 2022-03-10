const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  tags: [String],
  date: Date,
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => {
    console.log("Connected to MongoDB/mongo-exercises database...");
  })
  .catch((err) => {
    console.error("Couldn't connect to the database!", err);
  });

// (1) Tüm yayınlanmış frontend ve backend kurslarını listele
// async function getCourses() {
//   return await Course.find({ isPublished: true }).or([{ tags: "frontend" }, { tags: "backend" }]);
// }

// (2) Listelenen kursları azalan biçimde fiyatlarına göre sırala
// async function getCourses() {
//   return await Course.find({ isPublished: true })
//     .or([{ tags: "frontend" }, { tags: "backend" }])
//     .sort({ price: -1 });
// }

// (3) Sadece isimleri ve yayıncılarını seç ve listele
async function getCourses() {
  return await Course
    //bu satır ile altındaki iki satırın işini yapabiliriz...
    .find({ isPublished: true, tags: { $in: ["frontend", "backend"] } })
    //.find({ isPublished: true })
    //.or([{ tags: "frontend" }, { tags: "backend" }])
    .sort("-price")
    .select("name author price");
}

async function start() {
  const courseList = await getCourses();
  console.log(courseList);
}

start();
