import Container from "src/components/ui/Container";

import stls from "./index.module.scss";
import Section from "src/components/ui/Section";
import Heading from "src/components/ui/Heading";
import { useState } from "react";
import Image from "next/image";
import { imgsDir, imgsObject } from "src/tools/const";
import Button from "src/components/ui/Button";
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  return (
    <Section id={"contact-form"} className={"mb-16"}>
      <Container standard={false} className={stls.container}>
        <div className={stls.box}>
          <div className={stls.image}>
            <Image
              src={imgsDir(imgsObject.Contact)}
              alt="Contact us"
              width={255}
              height={255}
            />
          </div>
          <div className={stls.content}>
            <Heading Tag={"h2"} className={"text-[#FCFCFC] mb-3"}>
              Contact Us
            </Heading>
            <p className="mb-10">
              Love to hear from you, Get in touch <span>🖐</span>
            </p>
            <div className={`grid grid-cols-2 gap-10 ${stls.boxField}`}>
              <div className="col-span-2 md:col-span-1">
                <TextField
                  label={"Full name"}
                  placeholder={"Enter your name"}
                  value={name}
                  setValue={setName}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <TextField
                  label={"Email"}
                  placeholder={"Enter your email address"}
                  value={email}
                  setValue={setEmail}
                />
              </div>
              <div className="col-span-2  ">
                <TextField
                  label={"Message"}
                  placeholder={"Type here"}
                  value={message}
                  setValue={setMessage}
                />
              </div>
            </div>
            <div className="text-right mt-7  mb-4">
              <Button>Submit</Button>
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
