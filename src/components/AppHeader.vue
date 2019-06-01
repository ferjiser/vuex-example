<template>
<div class="header">

    <div class="add-pokemon">
    <h3>Add pokemon</h3>
    <select v-model="newPokemon.type">
        <option v-for="option in newPokemon.typeOptions" :key="option.value" :value="option.value">
        {{ option.label }}
        </option>
    </select>
    <input v-model="newPokemon.name" placeholder="name">
    <p><button @click="addPokemon(newPokemon)">Add</button></p>
    </div>

    <div class="pokemon-ranking">
    <h3>Ranking</h3>
    <ul>
        <li v-for="ranking in rankings" :key="ranking.type">{{ ranking.type + ': ' + ranking.value }}</li>
    </ul>
    </div>

    <button class="reset-button" @click="resetPokemons">RESET</button>
    <button class="reset-button" @click="incrementCounter">INCREMENT</button>

</div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import { POKEMON_TYPE } from '@/store/constants';

export default {
    data() {
        return {
            newPokemon: {
                type: POKEMON_TYPE.FIRE,
                typeOptions: [
                    {value: POKEMON_TYPE.FIRE, label: 'Fire'},
                    {value: POKEMON_TYPE.PLANT, label: 'Plant'},
                    {value: POKEMON_TYPE.WATER, label: 'Water'},
                ],
                name: '',
            }
        };
    },
    computed: {
        ...mapState({
            rankings: state => {
                const lifes = {};
                state.pokemonsList.forEach(pokemon => {
                    if(!lifes[pokemon.type]) lifes[pokemon.type] = 0;
                    lifes[pokemon.type] += pokemon.life 
                });
                return [
                    {type: POKEMON_TYPE.PLANT, value: lifes[POKEMON_TYPE.PLANT] || 0},
                    {type: POKEMON_TYPE.FIRE, value: lifes[POKEMON_TYPE.FIRE] || 0},
                    {type: POKEMON_TYPE.WATER, value: lifes[POKEMON_TYPE.WATER] || 0}
                ].sort((a,b)=> b.value-a.value);
            }
        })
    },
    methods: {
        ...mapActions(['incrementCounter', 'addPokemon']),
        resetPokemons() {

        }
    },
}
</script>

<style>
.header {
  display: flex;
  margin-bottom: 10px;
}

.header .pokemon-ranking {
  margin-left: 10px;
  padding-left: 10px;
  border-left: solid 1px #ccc;
}

.header .reset-button {
  height: 50px;
  width: 50px;
  align-self: center;
  margin-left: 20px;
  cursor: pointer;
}
</style>