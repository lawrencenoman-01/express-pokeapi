import axios from 'axios'
import handleServerError from '../helpers/serverError.js'
import handleClientError from '../helpers/clientError.js'
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'

export const getPokemon = async (req, res) => {
  try {
    const response = await axios.get(BASE_URL)
    return res.status(200).json({
      data: response.data.results,
      message: 'Success',
    })
  } catch (err) {
    handleServerError(res)
  }
}

export const getPokemonById = async (req, res) => {
  try {
    const { id } = req.params
    const response = await axios.get(`${BASE_URL}/${id}`)
    return res.status(200).json({
      data: response.data,
      message: 'Success',
    })
  } catch (err) {
    if(err?.response?.status === 404) {
      return handleClientError(res, 404, 'Data Not Found')
    } else {
      handleServerError(res)
    }
  }
}

