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

### Login with Google

#### Request

```http
POST /v1/auth/google
```

### Response (after Google login)

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
