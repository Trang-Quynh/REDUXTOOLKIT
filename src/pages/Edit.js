import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {getOneStudent, updateOneStudent} from "../service/studentService";
import {useDispatch, useSelector} from "react-redux";

const SchemaError = Yup.object().shape({
    id: Yup.number().min(1, "Too Short!").required("Required"),
    name: Yup.string().min(1, "Quá ngắn").required("Required"),
    description: Yup.string().min(1, "Quá ngắn").required("Required")
});

export function Edit() {
    const navigate = useNavigate();
    let { id } = useParams();
    const dispatch = useDispatch()
    const currentStudent = useSelector(({students})=>{
        return students.currentStudent;
    })
    useEffect(() => {
        dispatch(getOneStudent(id));
    }, [dispatch,id]);

    return (
        <>
            {currentStudent && id == currentStudent.id && (
                <Formik
                    initialValues={{
                        id: currentStudent.id,
                        name: currentStudent.name,
                        description: currentStudent.description,
                        action: currentStudent.action
                    }}
                    validationSchema={SchemaError}
                    onSubmit={(values) => {
                        dispatch(updateOneStudent(values)).then(() => {
                            navigate('/home/list');
                        });
                    }}
                >
                    {({values, setFieldValue}) => (
                        <Form>
                            <Field
                                type="text"
                                name="id"
                                value={values.id}
                                onChange={(e) => setFieldValue("id", e.target.value)}
                            />
                            <p style={{color: "red"}}>
                                <ErrorMessage name="id"/>
                            </p>
                            <Field
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={(e) => setFieldValue("name", e.target.value)}
                            />
                            <p style={{color: "red"}}>
                                <ErrorMessage name="name"/>
                            </p>
                            <Field
                                type="text"
                                name="description"
                                value={values.description}
                                onChange={(e) =>
                                    setFieldValue("description", e.target.value)
                                }
                            />
                            <p style={{color: "red"}}>
                                <ErrorMessage name="description"/>
                            </p>
                            <Field as="select" name="action" placeholder="Description">
                                <option value="Xem xét">Xem xét</option>
                                <option value="Đạt">Đạt</option>
                                <option value="Tốt">Tốt</option>
                            </Field>
                            <button type="submit">Edit</button>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
}




