const axios = require('axios') ; 
const qs = require('node:querystring');
const baseUrl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php';

const body = qs.stringify({
    client_id: 'api_oauth_id',
    client_secret: 'oauth_secret',
    grant_type: 'password',
    username: 'demouser',
    password: '*Safb02da42Demo$'
    });

const config = {
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Accept':'application/json',}  
    };

 async function getBearerToken()  {
    let res = await axios.post(`${baseUrl}/oauth/issueToken` ,body,config);
     if (res.data.error){
       throw Error(res.data.error);
    }
    let token =  res.data.access_token ;
    //console.log(token) ;
    return token;
   }

module.exports= {
   
 loadSalesMen : async function loadSalesMen() {
    let token = await getBearerToken();
    let res = await axios.get(`${baseUrl}/api/v1/employee/search` , {headers:{"Authorization" : `Bearer ${token}`}})
    //console.log(res.data.data[0]);
    let salesMenJSONList = res.data.data;
    let salesMenObjectList = [];
     
    console.log('im here');
    
    salesMenJSONList.forEach(element => {
        if (element.jobTitle =="Senior Salesman") {
        let salesMan={
            sid:element.employeeId ,
            name:element.firstName,
            department:element.jobTitle || ' '
        }
        //console.log(salesMan);
        
        salesMenObjectList.push(salesMan);
    }
    });
    
   return salesMenObjectList;
}  
}