# Basic Express

Basic express.js project with basic routes:

- Express
- Joi
- Fs
- Axios

---

## URL

_Server_

```
http://localhost:8080
```

---

## Run Server

_Server_

```
"npm run start"
```

---

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

## RESTful endpoints

### GET /api/pokemon

> Get list of Pokemon

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    data:[
	    "name":<string>,
      "url": "<string>"
	   ]

    "message": "Success"

}
```

---

### GET /api/pokemon/:id

> Get detail pokemon by id/uuid

_Request Params_

```
/<id>

```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    data:{"abilities": [
       "id":<string-uuid>
	     "name":<string>,
	   ]
    ,
    ...},

    "message": "Success"
}

```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

---

### POST /api/catchPokemon/:name

> Catch Pokemon with NAME

_Request Params_

```
/<name>

```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
   data:{
      "id":<String-uuid>,
	    "name":<string>,
      "version":<number>
    }
   message: 'Pokemon ditangkap !!!',

OR

   message: 'Pokemon kabooorrr !!!',

}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

---

### GET /api/myPokemon

> Get by list My Pokemon

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
     data:{"myPokemon": [
       "id":<string-uuid>,
	     "name":<string>,
       "version":<number>
	   ]
     }
    "message": "Success"

}
```

_Response (404)_

```
{
    "message": "Data Not Found"
}
```

---

### DELETE /api/delete/:id

> Add release Pokemon

_Request Params_

```
/<id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

message: 'Pokemon dilepas...',
data: {
        "myPokemon": [
          "id":<string-uuid>,
	        "name":<string>,
        ]
    },

      OR

message: 'Pokemon gagal dilepas...',
data: {
        "myPokemon": [
          "id":<string-uuid>,
	        "name":<string>,
        ]
    },

}
```

_Response (404 - Not Found)_

```
{
    "message": "You dont have this ID"
}
```

---

### PUT /api/rename/:id

> rename pokemon

_Request Params_

```
/<id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
     message: `Nama Pokemon berhasil diubah menjadi ${listPokemon.name}`

}
```

_Response (404 - NOT FOUND)_

```
{
    "message": "Data Not Found"
}
```

---