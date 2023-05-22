import {Form, Formik, Field, ErrorMessage, useFormik, useFormikContext, FormikProvider} from "formik";
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {addStudent} from "../service/studentService";
// import 'firebase/compat/storage';
import {useEffect, useState} from "react";
import storage from "../firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import firebase from "firebase/compat";

const SchemaError = Yup.object().shape({
    // id: Yup.number()
    //     .min(2, "Too Short!")
    //     .required("Required"),
    name: Yup.string()
        .min(2, "Quá ngắn")
        .required("Required"),
    description: Yup.string()
        .min(2, "Quá ngắn")
        .required("Required")
});


export function Create() {
    const [file, setFile] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            id: '',
            name: '',
            description: '',
            image: '',
            action: ''
        },
        validationSchema: SchemaError,
        onSubmit: (values) => {
            dispatch(addStudent(values)).then(() => {navigate('/home/list', {state: {name: 'Linh', isHandsome: 'Sure'}})})
        }
    });

    const handleChange = async (event, callback) =>{
        console.log(event.target.files[0])
        setFile(event.target.files[0]);
        callback()
    }
//Khi biến file thay đổi thì mới thực hiện upload lên fireBase bởi vì setFile bất đồng bộ, chưa setFile hàm upload sẽ up lên undefined
//     useEffect(() => {
//         if (file) {
//             handleUpload();
//         }
//     }, [file]);

    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }
            const storageRef = ref(storage, `/files/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log(url);
                        formik.setFieldValue('image', url);
                    });
                }
            );


    };

    // https://firebasestorage.googleapis.com/v0/b/crud-8adf5.appspot.com/o/images%2Ftofu.jpg?alt=media&token=29cf3ad1-453a-4707-80f6-499c21a9e694
    // https://firebasestorage.googleapis.com/v0/b/crud-8adf5.appspot.com/o/files%2Fundefined?alt=media&token=f78301c5-0282-4a6a-97a5-91d3d88db4c6


    return (
        <FormikProvider value={formik}>
            <Form>
                <Field type="text" name="id" placeholder="Id" />
                <p style={{ color: 'red' }}><ErrorMessage name="id" /></p>
                <Field type="text" name="name" placeholder="Name" />
                <p style={{ color: 'red' }}><ErrorMessage name="name" /></p>
                <Field type="text" name="description" placeholder="Description" />
                <p style={{ color: 'red' }}><ErrorMessage name="description" /></p>
                <Field as="select" name="action" placeholder="Description">
                    <option value="Xem xét">Xem xét</option>
                    <option value="Đạt">Đạt</option>
                    <option value="Tốt">Tốt</option>
                </Field>
                <div>
                    <Field type="file" name={'myImage'}  onChange={(e) =>{handleChange(e, handleUpload)}} accept="/image/*" />
                    <Field type="text" name="image" />
                </div>

                <button type='submit'>Add</button>
            </Form>
        </FormikProvider>
    );
}