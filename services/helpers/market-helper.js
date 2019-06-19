const axios = require('axios');
const base_URL = 'https://sandbox.iexapis.com/stable/';
const iex = require('../../config/iex');
let token = "?token=" + iex.public_token;

function getBatchQuotes(req, res) {
  axios
    .get(base_URL + "stock/market/batch?symbols=" + req.params.id + "&types=quote" + token)
    .then(batch => {
      res.send(batch.data);
    })
    .catch(err => console.log(err));
}

function getMarketData(req, res) {
  axios.all([
    axios.get(base_URL + "stock/" + req.params.id + "/price" + token),
    axios.get(base_URL + "stock/" + req.params.id + "/quote" + token + "&displayPercent=true"),
    axios.get(base_URL + "stock/" + req.params.id + "/logo" + token),
    axios.get(base_URL + "stock/" + req.params.id + "/company" + token)
  ])
  .then(axios.spread((priceRes, quoteRes, logoRes, coRes) => {
    res.send({ 
      price: priceRes.data, 
      quote: quoteRes.data, 
      logo: logoRes.data, 
      co: coRes.data
    })
  }))
  .catch(err => console.log(err));
}

function getChartData(req, res) {
  axios.all([
    axios.get(base_URL + "stock/" + req.params.id + "/chart/1d" + token),
    axios.get(base_URL + "stock/" + req.params.id + "/chart/1m" + token),
    axios.get(base_URL + "stock/" + req.params.id + "/chart/3m" + token),
    axios.get(base_URL + "stock/" + req.params.id + "/chart/6m" + token),
    axios.get(base_URL + "stock/" + req.params.id + "/chart/1y" + token),
    axios.get(base_URL + "stock/" + req.params.id + "/chart/5y" + token),
  ])
  .then(axios.spread((chart1dRes, chart1mRes, chart3mRes, chart6mRes, chart1yRes, chart5yRes) => {
    res.send({
      chart1d: chart1dRes.data,
      chart1m: chart1mRes.data,
      chart3m: chart3mRes.data,
      chart6m: chart6mRes.data,
      chart1y: chart1yRes.data,
      chart5y: chart5yRes.data,
    })
  }))
  .catch(err => console.log(err));
}

function getCompanyData(req, res) {
  axios.all([
    axios.get(base_URL + "stock/" + req.params.id + "/financials" + token),
    axios.get(base_URL + "stock/" + req.params.id + "/company" + token),
  ])
  .then(axios.spread((financialsRes, companyRes ) => {
    res.send({
      financials: financialsRes.data,
      company: companyRes.data,
    })
  }))
}

function getTops(req, res) {
  axios.all([
    axios.get(base_URL + "stock/market/list/mostactive" + token + "&displayPercent=true"),
    axios.get(base_URL + "stock/market/list/gainers" + token + "&displayPercent=true"),
    axios.get(base_URL + "stock/market/list/losers" + token + "&displayPercent=true"),
  ])
  .then(axios.spread((activeRes, gainerRes, loserRes) => {
    res.send({
      topActives: activeRes.data,
      topGainers: gainerRes.data,
      topLosers: loserRes.data,
    })
  }))
}

module.exports = {
  getMarketData,
  getChartData,
  getCompanyData,
  getTops,
  getBatchQuotes
}