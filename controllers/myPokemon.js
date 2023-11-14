import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import handleServerError from '../helpers/serverError.js'
import handleClientError from '../helpers/clientError.js'
import { fibonacci } from '../helpers/fibonacci.js';
import { loadData, storeData } from '../helpers/databaseHelper.js'
import joi from 'joi';
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'

export const myPokemon = async (req, res) => {
  try {
    const dataPokemon = loadData()
    return res.status(200).json({
      data: dataPokemon.myPokemon,
      message: 'Success',
    })
  } catch (err) {
    handleClientError(res, 404, 'Data Not Found')
  }
}

export const catchPokemon = async (req, res) => {
  try {
    const { name } = req.params
    const response = await axios.get(`${BASE_URL}/${name.toLowerCase()}`)
    const data = loadData()

    if (response) {
      const success = Math.random() >= 0.5

      if (success) {
        const catchPokemon = {
          id: uuidv4(),
          name: response.data.name,
          version: 0,
        }
        data.myPokemon.push(catchPokemon)
        storeData(data)

        return res.status(200).json({
          message: 'Pokemon ditangkap !!!',
          data: catchPokemon,
        });
      } else {
        return res.status(200).json({
          message: 'Pokemon kabooorrr !!!',
        });
      }
    } else {
      return handleClientError(res, 404, 'Data Not Found')
    }

  } catch (err) {
    if (err?.response?.status === 404) {
      return handleClientError(res, 404, 'Data Not Found')
    } else {
      handleServerError(res)
    }
  }
}

export const releasePokemon = async (req, res) => {
  try {
    const { id } = req.params
    const data = loadData()
    let dataPrima = true
    const releasedPokemon = data.myPokemon.find((pokemon) => pokemon.id === id)

    if (releasedPokemon) {
      const isPrima = Math.floor(Math.random() * 11) + 1

      for (let i = 2; i < isPrima; i++) {
        if (isPrima % i === 0) {
          dataPrima = false
          break;
        }
      }

      if (dataPrima) {
        const filtered = data.myPokemon.filter((el) => el.id !== id)
        data.myPokemon = filtered
        storeData(data)
        return res.status(200).json({
          message: 'Pokemon dilepas...',
          data: data,
        })
      } else {
        return res.status(404).json({
          message: 'Pokemon gagal dilepas...',
          data: data,
        })
      }
    } else {
      return handleClientError(res, 404, 'You dont have this ID')
    }

  } catch (err) {
    handleServerError(res)
  }
}

export const renamePokemon = async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body
    const data = loadData()
    const listPokemon = data.myPokemon.find((pokemon) => pokemon.id === id)

    if (!listPokemon) {
      return handleClientError(res, 404, 'Pokemon Not Found')
    }

    const scheme = joi.object({
      id: listPokemon.id,
      name: joi.string().min(5).required(),
    })

    const { error } = scheme.validate(newData);
    if (error) {
      return res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })
    }

    const name = listPokemon.name.split('-')
    const renameNum = listPokemon.renameNum || 0

    // console.log(fibonacci(renameNum));
    // console.log(renameNum);
    const generateName = newData.name ? newData.name : `${name[0]}-${name[1]}`
    console.log(name);
    console.log(name[0]);
    console.log(name[1]);

    const newName = `${generateName}-${fibonacci(renameNum)}`
    listPokemon.name = newName
    listPokemon.renameNum = renameNum + 1

    storeData(data)

    return res.status(201).json({
      message: `Nama Pokemon berhasil diubah menjadi ${listPokemon.name}`
    })

  } catch (err) {
    handleServerError(res)
  }
}




