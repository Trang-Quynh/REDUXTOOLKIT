// import {useNavigate, useParams, useSearchParams} from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from "yup";
//
// const SchemaError = Yup.object().shape({
//     id: Yup.number().min(1, "Too Short!").required("Required"),
//     name: Yup.string().min(1, "Quá ngắn").required("Required"),
//     description: Yup.string().min(1, "Quá ngắn").required("Required")
// });
//
// export function Edit() {
//     const navigate = useNavigate();
//     let { id } = useParams();
//     const [searchParams] = useSearchParams();
//
//
//     const [student, setStudent] = useState({});
//     const [isLoad, setIsLoad] = useState(true);
//
//     useEffect(() => {
//         axios.get(`http://localhost:3001/students/${id}`).then((res) => {
//             setStudent(res.data);
//             setIsLoad(false);
//         });
//     }, []);
//
//     return (
//         <>
//             {isLoad ? (
//                 <>.....Loading</>
//             ) : (
//                 <Formik
//                     initialValues={{
//                         id: student.id,
//                         name: student.name,
//                         description: student.description,
//                         action: student.action
//                     }}
//                     validationSchema={SchemaError}
//                     onSubmit={(values) => {
//                         console.log(values);
//                         axios.put(`http://localhost:3001/students/${id}`, {
//                             id: values.id,
//                             name: values.name,
//                             description: values.description,
//                             action: values.action
//                         }).then(() => {
//                             navigate("/home/list", {
//                                 state: { name: "Linh", isHandsome: "Sure" }
//                             });
//                         });
//                     }}
//                 >
//                     {({ values, setFieldValue }) => (
//                         <Form>
//                             <Field
//                                 type="text"
//                                 name="id"
//                                 value={values.id}
//                                 onChange={(e) => setFieldValue("id", e.target.value)}
//                             />
//                             <p style={{ color: "red" }}>
//                                 <ErrorMessage name="id" />
//                             </p>
//                             <Field
//                                 type="text"
//                                 name="name"
//                                 value={values.name}
//                                 onChange={(e) => setFieldValue("name", e.target.value)}
//                             />
//                             <p style={{ color: "red" }}>
//                                 <ErrorMessage name="name" />
//                             </p>
//                             <Field
//                                 type="text"
//                                 name="description"
//                                 value={values.description}
//                                 onChange={(e) =>
//                                     setFieldValue("description", e.target.value)
//                                 }
//                             />
//                             <p style={{ color: "red" }}>
//                                 <ErrorMessage name="description" />
//                             </p>
//                             <Field as="select" name="action" placeholder="Description">
//                                 <option value="Xem xét">Xem xét</option>
//                                 <option value="Đạt">Đạt</option>
//                                 <option value="Tốt">Tốt</option>
//                             </Field>
//                             <button type="submit">Edit</button>
//                         </Form>
//                     )}
//                 </Formik>
//             )}
//         </>
//     );
// }
//
