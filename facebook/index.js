import {insertMacro} from "../database/utils"
import {getCookie, setCookie, create_uuid, sha256} from '../pages/utils'


export function userWasFooled(event) {
    event.preventDefault();

    let user_id = getCookie("id")
    if (! user_id) {
        setCookie("id", create_uuid(), 14)
        user_id = getCookie("id")
    }
    
    fbq('trackCustom', 'UserWasFooled', {
      content_name: 'Really stupid user', 
      content_category: 'Idiot',
      external_id: user_id
    })

    insertMacro({action: "CLICK", user_id: user_id, name: event.target.name.value, 
                lastname: event.target.lastname.value, email: event.target.email.value});

    document.getElementById('name').value = ''
    document.getElementById('lastname').value = ''
    document.getElementById('email').value = ''
}


export default () => {
    return(
    <div>
        <form onSubmit={userWasFooled}>
        <label for="name">Name </label>
        <input id='name' type="text" required />
        <br></br>
        <label for="lastname">Surname </label>
        <input id='lastname' type="text" required />
        <br></br>
        <label for="email">Email </label>
        <input id='email' type="text" required />
        <br></br>
        <br></br>
        <button type="submit">Click me to see sale details</button>
        </form>
    </div>
)}