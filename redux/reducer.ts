const initState = {
  listData: [
    {
      name: '',
      sex: '',
      age: ''
    }
  ]
}


export const rootReducer = (state = initState, action : any) => {
  switch (action?.type) {
    case 'listData/addData':
       return {
        ...state,
        listData: {
          ...state.listData,
        }
       }
    default:
      return state;
  }

}