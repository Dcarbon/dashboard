import { imgsDir, imgsObject } from "./const";

class _HDIW {
  Section_1() {
    return {
      banner: imgsDir(imgsObject.howdoesitwork.banner),
      text: "How does  DCarbon work?",
    };
  }
  Section_2() {
    return [
      {
        content:
          "<h3>Trustless digital MRV</h3><p> DCarbon protocol use carbon agents, an autonomous IoT solution for real-time monitoring, reporting and verification of carbon emissions and Blockchain technology for secure and tamper-proof transactions.</p><br /><p>Our system guarantee that each carbon credit minted is exactly equivalent to 1 ton of carbon being offset from the earth's atmosphere.</p>",
        imgs: imgsDir(imgsObject.howdoesitwork.polygon),
      },
      {
        content:
          "<h3>A people's protocol</h3><p> DCarbon DAO is a decentralized registry which empower climate workers, offset projects and  DCarbon community to directly give them the opportunities to participate in the decision making process of  DCarbon protocol.</p> <h3>Proof of offset</h3><p>Proof of offset is a certificate generated from the process of sending CARBON token to a burn address (a wallet that cannot be unlocked). Thank to the immutability and transparency nature of blockchain these records are preserved and the burned CARBON credit can not be recirculated.</p>",
        imgs: imgsDir(imgsObject.howdoesitwork.circle),
      },
    ];
  }
  Section_3() {
    return {
      heading: "FAQ",
      faqs: [
        {
          question: "What are carbon credits and how do they work?",
          answers:
            "<p> DCarbon's Carbon credits (symbol: CARBON) are verified and minted in a trustless manner by  DCarbon's carbon agents. The minted CARBON tokens then can be traded or retired on the Ethereum blockchain.</p>",
        },
        {
          question: "What are Carbon agents and how do they work?",
          answers:
            "<p>Carbon agent is a secured autonomous IoT device. Each Carbon agent contains an auto-gen private key which is impossible to extract even to its maker. The carbon agent then can be deployed to monitor offset work from offset projects and created mint sign which can be used to mint CARBON</p>",
        },
        {
          question:
            "How does  DCarbon ensure the security and transparency of transactions?",
          answers:
            "<p> DCarbon project utilized Ethereum blockchain as a fundamental trust layer to carry out its transactions, ensuring transparency, immutability and security of the project</p>",
        },
        {
          question: "What is  DCarbon DAO ?",
          answers:
            "<p> DCarbon DAO is a Decentralized Autonomous Organization on Ethereum network that enables trustless and autonomous coordination between  DCarbon protocol participants.</p>",
        },
        {
          question:
            "What types of projects can be registered for carbon credit from  DCarbon registry?",
          answers:
            "<p>Currently,  DCarbon registry has developed standards for biogas digesters, waste to energy and bioenergy. Other applications have been developed and will be available in the near future if majorly approved by DCARBON token holders.</p>",
        },
        {
          question:
            "What is the cost of getting my offset project to be registered with  DCarbon protocol?",
          answers:
            "<p>Zero, anyone anywhere can submit their project detail (Ownership document, environmental assortment…) to  DCarbon registry. After a challenging window period, if passed, the project can begin to mint carbon credit. The only fee which the project owner needs to pay is a one time cost of a carbon agent</p>",
        },
        {
          question:
            "Where I can sell my carbon credits from  DCarbon registry?",
          answers:
            "<p> DCarbon's Carbon credit fundamentally is a crypto token so it can be exchanged on any decentralized market or centralized exchange.</p>",
        },
      ],
    };
  }
}
export default _HDIW;
