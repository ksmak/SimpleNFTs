const setCookie = (cname, cvalue, miliseconds) => {
    const d = new Date();
    d.setTime(d.getTime() + (miliseconds));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export {
    setCookie, getCookie
}