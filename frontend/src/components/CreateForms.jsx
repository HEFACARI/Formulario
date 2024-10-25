import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getIdFormulario, postFormularios2, postPreguntas} from "../api/form.api";

export const CreateForms = () =>{

    useEffect(() => {
        async function loadIdFormulario(){
            var res = await getIdFormulario();
            console.log(res.id)
            //setIdFormulario(res.data)
        }

        loadIdFormulario()
    }, [])

    //Es un array de objetos, donde cada objeto representa un campo del formulario. Cada campo tiene un id, un type (tipo de campo), un label (etiqueta) y un array de options (opciones, en caso de que sea un campo que permita seleccionar entre varias respuestas). El estado inicial tiene un solo campo con id: 0, tipo "normal", sin etiqueta ni opciones.
    const [inputs, setInputs] = useState([{ id: 0, type: "normal", label: "", options: [] }]);

    const [idFormulario, setIdFormulario] = useState([]);

    //Es el nombre que se le da al formulario completo, almacenado en otro estado.
    const [formName, setFormName] = useState("");

    const {handleSubmit} = useForm();

    //Agregar un nuevo campo: La función handleAddInput añade un nuevo objeto al array de inputs. Cada nuevo campo tiene un id único basado en la longitud del array de inputs, y comienza como un campo de tipo "normal" sin etiqueta ni opciones.
    const handleAddInput = () => {
    setInputs([...inputs, { id: inputs.length, type: "normal", label: "", options: [] }]);
    };

    //Modificar los campos: Cuando el usuario modifica el tipo de campo o la etiqueta de un campo, la función handleInputChange actualiza el campo correspondiente en el array inputs. Esto se hace encontrando el campo por su id y actualizando solo el campo específico (field puede ser type o label).
    const handleInputChange = (id, value, field) => {
    setInputs(inputs.map(input =>   
        input.id === id ? { ...input, [field]: value } : input
    ));
    };

    //Agregar opciones a campos de selección múltiple: Si el campo es de tipo "selectList", "multipleUnica" o "multipleVarias", el usuario puede agregar opciones. handleAddOption agrega una nueva opción vacía ("") al array de options del campo correspondiente.
    const handleAddOption = (id) => {
    setInputs(inputs.map(input =>
        input.id === id ? { ...input, options: [...input.options, ""] } : input
    ));
    };

    //Modificar las opciones: Cuando el usuario cambia el texto de una opción, handleOptionChange actualiza la opción correspondiente en el campo del input correspondiente.
    const handleOptionChange = (id, optionIndex, value) => {
    setInputs(inputs.map(input =>
        input.id === id ? {
        ...input,
        options: input.options.map((opt, idx) => idx === optionIndex ? value : opt)
        } : input
    ));
    };

    /*const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí envías el formulario a Django usando fetch/axios
        const response = await fetch('/api/submit-form/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formName, inputs })
        });
        if (response.ok) {
        alert('Formulario guardado');
        }
    };*/

    //Envia los datos a la base de datos del formulario
    const onSubmit = handleSubmit(async data =>{
        //await putForms(data);
        await postFormularios2({nombreFormularios:formName});

        /*Aqui los nombres tienen que llamarse igual como en la base de datos */
        for(let input of inputs){
            const tipoInput = input.type
            const contenido = input.label
            const idFormulario = 7

            await postPreguntas({idFormulario, tipoInput, contenido})
        }

    })

    return (
        <div className="container">
            <h2>CREA TU FORMULARIO</h2>

            <form onSubmit={onSubmit}>

                {inputs.map((input, idx) => (
                    <div key={input.id} className="input-container">

                        <select
                            value={input.type}
                            onChange={(e) => handleInputChange(input.id, e.target.value, 'type')}
                        >
                            <option value="normal">Normal</option>
                            <option value="conditional">Pregunta Condicionada</option>
                            <option value="abierta">Pregunta Abierta</option>
                            <option value="selectList">Select List</option>
                            <option value="checkBox">CheckBox</option>
                            <option value="multipleVarias">Multiple (Varias Respuestas)</option>
                            <option value="multipleUnica">Multiple (Unica Respuesta)</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Nombre del Input"
                            value={input.label}
                            onChange={(e) => handleInputChange(input.id, e.target.value, 'label')}
                        />

                        {input.type === "selectList" || input.type === "multipleUnica" || input.type === "multipleVarias" ? (
                        <div>
                            {input.options.map((option, optionIdx) => (
                            <input
                                key={optionIdx}
                                type="text"
                                placeholder={`Opción ${optionIdx + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(input.id, optionIdx, e.target.value)}
                            />
                            ))}
                            <button type="button" onClick={() => handleAddOption(input.id)}>Agregar Opción</button>
                        </div>
                        ) : null}
                        
                    </div>
                ))}

                <button type="button" onClick={handleAddInput}>Agregar Input</button>

                <br />
                <label>Nombre del Formulario:</label>
                <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                />
                <br />

                <input type="submit" value="Guardar" />

            </form>

        </div>
    );
};
