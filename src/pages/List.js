import {useEffect, useState} from "react";
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom";
import {Form, Formik} from "formik";
import {logDOM} from "@testing-library/react";
import {useDispatch, useSelector} from "react-redux";
import {deleteStudent, getStudents} from "../redux/action";

export function List() {
    // gui request
    const dispatch = useDispatch()
    // nhan du lieu gui ve
    const students = useSelector(({students})=>{
        return students;
    })

    const navigate = useNavigate();
    const [isLoad, setIsLoad] = useState(true)

    useEffect(() => {
        dispatch(getStudents());
        setIsLoad(false);
    }, [])




    return (
        <>
            {isLoad ? <>Loading......</> :
                    <>
                        <table border={1}>
                            <tr>
                                <td>Id</td>
                                <td>Name</td>
                                <td>Description</td>
                                <td>Status</td>
                                <td colSpan={2}>Action</td>
                            </tr>
                            {
                                students.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.action}</td>
                                        <td><Link to={`/home/edit/${item.id}`}>Edit</Link></td>
                                        <td><button type='submit' onClick={()=>{dispatch(deleteStudent(item.id))}}>Delete</button></td>
                                    </tr>
                                ))
                            }
                        </table>
                    </>
            }
        </>
    )

}






