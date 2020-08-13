export const alertReducer = (state = [], action) => {
    // Identify Redux Action by action types
    switch(action.type){

        // If SET_ALERT return new array
        case 'SET_ALERT': 
            return [...state, action.payload];

        // Else return original State
        default: return state;
    }
}