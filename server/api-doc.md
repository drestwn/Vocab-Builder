# VOCAB BUILDER REST API Documentation

## API References

List of Endpoints:

- `POST /loginUser`
- `POST /regisUser`
- `POST /googleLog`
- `GET /renderword`
- `POST /submitLog`
- `POST /addProgress`
- `GET /renderLog`
- `POST /renderDetailLog/:id`
- `POST /logUpdate/:id`
- `DELETE /deleteLog/:id`

---

### Post Login User

```http
POST / loginUser
```

#### Description

- POST login user

#### Response

_201 - Success_

- Body

```json
{
  "statusCode": 200,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmlja25hbWUiOiJkcmVzdHduIiwiZW1haWwiOiJkcmVAbWFpbC5jb20iLCJpYXQiOjE2ODM3NzQxMzZ9.SMgdw4P_NYQdbRPRS-rZp15etIKUdS9tt5_48u_zvD8",
  "email": "dre@mail.com",
  "id": 1,
  "message": "Login, let's roll"
}
```

### Post Regis User

```http
POST /regisUser
```

#### Description

- POST Regis User

#### Response

_201 - Success_

- Body

```json
{
  "statusCode": 201,
  "email": "deploy@gmail.com",
  "message": "Email has been created"
}
```

### Post Find/Create User Google Log

```http
POST /googleLog
```

#### Description

- POST regis user via google

#### Response

_201 - Success_

- Body

```json
{
  "statusCode": 200,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmlja25hbWUiOiJkcmVzdHduIiwiZW1haWwiOiJkcmVAbWFpbC5jb20iLCJpYXQiOjE2ODM3NzQxMzZ9.SMgdw4P_NYQdbRPRS-rZp15etIKUdS9tt5_48u_zvD8",
  "email": "dre@mail.com",
  "id": 1,
  "message": "Login, let's roll"
}
```

### GET Render Word

```http
- GET /renderword
```

#### Description

- GET render Word via 3rd Api

#### Response

_200 - Success_

- Body

```Json
{
"statusCode": 201,
"WORD": "hist",
"wordLength": 4,
"definition": "An instance of an exclamation attracting attention or injunction to be silent."
}

```

## Semua Route di bawah Membutuhkan authz untuk render Favorite per customer

### Request

(Headers)

```json
{
  "access_token": string
}
```

---

### Post Submit log

```http
- POST submit log
```

### Request

- Body

```json
{
    "WORD": String (required)
}
```

#### Description

- POST submit log into progress

#### Response

_201 - Success_

- Body

```json
{
  "statusCode": 201,
  "word": "Smile",
  "meaning": "A facial expression comprised by flexing the muscles of both ends of one's mouth, often showing the front teeth, without vocalisation, and in humans is a common involuntary or voluntary expression of happiness, pleasure, amusement or anxiety.",
  "status": "Input to log berhasil"
}
```

### Post add progress

```http
- POST add progress
```

#### Description

- POST submit progress

#### Response

_201 - Success_

- Body

```json
{
  "statusCode": 201,
  "word": "SMILE",
  "definition": "A facial expression comprised by flexing the muscles of both ends of one's mouth, often showing the front teeth, without vocalisation, and in humans is a common involuntary or voluntary expression of happiness, pleasure, amusement or anxiety.",
  "inputLog": {
    "id": 39,
    "UserId": 11,
    "word": "SMILE",
    "definition": "A facial expression comprised by flexing the muscles of both ends of one's mouth, often showing the front teeth, without vocalisation, and in humans is a common involuntary or voluntary expression of happiness, pleasure, amusement or anxiety.",
    "updatedAt": "2023-05-11T03:40:17.269Z",
    "createdAt": "2023-05-11T03:40:17.269Z"
  },
  "msg": "Thankyou for updating your progress, your progress has been submited"
}
```

### Get render log

```http
- Get render Log (of the UserId)
```

#### Description

- GET render Log by UserId

#### Response

_200 - Success_

- Body

