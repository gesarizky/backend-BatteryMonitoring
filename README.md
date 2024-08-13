# Battery System with protocol Mobbus Serial Port and tcp/ip

## How to install and run

1. Clone the repository
2. Install dependencies

    ```bash
    npm install
    ```

3. Update your credential in .env
4. make sure your docker server is running
5. Install your program to docker server

    ```bash
    docker-compose up -d --build
    ```

## API Endpoints

### Setting

- `GET /api/setting/Talis` - List all battery
- `GET /api/setting/Talis?talis_id="id battery"` - List specific Batt
- `DELETE /api/setting/deleteTalis` - Delete battery by battery id with json body :

    ```bash
    {
    "talis_id":"battery1"
    }
    ```

- `POST /mppt` - Create a new mppt with json body :

    ```bash
    {
    "type":"serial",
    "talis_id":"battery1",
    "device_ip":"192.169.100.200",
    "port":"502",
    "slaves":[1,2]
    }
    ```

### To Frontend

- `GET /api/dashboard` - Get data dashboard for Frontend section
- `GET /api/specificRack?talis_id="id talis"` - Get specific data rack for Frontend section
- `GET /api/specificFrame?pcb_barcode="pcb id"` - Get specific data frame for Frontend section

### Controller

- `POST /api/run` - Starting program

## Postman Collection

Import the provided Postman Collection for testing the API endpoints.

### How to Import Postman Collection

1. Open Postman
2. Click on `Import` button
3. Select the file `data post graphql.postman_collection.json` from the `postman` directory
4. Start testing the endpoints

## Postman Collection File

The Postman Collection file is located in the `postman` directory and is named `data post graphql.postman_collection.json`.
