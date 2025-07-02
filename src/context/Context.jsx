// Original Code -
import { createContext,useState} from 'react';
import  runChat  from '../config/gemini';


export const context = createContext();

const ContextProvider = (props) =>{
    
    const [input,setInput]= useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    
    

     
    const delayPara=(index,nextWord)=>{
       setTimeout(function(){
            setResultData((prev) =>prev+nextWord);
       },75* index);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) =>{
 
        setResultData("");
        setLoading(true);
        setShowResult(true);
        
        let response;
        if(prompt !== undefined){
            response = await runChat(prompt);
            setRecentPrompt(prompt);
        }
        else{
            setPrevPrompts((prev) => [...prev, input]);
            setRecentPrompt(input);
            response = await runChat(input);
        }

        // setRecentPrompt(input);
        // setPrevPrompts((prev) => [...prev, input]);
        // const response = await runChat(input);

        let responseArray = response.split("**");
        let newResponse="";
        for(let i=0 ; i<responseArray.length; i++){
            if(i===0 || i%2 !==1){
                newResponse += responseArray[i];
            }     
            else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponesArray = newResponse2.split(" ");
        for(let i=0; i<newResponesArray.length; i++){
            const nextWord = newResponesArray[i];
            delayPara(i,nextWord+" ");
        }

        // setResultData(newResponse);
        setLoading(false);
        setInput("");
        // delayPara();

    }

    // onSent("what is react js");

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        setShowResult,
        newChat
    }

    return(
        <context.Provider value={contextValue}>
            {props.children}
        </context.Provider>
    )
}

export default ContextProvider;




// import { createContext, useState, useCallback } from 'react';
// import runChat from '../config/gemini';

// export const context = createContext();

// const ContextProvider = (props) => {
//     const [input, setInput] = useState("");
//     const [recentPrompt, setRecentPrompt] = useState("");
//     const [prevPrompts, setPrevPrompts] = useState([]);
//     const [showResult, setShowResult] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [resultData, setResultData] = useState("");
//     const [error, setError] = useState(null);

//     const delayPara = useCallback(async (text) => {
//         const words = text.split(" ");
//         let displayedText = "";
//         for (const word of words) {
//             displayedText += word + " ";
//             setResultData(displayedText);
//             await new Promise(resolve => setTimeout(resolve, 50));
//         }
//     }, []);

//     const onSent = useCallback(async (prompt) => {
//         setResultData("");
//         setLoading(true);
//         setShowResult(true);
//         setRecentPrompt(input);
//         setError(null);
        
//         try {
//             const response = await runChat(input);
//             const words = response.split(" ");
//             const formattedResponse = words.map((word, index) => 
//                 index % 2 === 0 ? word : `<b>${word}</b>`
//             ).join(" ");
            
//             setResultData(formattedResponse);
//             setPrevPrompts(prev => [...prev, input]);
//         } catch (err) {
//             setError("Failed to get response from AI");
//             setResultData("");
//         } finally {
//             setLoading(false);
//             setInput("");
//         }
//     }, [input]);

//     const contextValue = {
//         prevPrompts,
//         setPrevPrompts,
//         onSent,
//         setRecentPrompt,
//         recentPrompt,
//         showResult,
//         loading,
//         resultData,
//         input,
//         setInput,
//         setShowResult,
//         error
//     };

//     return (
//         <context.Provider value={contextValue}>
//             {props.children}
//         </context.Provider>
//     );
// };

// export default ContextProvider;












































































// Working Code -
// import { createContext, useEffect } from 'react';
// import runChat from '../config/gemini';

// export const Context = createContext(); // Fixed: Capitalized Context

// const ContextProvider = (props) => {
//     const onSent = async (prompt) => {
//         try {
//             const response = await runChat(prompt);
//             console.log(response); // Verify response in console
//             return response; // Return the response
//         } catch (error) {
//             console.error("Error in onSent:", error);
//             throw error;
//         }
//     }

//     // Removed the immediate onSent call - call it from components instead
//     useEffect(() => {
//         // Optional: Test call when component mounts
//         onSent("what is react js").catch(console.error);
//     }, []);

//     const contextValue = {
//         onSent // Make the function available to consumers
//     }

//     return (
//         <Context.Provider value={contextValue}>
//             {props.children}
//         </Context.Provider>
//     )
// }

// export default ContextProvider;







// import { createContext, useState } from 'react';
// import runChat from '../config/gemini';

// export const Context = createContext();

// const ContextProvider = (props) => {
//     const [response, setResponse] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const onSent = async (prompt) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const result = await runChat(prompt);
//             setResponse(result);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     }

//     const contextValue = {
//         response,
//         loading,
//         error,
//         onSent
//     }

//     return (
//         <Context.Provider value={contextValue}>
//             {props.children}
//         </Context.Provider>
//     )
// }

// export default ContextProvider;