```json
{
  "statusCode": 200,
  "response": [
    {
      "id": 7,
      "UserId": 1,
      "word": "Smile",
      "definition": "A facial expression comprised by flexing the muscles of both ends of one's mouth, often showing the front teeth, without vocalisation, and in humans is a common involuntary or voluntary expression of happiness, pleasure, amusement or anxiety.",
      "createdAt": "2023-05-09T12:43:25.790Z",
      "updatedAt": "2023-05-09T12:43:25.790Z"
    },
    {
      "id": 12,
      "UserId": 1,
      "word": "Smile",
      "definition": "A facial expression comprised by flexing the muscles of both ends of one's mouth, often showing the front teeth, without vocalisation, and in humans is a common involuntary or voluntary expression of happiness, pleasure, amusement or anxiety.",
      "createdAt": "2023-05-10T08:00:58.329Z",
      "updatedAt": "2023-05-10T08:00:58.329Z"
    },
    {
      "id": 24,
      "UserId": 1,
      "word": "skulks",
      "definition": "To stay where one cannot be seen, conceal oneself (often in a cowardly way or with the intent of doing harm).",
      "createdAt": "2023-05-10T14:04:18.556Z",
      "updatedAt": "2023-05-10T14:04:18.556Z"
    },
    {
      "id": 33,
      "UserId": 1,
      "word": "shoals",
      "definition": "A sandbank or sandbar creating a shallow.",
      "createdAt": "2023-05-10T15:15:18.129Z",
      "updatedAt": "2023-05-10T15:15:18.129Z"
    },
    {
      "id": 35,
      "UserId": 1,
      "word": "heirs",
      "definition": "Someone who inherits, or is designated to inherit, the property of another.",
      "createdAt": "2023-05-10T17:53:24.227Z",
      "updatedAt": "2023-05-10T17:53:24.227Z"
    },
    {
      "id": 36,
      "UserId": 1,
      "word": "razz",
      "definition": "A version of seven card stud where the worst poker hand wins (called lowball).",
      "createdAt": "2023-05-10T17:53:38.213Z",
      "updatedAt": "2023-05-10T17:53:38.213Z"
    },
    {
      "id": 37,
      "UserId": 1,
      "word": "hubs",
      "definition": "The central part, usually cylindrical, of a wheel; the nave.",
      "createdAt": "2023-05-10T18:01:46.811Z",
      "updatedAt": "2023-05-10T18:01:46.811Z"
    },
    {
      "id": 38,
      "UserId": 1,
      "word": "Smile",
      "definition": "A facial expression comprised by flexing the muscles of both ends of one's mouth, often showing the front teeth, without vocalisation, and in humans is a common involuntary or voluntary expression of happiness, pleasure, amusement or anxiety.",
      "createdAt": "2023-05-11T03:10:18.404Z",
      "updatedAt": "2023-05-11T03:10:18.404Z"
    }
  ]
}
```

### Get renderDetailLog

```http
- GET renderDetailLog/:id
```

#### Request

(Paramas)

```json
{
  "id": integer
}
```

#### Description

- GET detail log

#### Response

_200 - Success_

- Body

```json
{
  "statusCode": 200,
  "response": {
    "id": 37,
    "UserId": 1,
    "word": "hubs",
    "definition": "The central part, usually cylindrical, of a wheel; the nave.",
    "createdAt": "2023-05-10T18:01:46.811Z",
    "updatedAt": "2023-05-10T18:01:46.811Z"
  }
}
```

### Post Update log

```http
- POST logUpdate/:id
```

#### Request

(Paramas)

```json
{
  "id": integer
}
```

#### Description

- POST Edit log

#### Request

(Body)

```json
{
  "word": STRING,
  "definition":STRING

}
```

#### Response

```json
{
  "statusCode": 200,
  "response": [1]
}
```

### Delete Log

```http
- DELETE log
```

#### Request

(Paramas)

```json
{
  "id": integer
}
```

#### Description

- DELETE log by id

#### Response

```json
{
  "statusCode": 200,
  "response": 1,
  "msg": "log with 36 has been deleted"
}
```
