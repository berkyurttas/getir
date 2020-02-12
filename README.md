# Getir

This repository contains source code of Getir case study.

## Run project

```
node server.js
```

## Run test

```
npm test
```

**API Documentation**
----
Returns json data of filtered records

* **URL**

    /records

*  **URL Params**



* **Data Params**

  **Required:**
 
   `startDate=[string,YYYY-MM-DD]`
   `endDate=[string,YYYY-MM-DD]`
   `minCount=[integer]`
   `maxCount=[integer]`

* **Success Response:**

    ```javascript
    {
        "code": 0,
        "msg": "Success",
        "records": [
            {
                "key": "o0I9s9aaU2raF47M",
                "createdAt": "2017-01-01T08:40:34.146Z",
                "totalCount": 2000
            }
        ]
    }
    ```
* **Sample Request:**

  ```javascript
    {
        "startDate": "2017-01-01",
        "endDate": "2020-11-01",
        "minCount":2000,
        "maxCount":3000
    }
  ```