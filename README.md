# Hulu Backend

This is the backend project for [Hulu Clone](https://github.com/tarunluthra123/Hulu-Clone).
Made with Node, Express, MongoDB supported with JWT authentication.

It allows the users to signup, login and store their movies/tv series preferences in separate lists.

Users can fetch and update these lists as they wish.

Backend Live [here](https://hulu-backend.herokuapp.com/).

For more details, check out the frontend project - [Hulu Clone](https://github.com/tarunluthra123/Hulu-Clone)

### Local development setup

1. To run this project locally, clone this repository and install the packages

    ```sh
    yarn install
    ```

2. Set up a **.env** file for environment variables.
   You will need a create a .env file in the root directory of your project and set up the environment variables. Refer to **config.js** for further details.

3. Run the server.

    ```sh
    yarn dev
    ```

    Your server should be up and running on the 5000 port by default.

To test, send an API request on `/api/ping` route. If you receive this response, your server is working fine.

```json
{ "msg": "Server up and running." }
```
