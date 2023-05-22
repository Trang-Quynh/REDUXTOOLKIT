import {createSlice} from "@reduxjs/toolkit";
import {
    addStudent,
    deleteStudent,
    getOneStudent, getSearchStudents,
    getStudents,
    updateOneStudent
} from "../../service/studentService";

const initialState = {
    list: [],
    listSearch: [],
    currentStudent: null
}

const studentSlice = createSlice(
    {
        name: 'student',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(getStudents.fulfilled, (currentState, action)=>{
                     currentState.list = action.payload
            })
            builder.addCase(addStudent.fulfilled, (currentState, action)=>{
                console.log(action.payload, 111)
                currentState.list.push(action.payload)
            })
            builder.addCase(deleteStudent.fulfilled, (currentState, action)=>{
                    let id = action.payload;
                    let index = -1;
                    for (let i = 0; i < currentState.list.length; i++) {
                        if(currentState.list[i].id === id){
                            index = i;
                        }
                    }
                    currentState.list.splice(index, 1)
            })
            builder.addCase(getOneStudent.fulfilled, (currentState, action)=>{
                   currentState.currentStudent = action.payload;
            })
            builder.addCase(updateOneStudent.fulfilled, (currentState, action) =>{
                  let student = action.payload;
                  let id = student.id;
                  let index = -1;
                  for (let i = 0; i < currentState.list.length; i++) {
                      if(currentState.list[i].id === id){
                          index = i;
                      }
                  }
                  currentState.list[index] = student;
            })
            builder.addCase(getSearchStudents.fulfilled, (currentState, action)=>{
                currentState.listSearch = action.payload;
            })

        }
    }
)
export default studentSlice.reducer