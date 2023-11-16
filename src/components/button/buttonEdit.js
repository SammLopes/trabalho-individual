import Button from "react-bootstrap/esm/Button";

const BotaoEdit = ({onClick}) => {
    return(
        <>
            <Button type="button" variant="primary" onClick={onClick}>Edit</Button>
        </>
    )
}

export default BotaoEdit;