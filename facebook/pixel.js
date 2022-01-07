import React, {useEffect, useState} from 'react'
import {getUserData} from '../database/utils'
import Head  from 'next/head'
import {getCookie, sha256} from '../pages/utils'
import {insertMacro} from "../database/utils"


export default () => {  
  useEffect(() => {
    async function getUser () {
      getUserData(getCookie("id"))
      .then(res => {
        fbq('init', '462404612082589', {
          fn: res.name,
          ln: res.lastname,
          em: res.email, 
          external_id: getCookie("id")
        })
        fbq('track', 'PageView', {
          external_id: getCookie("id")
        })
        
        insertMacro({action: "VIEW", user_id: getCookie("id"), name: res.name, 
                    lastname: res.lastname, email: res.email});
      })
    }

    getUser();
  }, []);

  return (
    <Head>
    <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      ` }}
    />
    <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=462404612082589&ev=PageView&noscript=1" />` }}
    />
    </Head>
  )
}