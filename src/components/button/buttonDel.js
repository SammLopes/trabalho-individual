import Button from 'react-bootstrap/Button';

const BotaoDel = ({onClick}) => {
    return(
        <>
            <Button type="button" variant="danger" onClick={onClick}>Delete</Button>
        </>
    )
}

export default BotaoDel;