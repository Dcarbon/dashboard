import { imgsDir, imgsObject } from "./const";

class _DDAO {
  Section_1() {
    return {
      text: " DCarbon DAO",
    };
  }
  Section_2() {
    return {
      vision: {
        thumbnail: imgsDir(imgsObject.DDAO.vision),
        title: "Our Vision",
        body: `<p>The  DCarbon DAO vision is to help the humanity to combat global warming and stop climate change.</p>
        <br />
        <p> DCarbon DAO mission is to create a democratized carbon market that empowers all protocol participants, including workers, holders, and investors, to have a say in the decision-making process. By doing so, we hope to bring sustainable future for the humanity and heal our beloved planet.</p>`,
      },
      goal: {
        thumbnail: imgsDir(imgsObject.DDAO.goal),
        title: " DCarbon DAO goal",
        body: `<ul>
        <li>Archive net zero on global scale</li>
        <li>Ensure only highest quality projects can be approved by the DAO</li>
        <li>Act as an effective tool for community opinion collection and execution</li>
        </ul>`,
      },
      foundation: {
        thumbnail: imgsDir(imgsObject.DDAO.foundation),
        title: " DCarbon foundation",
        body: `<ul>
        <li>Act as a centralized safe guard for  DCarbon protocol.</li>
        <li>Can be replaced anytime if the  DCarbon community reach consensus</li>
        <li>In charge of researching, improving the  DCarbon protocol until it can be fully decentralized.</li>
        </ul>`,
      },
    };
  }
}
export default _DDAO;
