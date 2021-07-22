import React from 'react'

export const loadDataApi= async (url)=> {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        }
    });
    return res.json();
}

export const addDataApi= async (url,model)=> {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(model)
    });
    return res.json();
}

export const updateDataApi= async (url,model)=> {
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(model)
    });
    return res;
}

export const  isLogin=()=> {
    if(window.sessionStorage.getItem("token")){
        return true;
    }
    return false;
}

export const logout = () => {
    window.sessionStorage.removeItem("token")
}
