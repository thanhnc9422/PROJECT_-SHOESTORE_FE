import { async } from "@firebase/util";
import axios from "axios";
import jsCookie from "js-cookie";
// import jsCookie from "js-cookie";
// import { useCookies } from "react-cookie";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const Elasticsearch = () => {
const cookies = new Cookies();
  useEffect(() => {
    const fetchData = async () => {
      try { 
        const   username = "elastic-viewer";
        const   password = "CameraPlatform1234%^&*";
        const response = await axios.post("/internal/security/login",{ 
          providerType: "basic",
          providerName: "basic",
          currentURL: "https://kina.viettel.io:5198/login?msg=LOGGED_OUT",
          params: {
          username: username,
          password: password
        }
        }, {
          withCredentials: true,
          headers: {
            'kbn-xsrf': 'true'
          }
        });
       
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  
 const handleSetCookies = ()=>{

cookies.set("demo1", "cunglademo", {domain: "kina.vi"});
  
 }
  return (
    <div>
      <button onClick={()=>handleSetCookies()}>hay an</button>
      {/* <iframe
        src="https://a875dd6f8fb7443282b1ab571e6232e8.us-central1.gcp.cloud.es.io:9243/app/apm/services?auth_provider_hint=anonymous1#/comparisonEnabled=true&environment=ENVIRONMENT_ALL&rangeFrom=now-15m&rangeTo=now&offset=1d?embed=true&_g=()&_a=()"
        height="600"
        width="800"
      ></iframe> */}
            <iframe src="https://a875dd6f8fb7443282b1ab571e6232e8.us-central1.gcp.cloud.es.io:9243/app/dashboards?auth_provider_hint=anonymous1#/view/edf84fe0-e1a0-11e7-b6d5-4dc382ef7f5b?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:900000),time:(from:now-7d%2Fd,to:now))" height="600" width="800"></iframe>
            <iframe src="https://a875dd6f8fb7443282b1ab571e6232e8.us-central1.gcp.cloud.es.io:9243/app/apm/services?comparisonEnabled=true&environment=ENVIRONMENT_ALL&rangeFrom=now-7d&rangeTo=now&offset=1w" height="600" width="800"></iframe>


    </div>
  );
};

export default Elasticsearch;
