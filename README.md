# Run project

### Repo

```bash
git clone https://github.com/juanikitro/tatuin_backend.git
cd tatuin_backend
```

### ENVs

```
# API config
PORT=
# JWT config
JWT_SECRET_KEY=
TOKEN_EXPIRATION_TIME=
# Redis config
REDIS_ADDRESS=
CACHE_EXPIRATION_TIME=
# Database config
MYSQL_DATABASE=
MYSQL_ROOT_PASSWORD=
MYSQL_PASSWORD=
MYSQL_USER=
MYSQL_ADDRESS=
# Google OAuth config
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Docker

```bash
docker-compose up --build
```

# API documentation

## Authentication

### GET /v1/auth/google response (after Google login):

```json
{
	"user": {
		"userId": 1,
		"googleId": "115753141633199035535",
		"username": "Juan Ignacio Portilla Kitroser",
		"email": "jpkitro@gmail.com"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MSwiZ29vZ2xlSWQiOiIxMTU3NTMxNDE2MzMxOTkwMzU1MzUiLCJ1c2VybmFtZSI6Ikp1YW4gSWduYWNpbyBQb3J0aWxsYSBLaXRyb3NlciIsImVtYWlsIjoianBraXRyb0BnbWFpbC5jb20ifSwiaWF0IjoxNjk0NTY0NjUyLCJleHAiOjE2OTQ1NjgyNTJ9.UN-50xEOyZvRI1dbGw-o-MRi43mfNWutTJPrhhEWgKs"
}
```

## Users

### GET /v1/api/user response:

```json
[
	{
		"userId": 2,
		"googleId": "115753141633199035535",
		"username": "Juan Ignacio Portilla Kitroser",
		"email": "jpkitro@gmail.com",
		"userPrimaryDetail": {
			"userPrimaryDetailId": 2,
			"firstName": "Juan Ignacio",
			"lastName": "Portilla Kitroser",
			"dni": "",
			"birthday": "",
			"seller": false,
			"sellerDetail": null
		}
	}
]
```

### GET /v1/api/user/:userId response:

```json
{
	"userId": 2,
	"googleId": "115753141633199035535",
	"username": "Juan Ignacio Portilla Kitroser",
	"email": "jpkitro@gmail.com",
	"userPrimaryDetail": {
		"userPrimaryDetailId": 2,
		"firstName": "Juan Ignacio",
		"lastName": "Portilla Kitroser",
		"dni": "",
		"birthday": "",
		"seller": false,
		"sellerDetail": null
	}
}
```

### POST /v1/api/user/:userId/createNewSeller:

Body:

```json
{
	"legalName": "test",
	"phoneNumber": "2345455007",
	"address": "123",
	"geo": "1",
	"balance": 0,
	"media": "asdasdas,asdasdasd",
	"status": "true"
}
```

Response:

```json
{
	"userId": 2,
	"googleId": "115753141633199035535",
	"username": "Juan Ignacio Portilla Kitroser",
	"email": "jpkitro@gmail.com",
	"userPrimaryDetail": {
		"userPrimaryDetailId": 2,
		"firstName": "Juan Ignacio",
		"lastName": "Portilla Kitroser",
		"dni": "",
		"birthday": "",
		"seller": true,
		"sellerDetail": {
			"legalName": "test",
			"phoneNumber": "2345455007",
			"address": "123",
			"geo": "1",
			"media": "asdasdas,asdasdasd",
			"status": "true",
			"userPrimaryDetail": {
				"userPrimaryDetailId": 2,
				"firstName": "Juan Ignacio",
				"lastName": "Portilla Kitroser",
				"dni": "",
				"birthday": "",
				"seller": false,
				"sellerDetail": null
			},
			"balance": "0",
			"sellerDetailId": 2
		}
	}
}
```

### PATCH /v1/user/:userId

Body:

```json
{
	"username": "test"
}
```

Response:

```json
{
	"userId": 2,
	"googleId": "115753141633199035535",
	"username": "test",
	"email": "jpkitro@gmail.com",
	"userPrimaryDetail": {
		"userPrimaryDetailId": 2,
		"firstName": "Juan Ignacio",
		"lastName": "Portilla Kitroser",
		"dni": "",
		"birthday": "",
		"seller": true,
		"sellerDetail": {
			"sellerDetailId": 2,
			"legalName": "test",
			"phoneNumber": "2345455007",
			"address": "123",
			"geo": "1",
			"balance": "0",
			"media": "asdasdas,asdasdasd",
			"status": "true"
		}
	}
}
```

### DEL /v1/user/:userId response:

```
{
    "userId": 2,
    "googleId": "115753141633199035535",
    "username": "test",
    "email": "jpkitro@gmail.com",
    "userPrimaryDetail": {
        "userPrimaryDetailId": 2,
        "firstName": "Juan Ignacio",
        "lastName": "Portilla Kitroser",
        "dni": "",
        "birthday": "",
        "seller": true,
        "sellerDetail": {
            "sellerDetailId": 2,
            "legalName": "test",
            "phoneNumber": "2345455007",
            "address": "123",
            "geo": "1",
            "balance": "0",
            "media": "asdasdas,asdasdasd",
            "status": "true"
        }
    }
}
```
