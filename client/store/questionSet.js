export const state = () => ({
    data: {}
});

export const mutations = {
     addQuestionSetData(state, payload) {
         state.data = {
             [payload.id]:{
                Questions: state.data?.[payload.id]?.Questions || [],
                ...payload
             }
         }
     },
     addQuestionData(state, payload) {
        state.data = {
            ...state.data,
            [payload.set_id]:{
                ...state.data[payload.set_id],
                Questions:[
                    ...state.data[payload.set_id].Questions,
                    payload   
                ]
            }
        }
    },
    removeClonedQuestionData(state, payload) {
        if(!state.data[payload.set_id] || !state.data[payload.set_id].Questions){
            state.data = {
                ...state.data,
            }
        }else{
            let Questions = [];
            if(payload.isCloned){
                Questions = state.data[payload.set_id].Questions.filter(qes => qes.clonedId != payload.clonedId) || [];
            }else{
                Questions = state.data[payload.set_id].Questions.filter(qes => qes.id != payload.clonedId) || [];
            }
            state.data = {
                ...state.data,
                [payload.set_id]:{
                    ...state.data[payload.set_id],
                    Questions:Questions
                }
            }
        }
    },
    addClonedQuestionData(state, payload) {
        state.data = {
            ...state.data,
            [payload.set_id]:{
                ...state.data[payload.set_id],
                Questions:[
                    ...state.data[payload.set_id].Questions,
                    payload   
                ]
            }
        }
    },
    replaceList (state, payload){
        state.data = {
            ...state.data,
            [payload.set_id]:{
                ...state.data[payload.set_id],
                Questions:payload.Questions
            }
        }
    }
}

export const actions = {
    manageSetData(context, options){
        switch (options.type) {
            case "addQuestionSetData":
                context.commit("addQuestionSetData", { 
                    value: options.value
                })
            case "addQuestionData":
                context.commit("addQuestionData", { 
                    value: options.value
                })
                break;
            case "addClonedQuestionData":
                context.commit("addClonedQuestionData", { 
                    value: options.value
                })
                break;
            case "replaceList":
                context.commit("replaceList", { 
                    value: options.value
                })
                break;
            case 'removeClonedQuestionData':
                context.commit("removeClonedQuestionData",{
                    value: options.value
                })
            default:
                break;
        }
        // Wants to manage multiple mutations through logic
    }
}

export const getters = {
   getQuestionSetData: state => state.data
}