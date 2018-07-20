export default {
    state: {
        dialogVisible: false,
        workorder:false,
        production:false,
        inout:false,
        bom:false,
        bomDetail:false,
        schedule: false,
        scheduleReview: false,
        workorder: false,
        production: false,
        inout: false,

        schedule: false,
        scheduleReview: false,

        custom: false
    },

    mutations: {
        computedVisible(state, value) {
            state.dialogVisible = value;
        },

        scheduleVisible(state, value) {
            state.schedule = value;
        },

        scheduleReviewVisible(state, value) {
            state.scheduleReview = value;
        },

        customVisible(state, value) {
            state.custom = value;
        },

        workorderVisible(state, value) {
            state.workorder = value
        },

        producitonVisible(state, value) {
            state.production = value
        },

        inoutVisible(state, value) {
            state.inout = value
        },
        bomVisible(state, value){
            state.bom=value
        },
        bomDetailVisible(state,value){
            state.bomDetail=value
        }
    }
}