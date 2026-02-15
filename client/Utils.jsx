const SetPageTitle=({title})=> {
        document.title=`${title} | TripNest`
}
const isUserLogedIn=()=>{
    const userJwtToken=localStorage.getItem("JwtToken");
    return !!userJwtToken
}

const getUserJwtToken=()=>{
    const userJwtToken=localStorage.getItem("JwtToken");
    return userJwtToken;
}
const getUserData=()=>{
    const userData=localStorage.getItem("userData") || "{}";
    return JSON.parse(userData);
}
export {SetPageTitle,isUserLogedIn, getUserData, getUserJwtToken};
