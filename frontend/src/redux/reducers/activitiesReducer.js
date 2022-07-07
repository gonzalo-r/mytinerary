const initialState = {
    activities: [],
    auxActivities: [] 
}

const activitiesReducer = (state = initialState, action) => {
 

    switch (action.type) {
        case 'ACTIVITIES_PER_ITINERARY':
            return {
                ...state,
                activities: action.payload,   
            }
            case 'NEW_ACTIVITY':
                let activities = [...state.activities]
                activities.push(action.payload)
                return{
                    ...state,
                    activities: action.payload,
                    auxActivities: [...activities]
                }
           
        default:
            return state
           
    }
}

export default activitiesReducer