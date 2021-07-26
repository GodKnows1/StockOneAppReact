import React from 'react'

export const dep1= 'https://stockoneapp-boot.herokuapp.com';
export const dep2= 'http://localhost:8080';

export const auth="Authorization";

export const loadDataApi= async (url)=> {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Authorization":window.sessionStorage.getItem("token")
        }
    });
    return res.json();
}

export const loadData2Api= async (url)=> {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Authorization":window.sessionStorage.getItem("token")
        }
    });
    return res.text();
}

export const addDataApi= async (url,model)=> {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            'Content-Type':'application/json',
            "Authorization":window.sessionStorage.getItem("token")
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
            'Content-Type':'application/json',
            "Authorization":window.sessionStorage.getItem("token")
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
