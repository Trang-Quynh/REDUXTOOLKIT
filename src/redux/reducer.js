const initialState = {
    students: [],
    currentStudent: null
}
export const StudentReducer = (currentState = initialState, action) => {
    if (action.type === 'GET STUDENTS') {
        let students = action.payload;
        let newState = {...currentState, students: students};
        return newState;
    } else if(action.type === 'ADD STUDENT'){
            let student = action.payload;
            let newStudents = [...currentState.students];
            newStudents.push(student);
            let newState = {...currentState, students: newStudents}
            return newState
    }
    else if (action.type === 'DELETE STUDENT') {
        let id = action.payload;
        let newStudents = [...currentState.students];
        let index = -1;
        for (let i = 0; i < newStudents.length; i++) {
            if (newStudents[i].id === id) {
                index = i;
            }
        }
        newStudents.splice(index, 1)
        let newState = {students: newStudents};
        return newState;
    }else if(action.type === 'GET STUDENT'){
        let student = action.payload;
        let newState = {...currentState, currentStudent: student};
        return newState
    } else if(action.type === 'UPDATE STUDENT'){
        let student = action.payload;
        let newStudents = [...currentState.students];
        let id = student.id;
        let index = -1
        for (let i = 0; i < newStudents.length; i++) {
            if(newStudents[i].id === id){
                index = i
            }
        }
        newStudents[index] = student;
        let newState = {...currentState, students: newStudents}
        return newState
    }
    return currentState;
}
