import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {logDOM} from "@testing-library/react";


export const getStudents = createAsyncThunk(
    'students/getStudents',
    async () =>{
        let response = await axios.get('http://localhost:3001/students');
        return response.data

    }
)
export const getSearchStudents = createAsyncThunk(
    'students/getSearchStudents',
    async (keyword) =>{
        console.log(keyword, 111)
        let response = await axios.get(`http://localhost:3001/students/search?search=${keyword}`);
        console.log(response.data)
        return response.data
    }
)




export const addStudent = createAsyncThunk(
    'students/addStudent',
    async (values) =>{
        await axios.post('http://localhost:3001/students', values);
        return values;
    }
)

export const deleteStudent = createAsyncThunk(
    'students/deleteStudent',
    async (id) =>{
        let response = await axios.delete(`http://localhost:3001/students/${id}`)
        return response.data.id;
    }
)


export const getOneStudent = createAsyncThunk(
    'students/getStudent',
    async (id) =>{
        let response = await axios.get(`http://localhost:3001/students/${id}`)
        return response.data
    }
)

export const updateOneStudent = createAsyncThunk(
    'students/updateStudent',
    async (values) =>{
        let response = await axios.put(`http://localhost:3001/students/${values.id}`, values)
        return response.data

    }
)





