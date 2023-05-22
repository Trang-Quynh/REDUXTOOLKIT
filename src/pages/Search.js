import {useEffect, useState} from "react";
import {Link,useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteStudent, getSearchStudents} from "../service/studentService";

export function Search() {
    const dispatch = useDispatch()

    const [searchParams] = useSearchParams();
    let keyword = searchParams.get('search')
    const students = useSelector(({students})=>{
        return students.listSearch
    })
    const [isLoad, setIsLoad] = useState(true)

    useEffect(() => {
        dispatch(getSearchStudents(keyword));
        setIsLoad(false);
    }, [keyword])



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
                            students && students.map(item => (
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
