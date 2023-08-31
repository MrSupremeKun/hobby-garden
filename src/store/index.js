const { createStore, combineReducers } = require("redux");

const initialState = {
    data:[]
}

function dataReducer(state = initialState, action) {
    if (action.type === 'test') {
        return {
            ...state,
            data:state.data
        }
    }else{
        return state
    }
}

const rootReducer = combineReducers({
    data:dataReducer
})

export const store = createStore(rootReducer)