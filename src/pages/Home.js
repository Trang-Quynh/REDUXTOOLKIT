import {Footer} from "../components/Footer";
import {Header} from "../components/Header";
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {addStudent, getSearchStudents} from "../service/studentService";
import {useDispatch} from "react-redux";

export function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <>
            <Header/>
            <Formik
                initialValues={{
                    search: '',
                }}
            >
                {({values}) => (
                    <Form>
                        <Field type="text" name={'search'} placeholder={'Search...'}/>
                        <button type='submit'><Link to={`/home/search?search=${values.search}`}>Find</Link></button>
                    </Form>
                )}
            </Formik><br/>
            <Outlet/>
            <Footer/>
        </>
    )
}


