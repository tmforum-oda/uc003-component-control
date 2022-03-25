const axios = require('axios').default

export default async function handler(req, res) {
    const { shoppingCartId } = req.query

    const apiUrl = "http://localhost:8663/tmf-api/shoppingCart/v4/shoppingCart"

    if(req.method === "POST"){
        let body = req.body

        axios.get(apiUrl + `/${shoppingCartId}`, {
            params: {

            }
          })
          .then(function (response) {
            console.log(response.data, response.status);
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });
    }

    var payload = {"response": "Success"}
    res.status(200).json({ result: payload })
}