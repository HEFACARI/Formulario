import { Container, Row, Col} from "react-bootstrap";
import { useForm } from 'react-hook-form';
import formulario from "../assets/img/icono-formulario.png"
import { putForms } from "../api/form.api";

export const Forms = () =>{

    const {register, handleSubmit} = useForm()

    const onSubmit = handleSubmit(async data => {
        await putForms(data);
    })

    return(
        <div className="forms">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <img src={formulario} alt="formulario" />
                        <h1> Formulario </h1>
                        <br />
                        <form onSubmit={onSubmit}>
                            <Row>
                                <Col>
                                    <input type="text" placeholder="Nombre" {...register('firstName', {required:true})}/>
                                </Col>
                                <Col>
                                    <input type="text" placeholder="Apellido" {...register("lastName", {required:true})} />
                                </Col>
                                <Col>
                                    <input type="text" placeholder="Telefono" {...register("tel", {required:true})} />
                                </Col>
                                <Col>
                                    <input type="text" placeholder="Correo" {...register("email", {required:true})}/>
                                </Col>
                                <br />
                                <button>Enviar</button>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}