import axios from "axios";


export const getStudents = () =>{
    return async (dispatch) =>{
        try{
            const response = await axios.get('http://localhost:3001/students');
            dispatch({
                type: 'GET STUDENTS',
                payload: response.data
            })
        }catch(err){
            console.log(err)
        }
    }
}


export const deleteStudent = (id) =>{
    return async (dispatch) =>{
        try{
            const response = await axios.delete(`http://localhost:3001/students/${id}`);
            dispatch({
                type: 'DELETE STUDENT',
                payload: response.data.id
            })
        }catch(err){
            console.log(err)
        }
    }
}

export const addNewStudent = (values) =>{
    return async (dispatch) =>{
        try{
            const response = await axios.post('http://localhost:3001/students', values);
            dispatch({
                type: 'ADD STUDENT',
                payload: response.data
            })
        }catch(err){
            console.log(err)
        }
    }
}

export const getOneStudent = (id) =>{
    return async (dispatch) =>{
        try{
            const response = await axios.get(`http://localhost:3001/students/${id}`);
            dispatch({
                type: 'GET STUDENT',
                payload: response.data
            })
            //Da lay duoc data
        }catch(err){
            console.log(err)
        }
    }
}

export const updateStudent = (values) =>{
    return async (dispatch) =>{
        try{
            const response = await axios.put(`http://localhost:3001/students/${values.id}`, values);
            dispatch({
                type: 'UPDATE STUDENT',
                payload: response.data
            })
        }catch(err){
            console.log(err)
        }
    }
}





