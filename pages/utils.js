const uuid = require('uuid');
const crypto = require('crypto');

export function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}


export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }   
    return null;
}


export async function getUserIP() {
    const res = await fetch('https://api.ipify.org/?format=json')
    .then(res => res.json())

    return res
}


export function sha256(data) {
    if(data){
        return crypto.createHash('sha256').update(data.toLowerCase()).digest('hex');
    }
    return null
}


export function create_uuid() {
    return uuid.v1(); 
}