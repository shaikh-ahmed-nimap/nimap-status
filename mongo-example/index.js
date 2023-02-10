const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
console.log(`connecting to db`);
// mongoose.connect('mongodb://127.0.0.1:27017/mongo-exercise', {
//     useNewUrlParser: true,
// }).then(() => console.log('Connection statblihed')).catch(err => console.log('connection failed', err))

// mongoose.set('strictQuery', false);

// const courseSchema = mongoose.Schema({
//     name: String,
//     author: String,
//     tags: [String],
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     isPublished: Boolean,
//     price: Number
// })

// const Course = mongoose.model('Course', courseSchema);


// const course = new Course({
//     name: 'course3',
//     author: 'cwharry',
//     tags: ['serverless', 'AWS'],
//     published: false
// })

// course.save().then((result ) => console.log(result)).catch(err => {
//     console.log('error occured while creating course \n', err)
// })

// Course.find({}).limit(3).sort({name: -1}).select({name: 1, date: 1, published: 1}).then((result) => {
//     console.log(result)
// }).catch(err => console.log(err))

// COMPARISON OPERATORS
// eq (equal)
// neq(not equal to)
// gt - greater than
// lt - lessthan
// gte - greater than and equal to
// lte - less than and equal to
// in
// nin - not in

// Course.find({price: {$lte: 10}}).then(result => console.log(result)).catch(err => console.log(err));
// Course.find({price: {$in: [10, 15, 20]}}).then(result => console.log(result)).catch(err => console.log(err))

// LOGICAL OPERATOR
// or, and

// Course.find()
//     // .or([{author: 'cwm'}, {published: false}])
//     .and([{author: 'cwm'}, {published:  true}])
//     .then(result => console.log(result))

// REGEX
// Course.find()

// Course
//     .find({author: /w/})
//     // .or([{author: 'cwm'}, {published: false}])
//     // .and([{author: 'cwm'}, {published:  true}])
//     .then(result => console.log(result))

// Course
//     .find()
//     .count()
//     .then(result => console.log(result))

// Course
//     .find({isPublished: true, tags: 'backend'})
//     .sort({name: 1})
//     .select({name: 1, author: 1})
//     .then((result) => console.log(result))
// Course
//     .find()
//     .and([{isPublished: true}, {tags: {$in:['backend', 'frontend']}}])
//     .sort({price: -1})
//     .select({name: 1, author: 1})
//     .then((result) => console.log(result))

// Course
    // .find({isPublished: true})
    // .or([{price: {$gte: 15}}, {name: /.*by.*/i}])
    // .then((result) => console.log(result))
    // .catch((err) => {console.log(err)})

// async function findCourse(id) {
//     const course = await Course.findOne({});
//     console.log(course)
// }

// findCourse("5a68fdc3615eda645bc6bdec")

// Course
//     .find({$and: [{isPublished: false}, {author: 'Mosh'}]})
//     .then(result => console.log(result));

// Course
// .find({author: {$not: {$in: ['Mosh', 'Mary']}}})
//     .then(result => console.log(result));


// Course
// .find({$elemMatch: {tags: 'backend'}})
//     .then(result => console.log(result));




