import './Accounts.css'
import editIcon from "../../public/edit.png"

const handleClick = () => {

    const cards = document.querySelectorAll('.account-card')
    cards.forEach(card => {
        card.classList.remove('selected-card')
    })
    
}

const AccountCard = (props) => {
    return (
        <div className="account-card" onClick={handleClick}>
            <img className='edit-icon' src={editIcon} />
            <h2 className="acc-name">{props.name}</h2>
            <p className="acc-num">XXXX XXXX XXXX {props.digits}</p>

            <div className="inner-card">
                <p className='rs-span'><span className='acc-rs'>Rs.</span><span className='acc-bal'>{props.balance}</span></p>
                <p className='balance'>BALANCE</p>
            </div>
        </div>
    )
}

export default AccountCard