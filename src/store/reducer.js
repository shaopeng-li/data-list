const initialState = {
    dataList: [{
      id: 1,
      manufacturer: 'Ford',
      make: 'Mastang',
      model: 'GT',
      year: '2015'
    }, {
      id: 2,
      manufacturer: 'Cheverlet',
      make: 'Covertte',
      model: 'Z06',
      year: '2017'
    }, {
      id: 3,
      manufacturer: 'Dodge',
      make: 'Challenger',
      model: 'Hellcot',
      year: '2016'
    }],
    showModal: false,
    action: '',
    title: '',
    verbage: '',
    carInfo: {}
  };


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SHOW':
            return {
                ...state,
                showModal: true,
                act: 'show',
                title: 'Add New Car',
                verbage: '',
                carInfo: action.item
            }
        case 'ADD':
            return {
                ...state,
                showModal: true,
                act: 'add',
                title: 'Add New Car',
                verbage: '',
                carInfo: {}
            }
        case 'EDIT':
            return {
                ...state,
                showModal: true,
                act: 'edit',
                title: 'Edit Car',
                verbage: '',
                carInfo: action.item
            }
        case 'DELETE':
            return {
                ...state,
                showModal: true,
                act: 'delete',
                title: 'Delete Car',
                verbage: 'Are you sure you wish to delete the:',
                carInfo: action.item
            }
        case 'closeModal':
            return {
                ...state,
                showModal: false
            }
        case 'changeItem':
            return {
                ...state,
                dataList: action.payload,
                showModal: false
            }
        default:
            return state
    }
}

export default reducer;