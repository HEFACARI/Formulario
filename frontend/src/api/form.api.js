import axios from 'axios';

/*Guardar informacion en la base de datos */
const formsApi = axios.create({
    baseURL: 'http://localhost:8000/forms/api/v1/forms/',
})

//Guardar nombre de los formularios en la base de datos
const formsApi2 = axios.create({
    baseURL: 'http://localhost:8000/forms/api/v1/formularios/',
})

const formsApi3 = axios.create({
    baseURL: 'http://localhost:8000/forms/api/v1/preguntas/'
})
//export const getAllForms = () => formsApi.get('/');
export const putForms = (forms) => formsApi.post('/', forms);

/*export const postFormularios = async (formData) => {
    const response = await fetch('/api/v1/formularios/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        throw new Error('Error al guardar el nombre del formulario');
    }
};*/
export const postFormularios2 = (formData) => formsApi2.post('/', formData)
export const getIdFormulario = () => formsApi2.get('/')

export const postPreguntas = (data) => formsApi3.post('/', data)