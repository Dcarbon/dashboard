import { imgsDir, imgsObject } from "./const";

class _DDAO {
  Section_1() {
    return {
      text: "Dcarbon DAO",
    };
  }
  Section_2() {
    return {
      vision: {
        thumbnail: imgsDir(imgsObject.DDAO.vision),
        title: "Our Vision",
        body: `<p>The Dcarbon DAO vision is to help the humanity to combat global warming and stop climate change.</p>
        <br />
        <p>Dcarbon DAO mission is to create a democratized carbon market that empowers all protocol participants, including workers, holders, and investors, to have a say in the decision-making process. By doing so, we hope to bring sustainable future for the humanity and heal our beloved planet.</p>`,
      },
      goal: {
        thumbnail: imgsDir(imgsObject.DDAO.goal),
        title: "Dcarbon DAO goal",
        body: `<ul>
        <li>Archive net zero on global scale</li>
        <li>Ensure only highest quality projects can be approved by the DAO</li>
        <li>Act as an effective tool for community opinion collection and execution</li>
        </ul>`,
      },
      foundation: {
        thumbnail: imgsDir(imgsObject.DDAO.foundation),
        title: "Dcarbon foundation",
        body: `<ul>
        <li>Act as a centralized safe guard for Dcarbon protocol.</li>
        <li>Can be replaced anytime if the Dcarbon community reach consensus</li>
        <li>In charge of researching, improving the Dcarbon protocol until it can be fully decentralized.</li>
        </ul>`,
      },
    };
  }
}
export default _DDAO;
