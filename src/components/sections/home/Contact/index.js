import Container from "src/components/ui/Container";

import stls from "./index.module.scss";
import Section from "src/components/ui/Section";
import Heading from "src/components/ui/Heading";
import { useEffect, useState } from "react";
import Image from "next/image";
import { imgsDir, imgsObject } from "src/tools/const";
import Button from "src/components/ui/Button";
import axios from "axios";
import { CMS_HOST } from "src/redux/handle";
function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errSend, setErrSend] = useState("");
  const [sucSend, setSucSend] = useState("");
  const [mustFill, setMustFill] = useState(false);
  const handleSendResquest = async () => {
    if (mustFill) {
      setMustFill(false);
    }
    if (fullName && email) {
      try {
        const filter = `filters[email][$eq]=${email}`;
        await axios
          .get(CMS_HOST + `/cms/customers?&${filter}`)
          .then((res) => {
            if (res?.data?.data?.length > 0) {
              setErrSend("Oh! You have already submitted contact information");
            } else {
              try {
                axios
                  .post(CMS_HOST + `/cms/customers`, {
                    data: {
                      full_name: fullName,
                      email,
                      message,
                    },
                  })
                  .then((res) => {
                    setEmail("");
                    setFullName("");
                    setMessage("");
                    setSucSend(
                      "Thank you for your information, we will get back to you soon."
                    );
                    setErrSend(null);
                    return res.data;
                  })
                  .catch((err) => {
                    console.error("Something went wrong : ", err);
                    setErrSend(err?.response?.data?.error?.message);
                  });
              } catch (error) {
                console.log("error", error);
              }
            }
          })
          .catch((err) => console.log("check err", err));
      } catch (error) {
        console.log("error check", error);
      }
    } else {
      setMustFill(true);
    }
  };
  useEffect(() => {
    if (sucSend) {
      setTimeout(() => setSucSend(""), 5000);
    }
  }, [sucSend]);
  useEffect(() => {
    if (mustFill) {
      setTimeout(() => setMustFill(""), 3000);
    }
  }, [mustFill]);
  return (
    <Section id={"contact-form"} className={"mb-16"}>
      <Container standard={false} className={stls.container}>
        <div className={stls.box}>
          <div className={stls.image}>
            <Image
              src={imgsDir(imgsObject.Contact)}
              alt='Contact us'
              width={255}
              height={255}
            />
          </div>
          <div className={stls.content}>
            <Heading Tag={"h2"} className={"text-[#FCFCFC] mb-3"}>
              Contact Us
            </Heading>
            <p className='mb-10'>
              Love to hear from you, Get in touch <span>🖐</span>
            </p>
            <div
              className={`grid grid-cols-2 gap-5 lg:gap-10 ${stls.boxField}`}
            >
              <div className='col-span-2 lg:col-span-1'>
                <TextField
                  label={"Full name"}
                  placeholder={"Enter your name"}
                  value={fullName}
                  setValue={setFullName}
                />
              </div>
              <div className='col-span-2 lg:col-span-1'>
                <TextField
                  label={"Email"}
                  placeholder={"Enter your email address"}
                  value={email}
                  setValue={setEmail}
                />
              </div>
              <div className='col-span-2  '>
                <TextField
                  label={"Message"}
                  placeholder={"Type here"}
                  value={message}
                  setValue={setMessage}
                />
              </div>
            </div>
            {mustFill && (
              <p
                style={{ margin: "30px 0 0", fontWeight: 600, color: "yellow" }}
              >
                You must enter your email and your full name field
              </p>
            )}
            {sucSend && (
              <p
                style={{ margin: "30px 0 0", fontWeight: 600, color: "green" }}
              >
                {sucSend}
              </p>
            )}
            {errSend && (
              <p style={{ margin: "30px 0 0", fontWeight: 600, color: "red" }}>
                {errSend}
              </p>
            )}
            <div className='text-right mt-7  mb-4'>
              <Button onClick={handleSendResquest}>Submit</Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default Contact;
function TextField({ label, placeholder, value, setValue }) {
  return (
    <div className={stls.textField}>
      <label className={stls.label}>{label}</label>
      <div className={stls.formControl}>
        <input
          className={stls.field}
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}
