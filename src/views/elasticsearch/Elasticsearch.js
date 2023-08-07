import { async } from "@firebase/util";
import axios from "axios";
import jsCookie from "js-cookie";
// import jsCookie from "js-cookie";
// import { useCookies } from "react-cookie";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const Elasticsearch = () => {
const cookies = new Cookies();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try { 
  //       const   username = "elastic-viewer";
  //       const   password = "CameraPlatform1234%^&*";
  //       const response = await axios.post("/internal/security/login",{ 
  //         providerType: "basic",
  //         providerName: "basic",
  //         currentURL: "https://kina.viettel.io:5198/login?msg=LOGGED_OUT",
  //         params: {
  //         username: username,
  //         password: password
  //       }
  //       }, {
  //         withCredentials: true,
  //         headers: {
  //           'kbn-xsrf': 'true'
  //         }
  //       });
       
  //       console.log(response);
  //     } catch (error) {
  //     }
  //   };
  //   fetchData();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try { 
      const body = JSON.stringify({"username":"elastic","password":"R2KpmOMeUeBCbIArEKkE4ixR"});
  
        const response = await axios.post("https://demo-dae5d4.kb.us-central1.gcp.cloud.es.io:9243/internal/security/login",{"providerType":"basic","providerName":"cloud-basic","currentURL":"https://demo-dae5d4.kb.us-central1.gcp.cloud.es.io:9243/login?next=%2F","params":{"username":"elastic","password":"R2KpmOMeUeBCbIArEKkE4ixR"}}, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Kbn-Version': '8.9.0',

          }
        });
       
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div>
      {/* <iframe
        src="https://a875dd6f8fb7443282b1ab571e6232e8.us-central1.gcp.cloud.es.io:9243/app/apm/services?auth_provider_hint=anonymous1#/comparisonEnabled=true&environment=ENVIRONMENT_ALL&rangeFrom=now-15m&rangeTo=now&offset=1d?embed=true&_g=()&_a=()"
        height="600"
        width="800"
      ></iframe> */}
      <iframe src="https://demo-dae5d4.kb.us-central1.gcp.cloud.es.io:9243" height="600" width="800"></iframe>
    </div>
  );
};
export default Elasticsearch;
