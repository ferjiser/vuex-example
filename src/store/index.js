import Vue from 'vue';
import Vuex from 'vuex';
import {POKEMON_PROPERTIES} from './constants';

Vue.use(Vuex);

const state = {
    pokemonsList: [
        {"type":"FIRE","name":"charmy","life":100,"attack":10,"dying":false},
        {"type":"PLANT","name":"planty","life":54,"attack":8,"dying":false},
        {"type":"WATER","name":"tortly","life":90,"attack":12,"dying":false}
      ],
      counter: 0
};

const getters = {

};

const actions = {
    attackPokemon({commit}, {src, target}){
        if(src === target) return;
        commit('DECREASE_LIFE', {
            name: target.name,
            damage: src.attack
        })
    },
    incrementCounter({commit}){
        commit('INCREMENT_COUNTER');
    },
    addPokemon({commit, state}, {type, name}){
        if(state.pokemonsList.some(poke => poke.name === name)) return;
        commit('ADD_POKEMON', {
            type,
            name,
            dying: false,
            ...POKEMON_PROPERTIES[type]
        });
    },
    deletePokemon({commit}, name){
        commit('DELETE_POKEMON',name);
    },

};

const mutations = {
    DECREASE_LIFE(state, {name, damage}){
        const pokemon = state.pokemonsList.find(poke => poke.name === name);
        pokemon.life -=damage;

    },
    INCREMENT_COUNTER(state){
        state.counter++;
    },
    ADD_POKEMON(state, pokemon){
        state.pokemonsList.push(pokemon);
        
    },
    DELETE_POKEMON(state, name){
        state.pokemonsList = state.pokemonsList.filter( pokemon => {
            return pokemon.name !== name;
        });
    }
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});

export default store;