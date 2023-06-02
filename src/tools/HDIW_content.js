const { imgsDir, imgsObject } = require("./const");

class _HDIW {
  Section_1() {
    return {
      banner: imgsDir(imgsObject.HDIW.banner),
      text: "How does Dcarbon work?",
    };
  }
  Section_2() {
    return [
      {
        content:
          "<h3>Trustless digital MRV</h3><p>Dcarbon protocol use carbon agents, an autonomous IoT solution fore real-time monitoring, reporting and verification of carbon emissions and Blockchain technology for secure and tamper-proof transactions.</p><br /><p>Our system guarantee that each carbon credit minted is exactly equivalent to 1 ton of carbon being offset from the earth's atmosphere.</p>",
        imgs: imgsDir(imgsObject.HDIW.polygon),
      },
      {
        content:
          "<h3>A people's protocol</h3><p>Dcarbon DAO is a decentralized registry which empower climate workers, offset projects and Dcarbon community to directly give them the opportunities to participate in the decision making process of Dcarbon protocol.</p> <h3>Proof of offset</h3><p>Proof of offset is a certificate generated from the process of sending CARBON token to a burn address (a wallet that cannot be unlocked). Thank to the immutability and transparency nature of blockchain these records are preserved and the burned CARBON credit can not be recirculated.</p>",
        imgs: imgsDir(imgsObject.HDIW.circle),
      },
    ];
  }
  Section_3() {
    return {
      heading: "FAQ",
      faqs: [
        {
          question: "What are carbon credits and how do they work?",
          answers: "",
        },
        {
          question: "What are Carbon agents and how do they work?",
          answers: "",
        },
        {
          question:
            "How does Dcarbon ensure the security and transparency of transactions?",
          answers: "",
        },
        {
          question: "What is Dcarbon DAO ?",
          answers: "",
        },
        {
          question:
            "What types of projects can be registered for carbon credit from Dcarbon registry?",
          answers: "",
        },
        {
          question:
            "What is the cost of getting my offset project to be registered with Dcarbon protocol?",
          answers: "",
        },
        {
          question: "Where I can sell my carbon credits from Dcarbon registry?",
          answers: "",
        },
      ],
    };
  }
}
export default _HDIW;
