import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./screen0.scss";
import { useNavigate } from "react-router-dom";

function Screen0() {
  const navigate = useNavigate();
  const { linkId } = useParams();
  const [assignedCategory, setAssignedCategory] = useState();
  const [pnumber, setPnumber] = useState();
  const [consent, setConsent] = useState("");
  const [isConsentSelected, setIsConsentSelected] = useState(false);

  useEffect(() => {
    axios
      .post(
        `http://localhost:5000/generate/page/${linkId}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.msg === "granted!") {
          setPnumber(response.data.pnumber);
          setAssignedCategory(response.data.categroy);
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/notfound");
      });
  }, [linkId]);

  const startClicked = async () => {
    const obj = { pnumber, linkId, assignedCategory };
    // console.log(36,obj)

    if (consent == "no") {
      navigate("/endstudy");
    }

    if (consent == "yes") {
      try {
        await axios
          .post("http://localhost:5000/generate/addparticipant", obj, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.msg === "granted!") {
              navigate(`/screen1/${pnumber}`);
            } else {
              console.log(res.data.msg);
            }
          });
      } catch (err) {
        console.log(28, err);
      }
    }
  };
  const handleConsentChange = (event) => {
    setConsent(event.target.value);
    setIsConsentSelected(true);
  };
  return (
    <>
      <div className="participant-info-outer">
        <div className="participant-info-box">
          <div className="participant-info-heading">Informed Consent</div>
          {/* <div style={{
                color:'aliceblue',
                display:'flex',
                fontSize:'1.1rem',
            }}>Participant number:&nbsp;&nbsp;&nbsp; <p style={{color:'#6AD4DD', fontSize:'1.3rem'}}>{pnumber}</p></div> */}

          <div
            style={{
              color: "#6AD4DD"
            }}
          >
            <div>
              <b>Title of the Study: </b>Performance in Service Organizations
            </div>
            <br />
            <div>
              <b>Principal Investigator: </b>Tyler Thomas, UW
              (tyler.thomas@uwaterloo.ca)
              <br />
            </div>
            <br/>
            <div>
              {" "}
              <b>Collaborating Researchers: </b>
              <br />
              Wenqian Hu, University of Waterloo (w8hu@uwaterloo.ca)
              <br />
              Kelsey Matthews, University of Waterloo
              (kelsey.matthews@uwaterloo.ca)
              <br />
              Adam Presslee, University of Waterloo (adam.presslee@uwaterloo.ca)
              <br />
            </div>
            <br/>
            <div>
              {" "}
              <b>
                <u>DESCRIPTION OF THE RESEARCH</u>
              </b>
              <br />
              You are invited to participate in a research study about worker
              performance. Specifically, the purpose of the research is to
              understand worker performance in service organizations. <br />
              Your participation is entirely voluntary. This form includes
              detailed information on the research to help you decide whether to
              participate. Please read it carefully and ask any questions you
              have before you agree to participate. <br />
            </div>
            <br/>
            <div>
            <b>
              <u>WHAT WILL MY PARTICIPATION INVOLVE?</u>
            </b><br/>
            If you decide to participate in this research study, then you will
            be randomly assigned to the role of either a customer or a worker in
            a service setting. Customers and workers will be paired together to
            form dyads. If you agree, you will then be able to continue with the
            study, which will be completed during one in-lab session and will
            last about 45 minutes.
            <br />
            You will be asked to read through a set of instructions, make
            decisions in your role as a customer or worker that may affect the
            other person in the dyad, and fill out a questionnaire. The
            questionnaire will ask you questions about how you made your
            decisions and to provide basic demographic information, but no
            identifying information will be asked of you. Your identity will be
            confidential. <br />
            </div>
            <br/>
<div>
<b>
              <u>ARE THERE ANY RISKS TO ME?</u>
            </b><br/>
            We do not foresee any risks from participation in this research
            study beyond that of everyday activities. That means that the risks
            of participating are no more likely or serious than those you
            encounter in everyday activities.
</div>
            <br />
            <div>
            <b>
              <u>ARE THERE ANY BENEFITS TO ME?</u>
            </b><br/>
            We do not expect any direct benefits to you from participation in
            this study.
            </div>
            <br />
            <div>
            <b>
              <u>WILL I RECEIVE ANYTHING FOR MY PARTICIPATION? </u>
            </b><br/>
            You will receive a 0.5% bonus mark in the SAF Behavioral Research
            System for completing this study. In the task, you will be randomly
            assigned to the role of a customer or worker and have the
            opportunity to receive pay based on your performance in the task.
            You will receive at least $5 for your participation with an expected
            average payout of at least $10. You can collect any monetary payment
            when you leave the experimental lab after completing the study.
            </div>
            <br />
            <div>
            <b>
              <u>CAN I WITHDRAW OR BE REMOVED FROM THE STUDY?</u>
            </b><br/>
            Your participation in this research is voluntary. You may decline to
            answer any of the questions if you so wish by advancing to the next
            screen without completing the question(s). Further, you may decide
            to withdraw from this study at any time by closing the browser
            window without any penalty, and without loss of benefits to which
            you are otherwise entitled. Specifically, if you withdraw prior to
            completing the study, you will still be eligible to receive the 0.5%
            bonus mark and pay of $5.
            <br />
            </div>
            <br/>
            <div>
            <b>
              <u>HOW WILL MY CONFIDENTIALITY BE PROTECTED?</u>
            </b><br/>
            Your identity will be confidential and no identifiable information
            will be retained with your responses. The data resulting from your
            participation will be shared by the researchers on the project. The
            records of this study will be stored securely on a password
            protected server and kept confidential for the duration of the study
            and corresponding research program (at least two years). All
            publications will exclude any information that will make it possible
            to identify you as a participant. This study will be completed
            through a private password-protected online platform. When
            information is transmitted/stored on the internet, privacy cannot be
            guaranteed. There is a risk your responses may be intercepted by a
            third party. Once all the data are collected and analyzed for this
            project, we plan on sharing this information with the research
            community through seminars, conferences, presentations, and journal
            articles. We will only analyze the data in the aggregate (across all
            participants) and not individually.
            </div>
            <br />
            <b>
              <u>WHOM SHOULD I CONTACT IF I HAVE QUESTIONS?</u>
            </b><br/>
            <div>            You may ask any questions about the research at any time to the
            administrator or the Principal Investigator listed at the top of
            this form.</div>
            <br />
            <div>            This study has been reviewed and received ethics clearance through a
            University of Waterloo Research Ethics Board (REB #). If you have
            questions for the Board, contact the Office of Research Ethics,
            toll-free at 1-833-643-2379 (Canada and USA), 1-519-888-4440, or
            reb@uwaterloo.ca.</div><br/>
            <div>
            <b>
              <u>RESTRICTIONS</u>
            </b>
<div>            This study is restricted to individuals who are at least 18 years
old.</div>
            <br />
            By agreeing to participate, you indicate that you are at least 18
            years old and voluntarily consent to participate in this study.
            Further, you indicate that you understand the risks/benefits of
            participation, and you know what you will be asked to do. You also
            agree that you have asked any questions you might have and are clear
            on how to stop your participation if you choose to. By agreeing to
            participate, you are not waiving your legal rights or releasing the
            investigator(s) or involved institution(s) from their legal and
            professional responsibilities.
            </div>
            <br/>
            <div
              style={{
                margin: "1rem 0",
                display: "flex",
                flexDirection:'column',
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  name="consent"
                  type="radio"
                  value="yes"
                  checked={consent === "yes"}
                  onChange={handleConsentChange}
                />
                <label>I Agree</label>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  name="consent"
                  type="radio"
                  value="no"
                  checked={consent === "no"}
                  onChange={handleConsentChange}
                />
                <label>I Do Not Agree</label>
              </div>
            </div>
          </div>

          {consent === "yes" && (
            <div className="participant-info-start" onClick={startClicked}>
              Next
            </div>
          )}
          {consent === "no" && (
            <div className="participant-info-start" onClick={startClicked}>
              Next
            </div>
          )}
          {!isConsentSelected && (
            <div
              className="participant-info-start"
              style={{ opacity: 0.5, cursor: "not-allowed" }}
            >
              Next
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Screen0;
