const axios = require('axios').default

export default async function handler(req, res) {
    const { shoppingCartId } = req.query

    const apiUrl = "http://localhost:8663/tmf-api/shoppingCart/v4/shoppingCart"

    if(req.method === "PATCH"){
        let body = req.body

        // console.log(body)
        let headers = {
          'Content-Type': 'application/json'
        }

        axios.patch(apiUrl + `/${shoppingCartId}`, body, {headers: headers})
          .then(function (response) {
            res.status(response.status).json(response.json)
          })
          .catch(function (error) {
            console.log(error)
            
          })
          .then(function () {
            // always executed
          });
    }

    var payload = {"response": "Success"}
    res.status(200).json({ result: payload })
}