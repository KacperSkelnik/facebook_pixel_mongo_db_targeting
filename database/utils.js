import {getUserIP} from "../pages/utils"
import {getCookie} from '../pages/utils'

export const insertMacro = async (data) => {
    getUserIP().then(async obj => {
        data.user_ip = obj.ip
        data.user_agent = navigator.userAgent
        let ts = Date.now();
        data.datatime = new Date(ts)

        let fbclidMatch = document.URL.match(new RegExp('([fbclid]*?)=([^&?]*)'))
        if(fbclidMatch) data.cookies = {fbp: getCookie('_fbp'), fbclid: fbclidMatch[2]}
        else data.cookies = {fbp: getCookie('_fbp')}

        const res = await fetch('http://localhost:3000/api/trusted_store_activity', {
        method: 'post',
        body: JSON.stringify(data)
      })
  
      console.log(res);
    })
}

export const getUserData = async (id) => {
  const res = await fetch('http://localhost:3000/api/trusted_store_activity?user_id=' + id)
  const json = await res.json()
  return json
}