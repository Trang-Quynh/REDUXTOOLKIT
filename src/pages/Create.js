import {Form, Formik, Field, ErrorMessage} from "formik";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {addNewStudent} from "../redux/action";
import {useDispatch} from "react-redux";

const SchemaError = Yup.object().shape({
    id: Yup.number()
        .min(2, "Too Short!")
        .required("Required"),
    name: Yup.string()
        .min(2, "Quá ngắn")
        .required("Required"),
    description: Yup.string()
        .min(2, "Quá ngắn")
        .required("Required")
});

export function Create() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <>
            <Formik
                initialValues={{
                    id: '',
                    name: '',
                    description: '',
                    action: ''
                }}
                validationSchema={SchemaError}
                onSubmit={(values) => {
                    dispatch(addNewStudent(values)).then(() => {navigate('/home/list', {state: {name: 'Linh', isHandsome: 'Sure'}})})
                }}
                // enableReinitialize={true}
            >
                <Form>
                    <Field type="text" name={'id'} placeholder={'Id'}/>
                    <p style={{color: 'red'}}><ErrorMessage name={'id'}/></p>
                    <Field type="text" name={'name'} placeholder={'Name'}/>
                    <p style={{color: 'red'}}><ErrorMessage name={'name'}/></p>
                    <Field type="text" name={'description'} placeholder={'Description'}/>
                    <p style={{color: 'red'}}><ErrorMessage name={'description'}/></p>
                    <Field as={'select'} name={'action'} placeholder={'Description'}>
                        <option value="Xem xét">Xem xét</option>
                        <option value="Đạt">Đạt</option>
                        <option value="Tốt">Tốt</option>
                    </Field>
                    <button>Add</button>
                </Form>
            </Formik>
        </>
    )
}