#Spitfire-Express

##Express Middleware for generating and using dynamic RESTful resources.

###Requirements:

- Node.js
- Express.js

###Features:
create, read, update and delete for resources

create and read for single level nested resources

###General Usage:
Mount it to a route and give it a database name or connection string.

```javascript
var api = require('spitfire-express')('mydb'); //whatever db name you’d like

// If an optional environment of 'production' is passed, endpoints won’t be created.
// Only the data will be added if those endpoints already exist.
// This would look like:
var api = require('spitfire-express')('mydb', 'production');

app.use('/api', api);
```
Here is an example of using spitfire-express for forums and topics.

```javascript
//GET http://localhost:4444/api/forums
[]

//POST http://localhost:4444/api/forums
//body: {name: 'New Forum'}
{
    "name": "New Forum",
    "_id": "5488ac09d770170000fc7713"
}
//GET http://localhost:4444/api/forums/5488ac09d770170000fc7713
{
    "_id": "5488ac09d770170000fc7713",
    "name": "New Forum"
}

//POST http://localhost:4444/api/forums/5488ac09d770170000fc7713/topics
//body: {name: 'New Topic'}
{
    "name": "New Topic",
    "forum_id": "5488ac09d770170000fc7713",
    "_id": "5488ac97d770170000fc7714"
}

//GET http://localhost:4444/api/forums/5488ac09d770170000fc7713/topics
[
    {
        "_id": "5488ac97d770170000fc7714",
        "name": "New Topic",
        "forum_id": "5488ac09d770170000fc7713"
    }
]
```

We've used "forums" and "topics" as a resource names in the above example, but they could literally be anything.

###Notes:
While single level nesting of resources is limiting, with multiple calls, one should be able to get any related information needed.  If it turns out to be too limiting or intensive, adjustments can be made at that time.
