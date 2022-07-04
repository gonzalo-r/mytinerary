const initialState = {
    user: null,//inicialmente como nulo cuando el entran datos va a ser un objeto
        snackbar:{view: false,
            message: '',
            success:false}
      
    
}

const userReducer = (state = initialState, action) => {
 

    switch (action.type) {
        case 'user':
            return {
                ...state,
              user: action.payload,   
            }
        case 'message':
            return {
                ...state,
                view:  action.payload.view, 
                message: action.payload.message, 
                success: action.payload.success,   
                
            }
           
        default:
            return state
           
    }

}

export default userReducer