import express from 'express'
import { getPokemon, getPokemonById } from '../controllers/getPokemon.js'
import { myPokemon, catchPokemon, releasePokemon, renamePokemon } from '../controllers/myPokemon.js'

const router = express.Router()

router.get('/pokemon', getPokemon)
router.get('/pokemon/:id', getPokemonById)

router.get('/myPokemon', myPokemon)
router.post('/catchPokemon/:name', catchPokemon)
router.put('/rename/:id', renamePokemon)
router.delete('/delete/:id', releasePokemon)

export default router