# Educase-Node-JS-Assignment

This project is designed to handle the addition of schools and fetching all schools using an Express.js-based backend.

## Scalable Architecture

-   **TypeScript** - used for type safety and enhanced development experience.
-   **zod** - used for schema validation, ensure user input is valid.
-   **prisma ORM** - used for database operations, makes migartion and query building batter.

## API Endpoints

### Add School

#### Endpoint:

`POST /addSchool`

#### Request Body:

```json
{
	"name": "Horizon Public",
	"address": "101 Maple St, City D",
	"latitude": 22.5726,
	"longitude": 88.3639
}
```

#### Response:

-   **201 Created**: School added successfully.

    ```json
    {
    	"message": "School added successfully"
    }
    ```

-   **400 Bad Request**: Validation error or missing data.
    ```json
    {
    	"error": "Invalid request data"
    }
    ```

#### Endpoint:

`GET /listSchools?latitude=22.5726&longitude=88.3639`

#### Request Qury params:

```json
{
	"latitude": 22.5726,
	"longitude": 88.3639
}
```

#### Response:

-   **200 Created**: School data.

    ```json
    [
    	{
    		"id": 4,
    		"name": "Horizon Public",
    		"address": "101 Maple St, City D",
    		"latitude": 22.5726,
    		"longitude": 88.3639,
    		"distance": 0
    	},
    	{
    		"id": 1,
    		"name": "Greenwood High",
    		"address": "123 Elm St, City A",
    		"latitude": 28.7041,
    		"longitude": 77.1025,
    		"distance": 1317.7536030396723
    	},
    	{
    		"id": 3,
    		"name": "Silver Oaks School",
    		"address": "789 Pine St, City C",
    		"latitude": 13.0827,
    		"longitude": 80.2707,
    		"distance": 1358.3607154263375
    	},
    	{
    		"id": 2,
    		"name": "Bluebell Academy",
    		"address": "456 Oak St, City B",
    		"latitude": 19.076,
    		"longitude": 72.8777,
    		"distance": 1654.839116799172
    	}
    ]
    ```

-   **400 Bad Request**: Validation error or missing data.
    ```json
    {
    	"error": "Invalid request data"
    }
    ```
