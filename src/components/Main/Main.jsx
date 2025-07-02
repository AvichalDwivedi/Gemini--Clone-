import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img className="user-icon" src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Avichal</span>
              </p>
              <p>How can I help you Today</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Briefly summarize this concepts: urban planning</p>
                <img src={assets.bulb_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="Compass Icon" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="Compass Icon" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">

            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}

              {/* <p dangerouslySetInnerHTML={{__html:resultData}}></p> */}
            </div>
          </div>
        )}

        {/* // <div className="greet">
                //     <p><span>Hello, Avichal</span></p>
                //     <p>How can I help you Today</p>
                // </div>
                // <div className="cards">
                //     <div className="card">
                //         <p>Suggest beautiful places to see on an upcoming road trip</p>
                //         <img src={assets.compass_icon} alt="Compass Icon"/>
                //     </div>
                //     <div className="card">
                //         <p>Briefly summarize this concepts: urban planning</p>
                //         <img src={assets.bulb_icon} alt="Compass Icon"/>
                //     </div>
                //     <div className="card">
                //         <p>Brainstorm team bonding activities for our work retreat</p>
                //         <img src={assets.message_icon} alt="Compass Icon"/>
                //     </div>
                //     <div className="card">
                //         <p>Improve the readability of the following code</p>
                //         <img src={assets.code_icon} alt="Compass Icon"/>
                //     </div>
                // </div> */}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a promt Here"
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Mic Icon" />
              <img
                onClick={() => onSent()}
                src={assets.send_icon}
                alt="Send Icon"
              />
            </div>
          </div>
          <p className="bottom-info">
            Gemini is a large multimodal model that can accept images and text
            as input and generate text as output.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
