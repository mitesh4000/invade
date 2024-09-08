hellow dear examinier here is my assignment

[screen-recording.webm](https://github.com/user-attachments/assets/8667ada4-04e5-4b1d-88e9-0c60bea30304)


you can checkout the demo of assignment here
http://mitesh4000.in:3000/

| Endpoint   | Method | Description                                                                                                                                                                            |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /greetings | GET    | fetch the lattitude and longitude from the ip of http request and send greetings acording to the time zone                                                                             |
| /wether    | GET    | fetch wether data from database categorise acording to locations and send send formated data in response                                                                               |
| /locations | POST   | take lattitude and longitude as input and store it in the database and at the time of save it also fetch the wether data of next 5 days of the specific location and store in database |

The project includes a cron job that retrieves weather data from a third-party API and stores the next five days of records for all saved user locations in the database.
"# invade" 
